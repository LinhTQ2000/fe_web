import { useEffect, useMemo, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom/cjs/react-router-dom.min'

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
import TextField from '~/components/TextField'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import {
  ACTIVE_STATUS,
  DEVICE_REQUEST_STATUS,
  SUPPLY_REQUEST_STATUS_ENUM,
  SUPPLY_REQUEST_TYPE_ENUM,
  TRANSFER_TICKET_STATUS,
  TYPE_REQUEST,
  WAREHOUSE_EXPORT_STATUS_OPTIONS,
  WAREHOUSE_IMPORT_REQUEST_TYPE,
  WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS,
  WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS_DEVICE,
  WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS_SUPPLY,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarehouseImportRequest from '~/modules/mmsx/redux/hooks/useWarehouseImportRequest'
import { getRequestDeviceDetailApi } from '~/modules/mmsx/redux/sagas/request-device/get-request-device-detail'
import { searchRequestDeviceApi } from '~/modules/mmsx/redux/sagas/request-device/search-request-device'
import { getSuppliesRequestDetailApi } from '~/modules/mmsx/redux/sagas/supplies-request/get-supplies-request-detail'
import { getSuppliesRequestListApi } from '~/modules/mmsx/redux/sagas/supplies-request/get-supplies-request-list'
import { getTransferTicketDetailApi } from '~/modules/mmsx/redux/sagas/transfer-ticket/get-transfer-ticket-detail'
import { getTransferTicketListApi } from '~/modules/mmsx/redux/sagas/transfer-ticket/get-transfer-ticket-list'
import { searchWarehouseDefineApi } from '~/modules/mmsx/redux/sagas/warehouse-define/search'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from './item-setting-table'
import { validateSchema } from './schema'

export default function WarehouseImportRequestForm() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [type, setType] = useState()
  const [defaultList, setDefaultList] = useState([])

  const {
    data: { isLoading, detail },
    actions,
  } = useWarehouseImportRequest()

  const DEFAULT_ITEM = {
    deviceGroup: null,
    device: null,
    quantity: null,
    supplyGroup: null,
    supplyType: null,
    supply: null,
    remainQuantity: null,
  }

  const MODE_MAP = {
    [ROUTE.WAREHOUSE_IMPORT_REQUEST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_IMPORT_REQUEST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.WAREHOUSE_IMPORT_REQUEST.LIST.PATH))
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getDetailWarehouseImportRequest(id)
    }
    return () => actions.resetState()
  }, [id])

  useEffect(() => {
    const fecthDefaultList = async () => {
      let res = null
      switch (detail?.requestType) {
        case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
          res = await getRequestDeviceDetailApi(detail?.request?.id)
          break
        case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
          res = await getTransferTicketDetailApi(detail?.request?.id)
          break
        case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
          res = await getSuppliesRequestDetailApi(detail?.request?.id)
          break
        default:
          break
      }

      let list = []
      switch (detail?.requestType) {
        case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
          list = res?.data?.devices?.map((item) => ({
            ...item,
            device: item,
          }))
          break
        case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
          list = res?.data?.devices?.map((item) => ({
            ...item,
            device: { ...item?.device, ...item },
          }))
          break
        case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
          list = res?.data?.supplies?.map((item) => ({
            ...item,
            supply: item,
          }))
          break

        default:
          break
      }

      setDefaultList(list)
    }

    if (isUpdate && detail?.request?.id) {
      fecthDefaultList()
    }
  }, [detail])

  const initialValues = useMemo(() => {
    let items = null
    switch (detail?.requestType) {
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
        items = detail?.devices?.map((item) => ({
          ...item,
          device: item,
        }))
        break
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST:
        items = detail?.supplies?.map((item) => ({
          ...item,
          quantity: item?.importQuantity,
          remainQuantity: item?.requestQuantity - item?.importPlannedQuantity,
          supply: { ...item, quantity: item?.requestQuantity },
        }))
        break
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST:
        items = detail?.deviceGroups?.map((item) => ({
          ...item,
          deviceGroup: item,
        }))
        break
      default:
        break
    }
    return {
      name: detail?.name || '',
      requestType: isUpdate ? detail?.requestType : null,
      deviceRequest: isUpdate
        ? {
            ...detail?.request,
            fromFactory: detail?.fromFactory,
            toFactory: detail?.toFactory,
          }
        : null,
      supplyRequest: isUpdate
        ? {
            ...detail?.request,
            factory: detail?.toFactory,
          }
        : null,
      ticketName: detail?.requestCode || '',
      toFactory: detail?.toFactory || null,
      transferTicket: isUpdate
        ? {
            ...detail?.request,
            fromFactory: detail?.fromFactory,
            toFactory: detail?.toFactory,
          }
        : null,
      warehouse: detail?.warehouse || null,
      importDate: detail?.importDate || null,
      description: detail?.description || '',
      items: items || [DEFAULT_ITEM],
    }
  }, [detail])

  const handleSubmit = (val) => {
    let requestId = null
    switch (val?.requestType) {
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
        requestId = val?.deviceRequest?.id
        break
      case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
        requestId = val?.transferTicket?.id
        break
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
        requestId = val?.supplyRequest?.id
        break
      default:
        break
    }
    const params = {
      name: val?.name,
      requestType: val?.requestType,
      requestId,
      requestCode: val?.ticketName,
      toFactoryId: val?.toFactory?.id,
      warehouseId: val?.warehouse?.id,
      importDate: val?.importDate,
      description: val?.description,
      supplies: val?.items?.map((item) => ({
        supplyId: item?.supply?.id,
        quantity: item?.quantity,
      })),
      deviceIds: val?.items?.map((item) => item?.device?.id),
      deviceGroups: val?.items?.map((item) => ({
        deviceGroupId: item?.deviceGroup?.id,
        quantity: item?.quantity,
      })),
    }
    if (
      val?.requestType === WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST
    ) {
      delete params.supplies
      delete params.deviceGroups
    } else if (
      [
        WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST,
        WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST,
      ].includes(val?.requestType)
    ) {
      delete params.deviceIds
      delete params.deviceGroups
    } else if (
      val?.requestType === WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET
    ) {
      delete params.deviceGroups
      delete params.supplies
    } else if (
      val?.requestType === WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST
    ) {
      delete params.supplies
      delete params.deviceIds
    }
    if (isUpdate) {
      actions.updateWarehouseImportRequest({ ...params, id }, () =>
        history.push(
          ROUTE.WAREHOUSE_IMPORT_REQUEST.DETAIL.PATH.replace(':id', id),
        ),
      )
    } else {
      actions.createWarehouseImportRequest(params, (data) =>
        history.push(
          ROUTE.WAREHOUSE_IMPORT_REQUEST.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    }
  }

  const handleChangeRequestDevice = async (val, setFieldValue) => {
    setFieldValue('items', [DEFAULT_ITEM])
    setFieldValue('warehouse', null)
    if (val?.id) {
      const res = await getRequestDeviceDetailApi(val?.id)
      if (res?.statusCode === 200) {
        const list = res?.data?.devices?.map((item) => ({
          ...item,
          device: item,
        }))
        setDefaultList(list)
      }
    } else {
      setDefaultList([])
    }
  }

  const handleChangeSupplyRequest = async (val, setFieldValue) => {
    setFieldValue('items', [DEFAULT_ITEM])
    setFieldValue('warehouse', null)
    if (val?.id) {
      const res = await getSuppliesRequestDetailApi(val?.id)
      if (res?.statusCode === 200) {
        const list = res?.data?.supplies?.map((item) => ({
          ...item,
          supply: item,
        }))
        setDefaultList(list)
      }
    } else {
      setDefaultList([])
    }
  }

  const handleChangeTransferTicket = async (val, setFieldValue) => {
    setFieldValue('items', [DEFAULT_ITEM])
    setFieldValue('warehouse', null)
    if (val?.id) {
      const res = await getTransferTicketDetailApi(val?.id)
      if (res?.statusCode === 200) {
        const list = res?.data?.devices?.map((item) => ({
          ...item,
          device: { ...item?.device, ...item },
        }))
        setDefaultList(list)
      }
    } else {
      setDefaultList([])
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.WAREHOUSE.TITLE,
      },
      {
        route: withSearch(ROUTE.WAREHOUSE_IMPORT_REQUEST.LIST.PATH),
        title: ROUTE.WAREHOUSE_IMPORT_REQUEST.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.WAREHOUSE_IMPORT_REQUEST.CREATE.PATH,
          title: ROUTE.WAREHOUSE_IMPORT_REQUEST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.WAREHOUSE_IMPORT_REQUEST.EDIT.PATH,
          title: ROUTE.WAREHOUSE_IMPORT_REQUEST.EDIT.TITLE,
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
        return ROUTE.WAREHOUSE_IMPORT_REQUEST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_IMPORT_REQUEST.EDIT.TITLE
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
                  onReset: handleReset,
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
                                options={WAREHOUSE_EXPORT_STATUS_OPTIONS}
                                value={detail?.status}
                              />
                            }
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <TextField
                            label={t('warehouseExportManagement.code')}
                            placeholder={t('warehouseExportManagement.code')}
                            value={detail?.code}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseExportManagement.name')}
                        name="name"
                        placeholder={t('warehouseExportManagement.name')}
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
                          setFieldValue('deviceRequest', null)
                          setFieldValue('supplyRequest', null)
                          setFieldValue('transferTicket', null)
                          setFieldValue('items', [DEFAULT_ITEM])
                          setFieldTouched('items', false)
                          setDefaultList([])
                          setFieldValue('toFactory', null)
                          setFieldValue('warehouse', null)
                        }}
                        required
                      />
                    </Grid>
                    {values?.requestType ===
                      WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST && (
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
                                  listForImportRequest: 1,
                                  type: TYPE_REQUEST.RETURN,
                                  status: DEVICE_REQUEST_STATUS.COMPLETED,
                                }),
                              })
                            }
                            asyncRequestHelper={(res) => res?.data?.items}
                            getOptionLabel={(opt) => opt?.code}
                            getOptionSubLabel={(opt) => opt?.name}
                            asyncRequestDeps={values?.requestType}
                            onChange={(val) =>
                              handleChangeRequestDevice(val, setFieldValue)
                            }
                            isOptionEqualToValue={(opt, val) =>
                              opt?.id === val?.id
                            }
                            required
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('warehouseExportManagement.fromFactory')}
                            name="deviceRequest.fromFactory.name"
                            placeholder={t(
                              'warehouseExportManagement.fromFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('requestDevice.form.field.toFactory')}
                            name="deviceRequest.toFactory.name"
                            placeholder={t(
                              'requestDevice.form.field.toFactory',
                            )}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                    {values?.requestType ===
                      WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST && (
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
                                  type: SUPPLY_REQUEST_TYPE_ENUM.RETURN,
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
                          <Field.TextField
                            label={t('requestDevice.form.field.toFactory')}
                            name="supplyRequest.factory.name"
                            placeholder={t(
                              'requestDevice.form.field.toFactory',
                            )}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                    {[
                      WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST,
                      WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST,
                    ].includes(values?.requestType) && (
                      <>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('warehouseImportRequest.ticketName')}
                            name="ticketName"
                            placeholder={t('warehouseImportRequest.ticketName')}
                            inputProps={{
                              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                            }}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <Field.Autocomplete
                            name="toFactory"
                            label={t('requestDevice.form.field.toFactory')}
                            placeholder={t(
                              'requestDevice.form.field.toFactory',
                            )}
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
                            isOptionEqualToValue={(opt, val) =>
                              opt?.id === val?.id
                            }
                            getOptionLabel={(opt) => opt?.name}
                            getOptionSubLabel={(opt) => opt?.code}
                            required
                          />
                        </Grid>
                      </>
                    )}
                    {values?.requestType ===
                      WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET && (
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
                                    TRANSFER_TICKET_STATUS.EXPORTING,
                                    TRANSFER_TICKET_STATUS.EXPORTED,
                                    TRANSFER_TICKET_STATUS.IMPORTING,
                                    TRANSFER_TICKET_STATUS.RETURNING,
                                  ],
                                }),
                                isListForDeviceReturnRequest: 1,
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
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="warehouse"
                        label={t('warehouseImportRequest.warehouse')}
                        placeholder={t('warehouseImportRequest.warehouse')}
                        asyncRequest={(s) =>
                          searchWarehouseDefineApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              active: ACTIVE_STATUS.ACTIVE,
                              factoryId:
                                values?.transferTicket?.toFactory?.id ||
                                values?.supplyRequest?.factory?.id ||
                                values?.deviceRequest?.toFactory?.id ||
                                values?.toFactory?.id ||
                                undefined,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        asyncRequestDeps={[
                          values?.toFactory?.id,
                          values?.transferTicket?.toFactory?.id,
                          values?.supplyRequest?.factory?.id,
                          values?.deviceRequest?.toFactory?.id,
                        ]}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.DatePicker
                        name="importDate"
                        label={t('warehouseImportRequest.importDate')}
                        placeholder={t('warehouseImportRequest.importDate')}
                        required
                      />
                    </Grid>
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
                      requestType={values?.requestType}
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
