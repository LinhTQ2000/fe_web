import { useEffect, useMemo } from 'react'

import {
  Box,
  FormControlLabel,
  Grid,
  Hidden,
  InputAdornment,
  Typography,
} from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import {
  OBLIGATORY_ENUM,
  ACTIVE_STATUS,
  ACTIVE_STATUS_OPTIONS,
  SUPPLY_TYPE,
  SUPPLY_TYPE_MAP,
} from '~/modules/mmsx/constants'
import useDeviceGroup from '~/modules/mmsx/redux/hooks/useDeviceGroup'
import { searchAccreditationTemplateApi } from '~/modules/mmsx/redux/sagas/accreditation-template/search'
import { searchArticleDeviceApi } from '~/modules/mmsx/redux/sagas/article-device/search'
import { getAttributeTypeListApi } from '~/modules/mmsx/redux/sagas/attribute-type/search-attribute-type-list'
import { searchInstallationTemplateApi } from '~/modules/mmsx/redux/sagas/define-installation-template/get-list'
import { searchDeviceTypeApi } from '~/modules/mmsx/redux/sagas/device-type/search'
import { searchErrorTypeApi } from '~/modules/mmsx/redux/sagas/error-type/search'
import { searchMaintenanceAttributeApi } from '~/modules/mmsx/redux/sagas/maintenance-attribute/search'
import { searchMaintenanceTemplateApi } from '~/modules/mmsx/redux/sagas/maintenance-template/search'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import { validateSchema } from './schema'
import TableInfo from './table-info'
import TableMaintenance from './table-maintane'

function DeviceGroupForm() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const { withSearch } = useQueryState()

  const ITEM_INFO_DEFAULT = {
    id: new Date().getTime(),
    supply: null,
    quantity: '',
    usageTime: null,
    isFix: false,
  }

  const ITEM_MAINTANE_DEFAULT = {
    supplyId: null,
    name: '',
    type: t('deviceGroup.device'),
    frequency: null,
    mtbf: null,
    mttr: null,
    mtta: null,
    mttf: null,
  }

  const MODE_MAP = {
    [ROUTE.DEVICE_GROUP.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEVICE_GROUP.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const {
    data: { deviceGroupDetails, isLoading },
    actions,
  } = useDeviceGroup()

  useEffect(() => {
    if (isUpdate) {
      actions.getDetailDeviceGroup(id)
    }
    return () => actions.resetDeviceGroupState()
  }, [id])

  const initialValues = useMemo(
    () => ({
      code: deviceGroupDetails?.code || '',
      name: deviceGroupDetails?.name || '',
      codeOnWfx: deviceGroupDetails?.codeOnWfx || '',
      symbol: deviceGroupDetails?.symbol || '',
      deviceType: deviceGroupDetails?.deviceType || null,
      deviceCategory: deviceGroupDetails?.articleDeviceGroup || null,
      maintenanceProperty: deviceGroupDetails?.maintenanceAttribute || null,
      frequency: isUpdate ? +deviceGroupDetails?.frequency : null,
      maintenanceTemplate: deviceGroupDetails?.maintenanceTemplate || null,
      isAccreditation: !isEmpty(deviceGroupDetails?.accreditationTemplate),
      accreditationTemplate: deviceGroupDetails?.accreditationTemplate || null,
      isSetup: !isEmpty(deviceGroupDetails?.installationTemplate),
      installationTemplate: deviceGroupDetails?.installationTemplate || null,
      errorType: deviceGroupDetails?.errorTypes || [],
      attributeType: deviceGroupDetails?.attributeTypes || [],
      isUpdateStatus:
        deviceGroupDetails?.canUpdateStatus === OBLIGATORY_ENUM.YES,
      itemInfo: deviceGroupDetails?.supplies?.map((item) => ({
        id: item?.id,
        supply: item,
        quantity: +item?.quantity,
        type: item?.supplyType?.name,
        usageTime: item?.estimateUsedTime,
        isFix: item?.canFixable === OBLIGATORY_ENUM.YES,
      })) || [ITEM_INFO_DEFAULT],
      itemMaintane: isUpdate
        ? !isEmpty(deviceGroupDetails?.maintenanceIndex)
          ? deviceGroupDetails?.maintenanceIndex?.map((item) => ({
              name: item?.name || deviceGroupDetails?.name,
              type: t(SUPPLY_TYPE_MAP[item?.type]) || t('deviceGroup.device'),
              supplyId: item?.id || null,
              frequency: item?.maintenanceFrequency,
              mtbf: +item?.mtbf,
              mttr: +item?.mttr,
              mtta: +item?.mtta,
              mttf: +item?.mttf,
            }))
          : [{ ...ITEM_MAINTANE_DEFAULT, name: deviceGroupDetails?.name }]
        : [ITEM_MAINTANE_DEFAULT],
    }),
    [deviceGroupDetails],
  )

  const onSubmit = (val) => {
    const params = {
      name: val?.name,
      codeOnWfx: val?.codeOnWfx,
      symbol: val?.symbol,
      deviceTypeId: val?.deviceType?.id || null,
      articleDeviceGroupId: val?.deviceCategory?.id || null,
      maintenanceAttributeId: val?.maintenanceProperty?.id || null,
      frequency: +val?.frequency,
      maintenanceTemplateId: val?.maintenanceTemplate?.id || null,
      accreditationTemplateId: val?.accreditationTemplate?.id || null,
      installationTemplateId: val?.installationTemplate?.id || null,
      errorTypeIds: val?.errorType?.map((i) => i.id),
      attributeTypeIds: val?.attributeType?.map((i) => i?.id),
      canUpdateStatus: val?.isUpdateStatus
        ? OBLIGATORY_ENUM.YES
        : OBLIGATORY_ENUM.NO,
      supplies: val?.itemInfo?.map((item) => ({
        supplyId: item?.supply?.id || null,
        quantity: +item?.quantity,
        estimateUsedTime: item?.usageTime ? +item?.usageTime : null,
        canFixable: item?.isFix ? OBLIGATORY_ENUM.YES : OBLIGATORY_ENUM.NO,
      })),
      maintenanceIndex: val?.itemMaintane?.map((item) => ({
        supplyId: item?.supplyId,
        maintenanceFrequency: +item?.frequency,
        mtbf: +item?.mtbf,
        mttr: +item?.mttr,
        mtta: +item?.mtta,
        mttf: +item?.mttf,
      })),
    }
    if (isUpdate) {
      actions.updateDeviceGroup({ ...params, id }, () =>
        history.push(ROUTE.DEVICE_GROUP.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createDeviceGroup(params, (data) =>
        history.push(ROUTE.DEVICE_GROUP.DETAIL.PATH.replace(':id', data?.id)),
      )
    }
  }

  const settableMaintenance = (setFieldValue, supply, values) => {
    if (supply?.type === SUPPLY_TYPE.ACCESSORY) {
      setFieldValue('itemMaintane', [
        ...values.itemMaintane,
        {
          frequency: null,
          mtbf: null,
          mttr: null,
          mtta: null,
          mttf: null,
          supplyId: supply?.id,
          name: supply?.name,
          type: t(SUPPLY_TYPE_MAP[supply?.type]),
        },
      ])
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.DEVICE_GROUP.LIST.PATH),
        title: ROUTE.DEVICE_GROUP.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEVICE_GROUP.CREATE.PATH,
          title: ROUTE.DEVICE_GROUP.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEVICE_GROUP.EDIT.PATH,
          title: ROUTE.DEVICE_GROUP.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEVICE_GROUP.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEVICE_GROUP.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.DEVICE_GROUP.LIST.PATH))
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
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
        validationSchema={validateSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue, errors, touched }) => (
          <Form>
            <HotKeys
              handlers={{
                onBack: backToList,
                onReset: handleReset,
              }}
            />
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LabelValue
                        label={
                          <Typography>{t('general:common.status')}</Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={deviceGroupDetails?.active}
                          />
                        }
                      />
                    </Grid>
                  )}
                  {isUpdate && (
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('deviceGroup.code')}
                        name="code"
                        placeholder={t('deviceGroup.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        disabled={isUpdate}
                        required
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('deviceGroup.name')}
                      name="name"
                      placeholder={t('deviceGroup.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      onChange={(val) => {
                        setFieldValue('itemMaintane[0].name', val)
                      }}
                      {...(isUpdate
                        ? {
                            disabled: deviceGroupDetails?.manageBy,
                          }
                        : {})}
                      required
                    />
                  </Grid>
                  {isUpdate && (
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('deviceName.codeOnWfx')}
                        name="codeOnWfx"
                        placeholder={t('deviceName.codeOnWfx')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                        }}
                        disabled
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="symbol"
                      label={t('deviceGroup.symbol')}
                      placeholder={t('deviceGroup.symbol')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.SYMBOL.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="deviceType"
                      label={t('deviceGroup.deviceType')}
                      placeholder={t('deviceGroup.deviceType')}
                      asyncRequest={(s) =>
                        searchDeviceTypeApi({
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
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="deviceCategory"
                      label={t('deviceGroup.deviceCategory')}
                      placeholder={t('deviceGroup.deviceCategory')}
                      asyncRequest={(s) =>
                        searchArticleDeviceApi({
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
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="maintenanceProperty"
                      label={t('deviceGroup.maintenanceProperty')}
                      placeholder={t('deviceGroup.maintenanceProperty')}
                      asyncRequest={(s) =>
                        searchMaintenanceAttributeApi({
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
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('deviceGroup.frequency')}
                      name="frequency"
                      placeholder={t('deviceGroup.frequency')}
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {values?.maintenanceProperty?.name
                              ? `${values?.maintenanceProperty?.name}/${t(
                                  'general:minutes',
                                )}`
                              : ''}
                          </InputAdornment>
                        ),
                      }}
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="maintenanceTemplate"
                      label={t('deviceGroup.guideTemplate')}
                      placeholder={t('deviceGroup.guideTemplate')}
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
                  <Hidden lgDown>
                    <Grid item xs={12} lg={6}></Grid>
                  </Hidden>
                  <Grid item xs={12} lg={6}>
                    <FormControlLabel
                      label={t('deviceGroup.isSetup')}
                      control={
                        <Field.Checkbox
                          name="isSetup"
                          onChange={(checked) => {
                            if (!checked) {
                              setFieldValue('installationTemplate', null)
                            }
                          }}
                        />
                      }
                    />
                    <Field.Autocomplete
                      name="installationTemplate"
                      label={t('deviceGroup.installationTemplate')}
                      placeholder={t('deviceGroup.installationTemplate')}
                      asyncRequest={(s) =>
                        searchInstallationTemplateApi({
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
                      required={values?.isSetup}
                      disabled={!values?.isSetup}
                      mt={4 / 3}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <FormControlLabel
                      label={t('deviceGroup.isAccreditation')}
                      control={
                        <Field.Checkbox
                          name="isAccreditation"
                          onChange={(checked) => {
                            if (!checked) {
                              setFieldValue('accreditationTemplate', null)
                            }
                          }}
                        />
                      }
                    />
                    <Field.Autocomplete
                      name="accreditationTemplate"
                      label={t('deviceGroup.accreditationTemplate')}
                      placeholder={t('deviceGroup.accreditationTemplate')}
                      asyncRequest={(s) =>
                        searchAccreditationTemplateApi({
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
                      required={values?.isAccreditation}
                      disabled={!values?.isAccreditation}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="errorType"
                      label={t('deviceGroup.errorType')}
                      placeholder={t('deviceGroup.errorType')}
                      asyncRequest={(s) =>
                        searchErrorTypeApi({
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
                      multiple
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="attributeType"
                      label={t('deviceGroup.attributeType')}
                      placeholder={t('deviceGroup.attributeType')}
                      asyncRequest={(s) =>
                        getAttributeTypeListApi({
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
                      multiple
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <FormControlLabel
                      label={t('deviceGroup.updateStatus')}
                      control={<Field.Checkbox name="isUpdateStatus" />}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Tabs
                list={[
                  {
                    label: t('deviceGroup.tableInfo.title'),
                    required: true,
                    error: !!errors.itemInfo && !!touched.itemInfo,
                  },
                  {
                    label: t('deviceGroup.tableMaintenance.title'),
                    required: true,
                    error: !!errors.itemMaintane && !!touched.itemMaintane,
                  },
                ]}
                sx={{ mt: 3 }}
              >
                {/* Tab 1 */}
                <Box sx={{ mt: 3 }}>
                  <FieldArray
                    name="itemInfo"
                    render={(arrayHelpers) => (
                      <TableInfo
                        items={values?.itemInfo || []}
                        arrayHelpers={arrayHelpers}
                        setFieldValue={setFieldValue}
                        settableMaintenance={settableMaintenance}
                        values={values}
                      />
                    )}
                  />
                </Box>
                {/* tab 2 */}
                <Box sx={{ mt: 3 }}>
                  <FieldArray
                    name="itemMaintane"
                    render={() => (
                      <TableMaintenance
                        items={values?.itemMaintane || []}
                        name={values?.name}
                        frequency={values?.frequency}
                        setFieldValue={setFieldValue}
                        values={values}
                      />
                    )}
                  />
                </Box>
              </Tabs>
            </Grid>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default DeviceGroupForm
