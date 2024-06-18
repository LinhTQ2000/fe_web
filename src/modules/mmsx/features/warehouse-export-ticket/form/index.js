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
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import {
  DEVICE_REQUEST_STATUS,
  WAREHOUSE_EXPORT_REQUEST_TYPE,
  WAREHOUSE_EXPORT_REQUEST_TYPE_OPTIONS,
  WAREHOUSE_EXPORT_REQUEST_TYPE_OPTIONS_DEVICE,
  WAREHOUSE_EXPORT_REQUEST_TYPE_OPTIONS_SUPPLY,
  WAREHOUSE_EXPORT_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarehouseExportManagement from '~/modules/mmsx/redux/hooks/useWarehouseExportManagement'
import useWarehouseExportTicket from '~/modules/mmsx/redux/hooks/useWarehouseExportTicket'
import { getWarehouseExportManagementDetailApi } from '~/modules/mmsx/redux/sagas/warehouse-export-management/get-warehouse-export-detail'
import { getWarehouseExportManagementListApi } from '~/modules/mmsx/redux/sagas/warehouse-export-management/get-warehouse-export-list'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from './item-setting-table'
import { validateSchema } from './schema'

export default function WarehouseExportTicketForm() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const [defaultList, setDefaultList] = useState([])
  const [type, setType] = useState()
  const { canAccess } = useApp()

  const {
    data: { isLoading, detail },
    actions,
  } = useWarehouseExportTicket()
  const {
    data: { userInfo },
  } = useUserInfo()

  const {
    data: { warehouseExportManagementDetail },
    actions: actionWarehouseRequest,
  } = useWarehouseExportManagement()

  const DEFAULT_ITEM = {
    deviceGroup: null,
    device: null,
    supplyGroup: null,
    supply: null,
    supplyType: null,
    quantity: null,
    color: '',
    size: '',
  }

  const MODE_MAP = {
    [ROUTE.WAREHOUSE_EXPORT_TICKET.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_EXPORT_TICKET.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.WAREHOUSE_EXPORT_TICKET.LIST.PATH))
  }

  const refreshData = () => actions.getDetailWarehouseExportTicket(id)

  useEffect(() => {
    if (isUpdate) {
      refreshData()
    }
    return () => {
      actions.resetState()
    }
  }, [id])

  useEffect(() => {
    if (isUpdate && detail?.warehouseExportRequest?.id) {
      actionWarehouseRequest.getWarehouseExportManagementDetail(
        detail?.warehouseExportRequest?.id,
      )
    }
    return () => actionWarehouseRequest.resetStateWarehouseExportManagement()
  }, [detail])

  useEffect(() => {
    if (isUpdate) {
      const defaultList =
        warehouseExportManagementDetail?.supplies?.map((item) => ({
          ...item,
          supply: {
            ...item,
            remainQuantity: item?.requestQuantity - item?.exportPlannedQuantity,
          },
        })) ||
        warehouseExportManagementDetail?.devices?.map((item) => ({
          ...item,
          device: item,
        })) ||
        []
      setDefaultList(defaultList)
    }
  }, [warehouseExportManagementDetail])

  const initialValues = useMemo(() => {
    let items = null
    switch (detail?.requestType) {
      case WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
      case WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET:
        items = detail?.devices?.map((item) => ({
          ...item,
          device: item,
        }))
        break
      case WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST:
        items = detail?.supplies?.map((item) => ({
          ...item,
          quantity: item?.exportQuantity,
          supply: {
            ...item,
            exportQuantity: item?.requestQuantity ?? 0,
            remainQuantity:
              (item?.requestQuantity ?? 0) - (item?.exportedQuantity ?? 0),
          },
        }))
        break
      default:
        break
    }
    return {
      name: detail?.name || '',
      requestType: isUpdate ? detail?.requestType : null,
      warehouseExportRequest:
        {
          ...detail?.warehouseExportRequest,
          fromFactory: detail?.fromFactory,
          toFactory: detail?.toFactory,
          exportDate: detail?.planDate,
        } || null,
      exportDate: detail?.exportDate || null,
      number: detail?.number || '',
      debit: detail?.debit || '',
      credit: detail?.credit || '',
      reason: detail?.reason || '',
      contractNum: detail?.contractNum || '',
      symbol: detail?.symbol || '',
      date: detail?.date || null,
      exportWarehouse: detail?.warehouse?.name || '',
      gdiNo: detail?.gdiNo || '',
      note: detail?.note || '',
      items: isUpdate ? items : [DEFAULT_ITEM],
    }
  }, [detail, warehouseExportManagementDetail])

  const handleSubmit = (val) => {
    const params = {
      ...val,
      warehouseExportRequestId: val?.warehouseExportRequest?.id,
      supplies: val?.items?.map((item) => ({
        supplyId: item?.supply?.id,
        quantity: item?.quantity,
        color: item?.color,
        size: item?.size,
      })),
      devices: val?.items?.map((item) => ({
        deviceId: item?.device?.id,
        color: item?.color,
        size: item?.size,
      })),
    }
    if (
      +val?.requestType === WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST
    ) {
      delete params.items
      delete params.devices
    } else {
      delete params.items
      delete params.supplies
    }
    if (isUpdate) {
      actions.updateWarehouseExportTicket({ ...params, id }, () =>
        history.push(
          ROUTE.WAREHOUSE_EXPORT_TICKET.DETAIL.PATH.replace(':id', id),
        ),
      )
    } else {
      actions.createWarehouseExportTicket(params, (data) =>
        history.push(
          ROUTE.WAREHOUSE_EXPORT_TICKET.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    }
  }

  const handleChangeRequest = async (val, setFieldValue) => {
    setFieldValue('items', [DEFAULT_ITEM])
    if (val?.id) {
      const res = await getWarehouseExportManagementDetailApi(val?.id)
      if (res?.statusCode === 200) {
        const defaultList =
          res?.data?.supplies?.map((item) => ({
            ...item,
            supply: {
              ...item,
              remainQuantity: item?.exportQuantity - item?.exportedQuantity,
            },
          })) ||
          res?.data?.devices?.map((item) => ({
            ...item,
            device: item,
          })) ||
          []

        setDefaultList(defaultList)
        setFieldValue('exportWarehouse', res?.data?.warehouse?.name)
      }
    } else {
      setDefaultList([])
      setFieldValue('exportWarehouse', '')
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.WAREHOUSE.TITLE,
      },
      {
        route: withSearch(ROUTE.WAREHOUSE_EXPORT_TICKET.LIST.PATH),
        title: ROUTE.WAREHOUSE_EXPORT_TICKET.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.WAREHOUSE_EXPORT_TICKET.CREATE.PATH,
          title: ROUTE.WAREHOUSE_EXPORT_TICKET.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.WAREHOUSE_EXPORT_TICKET.EDIT.PATH,
          title: ROUTE.WAREHOUSE_EXPORT_TICKET.EDIT.TITLE,
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
        return ROUTE.WAREHOUSE_EXPORT_TICKET.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_EXPORT_TICKET.EDIT.TITLE
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
        {({ values, setFieldValue, setFieldTouched, handleReset }) => {
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
                            label={t('warehouseExportTicket.code')}
                            placeholder={t('warehouseExportTicket.code')}
                            value={detail?.code}
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
                          'warehouseExportManagement.form.placeholder.requestType',
                        )}
                        options={getOptionType()}
                        getOptionLabel={(opt) => t(opt?.text)}
                        getOptionValue={(opt) => opt?.id}
                        onChange={() => {
                          setFieldValue('items', [DEFAULT_ITEM])
                          setFieldValue('warehouseExportRequest', null)
                          setFieldTouched(`items`, false)
                          setFieldValue('exportWarehouse', '')
                          setDefaultList([])
                        }}
                        required
                      />
                    </Grid>
                    {!values?.requestType && values?.requestType !== 0 && (
                      <>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('warehouseExportManagement.fromFactory')}
                            name="warehouseExportRequest.fromFactory.name"
                            placeholder={t(
                              'warehouseExportManagement.fromFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            name="warehouseExportRequest.exportDate"
                            label={t(
                              'warehouseExportManagement.form.field.exportDate',
                            )}
                            placeholder={t(
                              'warehouseExportManagement.form.field.exportDate',
                            )}
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
                          name="warehouseExportRequest"
                          label={t('warehouseExportManagement.code')}
                          placeholder={t('warehouseExportManagement.code')}
                          asyncRequest={(s) =>
                            getWarehouseExportManagementListApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                              filter: convertFilterParams({
                                status: DEVICE_REQUEST_STATUS.CONFIRMED,
                                requestType: values?.requestType,
                                fromFactoryIds: userInfo?.factoryId,
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
                      WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST && (
                      <>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('requestDevice.form.field.fromFactory')}
                            name="warehouseExportRequest.fromFactory.name"
                            placeholder={t(
                              'requestDevice.form.field.fromFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('requestDevice.form.field.toFactory')}
                            name="warehouseExportRequest.toFactory.name"
                            placeholder={t(
                              'requestDevice.form.field.toFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.DatePicker
                            name="warehouseExportRequest.exportDate"
                            label={t(
                              'warehouseExportManagement.form.field.exportDate',
                            )}
                            placeholder={t(
                              'warehouseExportManagement.form.field.exportDate',
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
                          <Field.TextField
                            label={t('warehouseExportManagement.fromFactory')}
                            name="warehouseExportRequest.fromFactory.name"
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
                            name="exportWarehouse"
                            placeholder={t(
                              'warehouseExportManagement.table.exportWarehouse',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.DatePicker
                            name="warehouseExportRequest.exportDate"
                            label={t(
                              'warehouseExportManagement.form.field.exportDate',
                            )}
                            placeholder={t(
                              'warehouseExportManagement.form.field.exportDate',
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
                          <Field.TextField
                            label={t('transferTicket.table.transferFactory')}
                            name="warehouseExportRequest.fromFactory.name"
                            placeholder={t(
                              'transferTicket.table.transferFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('transferTicket.table.receivedFactory')}
                            name="warehouseExportRequest.toFactory.name"
                            placeholder={t(
                              'transferTicket.table.receivedFactory',
                            )}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.DatePicker
                            name="warehouseExportRequest.exportDate"
                            label={t(
                              'warehouseExportManagement.form.field.exportDate',
                            )}
                            placeholder={t(
                              'warehouseExportManagement.form.field.exportDate',
                            )}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12} lg={6}>
                      <Field.DatePicker
                        name="exportDate"
                        label={t('warehouseExportTicket.exportDate')}
                        placeholder={t('warehouseExportTicket.exportDate')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="number"
                        label={t('warehouseExportManagement.form.field.number')}
                        placeholder={t(
                          'warehouseExportManagement.form.field.number',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="debit"
                        label={t('warehouseExportManagement.form.field.debit')}
                        placeholder={t(
                          'warehouseExportManagement.form.field.debit',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="credit"
                        label={t('warehouseExportManagement.form.field.credit')}
                        placeholder={t(
                          'warehouseExportManagement.form.field.credit',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="reason"
                        label={t('warehouseExportManagement.form.field.reason')}
                        placeholder={t(
                          'warehouseExportManagement.form.field.reason',
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
                          'warehouseExportManagement.form.field.contractNum',
                        )}
                        placeholder={t(
                          'warehouseExportManagement.form.field.contractNum',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="symbol"
                        label={t('warehouseExportManagement.form.field.symbol')}
                        placeholder={t(
                          'warehouseExportManagement.form.field.symbol',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.DatePicker
                        name="date"
                        label={t('warehouseExportManagement.form.field.date')}
                        placeholder={t(
                          'warehouseExportManagement.form.field.date',
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="gdiNo"
                        label={t('warehouseExportManagement.form.field.gdiNo')}
                        placeholder={t(
                          'warehouseExportManagement.form.field.gdiNo',
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
                          'warehouseImportManagement.form.field.note',
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
