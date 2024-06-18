import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { searchDeviceGroupApi } from '~/modules/database/redux/sagas/device-group/search'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import {
  ACTIVE_STATUS,
  DEVICE_REQUEST_TICKET_STATUS_OPTION,
  DEVICE_REQUEST_TYPE,
} from '~/modules/mmsx/constants'
import useRequestDevice from '~/modules/mmsx/redux/hooks/useRequestDevice'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from './item-setting-table'
import { validateSchema } from './schema'

const RequestDeviceForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const {
    data: { isLoading, requestDeviceDetail },
    actions,
  } = useRequestDevice()

  const MODE_MAP = {
    [ROUTE.REPAIR_REQUEST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.REPAIR_REQUEST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.REPAIR_REQUEST.LIST.PATH))
  }

  const initialValues = {
    name: requestDeviceDetail?.name || '',
    description: requestDeviceDetail?.description || '',
    quantity: requestDeviceDetail?.quantity,
    deviceGroup: requestDeviceDetail?.deviceGroups || [],
    expectReturnDate: requestDeviceDetail?.expectReturnDate || '',
    factory: requestDeviceDetail?.factory || null,
    items: requestDeviceDetail?.deviceGroupRequest || [],
  }

  useEffect(() => {
    if (id) {
      actions.getRequestDeviceDetail(id)
    }
    return () => {
      actions.resetStateRequestDevice()
    }
  }, [mode])

  const handleSubmit = (values) => {
    const params = {
      name: values?.name,
      description: values?.description,
      factoryId: values?.factory?.id,
      quantity: values?.quantity,
      type: DEVICE_REQUEST_TYPE.REQUEST,
      deviceGroupRequest: values?.items?.map((item) => ({
        deviceGroupId: item?.id,
        quantity: item?.quantity,
      })),
    }
    if (isUpdate) {
      actions.updateRequestDeviceDetail({ ...params, id }, backToList)
    } else {
      actions.createRequestDevice(params, () =>
        history.push(ROUTE.REPAIR_REQUEST.LIST.PATH),
      )
    }
  }

  const handleChangeDeviceGroup = (val, setFieldValue) => {
    if (!isEmpty(val)) {
      setFieldValue('items', val)
    } else {
      setFieldValue('items', [])
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.DEVICE_MANAGEMENT.TITLE,
      },
      {
        route: withSearch(ROUTE.REPAIR_REQUEST.LIST.PATH),
        title: ROUTE.REPAIR_REQUEST.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.REPAIR_REQUEST.CREATE.PATH,
          title: ROUTE.REPAIR_REQUEST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.REPAIR_REQUEST.EDIT.PATH,
          title: ROUTE.REPAIR_REQUEST.EDIT.TITLE,
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
        return ROUTE.REPAIR_REQUEST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.REPAIR_REQUEST.EDIT.TITLE
      default:
    }
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
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LabelValue
                        label={t('requestDevice.category.status')}
                        value={
                          <Status
                            options={DEVICE_REQUEST_TICKET_STATUS_OPTION}
                            value={requestDeviceDetail?.status}
                          />
                        }
                      />
                    </Grid>
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
                      label={t('requestDevice.form.field.deviceGroup')}
                      name="deviceGroup"
                      placeholder={t('requestDevice.form.field.deviceGroup')}
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
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      onChange={(val) =>
                        handleChangeDeviceGroup(val, setFieldValue)
                      }
                      required
                      multiple
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      label={t('requestDevice.form.field.factory')}
                      name="factory"
                      placeholder={t('requestDevice.form.field.factory')}
                      asyncRequest={(s) =>
                        searchFactoriesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          // @TODO: wating BE add active factory
                          // filter: convertFilterParams({
                          //   active: ACTIVE_STATUS.ACTIVE,
                          // }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DatePicker
                      label={t('requestDevice.form.field.expectReturnDate')}
                      name="expectReturnDate"
                      placeholder={t(
                        'requestDevice.form.field.expectReturnDate',
                      )}
                      minDate={new Date()}
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
                  <ItemSettingTable
                    items={values?.items || []}
                    arrayHelpers={arrayHelpers}
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

export default RequestDeviceForm
