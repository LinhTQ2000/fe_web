import React, { useEffect, useMemo } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Page from '~/components/Page'
import { DEVICE_REQUEST_STATUS, TYPE_REQUEST } from '~/modules/mmsx/constants'
import useDeviceAssign from '~/modules/mmsx/redux/hooks/useDeviceAssign'
import useRequestDevice from '~/modules/mmsx/redux/hooks/useRequestDevice'
import { searchRequestDeviceApi } from '~/modules/mmsx/redux/sagas/request-device/search-request-device'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import { validateSchema } from './schema'
import TableItems from './table-items'

const DeviceAssignForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const {
    data: { isLoading, deviceAssignDetail },
    actions,
  } = useDeviceAssign()

  const { actions: actionRequestDevice } = useRequestDevice()

  const MODE_MAP = {
    [ROUTE.DEVICE_ASSIGN.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEVICE_ASSIGN.EDIT.PATH]: MODAL_MODE.UPDATE,
    [ROUTE.DEVICE_ASSIGN.REASSIGN.PATH]: 'reassign',
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.DEVICE_ASSIGN.LIST.PATH))
  }

  const initialValues = useMemo(
    () => ({
      code: deviceAssignDetail?.code || '',
      deviceRequest: isUpdate
        ? {
            ...deviceAssignDetail?.deviceRequest,
            factory: deviceAssignDetail?.factory,
          }
        : null,
      assignDate: deviceAssignDetail?.assignDate || null,
      assignUser: deviceAssignDetail?.assignUser || null,
      items:
        deviceAssignDetail?.details?.map((item) => ({
          deviceGroupId: item?.deviceGroup?.id,
          name: item?.deviceGroup?.name,
          device: item?.device,
          area: item?.area,
          maintenanceTeam: item?.maintenanceTeam,
        })) || [],
    }),
    [deviceAssignDetail],
  )

  const handleSubmit = (val) => {
    const params = {
      deviceRequestId: val?.deviceRequest?.id,
      assignDate: val?.assignDate,
      assignUser: val?.assignUser,
      details: val?.items?.map((item) => ({
        deviceId: item?.device?.id,
        areaId: item?.area?.id,
        maintenanceTeamId: item?.maintenanceTeam?.id,
      })),
    }
    if (isUpdate) {
      actions.updateDeviceAssign({ ...params, id }, () =>
        history.push(ROUTE.DEVICE_ASSIGN.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createDeviceAssign(params, (data) =>
        history.push(ROUTE.DEVICE_ASSIGN.DETAIL.PATH.replace(':id', data?.id)),
      )
    }
  }

  useEffect(() => {
    if (isUpdate) {
      actions.detailDeviceAssign(id)
    }
    return () => {
      actionRequestDevice.resetStateRequestDevice()
      actions.resetDeviceAssignState()
    }
  }, [id])

  const handleChangeDeviceRequest = (val) => {
    actionRequestDevice.resetStateRequestDevice()
    if (val) {
      actionRequestDevice.getRequestDeviceDetail(val)
    } else {
      actionRequestDevice.resetStateRequestDevice()
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.DEVICE_MANAGEMENT.TITLE,
      },
      {
        route: withSearch(ROUTE.DEVICE_ASSIGN.LIST.PATH),
        title: ROUTE.DEVICE_ASSIGN.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEVICE_ASSIGN.CREATE.PATH,
          title: ROUTE.DEVICE_ASSIGN.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEVICE_ASSIGN.EDIT.PATH,
          title: ROUTE.DEVICE_ASSIGN.EDIT.TITLE,
        })
        break
      case 'reassign':
        breadcrumb.push({
          route: ROUTE.DEVICE_ASSIGN.REASSIGN.PATH,
          title: ROUTE.DEVICE_ASSIGN.REASSIGN.TITLE,
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
        return ROUTE.DEVICE_ASSIGN.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEVICE_ASSIGN.EDIT.TITLE
      case 'reassign':
        return ROUTE.DEVICE_ASSIGN.REASSIGN.TITLE
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
              actionRequestDevice.resetStateRequestDevice()
            }}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
      case 'reassign':
        return (
          <ActionBar
            onBack={backToList}
            onCancel={() => {
              handleReset()
            }}
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
                        actionRequestDevice.resetStateRequestDevice()
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
                  <Grid item xs={12}>
                    <Typography variant="h4" mt={1}>
                      {t('deviceAssign.commonInfo')}
                    </Typography>
                  </Grid>
                  {isUpdate && (
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('deviceAssign.assign.code')}
                        name="code"
                        placeholder={t('deviceAssign.assign.code')}
                        disabled
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="deviceRequest"
                      label={t('deviceAssign.assign.assignCode')}
                      placeholder={t('deviceAssign.assign.assignCode')}
                      asyncRequest={(s) =>
                        searchRequestDeviceApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            type: TYPE_REQUEST.REQUEST,
                            status: DEVICE_REQUEST_STATUS.CONFIRMED,
                            listForDeviceAssignment: true,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      onChange={(val) => handleChangeDeviceRequest(val?.id)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DatePicker
                      label={t('deviceAssign.assign.assignDate')}
                      name="assignDate"
                      placeholder={t('deviceAssign.assign.assignDate')}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('deviceAssign.assign.factory')}
                      name="deviceRequest.factory.name"
                      placeholder={t('deviceAssign.assign.factory')}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('deviceAssign.assign.usageUser')}
                      name="assignUser"
                      placeholder={t('deviceAssign.assign.usageUser')}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <TableItems
                    items={values?.items || []}
                    arrayHelpers={arrayHelpers}
                    setFieldValue={setFieldValue}
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

export default DeviceAssignForm
