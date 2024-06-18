import React, { useEffect, useMemo, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
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
  DEVICE_REQUEST_STATUS,
  TRANSFER_REQUEST_TYPE_OPTIONS,
  TRANSFER_TICKET_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import useTransferTicket from '~/modules/mmsx/redux/hooks/useTransferTicket'
import { getTransferRequestDetailApi } from '~/modules/mmsx/redux/sagas/transfer-request/get-transfer-request-detail'
import { getTranferRequestForTransferTicket } from '~/modules/mmsx/redux/sagas/transfer-request/get-transfer-request-list'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from '../form/itemSetting-table'
import InfoTable from './info-table'
import { validateSchema } from './schema'

const TransferTicketForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const [listTicker, setListTicker] = useState([])
  const [listDeviceGroup, setListDeviceGroup] = useState([])
  const [deviceGroupTransfers, setDeviceGroupTransfers] = useState([])
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const {
    data: { transferTicketDetail, isLoading },
    actions,
  } = useTransferTicket()

  const DEFAULT_ITEM = {
    deviceGroup: null,
    device: null,
  }

  const MODE_MAP = {
    [ROUTE.TRANSFER_TICKET.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.TRANSFER_TICKET.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.TRANSFER_TICKET.LIST.PATH))
  }

  const initialValues = useMemo(
    () => ({
      name: transferTicketDetail?.name || '',
      transferRequest: isUpdate
        ? {
            ...transferTicketDetail?.transferRequest,
            estimatedReturnDate: transferTicketDetail?.estimatedReturnDate,
          }
        : null,
      toFactory: transferTicketDetail?.toFactory || null,
      fromFactory: transferTicketDetail?.fromFactory || null,
      code: transferTicketDetail?.code || '',
      transferDay: transferTicketDetail?.transferDate || '',
      description: transferTicketDetail?.description || '',
      items: transferTicketDetail?.devices?.map((i) => ({
        deviceGroup: i?.deviceGroup,
        warehouse: i?.warehouse,
        device: { ...i?.device, warehouse: i?.warehouse },
      })) || [DEFAULT_ITEM],
    }),
    [transferTicketDetail],
  )

  useEffect(() => {
    if (isUpdate) {
      actions.getTransferTicketDetail(id)
    }
    return () => {
      if (isUpdate) {
        actions.resetStateTransferTicket()
      }
    }
  }, [mode])

  useEffect(() => {
    const fetchList = async () => {
      const res = await getTransferRequestDetailApi(
        transferTicketDetail?.transferRequest?.id,
      )
      if (res?.statusCode === 200) {
        setListDeviceGroup(res?.data?.deviceGroups)
        setDeviceGroupTransfers(res?.data?.deviceGroups)
      }
    }
    if (isUpdate && transferTicketDetail?.transferRequest?.id) {
      fetchList()
    }
  }, [transferTicketDetail])

  const handleChangeTransfer = async (id, setFieldValue) => {
    if (id) {
      const res = await getTransferRequestDetailApi(id)
      if (res?.statusCode === 200) {
        setFieldValue('fromFactory', res?.data?.fromFactory)
        setFieldValue('toFactory', res?.data?.toFactory)
        setListDeviceGroup(res?.data?.deviceGroups)
        setDeviceGroupTransfers(res?.data?.deviceGroups)
      }
    } else {
      setFieldValue('fromFactory', null)
      setFieldValue('toFactory', null)
      setListDeviceGroup([])
      setDeviceGroupTransfers([])
    }
  }

  const handleSubmit = (val) => {
    const params = {
      code: val?.code,
      name: val?.name,
      transferRequestId: val?.transferRequest?.id,
      transferDate: val?.transferDay,
      deviceIds: val?.items?.map((item) => item?.device?.id),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createTransferTicket(params, (data) =>
        history.push(
          ROUTE.TRANSFER_TICKET.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    } else {
      actions.updateTransferTicket({ ...params, id }, () =>
        history.push(ROUTE.TRANSFER_TICKET.DETAIL.PATH.replace(':id', id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.WAREHOUSE.TITLE,
      },
      {
        route: withSearch(ROUTE.TRANSFER_TICKET.LIST.PATH),
        title: ROUTE.TRANSFER_TICKET.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.TRANSFER_TICKET.CREATE.PATH,
          title: ROUTE.TRANSFER_TICKET.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.TRANSFER_TICKET.EDIT.PATH,
          title: ROUTE.TRANSFER_TICKET.EDIT.TITLE,
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
        return ROUTE.TRANSFER_TICKET.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.TRANSFER_TICKET.EDIT.TITLE
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
              setListTicker([])
              setDeviceGroupTransfers([])
              setListDeviceGroup([])
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
        validationSchema={validateSchema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue, setFieldTouched }) => (
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
                  <Grid item xs={12}>
                    <Typography variant="h3">
                      {t('transferTicket.general')}
                    </Typography>
                  </Grid>
                  {isUpdate && (
                    <>
                      <Grid item xs={12}>
                        <LabelValue
                          label={
                            <Typography>
                              {t('transferTicket.table.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={TRANSFER_TICKET_STATUS_OPTIONS}
                              value={transferTicketDetail?.status}
                            />
                          }
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('transferTicket.form.field.code')}
                          name="code"
                          placeholder={t('transferTicket.form.field.code')}
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
                      label={t('transferTicket.form.field.name')}
                      name="name"
                      placeholder={t('transferTicket.form.field.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="transferRequest"
                      label={t('transferTicket.table.transferName')}
                      placeholder={t('transferTicket.table.transferName')}
                      asyncRequest={(s) =>
                        getTranferRequestForTransferTicket({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            status: DEVICE_REQUEST_STATUS.CONFIRMED,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      onChange={(val) => {
                        handleChangeTransfer(val?.id, setFieldValue)
                        setFieldTouched('items', false)
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="transferRequest.type"
                      label={t('transferTicket.table.type')}
                      placeholder={t('transferTicket.table.type')}
                      options={TRANSFER_REQUEST_TYPE_OPTIONS}
                      getOptionLabel={(opt) => t(opt?.text)}
                      getOptionValue={(opt) => opt?.id}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DatePicker
                      name="transferDay"
                      label={t('transferTicket.table.transferDay')}
                      placeholder={t('transferTicket.table.transferDay')}
                      required
                      minDate={new Date()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DatePicker
                      name="transferRequest.estimatedReturnDate"
                      label={t('transferTicket.table.estimatedReturnDate')}
                      placeholder={t(
                        'transferTicket.table.estimatedReturnDate',
                      )}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="fromFactory.name"
                      label={t('transferTicket.table.transferFactory')}
                      placeholder={t('transferTicket.table.transferFactory')}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="toFactory.name"
                      label={t('transferTicket.table.receivedFactory')}
                      placeholder={t('transferTicket.table.receivedFactory')}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Tabs
              list={[
                t('transferTicket.transferDevice'),
                t('transferTicket.transferInfo'),
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
                    listTicker={listTicker}
                    listDeviceGroup={listDeviceGroup}
                    values={values}
                    deviceGroupTransfers={deviceGroupTransfers}
                  />
                )}
              />
              <InfoTable items={deviceGroupTransfers} />
            </Tabs>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default TransferTicketForm
