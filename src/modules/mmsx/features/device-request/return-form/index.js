import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Box } from '@mui/system'
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
import {
  DEVICE_REQUEST_TYPE,
  DEVICE_RETURN_TICKET_STATUS_OPTION,
  TRANSFER_REQUEST_TYPE,
  TRANSFER_TICKET_STATUS,
} from '~/modules/mmsx/constants'
import useRequestDevice from '~/modules/mmsx/redux/hooks/useRequestDevice'
import useTransferTicket from '~/modules/mmsx/redux/hooks/useTransferTicket'
import { searchTransferTicketApi } from '~/modules/mmsx/redux/sagas/request-device/search-request-device'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemsSettingTable from './items-setting-table'
import { validateSchema } from './schema'

const DEFAULT_ITEM = {
  id: new Date().getTime(),
  deviceGroup: null,
  device: null,
}

const ReturnDeviceForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const {
    data: { isLoading, requestDeviceDetail },
    actions,
  } = useRequestDevice()

  const { actions: actionTicker } = useTransferTicket()

  const MODE_MAP = {
    [ROUTE.REQUEST_DEVICE.RETURN_CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.REQUEST_DEVICE.RETURN_EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.REQUEST_DEVICE.LIST.PATH))
  }

  const initialValues = {
    code: requestDeviceDetail?.code || '',
    name: requestDeviceDetail?.name || '',
    description: requestDeviceDetail?.description || '',
    transferTicket: isUpdate
      ? {
          ...requestDeviceDetail?.transferTicket,
          fromFactory: requestDeviceDetail?.toFactory,
          toFactory: requestDeviceDetail?.fromFactory,
          transferDate: requestDeviceDetail?.estimatedReturnDate,
        }
      : null,
    expectReturnDate: requestDeviceDetail?.expectReturnDate || null,
    items: requestDeviceDetail?.devices?.map((item) => ({
      device: {
        id: item?.id,
        code: item?.code,
        name: item?.name,
        serial: item?.serial,
        identificationNo: item?.identificationNo,
        area: item?.area,
        warehouse: item?.warehouse,
      },
      deviceGroup: item?.deviceGroup,
    })) || [{ ...DEFAULT_ITEM }],
  }

  useEffect(() => {
    if (id) {
      actions.getRequestDeviceDetail(id)
    }
    return () => {
      actions.resetStateRequestDevice()
    }
  }, [mode])

  useEffect(() => {
    if (!isEmpty(requestDeviceDetail)) {
      actionTicker.getTransferTicketDetail(
        requestDeviceDetail?.transferTicket?.id,
      )
    }
    return () => actionTicker.resetStateTransferTicket()
  }, [requestDeviceDetail])

  const handleChangeTicket = (id, setFieldValue) => {
    setFieldValue('items', [DEFAULT_ITEM])
    actionTicker.resetStateTransferTicket()
    if (id) {
      actionTicker.getTransferTicketDetail(id)
    }
  }

  const handleSubmit = (val) => {
    const params = {
      name: val?.name,
      type: DEVICE_REQUEST_TYPE.RETURN,
      description: val?.description,
      transferTicketId: val?.transferTicket?.id,
      deviceIds: val?.items?.map((item) => item?.device?.id),
      expectReturnDate: val?.expectReturnDate,
    }
    if (isUpdate) {
      actions.updateRequestDeviceDetail({ ...params, id }, () =>
        history.push(ROUTE.REQUEST_DEVICE.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createRequestDeviceReturn(params, (data) =>
        history.push(ROUTE.REQUEST_DEVICE.DETAIL.PATH.replace(':id', data?.id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.DEVICE_MANAGEMENT.TITLE,
      },
      {
        route: withSearch(ROUTE.REQUEST_DEVICE.LIST.PATH),
        title: ROUTE.REQUEST_DEVICE.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.REQUEST_DEVICE.RETURN_CREATE.PATH,
          title: ROUTE.REQUEST_DEVICE.RETURN_CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.REQUEST_DEVICE.RETURN_EDIT.PATH,
          title: ROUTE.REQUEST_DEVICE.RETURN_EDIT.TITLE,
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
        return ROUTE.REQUEST_DEVICE.RETURN_CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.REQUEST_DEVICE.RETURN_EDIT.TITLE
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
              actionTicker.resetStateTransferTicket()
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
        {({ handleReset, values, setFieldValue }) => (
          <Form>
            <HotKeys
              handlers={{
                onBack: backToList,
                ...(isUpdate
                  ? {
                      onReset: handleReset,
                    }
                  : {
                      onReset: () => {
                        handleReset()
                        actionTicker.resetStateTransferTicket()
                      },
                    }),
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
                          label={t('requestDevice.category.status')}
                          value={
                            <Status
                              options={DEVICE_RETURN_TICKET_STATUS_OPTION}
                              value={requestDeviceDetail?.status}
                            />
                          }
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('requestDevice.form.field.code')}
                          name="code"
                          placeholder={t('requestDevice.form.field.code')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                          }}
                          allow={TEXTFIELD_ALLOW.EXCEPT_SPECIALS}
                          disabled
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('requestDevice.form.field.name')}
                      name="name"
                      placeholder={t('requestDevice.form.field.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      label={t('requestDevice.form.field.transferTicket')}
                      name="transferTicket"
                      placeholder={t('requestDevice.form.field.transferTicket')}
                      asyncRequest={(s) =>
                        searchTransferTicketApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            status: [
                              TRANSFER_TICKET_STATUS.IMPORTING,
                              TRANSFER_TICKET_STATUS.IMPORTED,
                              TRANSFER_TICKET_STATUS.RETURNING,
                            ],
                            type: TRANSFER_REQUEST_TYPE.RENT,
                          }),
                          isListForDeviceReturnRequest: 1,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      onChange={(val) =>
                        handleChangeTicket(val?.id, setFieldValue)
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('requestDevice.form.field.fromFactory')}
                      name="transferTicket.toFactory.name"
                      placeholder={t('requestDevice.form.field.fromFactory')}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('requestDevice.form.field.toFactory')}
                      name="transferTicket.fromFactory.name"
                      placeholder={t('requestDevice.form.field.toFactory')}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DatePicker
                      label={t('requestDevice.form.field.transferDate')}
                      name="transferTicket.transferDate"
                      placeholder={t('requestDevice.form.field.transferDate')}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DatePicker
                      label={t('requestDevice.form.field.actualDate')}
                      name="expectReturnDate"
                      placeholder={t('requestDevice.form.field.actualDate')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('requestDevice.form.field.description')}
                      placeholder={t('requestDevice.form.field.description')}
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
            <Box sx={{ mt: 3 }}>
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <ItemsSettingTable
                    items={values?.items || []}
                    mode={mode}
                    arrayHelpers={arrayHelpers}
                    transferTicket={values?.transferTicket}
                  />
                )}
              />
            </Box>

            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default ReturnDeviceForm
