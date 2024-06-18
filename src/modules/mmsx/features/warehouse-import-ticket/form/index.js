import React, { useEffect, useMemo, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import {
  WAREHOUSE_IMPORT_STATUS_OPTIONS,
  WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS,
  WAREHOUSE_IMPORT_STATUS,
  WAREHOUSE_IMPORT_REQUEST_TYPE,
  WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS_DEVICE,
  WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS_SUPPLY,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarehouseImportManagement from '~/modules/mmsx/redux/hooks/useWarehouseImportManagement'
import { getWarehouseImportRequestDetailsApi } from '~/modules/mmsx/redux/sagas/warehouse-import-request/get-detail'
import { searchWarehouseImportRequestApi } from '~/modules/mmsx/redux/sagas/warehouse-import-request/search'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import BuyInfoTable from './buy-info-table'
import ItemSettingTable from './item-setting-table'
import { validateSchema } from './schema'

const WarehouseImportManagementForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const [type, setType] = useState()
  const { canAccess } = useApp()
  const [listItem, setListItem] = useState([])
  const [deviceGroups, setDeviceGroups] = useState([])
  const {
    data: { userInfo },
  } = useUserInfo()

  const {
    data: { warehouseImportManagementDetail, isLoading },
    actions,
  } = useWarehouseImportManagement()

  const DEFAULT_ITEM = {
    deviceGroup: null,
    device: null,
    color: '',
    size: '',
    price: null,
    supplyGroup: null,
    supplyType: null,
    supply: null,
    quantity: null,
    intoMoney: null,
  }

  const MODE_MAP = {
    [ROUTE.WAREHOUSE_IMPORT_TICKET.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_IMPORT_TICKET.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.WAREHOUSE_IMPORT_TICKET.LIST.PATH))
  }

  const getOptionType = () => {
    if (
      canAccess(FUNCTION_CODE.DEVICE_WAREHOUSE_IMPORT_REQUEST) &&
      !canAccess(FUNCTION_CODE.SUPPLY_WAREHOUSE_IMPORT_REQUEST)
    ) {
      return WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS_DEVICE
    } else if (
      canAccess(FUNCTION_CODE.SUPPLY_WAREHOUSE_IMPORT_REQUEST) &&
      !canAccess(FUNCTION_CODE.DEVICE_WAREHOUSE_IMPORT_REQUEST)
    ) {
      return WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS_SUPPLY
    } else {
      return WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS
    }
  }

  const initialValues = useMemo(() => {
    let items = []
    switch (warehouseImportManagementDetail?.requestType) {
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST:
        items = warehouseImportManagementDetail?.devices?.map((item) => ({
          ...item,
          device: item,
        }))
        break
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST:
        items = warehouseImportManagementDetail?.supplies?.map((item) => ({
          ...item,
          quantity: item?.importQuantity,
          supply: {
            ...item,
            quantity: item?.importQuantity,
            remainQuantity: item?.requestQuantity - item?.importedQuantity || 0,
            importQuantity: item?.requestQuantity,
          },
        }))
        break
      default:
        break
    }
    return {
      name: warehouseImportManagementDetail?.name || '',
      requestType: isUpdate
        ? warehouseImportManagementDetail?.requestType
        : null,
      warehouseImportRequest: isUpdate
        ? {
            ...warehouseImportManagementDetail?.warehouseImportRequest,
            fromFactory: warehouseImportManagementDetail?.fromFactory,
            toFactory: warehouseImportManagementDetail?.toFactory,
            warehouse: warehouseImportManagementDetail?.warehouse,
            importDate:
              warehouseImportManagementDetail?.warehouseImportRequest
                ?.importDate,
            requestCode:
              warehouseImportManagementDetail?.warehouseImportRequest
                ?.requestCode,
          }
        : null,
      importDate: warehouseImportManagementDetail?.importDate || null,
      number: warehouseImportManagementDetail?.number || '',
      debit: warehouseImportManagementDetail?.debit || null,
      remain: warehouseImportManagementDetail?.remain || null,
      reason: warehouseImportManagementDetail?.reason || '',
      contractNum: warehouseImportManagementDetail?.contractNum || '',
      symbol: warehouseImportManagementDetail?.symbol || '',
      date: warehouseImportManagementDetail?.date || null,
      gdiNo: warehouseImportManagementDetail?.gdiNo || '',
      note: warehouseImportManagementDetail?.note || '',
      items: isUpdate ? items : [DEFAULT_ITEM],
    }
  }, [warehouseImportManagementDetail])

  useEffect(() => {
    if (isUpdate) {
      actions.getWarehouseImportManagementDetail(id)
    }
    return () => {
      actions.resetStateWarehouseImportManagement()
    }
  }, [mode])

  useEffect(() => {
    const fetchList = async () => {
      const res = await getWarehouseImportRequestDetailsApi(
        warehouseImportManagementDetail?.warehouseImportRequest?.id,
      )
      if (res?.statusCode === 200) {
        let list = []

        switch (warehouseImportManagementDetail?.requestType) {
          case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
          case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
            list =
              res?.data?.devices?.map((item) => ({
                ...item,
                device: item,
              })) || []
            break
          case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
          case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST:
            list =
              res?.data?.supplies?.map((item) => ({
                ...item,
                supply: {
                  ...item,
                  remainQuantity:
                    +item?.importQuantity - +item?.importPlannedQuantity,
                },
              })) || []
            break
          case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST:
            const deviceGroups =
              res?.data?.deviceGroups?.map((item) => ({
                ...item,
                remainQuantity:
                  +item?.quantity - (+item?.importedQuantity || 0),
              })) || []
            setDeviceGroups(deviceGroups)
            break
          default:
            break
        }
        setListItem(list)
      } else {
        setListItem([])
      }
    }
    if (
      isUpdate &&
      warehouseImportManagementDetail?.warehouseImportRequest?.id
    ) {
      fetchList()
    }
  }, [warehouseImportManagementDetail])

  const handleChangeRequest = async (val, setFieldValue) => {
    setFieldValue('items', [DEFAULT_ITEM])
    if (val?.id) {
      const res = await getWarehouseImportRequestDetailsApi(val?.id)
      if (res?.statusCode === 200) {
        let list = []

        switch (val?.requestType) {
          case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
          case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
            list =
              res?.data?.devices?.map((item) => ({
                ...item,
                device: item,
              })) || []
            break
          case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
          case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST:
            list =
              res?.data?.supplies?.map((item) => ({
                ...item,
                supply: {
                  ...item,
                  remainQuantity:
                    item?.importQuantity - (item?.importedQuantity || 0),
                  importQuantity: item?.importQuantity,
                },
              })) || []
            break
          case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST:
            const deviceGroups =
              res?.data?.deviceGroups.map((e) => ({
                ...e,
                remainQuantity:
                  (e.quantity || e.requestQuantity) - (e.importedQuantity || 0),
              })) || []
            setDeviceGroups(deviceGroups)
            break
          default:
            break
        }
        setListItem(list)
      }
    } else {
      setListItem([])
    }
  }

  const handleSubmit = (values) => {
    const params = {
      ...values,
      warehouseImportRequestId: values?.warehouseImportRequest?.id,
      requestCode: values?.voucher,
      devices: values?.items?.map((item) => ({
        deviceId: item?.device?.id,
        color: item?.color,
        size: item?.size,
        price: +item?.price || undefined,
      })),
      supplies: values?.items?.map((item) => ({
        supplyId: item?.supply?.id,
        quantity: item?.quantity,
        color: item?.color,
        size: item?.size,
        price: +item?.price || undefined,
        intoMoney: +item?.intoMoney || undefined,
      })),
    }
    if (
      [
        WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST,
        WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST,
        WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET,
      ].includes(values?.requestType)
    ) {
      delete params.supplies
    } else {
      delete params.devices
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createWarehouseImportManagement(params, (data) =>
        history.push(
          ROUTE.WAREHOUSE_IMPORT_TICKET.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    } else {
      actions.updateWarehouseImportManagement({ ...params, id }, () =>
        history.push(
          ROUTE.WAREHOUSE_IMPORT_TICKET.DETAIL.PATH.replace(':id', id),
        ),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.WAREHOUSE.TITLE,
      },
      {
        route: withSearch(ROUTE.WAREHOUSE_IMPORT_TICKET.LIST.PATH),
        title: ROUTE.WAREHOUSE_IMPORT_TICKET.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.WAREHOUSE_IMPORT_TICKET.CREATE.PATH,
          title: ROUTE.WAREHOUSE_IMPORT_TICKET.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.WAREHOUSE_IMPORT_TICKET.EDIT.PATH,
          title: ROUTE.WAREHOUSE_IMPORT_TICKET.EDIT.TITLE,
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
        return ROUTE.WAREHOUSE_IMPORT_TICKET.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_IMPORT_TICKET.EDIT.TITLE
      default:
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={() => {
              handleReset()
              setListItem([])
              setDeviceGroups([])
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
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema(t, type)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue, setFieldTouched }) => {
          setType(values?.requestType)
          return (
            <Form>
              <HotKeys
                handlers={{
                  onBack: backToList,
                  onReset: () => {
                    handleReset()
                    setListItem([])
                    setDeviceGroups([])
                  },
                }}
              />
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    columnSpacing={{ xl: 8, xs: 4 }}
                    rowSpacing={4 / 3}
                  >
                    {isUpdate && (
                      <>
                        <Grid item xs={12}>
                          <LabelValue
                            label={
                              <Typography>
                                {t('general:common.status')}
                              </Typography>
                            }
                            value={
                              <Status
                                options={WAREHOUSE_IMPORT_STATUS_OPTIONS}
                                value={warehouseImportManagementDetail?.status}
                              />
                            }
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <TextField
                            label={t('warehouseExportTicket.code')}
                            name="code"
                            placeholder={t('warehouseExportTicket.code')}
                            value={warehouseImportManagementDetail?.code}
                            disabled
                          />
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseExportTicket.name')}
                        name="name"
                        placeholder={t('warehouseExportTicket.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="requestType"
                        label={t(
                          'warehouseExportManagement.form.field.requestType',
                        )}
                        placeholder={t(
                          'warehouseExportManagement.form.field.requestType',
                        )}
                        options={getOptionType()}
                        getOptionLabel={(opt) => t(opt?.text)}
                        getOptionValue={(opt) => opt?.id}
                        onChange={() => {
                          setFieldValue('warehouseImportRequest', null)
                          setListItem([])
                          setFieldValue('items', [DEFAULT_ITEM])
                          setFieldTouched('items', false)
                        }}
                        required
                      />
                    </Grid>
                    {!values?.requestType && values?.requestType !== 0 && (
                      <>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            name="warehouseImportRequest.warehouse.name"
                            label={t(
                              'warehouseImportManagement.form.field.importWarehouse',
                            )}
                            placeholder={t(
                              'warehouseImportManagement.form.field.importWarehouse',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.DatePicker
                            name="warehouseImportRequest.importDate"
                            label={t('warehouseImportRequest.importDate')}
                            placeholder={t('warehouseImportRequest.importDate')}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                    {Boolean(
                      values?.requestType || values?.requestType === 0,
                    ) && (
                      <Grid item xs={12} lg={6}>
                        <Field.Autocomplete
                          name="warehouseImportRequest"
                          label={t('warehouseExportManagement.code')}
                          placeholder={t('warehouseExportManagement.code')}
                          asyncRequest={(s) =>
                            searchWarehouseImportRequestApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                              filter: convertFilterParams({
                                requestType: values?.requestType,
                                status: WAREHOUSE_IMPORT_STATUS.CONFIRMED,
                                toFactoryIds: userInfo?.factoryId,
                              }),
                            })
                          }
                          asyncRequestHelper={(res) => res?.data?.items}
                          getOptionLabel={(opt) => opt?.code}
                          getOptionSubLabel={(opt) => opt?.name}
                          asyncRequestDeps={values?.requestType}
                          isOptionEqualToValue={(opt, val) =>
                            opt?.id === val?.id
                          }
                          onChange={(val) =>
                            handleChangeRequest(val, setFieldValue)
                          }
                          required
                        />
                      </Grid>
                    )}
                    {values?.requestType ===
                      WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST && (
                      <>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('requestDevice.form.field.fromFactory')}
                            name="warehouseImportRequest.fromFactory.name"
                            placeholder={t(
                              'requestDevice.form.field.fromFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('requestDevice.form.field.toFactory')}
                            name="warehouseImportRequest.toFactory.name"
                            placeholder={t(
                              'requestDevice.form.field.toFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            name="warehouseImportRequest.warehouse.name"
                            label={t(
                              'warehouseImportManagement.form.field.importWarehouse',
                            )}
                            placeholder={t(
                              'warehouseImportManagement.form.field.importWarehouse',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.DatePicker
                            name="warehouseImportRequest.importDate"
                            label={t('warehouseImportRequest.importDate')}
                            placeholder={t('warehouseImportRequest.importDate')}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                    {[
                      WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST,
                      WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST,
                    ].includes(values?.requestType) && (
                      <>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('requestDevice.form.field.toFactory')}
                            name="warehouseImportRequest.toFactory.name"
                            placeholder={t(
                              'requestDevice.form.field.toFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('warehouseImportRequest.warehouse')}
                            name="warehouseImportRequest.warehouse.name"
                            placeholder={t('warehouseImportRequest.warehouse')}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.DatePicker
                            name="warehouseImportRequest.importDate"
                            label={t('warehouseImportRequest.importDate')}
                            placeholder={t('warehouseImportRequest.importDate')}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                    {values?.requestType ===
                      WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET && (
                      <>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('transferTicket.table.transferFactory')}
                            name="warehouseImportRequest.fromFactory.name"
                            placeholder={t(
                              'transferTicket.table.transferFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('requestDevice.form.field.toFactory')}
                            name="warehouseImportRequest.toFactory.name"
                            placeholder={t(
                              'requestDevice.form.field.toFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            name="warehouseImportRequest.warehouse.name"
                            label={t(
                              'warehouseImportManagement.form.field.importWarehouse',
                            )}
                            placeholder={t(
                              'warehouseImportManagement.form.field.importWarehouse',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.DatePicker
                            name="warehouseImportRequest.importDate"
                            label={t('warehouseImportRequest.importDate')}
                            placeholder={t('warehouseImportRequest.importDate')}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                    {values?.requestType ===
                      WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST && (
                      <>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('warehouseImportRequest.ticketName')}
                            name="warehouseImportRequest.requestCode"
                            placeholder={t('warehouseImportRequest.ticketName')}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('requestDevice.form.field.toFactory')}
                            name="warehouseImportRequest.toFactory.name"
                            placeholder={t(
                              'requestDevice.form.field.toFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('warehouseImportRequest.warehouse')}
                            name="warehouseImportRequest.warehouse.name"
                            placeholder={t('warehouseImportRequest.warehouse')}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.DatePicker
                            name="warehouseImportRequest.importDate"
                            label={t('warehouseImportRequest.importDate')}
                            placeholder={t('warehouseImportRequest.importDate')}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12} lg={6}>
                      <Field.DatePicker
                        name="importDate"
                        label={t('warehouseImportManagement.importDate')}
                        placeholder={t('warehouseImportManagement.importDate')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="number"
                        label={t('warehouseImportManagement.form.field.number')}
                        placeholder={t(
                          'warehouseImportManagement.form.placeholder.number',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="debit"
                        label={t('warehouseImportManagement.form.field.debit')}
                        placeholder={t(
                          'warehouseImportManagement.form.placeholder.debit',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="remain"
                        label={t('warehouseImportManagement.form.field.remain')}
                        placeholder={t(
                          'warehouseImportManagement.form.field.remain',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="reason"
                        label={t('warehouseImportManagement.form.field.reason')}
                        placeholder={t(
                          'warehouseImportManagement.form.field.reason',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="contractNum"
                        label={t(
                          'warehouseImportManagement.form.field.contractNum',
                        )}
                        placeholder={t(
                          'warehouseImportManagement.form.placeholder.contractNum',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="symbol"
                        label={t('warehouseImportManagement.form.field.symbol')}
                        placeholder={t(
                          'warehouseImportManagement.form.placeholder.symbol',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.DatePicker
                        name="date"
                        label={t('warehouseImportManagement.form.field.date')}
                        placeholder={t(
                          'warehouseImportManagement.form.placeholder.date',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="gdiNo"
                        label={t('warehouseImportManagement.form.field.gdiNo')}
                        placeholder={t(
                          'warehouseImportManagement.form.field.gdiNo',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="note"
                        label={t('warehouseImportManagement.form.field.note')}
                        placeholder={t(
                          'warehouseImportManagement.form.placeholder.note',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {values?.requestType ===
              WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST ? null : (
                <Box mt={3}>
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <ItemSettingTable
                        items={values?.items || []}
                        arrayHelpers={arrayHelpers}
                        setFieldValue={setFieldValue}
                        mode={mode}
                        values={values}
                        listItem={listItem}
                      />
                    )}
                  />
                </Box>
              )}
              {values?.requestType ===
                WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST && (
                <Tabs
                  list={[
                    t('warehouseImportManagement.deviceInfo'),
                    t('warehouseImportManagement.buyInfo'),
                  ]}
                  sx={{ mt: 3 }}
                >
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <ItemSettingTable
                        items={values?.items || []}
                        arrayHelpers={arrayHelpers}
                        setFieldValue={setFieldValue}
                        mode={mode}
                        values={values}
                        listItem={listItem}
                        deviceGroups={deviceGroups}
                      />
                    )}
                  />
                  <BuyInfoTable items={deviceGroups} />
                </Tabs>
              )}
              {renderActionBar(handleReset)}
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default WarehouseImportManagementForm
