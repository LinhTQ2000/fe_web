import React, { useEffect, useMemo, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
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
import {
  SUPPLY_REQUEST_TYPE_ENUM,
  TYPE_REQUEST,
  WAREHOUSE_EXPORT_STATUS_OPTIONS,
  DEVICE_REQUEST_STATUS,
  WAREHOUSE_EXPORT_REQUEST_TYPE_OPTIONS,
  WAREHOUSE_EXPORT_REQUEST_TYPE,
  SUPPLY_REQUEST_STATUS_ENUM,
  TRANSFER_TICKET_STATUS,
  WAREHOUSE_EXPORT_REQUEST_TYPE_OPTIONS_DEVICE,
  WAREHOUSE_EXPORT_REQUEST_TYPE_OPTIONS_SUPPLY,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarehouseExportManagement from '~/modules/mmsx/redux/hooks/useWarehouseExportManagement'
import { getRequestDeviceDetailApi } from '~/modules/mmsx/redux/sagas/request-device/get-request-device-detail'
import { searchRequestDeviceApi } from '~/modules/mmsx/redux/sagas/request-device/search-request-device'
import { getSuppliesRequestDetailApi } from '~/modules/mmsx/redux/sagas/supplies-request/get-supplies-request-detail'
import { getSuppliesRequestListApi } from '~/modules/mmsx/redux/sagas/supplies-request/get-supplies-request-list'
import { getTransferTicketDetailApi } from '~/modules/mmsx/redux/sagas/transfer-ticket/get-transfer-ticket-detail'
import { getTransferTicketListApi } from '~/modules/mmsx/redux/sagas/transfer-ticket/get-transfer-ticket-list'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from './itemSetting-table'
import { validateSchema } from './schema'

const WarehouseExportManagementForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const [defaultList, setDefaultList] = useState([])
  const [type, setType] = useState()
  const { id } = useParams()
  const { canAccess } = useApp()
  const { withSearch } = useQueryState()
  const {
    data: { warehouseExportManagementDetail, isLoading },
    actions,
  } = useWarehouseExportManagement()

  const DEFAULT_DEVICE = {
    deviceGroup: null,
    device: null,
  }

  const DEFAULT_SUPPLY = {
    supplyGroup: null,
    supplyType: null,
    supply: null,
    quantity: null,
    remainQuantity: null,
  }

  const MODE_MAP = {
    [ROUTE.WAREHOUSE_EXPORT_REQUEST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_EXPORT_REQUEST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.WAREHOUSE_EXPORT_REQUEST.LIST.PATH))
  }

  const initialValues = useMemo(() => {
    let items = null
    switch (warehouseExportManagementDetail?.requestType) {
      case WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
      case WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET:
        items = warehouseExportManagementDetail?.devices?.map((item) => ({
          ...item,
          device: item,
        }))
        break
      case WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST:
        items = warehouseExportManagementDetail?.supplies?.map((item) => ({
          ...item,
          quantity: item?.exportQuantity,
          remainQuantity:
            +item?.requestQuantity - +item?.exportPlannedQuantity ?? 0,
          supply: {
            ...item,
          },
        }))
        break
      default:
        break
    }
    return {
      code: warehouseExportManagementDetail?.code || '',
      name: warehouseExportManagementDetail?.name || '',
      warehouse: warehouseExportManagementDetail?.warehouse || null,
      requestType: isUpdate
        ? warehouseExportManagementDetail?.requestType
        : null,
      exportDate: warehouseExportManagementDetail?.exportDate || null,
      deviceRequest:
        warehouseExportManagementDetail?.requestType ===
        WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST
          ? warehouseExportManagementDetail?.request
          : null,
      fromFactory: warehouseExportManagementDetail?.fromFactory?.name || '',
      toFactory: warehouseExportManagementDetail?.toFactory?.name || '',
      description: warehouseExportManagementDetail?.description || '',
      supplyRequest:
        warehouseExportManagementDetail?.requestType ===
        WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST
          ? {
              ...warehouseExportManagementDetail?.request,
              factory: warehouseExportManagementDetail?.fromFactory,
              warehouse: warehouseExportManagementDetail?.warehouse,
            }
          : null,
      transferTicket:
        warehouseExportManagementDetail?.requestType ===
        WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET
          ? {
              ...warehouseExportManagementDetail?.request,
              fromFactory: warehouseExportManagementDetail?.fromFactory,
              toFactory: warehouseExportManagementDetail?.toFactory,
            }
          : null,
      items: items || [{ ...DEFAULT_DEVICE, ...DEFAULT_SUPPLY }],
    }
  }, [warehouseExportManagementDetail])

  useEffect(() => {
    const fecthDefaultList = async () => {
      let response = null
      switch (warehouseExportManagementDetail?.requestType) {
        case WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST:
          response = await getSuppliesRequestDetailApi(
            warehouseExportManagementDetail?.request?.id,
          )
          break
        case WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
          response = await getRequestDeviceDetailApi(
            warehouseExportManagementDetail?.request?.id,
          )
          break
        case WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET:
          response = await getTransferTicketDetailApi(
            warehouseExportManagementDetail?.request?.id,
          )
          break
        default:
          break
      }
      let defaultList = []

      switch (warehouseExportManagementDetail?.requestType) {
        case WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST:
          defaultList =
            response?.data?.supplies?.map((item) => ({
              ...item,
              supply: { ...item, requestQuantity: item?.quantity },
            })) || []
          break
        case WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
          defaultList =
            response?.data?.devices?.map((item) => ({
              ...item,
              device: item,
            })) || []
          break
        case WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET:
          defaultList =
            response?.data?.devices?.map((item) => ({
              ...item,
              device: { ...item?.device, ...item },
            })) || []
          break
        default:
          break
      }

      setDefaultList(defaultList)
    }

    if (isUpdate && warehouseExportManagementDetail?.request?.id) {
      fecthDefaultList()
    }
  }, [warehouseExportManagementDetail])

  useEffect(() => {
    if (isUpdate) {
      actions.getWarehouseExportManagementDetail(id)
    }
    return () => {
      if (isUpdate) {
        actions.resetStateWarehouseExportManagement()
      }
    }
  }, [mode])

  const handleSubmit = (val) => {
    let requestId = null
    switch (val?.requestType) {
      case WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
        requestId = val?.deviceRequest?.id
        break
      case WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST:
        requestId = val?.supplyRequest?.id
        break
      case WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET:
        requestId = val?.transferTicket?.id
        break
      default:
        break
    }
    const params = {
      name: val?.name,
      description: val?.description,
      requestId: requestId,
      requestType: val?.requestType,
      exportDate: val?.exportDate,
      supplies: val?.items?.map((item) => ({
        supplyId: item?.supply?.id,
        quantity: item?.quantity,
      })),
      deviceIds: val?.items?.map((item) => item?.device?.id),
    }

    if (
      +val?.requestType === WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST
    ) {
      delete params.deviceIds
    } else {
      delete params.supplies
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createWarehouseExportManagement(params, (data) =>
        history.push(
          ROUTE.WAREHOUSE_EXPORT_REQUEST.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    } else {
      actions.updateWarehouseExportManagement({ ...params, id }, () =>
        history.push(
          ROUTE.WAREHOUSE_EXPORT_REQUEST.DETAIL.PATH.replace(':id', id),
        ),
      )
    }
  }

  const handleChangeRequestDevice = async (val, setFieldValue) => {
    if (val?.id) {
      const res = await getRequestDeviceDetailApi(val?.id)
      if (res?.statusCode === 200) {
        const defaultList = res?.data?.devices?.map((item) => ({
          ...item,
          device: {
            id: item?.id,
            code: item?.code,
            name: item?.name,
            serial: item?.serial,
            area: item?.area,
            unit: item?.unit,
            warehouse: item?.warehouse,
            identificationNo: item?.identificationNo,
          },
        }))
        setFieldValue('fromFactory', res?.data?.fromFactory?.name)
        setFieldValue('toFactory', res?.data?.toFactory?.name)
        setDefaultList(defaultList)
      }
    } else {
      setFieldValue('fromFactory', '')
      setFieldValue('toFactory', '')
      setFieldValue('items', [{ ...DEFAULT_DEVICE, ...DEFAULT_SUPPLY }])
      setDefaultList([])
    }
  }

  const handleChangeSupplyRequest = async (val, setFieldValue) => {
    if (val?.id) {
      const res = await getSuppliesRequestDetailApi(val?.id)
      if (res?.statusCode === 200) {
        const defaultList = res?.data?.supplies?.map((item) => ({
          ...item,
          quantity: null,
          supply: {
            ...item,
            remainQuantity:
              item?.requestQuantity - item?.exportPlannedQuantity ?? 0,
          },
        }))
        setDefaultList(defaultList)
      }
    } else {
      setDefaultList([])
      setFieldValue('items', [{ ...DEFAULT_DEVICE, ...DEFAULT_SUPPLY }])
    }
  }

  const handleChangeTransferTicket = async (val, setFieldValue) => {
    if (val?.id) {
      const res = await getTransferTicketDetailApi(val?.id)
      if (res?.statusCode === 200) {
        const defaultList = res?.data?.devices?.map((item) => ({
          ...item,
          device: {
            ...item?.device,
            area: item?.area,
            unit: item?.unit,
            warehouse: item?.warehouse,
          },
        }))
        setDefaultList(defaultList)
      }
    } else {
      setFieldValue('items', [{ ...DEFAULT_DEVICE, ...DEFAULT_SUPPLY }])
      setDefaultList([])
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.WAREHOUSE.TITLE,
      },
      {
        route: withSearch(ROUTE.WAREHOUSE_EXPORT_REQUEST.LIST.PATH),
        title: ROUTE.WAREHOUSE_EXPORT_REQUEST.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.WAREHOUSE_EXPORT_REQUEST.CREATE.PATH,
          title: ROUTE.WAREHOUSE_EXPORT_REQUEST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.WAREHOUSE_EXPORT_REQUEST.EDIT.PATH,
          title: ROUTE.WAREHOUSE_EXPORT_REQUEST.EDIT.TITLE,
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
        return ROUTE.WAREHOUSE_EXPORT_REQUEST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_EXPORT_REQUEST.EDIT.TITLE
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
              setDefaultList([])
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

  const getOptionType = () => {
    if (
      canAccess(FUNCTION_CODE.DEVICE_WAREHOUSE_EXPORT_REQUEST) &&
      !canAccess(FUNCTION_CODE.SUPPLY_WAREHOUSE_EXPORT_REQUEST)
    ) {
      return WAREHOUSE_EXPORT_REQUEST_TYPE_OPTIONS_DEVICE
    } else if (
      canAccess(FUNCTION_CODE.SUPPLY_WAREHOUSE_EXPORT_REQUEST) &&
      !canAccess(FUNCTION_CODE.DEVICE_WAREHOUSE_EXPORT_REQUEST)
    ) {
      return WAREHOUSE_EXPORT_REQUEST_TYPE_OPTIONS_SUPPLY
    } else {
      return WAREHOUSE_EXPORT_REQUEST_TYPE_OPTIONS
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
                    setDefaultList([])
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
                                {t('warehouseExportManagement.table.status')}
                              </Typography>
                            }
                            value={
                              <Status
                                options={WAREHOUSE_EXPORT_STATUS_OPTIONS}
                                value={warehouseExportManagementDetail?.status}
                              />
                            }
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t(
                              'warehouseExportManagement.form.field.code',
                            )}
                            name="code"
                            placeholder={t(
                              'warehouseExportManagement.form.placeholder.code',
                            )}
                            inputProps={{
                              maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                            }}
                            allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                            disabled
                          />
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseExportManagement.name')}
                        name="name"
                        placeholder={t(
                          'warehouseExportManagement.form.placeholder.name',
                        )}
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
                          'warehouseExportManagement.form.placeholder.requestType',
                        )}
                        options={getOptionType()}
                        getOptionLabel={(opt) => t(opt?.text)}
                        getOptionValue={(opt) => opt?.id}
                        onChange={() => {
                          setFieldValue('deviceRequest', null)
                          setFieldValue('supplyRequest', null)
                          setFieldValue('transferTicket', null)
                          setFieldValue('fromFactory', '')
                          setFieldValue('toFactory', '')
                          setDefaultList([])
                          setFieldValue('items', [
                            { ...DEFAULT_DEVICE, ...DEFAULT_SUPPLY },
                          ])
                          setFieldTouched(`items`, false)
                        }}
                        required
                      />
                    </Grid>
                    {!Boolean(
                      values?.requestType || values?.requestType === 0,
                    ) && (
                      <Grid item xs={12} lg={6}>
                        <Field.DatePicker
                          name="exportDate"
                          label={t(
                            'warehouseExportManagement.form.field.exportDate',
                          )}
                          placeholder={t(
                            'warehouseExportManagement.form.placeholder.exportDate',
                          )}
                          required
                        />
                      </Grid>
                    )}
                    {values?.requestType ===
                      WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST && (
                      <>
                        <Grid item xs={12} lg={6}>
                          <Field.Autocomplete
                            name="deviceRequest"
                            label={t(
                              'warehouseExportManagement.form.field.requestCode',
                            )}
                            placeholder={t(
                              'warehouseExportManagement.form.field.requestCode',
                            )}
                            asyncRequest={(s) =>
                              searchRequestDeviceApi({
                                keyword: s,
                                limit: ASYNC_SEARCH_LIMIT,
                                filter: convertFilterParams({
                                  type: TYPE_REQUEST.RETURN,
                                  status: DEVICE_REQUEST_STATUS.CONFIRMED,
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
                              handleChangeRequestDevice(val, setFieldValue)
                            }
                            required
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.DatePicker
                            name="exportDate"
                            label={t(
                              'warehouseExportManagement.form.field.exportDate',
                            )}
                            placeholder={t(
                              'warehouseExportManagement.form.placeholder.exportDate',
                            )}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('requestDevice.form.field.fromFactory')}
                            name="fromFactory"
                            placeholder={t(
                              'requestDevice.form.field.fromFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('requestDevice.form.field.toFactory')}
                            name="toFactory"
                            placeholder={t(
                              'requestDevice.form.field.toFactory',
                            )}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                    {values?.requestType ===
                      WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST && (
                      <>
                        <Grid item xs={12} lg={6}>
                          <Field.Autocomplete
                            name="supplyRequest"
                            label={t(
                              'warehouseExportManagement.form.field.requestCode',
                            )}
                            placeholder={t(
                              'warehouseExportManagement.form.field.requestCode',
                            )}
                            asyncRequest={(s) =>
                              getSuppliesRequestListApi({
                                keyword: s,
                                limit: ASYNC_SEARCH_LIMIT,
                                filter: convertFilterParams({
                                  type: SUPPLY_REQUEST_TYPE_ENUM.PROVIDE,
                                  status: SUPPLY_REQUEST_STATUS_ENUM.CONFIRM,
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
                              handleChangeSupplyRequest(val, setFieldValue)
                            }
                            required
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.DatePicker
                            name="exportDate"
                            label={t(
                              'warehouseExportManagement.form.field.exportDate',
                            )}
                            placeholder={t(
                              'warehouseExportManagement.form.placeholder.exportDate',
                            )}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('warehouseExportManagement.fromFactory')}
                            name="supplyRequest.factory.name"
                            placeholder={t(
                              'warehouseExportManagement.fromFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t(
                              'warehouseExportManagement.table.exportWarehouse',
                            )}
                            name="supplyRequest.warehouse.name"
                            placeholder={t(
                              'warehouseExportManagement.table.exportWarehouse',
                            )}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                    {values?.requestType ===
                      WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET && (
                      <>
                        <Grid item xs={12} lg={6}>
                          <Field.Autocomplete
                            name="transferTicket"
                            label={t('transferTicket.form.field.code')}
                            placeholder={t('transferTicket.form.field.code')}
                            asyncRequest={(s) =>
                              getTransferTicketListApi({
                                keyword: s,
                                limit: ASYNC_SEARCH_LIMIT,
                                filter: convertFilterParams({
                                  status: [
                                    TRANSFER_TICKET_STATUS.CONFIRMED,
                                    TRANSFER_TICKET_STATUS.EXPORTING,
                                    TRANSFER_TICKET_STATUS.IMPORTING,
                                    TRANSFER_TICKET_STATUS.RETURNING,
                                  ],
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
                              handleChangeTransferTicket(val, setFieldValue)
                            }
                            required
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.DatePicker
                            name="exportDate"
                            label={t(
                              'warehouseExportManagement.form.field.exportDate',
                            )}
                            placeholder={t(
                              'warehouseExportManagement.form.placeholder.exportDate',
                            )}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('transferTicket.table.transferFactory')}
                            name="transferTicket.fromFactory.name"
                            placeholder={t(
                              'transferTicket.table.transferFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('transferTicket.table.receivedFactory')}
                            name="transferTicket.toFactory.name"
                            placeholder={t(
                              'transferTicket.table.receivedFactory',
                            )}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('warehouseExportManagement.table.description')}
                        placeholder={t(
                          'warehouseExportManagement.table.description',
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
              <Box mt={2}>
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => (
                    <ItemSettingTable
                      items={values?.items || []}
                      arrayHelpers={arrayHelpers}
                      setFieldValue={setFieldValue}
                      mode={mode}
                      values={values}
                      defaultList={defaultList}
                    />
                  )}
                />
              </Box>

              {renderActionBar(handleReset)}
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default WarehouseExportManagementForm
