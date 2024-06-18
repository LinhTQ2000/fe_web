import React, { useEffect, useMemo, useState } from 'react'

import { FormControlLabel, Grid, Hidden, InputAdornment } from '@mui/material'
import { Formik, Form, FieldArray } from 'formik'
import { isEmpty, uniqBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  FILE_SIZE,
  IMG_FILE_TYPE,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import FileUploadDropzone from '~/components/FileUploadDropzone'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { searchItemUnitsApi } from '~/modules/database/redux/sagas/item-unit-setting/search-item-units'
import {
  ACTIVE_STATUS,
  ASSET_TYPE_OPTIONS,
  DEVICE_STATUS_OPTIONS,
  DEVICE_STATUS,
  ASSET_TYPE,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { OBLIGATORY_ENUM } from '~/modules/mmsx/constants/index'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'
import { searchAreaApi } from '~/modules/mmsx/redux/sagas/area/search'
import { searchVendorsApi } from '~/modules/mmsx/redux/sagas/define-vendor/search-vendors'
import { getDeviceGroupDetailsApi } from '~/modules/mmsx/redux/sagas/device-group/get-detail'
import { searchDeviceGroupApi } from '~/modules/mmsx/redux/sagas/device-group/search'
import { searchDeviceNameApi } from '~/modules/mmsx/redux/sagas/device-name/search'
import { searchMaintenanceTemplateApi } from '~/modules/mmsx/redux/sagas/maintenance-template/search'
import { searchWarehouseDefineApi } from '~/modules/mmsx/redux/sagas/warehouse-define/search'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ErrorInfo from '../error-info'
import TableInfo from '../info-table'
import MaintainTable from '../maintain-table'
import { deviceSchema } from './schema'

const DefineDeviceForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()

  const {
    data: { isLoading, deviceDetail },
    actions,
  } = useDefineDevice()

  const [deviceGroupDetails, setDeviceGroupDetails] = useState()
  const [supplyList, setSupplyList] = useState([])

  const MODE_MAP = {
    [ROUTE.DEVICE_LIST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEVICE_LIST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: deviceDetail?.code || '',
      name: deviceDetail?.name || '',
      deviceName: deviceDetail?.deviceName || '',
      status: deviceDetail?.status ?? DEVICE_STATUS.PREVENTIVE,
      deviceGroup: deviceDetail?.deviceGroup || null,
      maintenanceTemplate: deviceDetail?.maintenanceTemplate || null,
      serial: deviceDetail?.serial || '',
      actualSerial: deviceDetail?.actualSerial || '',
      factory: deviceDetail?.factory || null,
      numericalOrder: deviceDetail?.numericalOrder || null,
      type: deviceDetail?.assetType || ASSET_TYPE.RENT,
      area: deviceDetail?.area || null,
      originFactory: deviceDetail?.originFactory || null,
      capitalizationDate: deviceDetail?.capitalizationDate || null,
      // amortization: deviceDetail?.depreciation || null,
      model: deviceDetail?.model || '',
      warehouse: deviceDetail?.warehouse || null,
      vendor: deviceDetail?.vendor || null,
      proDate: deviceDetail?.manufactureDate || null,
      producer: deviceDetail?.modelBrand || deviceDetail?.manufacturer || '',
      insuranceDay: deviceDetail?.warrantyPeriod || null,
      identificationNo: deviceDetail?.identificationNo || '',
      creationDate: deviceDetail?.creationDate || null,
      unit: deviceDetail?.unit || null,
      file: deviceDetail?.imageUrl || null,
      active: deviceDetail?.active === ACTIVE_STATUS.ACTIVE,
      initMaintenanceDate:
        deviceDetail?.initMaintenanceDate ||
        deviceDetail?.createdAt ||
        new Date(),
      initAccreditationDate: deviceDetail?.initAccreditationDate || null,
      items: (isUpdate
        ? deviceDetail?.supplies
        : deviceDetail?.deviceGroup?.supplies
      )?.map((item) => ({
        ...item,
        supply: {
          ...item,
          canFixable: item?.canFixable === OBLIGATORY_ENUM.YES,
        },
      })),
    }),
    [deviceDetail],
  )

  useEffect(() => {
    if (isUpdate) {
      actions.getDeviceDetailById(id)
    }
    return () => {
      if (isUpdate) actions.resetDeviceState()
    }
  }, [id])

  useEffect(() => {
    if (
      !isEmpty(deviceDetail?.deviceGroup?.supplies) ||
      !isEmpty(deviceDetail?.supplies)
    ) {
      const supplyTempArr = [
        ...deviceDetail?.deviceGroup?.supplies,
        ...deviceDetail?.supplies,
      ]
      const supplyList = uniqBy(supplyTempArr, 'id')
      setSupplyList(supplyList)
    }
  }, [deviceDetail])

  const onSubmit = (val) => {
    const params = {
      deviceNameId: val?.deviceName?.id,
      status: val?.status ?? DEVICE_STATUS.PREVENTIVE,
      deviceGroupId: val?.deviceGroup?.id,
      maintenanceTemplateId: val?.maintenanceTemplate?.id || null,
      deviceTypeId: val?.deviceGroup?.deviceType?.id,
      serial: val?.serial,
      actualSerial: val?.actualSerial,
      assetType: val?.type,
      factoryId: val?.factory?.id,
      numericalOrder: val?.numericalOrder,
      originFactoryId: val?.originFactory?.id || val?.factory?.id,
      model: val?.model,
      manufacturer: val?.producer,
      // depreciation: val?.amortization,
      vendorId: val?.vendor?.id || null,
      warrantyPeriod: val?.insuranceDay,
      manufactureDate: val?.proDate,
      warehouseId: val?.warehouse?.id || null,
      originWarehouseId: val?.warehouse?.id || null,
      areaId: val?.area?.id || null,
      identificationNo: val?.identificationNo,
      creationDate: val?.creationDate,
      unitId: val?.unit?.id,
      file: val?.file || null,
      active: val?.active ? ACTIVE_STATUS.ACTIVE : ACTIVE_STATUS.INACTIVE,
      initMaintenanceDate: val?.initMaintenanceDate,
      initAccreditationDate: val?.initAccreditationDate || null,
      supplies: val?.items?.map((item) => ({
        supplyId: item?.supply?.id,
        quantity: item?.quantity,
        estimateUsedTime: item?.estimateUsedTime,
        canFixable: item?.supply?.canFixable
          ? OBLIGATORY_ENUM.YES
          : OBLIGATORY_ENUM.NO,
      })),
    }
    if (isUpdate) {
      actions.updateDevice({ ...params, id }, () =>
        history.push(ROUTE.DEVICE_LIST.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      delete params.active
      actions.createDevice(params, (data) =>
        history.push(ROUTE.DEVICE_LIST.DETAIL.PATH.replace(':id', data?.id)),
      )
    }
  }

  const handleChangeDeviceGroup = async (id, setFieldValue) => {
    setFieldValue('items', [])
    setDeviceGroupDetails()
    setSupplyList([])
    if (id) {
      const res = await getDeviceGroupDetailsApi(id)
      if (res?.statusCode === 200) {
        const supplyItems = res?.data?.supplies.map((item) => ({
          ...item,
          supply: {
            ...item,
            canFixable: item?.canFixable === OBLIGATORY_ENUM.YES,
          },
        }))
        setFieldValue('items', supplyItems)
        setDeviceGroupDetails(res?.data)
        setSupplyList(res?.data?.supplies)
        setFieldValue('maintenanceTemplate', res?.data?.maintenanceTemplate)
      }
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.DEVICE_MANAGEMENT.TITLE,
      },
      {
        route: withSearch(ROUTE.DEVICE_LIST.LIST.PATH),
        title: ROUTE.DEVICE_LIST.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEVICE_LIST.CREATE.PATH,
          title: ROUTE.DEVICE_LIST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEVICE_LIST.EDIT.PATH,
          title: ROUTE.DEVICE_LIST.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEVICE_LIST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEVICE_LIST.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.DEVICE_LIST.LIST.PATH))
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={() => {
              handleReset()
              setDeviceGroupDetails()
              setSupplyList([])
            }}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={deviceSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue, errors, touched }) => (
          <Form>
            <HotKeys
              handlers={{
                onBack: backToList,
                ...(isUpdate
                  ? { onReset: handleReset }
                  : {
                      onReset: () => {
                        handleReset()
                        setDeviceGroupDetails()
                        setSupplyList([])
                      },
                    }),
              }}
            />
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    {isUpdate ? (
                      <Field.Autocomplete
                        label={t('general:common.status')}
                        name="status"
                        placeholder={t('general:common.status')}
                        options={DEVICE_STATUS_OPTIONS}
                        getOptionLabel={(opt) => t(opt?.text)}
                        getOptionValue={(opt) => opt?.id}
                        required
                        disabled={
                          !canAccess(FUNCTION_CODE.UPDATE_STATUS_DEVICE)
                        }
                      />
                    ) : (
                      <LV
                        label={t('general:common.status')}
                        value={
                          <Status
                            options={DEVICE_STATUS_OPTIONS}
                            value={DEVICE_STATUS.PREVENTIVE}
                          />
                        }
                      />
                    )}
                  </Grid>
                  {!isUpdate && (
                    <Hidden lgDown>
                      <Grid item lg={6} xs={12}></Grid>
                    </Hidden>
                  )}
                  {isUpdate && (
                    <Grid item lg={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Field.Switch
                            sx={{ ml: 1 }}
                            color="success"
                            name="active"
                          />
                        }
                        label={t('deviceList.activeDevice')}
                      />
                    </Grid>
                  )}
                  {isUpdate && (
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('deviceList.code')}
                        name="code"
                        placeholder={t('deviceList.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                        }}
                        disabled={isUpdate}
                        required
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('deviceList.identificationNo')}
                      name="identificationNo"
                      placeholder={t('deviceList.identificationNo')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                      disabled={deviceDetail?.isFixedAsset && isUpdate}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="deviceName"
                      label={t('deviceList.deviceName')}
                      placeholder={t('deviceList.deviceName')}
                      asyncRequest={(s) =>
                        searchDeviceNameApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            active: ACTIVE_STATUS.ACTIVE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      disabled={deviceDetail?.isFixedAsset && isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="deviceGroup"
                      label={t('deviceList.deviceGroup')}
                      placeholder={t('deviceList.deviceGroup')}
                      asyncRequest={(s) =>
                        searchDeviceGroupApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            active: ACTIVE_STATUS.ACTIVE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      onChange={(val) => {
                        setFieldValue('deviceType', null)
                        handleChangeDeviceGroup(val?.id, setFieldValue)
                      }}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="maintenanceTemplate"
                      label={t(
                        'deviceList.tableMaintenance.maintenanceTemplate',
                      )}
                      placeholder={t(
                        'deviceList.tableMaintenance.maintenanceTemplate',
                      )}
                      asyncRequest={(s) =>
                        searchMaintenanceTemplateApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            active: ACTIVE_STATUS.ACTIVE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('deviceList.serial')}
                      name="serial"
                      placeholder={t('deviceList.serial')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                      disabled={deviceDetail?.isFixedAsset && isUpdate}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('deviceList.actualSerial')}
                      name="actualSerial"
                      placeholder={t('deviceList.actualSerial')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      disabled={
                        !canAccess(FUNCTION_CODE.UPDATE_ACTUAL_SERIAL_DEVICE) &&
                        isUpdate
                      }
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="deviceGroup.deviceType.name"
                      label={t('deviceList.deviceType')}
                      placeholder={t('deviceList.deviceType')}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="factory"
                      label={t('deviceList.factory')}
                      placeholder={t('deviceList.placeholder.factory')}
                      asyncRequest={(s) =>
                        searchFactoriesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            active: ACTIVE_STATUS.ACTIVE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      onChange={() => {
                        setFieldValue('area', null)
                        setFieldValue('warehouse', null)
                      }}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      required
                      disabled={deviceDetail?.isFixedAsset && isUpdate}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('deviceList.numericalOrder')}
                      name="numericalOrder"
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      placeholder={t('deviceList.numericalOrder')}
                      inputProps={{
                        min: 0,
                      }}
                      type="number"
                    />
                  </Grid>
                  {isUpdate && (
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('deviceList.originFactory')}
                        name="originFactory.name"
                        placeholder={t('deviceList.originFactory')}
                        disabled
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="warehouse"
                      label={t('deviceList.warehouseName')}
                      placeholder={t('deviceList.placeholder.warehouse')}
                      asyncRequest={(s) =>
                        searchWarehouseDefineApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            active: ACTIVE_STATUS.ACTIVE,
                            factoryId: values?.factory?.id,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      asyncRequestDeps={values?.factory}
                      getOptionSubLabel={(opt) => opt?.code}
                      disabled={deviceDetail?.isFixedAsset && isUpdate}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="area"
                      label={t('deviceList.area')}
                      placeholder={t('deviceList.area')}
                      asyncRequest={(s) =>
                        searchAreaApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            active: ACTIVE_STATUS.ACTIVE,
                            factoryId: values?.factory?.id,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      asyncRequestDeps={values?.factory}
                      getOptionSubLabel={(opt) => opt?.code}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('deviceList.model')}
                      name="model"
                      placeholder={t('deviceList.model')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      required
                      disabled={deviceDetail?.isFixedAsset && isUpdate}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      label={t('deviceList.type')}
                      name="type"
                      placeholder={t('deviceList.type')}
                      options={ASSET_TYPE_OPTIONS}
                      getOptionLabel={(opt) => t(opt?.text)}
                      getOptionValue={(opt) => opt?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="vendor"
                      label={t('deviceList.vendor')}
                      placeholder={t('deviceList.vendor')}
                      asyncRequest={(s) =>
                        searchVendorsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            active: ACTIVE_STATUS.ACTIVE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.result}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      label={t('deviceList.proDate')}
                      name="proDate"
                      placeholder={t('deviceList.placeholder.proDate')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('deviceList.producer')}
                      name="producer"
                      placeholder={t('deviceList.producer')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      required
                      disabled={deviceDetail?.isFixedAsset && isUpdate}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('deviceList.insuranceDay')}
                      name="insuranceDay"
                      placeholder={t('deviceList.placeholder.insuranceDay')}
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {t('general:months')}
                          </InputAdornment>
                        ),
                      }}
                      type="number"
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      label={t('deviceList.creationDate')}
                      name="creationDate"
                      placeholder={t('deviceList.placeholder.creationDate')}
                      required
                      disabled={deviceDetail?.isFixedAsset && isUpdate}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="unit"
                      label={t('deviceList.unit')}
                      placeholder={t('deviceList.unit')}
                      asyncRequest={(s) =>
                        searchItemUnitsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            active: ACTIVE_STATUS.ACTIVE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      disabled={deviceDetail?.isFixedAsset && isUpdate}
                      getOptionSubLabel={(opt) => opt?.code}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      label={t('deviceList.initMaintenanceDate')}
                      name="initMaintenanceDate"
                      placeholder={t('deviceList.initMaintenanceDate')}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      label={t('deviceList.initAccreditationDate')}
                      name="initAccreditationDate"
                      placeholder={t('deviceList.initAccreditationDate')}
                      disabled={
                        !values?.deviceGroup?.articleDeviceGroup?.id &&
                        !values?.deviceGroup?.accreditationTemplate?.id
                      }
                    />
                  </Grid>
                  {isUpdate && (
                    <Grid item lg={6} xs={12}>
                      <Field.DatePicker
                        label={t('deviceList.capitalizationDate')}
                        name="capitalizationDate"
                        placeholder={t('deviceList.capitalizationDate')}
                        disabled
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <FileUploadDropzone
                      name="file"
                      value={values?.file}
                      accept={IMG_FILE_TYPE}
                      onChange={(file) => setFieldValue('file', file)}
                      fileSizeLimit={FILE_SIZE._4MB}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Tabs
              list={[
                {
                  label: t('deviceList.tableInfo.title'),
                  error: !!errors.items && !!touched.items,
                },
                { label: t('deviceList.tableMaintenance.title') },
                { label: t('deviceList.tableMaintenance.repair') },
              ]}
              sx={{ mt: 3 }}
            >
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <TableInfo
                    items={values?.items}
                    arrayHelpers={arrayHelpers}
                    supplyList={supplyList}
                    mode={mode}
                  />
                )}
              />
              <MaintainTable
                values={
                  !isEmpty(deviceGroupDetails)
                    ? deviceGroupDetails
                    : deviceDetail?.deviceGroup
                }
                deviceId={deviceDetail?.id}
              />
              <ErrorInfo deviceId={deviceDetail?.id} mode={mode} />
            </Tabs>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default DefineDeviceForm
