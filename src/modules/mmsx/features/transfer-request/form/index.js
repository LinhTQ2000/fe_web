import React, { useEffect, useMemo, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FieldArray, Form, Formik } from 'formik'
import { keyBy } from 'lodash'
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
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import {
  ACTIVE_STATUS,
  DEVICE_REQUEST_STATUS,
  DEVICE_REQUEST_STATUS_OPTIONS,
  TRANSFER_REQUEST_TYPE_OPTIONS,
  TYPE_REQUEST,
} from '~/modules/mmsx/constants'
import useTransferRequest from '~/modules/mmsx/redux/hooks/useTransferRequest'
import { getRequestDeviceDetailApi } from '~/modules/mmsx/redux/sagas/request-device/get-request-device-detail'
import { searchRequestDeviceApi } from '~/modules/mmsx/redux/sagas/request-device/search-request-device'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from '../form/itemSetting-table'
import { validateSchema } from './schema'
const DEFAULT_ITEM = [
  {
    id: new Date().getTime(),
    deviceGroup: null,
    factory: null,
    warehouse: null,
    quantity: null,
  },
]
const TransferRequestForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const {
    data: { transferRequestDetail, isLoading },
    actions,
  } = useTransferRequest()
  const [listRequest, setListRequest] = useState()
  const [deviceGroupList, setDeviceGroupList] = useState([])

  const MODE_MAP = {
    [ROUTE.TRANSFER_REQUEST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.TRANSFER_REQUEST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.TRANSFER_REQUEST.LIST.PATH))
  }

  const initialValues = useMemo(
    () => ({
      name: transferRequestDetail?.name || '',
      deviceRequest: isUpdate
        ? {
            ...transferRequestDetail?.request,
            expectReturnDate: transferRequestDetail?.estimatedReturnDate,
            factory: transferRequestDetail?.toFactory,
          }
        : null,
      code: transferRequestDetail?.code || '',
      type: isUpdate ? +transferRequestDetail?.type : null,
      factory: transferRequestDetail?.fromFactory || null,
      expectedTransferDay: transferRequestDetail?.estimatedTransferDate || '',
      description: transferRequestDetail?.description || '',
      items:
        transferRequestDetail?.deviceGroups?.map((item) => ({
          deviceGroup: { ...item?.deviceGroup, quantity: item.requestQuantity },
          quantity: item?.quantity,
        })) || DEFAULT_ITEM,
    }),
    [transferRequestDetail],
  )

  useEffect(() => {
    if (isUpdate) {
      actions.getTransferRequestDetail(id)
    }
    return () => {
      if (isUpdate) {
        actions.resetStateTransferRequest()
      }
    }
  }, [mode])

  useEffect(() => {
    const fetchList = async () => {
      const res = await getRequestDeviceDetailApi(
        transferRequestDetail?.request?.id,
      )
      if (res?.statusCode === 200) {
        const list = res?.data?.deviceGroupRequest?.map((item) => ({
          ...item,
          id: item?.deviceGroupId,
        }))
        setDeviceGroupList(list)
      }
    }
    if (isUpdate && transferRequestDetail?.request?.id) {
      fetchList()
    }
  }, [transferRequestDetail])

  const handleSubmit = (values) => {
    const params = {
      requestId: values?.deviceRequest?.id,
      type: +values?.type,
      receivedFactory: values?.factory?.id || '',
      name: values?.name,
      code: values?.code,
      description: values?.description,
      fromFactoryId: values?.factory?.id,
      estimatedTransferDate: values?.expectedTransferDay,
      deviceGroups: values?.items?.map((item) => ({
        deviceGroupId: item?.deviceGroup?.id,
        quantity: item?.quantity,
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createTransferRequest(params, (data) =>
        history.push(
          ROUTE.TRANSFER_REQUEST.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    } else {
      actions.updateTransferRequest({ ...params, id }, () =>
        history.push(ROUTE.TRANSFER_REQUEST.DETAIL.PATH.replace(':id', id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.WAREHOUSE.TITLE,
      },
      {
        route: withSearch(ROUTE.TRANSFER_REQUEST.LIST.PATH),
        title: ROUTE.TRANSFER_REQUEST.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.TRANSFER_REQUEST.CREATE.PATH,
          title: ROUTE.TRANSFER_REQUEST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.TRANSFER_REQUEST.EDIT.PATH,
          title: ROUTE.TRANSFER_REQUEST.EDIT.TITLE,
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
        return ROUTE.TRANSFER_REQUEST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.TRANSFER_REQUEST.EDIT.TITLE
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
              setDeviceGroupList([])
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
        validationSchema={validateSchema(t, listRequest)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => {
          setListRequest(values?.deviceRequest?.deviceGroupRequest)
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
                    <Grid item xs={12}>
                      <Typography variant="h3">
                        {t('transferRequest.general')}
                      </Typography>
                    </Grid>
                    {isUpdate && (
                      <>
                        <Grid item xs={12}>
                          <LabelValue
                            label={
                              <Typography>
                                {t('transferRequest.table.status')}
                              </Typography>
                            }
                            value={
                              <Status
                                options={DEVICE_REQUEST_STATUS_OPTIONS}
                                value={transferRequestDetail?.status}
                              />
                            }
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('transferRequest.form.field.code')}
                            name="code"
                            placeholder={t('transferRequest.form.field.code')}
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
                        label={t('transferRequest.form.field.name')}
                        name="name"
                        placeholder={t('transferRequest.form.field.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="deviceRequest"
                        label={t('transferRequest.form.field.deviceRequest')}
                        placeholder={t(
                          'transferRequest.form.field.deviceRequest',
                        )}
                        asyncRequest={(s) =>
                          searchRequestDeviceApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              type: TYPE_REQUEST.REQUEST,
                              status: DEVICE_REQUEST_STATUS.CONFIRMED,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        onChange={(val) => {
                          setFieldValue('items', DEFAULT_ITEM)
                          if (val?.id) {
                            const deviceGroups = keyBy(val?.deviceGroups, 'id')
                            const list = val?.deviceGroupRequest?.map(
                              (item) => ({
                                ...item,
                                ...deviceGroups[item?.deviceGroupId],
                              }),
                            )
                            setDeviceGroupList(list)
                          } else {
                            setDeviceGroupList([])
                          }
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="type"
                        label={t('transferRequest.table.type')}
                        placeholder={t('transferRequest.table.type')}
                        options={TRANSFER_REQUEST_TYPE_OPTIONS}
                        getOptionLabel={(opt) => t(opt?.text)}
                        getOptionValue={(opt) => opt?.id}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.DatePicker
                        name="deviceRequest.expectReturnDate"
                        label={t('transferRequest.table.estimatedReturnDate')}
                        placeholder={t(
                          'transferRequest.table.estimatedReturnDate',
                        )}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="deviceRequest.factory.name"
                        label={t('transferRequest.table.receivedFactory')}
                        placeholder={t('transferRequest.table.receivedFactory')}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="factory"
                        placeholder={t('transferTicket.table.transferFactory')}
                        label={t('transferTicket.table.transferFactory')}
                        asyncRequest={(s) =>
                          searchFactoriesApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              active: ACTIVE_STATUS.ACTIVE,
                            }),
                            isMasterData: 1,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.DatePicker
                        name="expectedTransferDay"
                        label={t('transferRequest.table.expectedTransferDay')}
                        placeholder={t(
                          'transferRequest.table.expectedTransferDay',
                        )}
                        minDate={new Date()}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('transferRequest.table.description')}
                        placeholder={t('transferRequest.table.description')}
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
                      deviceGroups={deviceGroupList}
                      values={values}
                      mode={mode}
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

export default TransferRequestForm
