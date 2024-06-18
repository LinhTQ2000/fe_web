import React, { useEffect, useMemo } from 'react'

import { Box, Grid } from '@mui/material'
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
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import {
  ACTIVE_STATUS,
  DEVICE_REQUEST_STATUS_OPTIONS,
  DEVICE_REQUEST_TYPE,
} from '~/modules/mmsx/constants'
import useRequestDevice from '~/modules/mmsx/redux/hooks/useRequestDevice'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from './item-setting-table'
import { validateSchema } from './schema'
const DEFAULT_ITEM = [
  {
    id: new Date().getTime(),
    deviceGroup: null,
    stockQuantityInFactory: 0,
    stockQuantityOtherFactory: 0,
    quantity: null,
  },
]

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
    [ROUTE.REQUEST_DEVICE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.REQUEST_DEVICE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.REQUEST_DEVICE.LIST.PATH))
  }

  const initialValues = useMemo(
    () => ({
      code: requestDeviceDetail?.code || '',
      name: requestDeviceDetail?.name || '',
      description: requestDeviceDetail?.description || '',
      quantity: requestDeviceDetail?.quantity,
      expectReturnDate: requestDeviceDetail?.expectReturnDate || null,
      factory: requestDeviceDetail?.factory || null,
      items:
        requestDeviceDetail?.deviceGroupRequest?.map((deviceGroup) => ({
          deviceGroup: { ...deviceGroup, id: deviceGroup?.deviceGroupId },
          ...deviceGroup,
          id: deviceGroup?.deviceGroupId,
          stockQuantityInFactory:
            deviceGroup?.availableStockQuantityInFactory || 0,
          stockQuantityOtherFactory:
            deviceGroup?.availableStockQuantityOtherFactory || 0,
        })) || DEFAULT_ITEM,
    }),
    [requestDeviceDetail],
  )

  useEffect(() => {
    if (id) {
      actions.getRequestDeviceDetail(id)
    }
    return () => {
      actions.resetStateRequestDevice()
    }
  }, [id])

  const handleSubmit = (values) => {
    const params = {
      name: values?.name,
      description: values?.description,
      factoryId: values?.factory?.id,
      quantity: values?.quantity,
      type: DEVICE_REQUEST_TYPE.REQUEST,
      expectReturnDate: values?.expectReturnDate,
      deviceGroupRequest: values?.items?.map((item) => ({
        deviceGroupId: item?.deviceGroup?.id,
        quantity: item?.quantity,
      })),
    }
    if (isUpdate) {
      actions.updateRequestDeviceDetail({ ...params, id }, () =>
        history.push(ROUTE.REQUEST_DEVICE.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createRequestDevice(params, (data) =>
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
          route: ROUTE.REQUEST_DEVICE.CREATE.PATH,
          title: ROUTE.REQUEST_DEVICE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.REQUEST_DEVICE.EDIT.PATH,
          title: ROUTE.REQUEST_DEVICE.EDIT.TITLE,
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
        return ROUTE.REQUEST_DEVICE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.REQUEST_DEVICE.EDIT.TITLE
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
                          label={t('requestDevice.category.status')}
                          value={
                            <Status
                              options={DEVICE_REQUEST_STATUS_OPTIONS}
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
                      label={t('requestDevice.form.field.toFactory')}
                      name="factory"
                      placeholder={t('requestDevice.form.field.toFactory')}
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
                      getOptionLabel={(opt) => opt?.name}
                      onChange={() => setFieldValue('items', DEFAULT_ITEM)}
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
                render={(arrayHelpers) => {
                  return (
                    <ItemSettingTable
                      items={values?.items || []}
                      setFieldValue={setFieldValue}
                      mode={mode}
                      factory={values?.factory}
                      arrayHelpers={arrayHelpers}
                    />
                  )
                }}
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
