import React, { useEffect, useState } from 'react'

import { Box, Grid, Paper, Typography } from '@mui/material'
import { add, startOfTomorrow } from 'date-fns'
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
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import {
  ACTIVE_STATUS,
  CREATE_PLAN_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import useMaintenancePlan from '~/modules/mmsx/redux/hooks/useMaintenancePlan'
import { searchAreaApi } from '~/modules/mmsx/redux/sagas/area/search'
import { searchArticleDeviceApi } from '~/modules/mmsx/redux/sagas/article-device/search'
import { searchDeviceListApi } from '~/modules/mmsx/redux/sagas/define-device/search-device-list'
import { searchDeviceGroupApi } from '~/modules/mmsx/redux/sagas/device-group/search'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from './item-setting-table'
import { validateSchema } from './schema'

const MaintenancePlanForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const [defaultList, setDefaultList] = useState([])

  const {
    data: { isLoading, maintenancePlanDetail },
    actions,
  } = useMaintenancePlan()

  const MODE_MAP = {
    [ROUTE.MAINTENANCE_PLAN.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.MAINTENANCE_PLAN.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.MAINTENANCE_PLAN.LIST.PATH))
  }
  const initialValues = {
    code: maintenancePlanDetail?.code || '',
    name: maintenancePlanDetail?.name || '',
    factory: maintenancePlanDetail?.factory || null,
    articleDevices: maintenancePlanDetail?.articleDeviceGroups || [],
    deviceGroups: maintenancePlanDetail?.deviceGroups || [],
    areas: maintenancePlanDetail?.areas || [],
    time: isUpdate
      ? [maintenancePlanDetail?.planFrom, maintenancePlanDetail?.planTo]
      : null,
    items:
      maintenancePlanDetail?.details?.map((item) => ({
        deviceGroup: item?.deviceGroup,
        device: item?.device,
        datePlan:
          item?.fromDate && item?.toDate
            ? [item?.fromDate, item?.toDate]
            : [maintenancePlanDetail?.planFrom, maintenancePlanDetail?.planTo],
      })) || [],
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getDetailMaintenancePlan(id)
    }
    return () => actions.resetMaintenanceDetail()
  }, [id])

  const handleViewPlan = async (setFieldValue, values) => {
    const params = {
      filter: convertFilterParams({
        factoryId: values?.factory?.id,
        articleDeviceGroupIds: values?.articleDevices
          ?.map((e) => e?.id)
          .join(','),
        deviceGroupIds: values?.deviceGroups?.map((e) => e?.id).join(','),
        areaIds: values?.areas?.map((e) => e?.id).join(','),
        active: ACTIVE_STATUS.ACTIVE,
      }),
      isGetAll: 1,
    }
    const res = await searchDeviceListApi(params)
    if (res?.statusCode === 200) {
      const dataItems = res?.data?.map((item) => ({
        ...item,
        datePlan: values?.time,
        device: {
          id: item?.id,
          code: item?.code,
          name: item?.name,
          serial: item?.serial,
          area: item?.area,
          identificationNo: item?.identificationNo,
        },
      }))
      setFieldValue('items', dataItems)
      setDefaultList(dataItems)
    }
  }

  const handleSubmit = (values) => {
    const params = {
      code: values?.code,
      name: values?.name,
      planFrom: values?.time[0],
      planTo: values?.time[1],
      factoryId: values?.factory?.id,
      articleDeviceGroupId: values?.articleDevices?.map((e) => e?.id),
      deviceGroupIds: values?.deviceGroups?.map((e) => e?.id),
      areaIds: values?.areas?.map((e) => e?.id),
      details: values?.items?.map((item) => ({
        deviceGroupId: item?.deviceGroup?.id,
        deviceId: item?.device?.id,
        fromDate: item?.datePlan[0],
        toDate: item?.datePlan[1],
      })),
    }
    if (isUpdate) {
      actions.updateMaintenancePlan({ ...params, id }, () =>
        history.push(ROUTE.MAINTENANCE_PLAN.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createMaintenancePlan(params, (data) =>
        history.push(
          ROUTE.MAINTENANCE_PLAN.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'plan',
      },
      {
        route: withSearch(ROUTE.MAINTENANCE_PLAN.LIST.PATH),
        title: ROUTE.MAINTENANCE_PLAN.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.MAINTENANCE_PLAN.CREATE.PATH,
          title: ROUTE.MAINTENANCE_PLAN.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.MAINTENANCE_PLAN.EDIT.PATH,
          title: ROUTE.MAINTENANCE_PLAN.EDIT.TITLE,
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
        return ROUTE.MAINTENANCE_PLAN.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.MAINTENANCE_PLAN.EDIT.TITLE
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
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema(t)}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ handleReset, setFieldValue, values }) => {
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
                        <Typography variant="h4" component="span">
                          {t('maintenancePlan.form.table.infoPlan')}
                        </Typography>
                      </Grid>
                      {isUpdate && (
                        <>
                          <Grid item xs={12}>
                            <LabelValue
                              label={
                                <Typography>
                                  {t('maintenancePlan.form.status')}
                                </Typography>
                              }
                              value={
                                <Status
                                  options={CREATE_PLAN_STATUS_OPTIONS}
                                  value={maintenancePlanDetail?.status}
                                />
                              }
                            />
                          </Grid>
                          <Grid item xs={12} lg={6}>
                            <Field.TextField
                              label={t('maintenancePlan.table.code')}
                              name="code"
                              placeholder={t('maintenancePlan.table.code')}
                              disabled
                              inputProps={{
                                maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                              }}
                              allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                            />
                          </Grid>
                        </>
                      )}

                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('maintenancePlan.table.name')}
                          name="name"
                          placeholder={t('maintenancePlan.table.name')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          }}
                          required
                        />
                      </Grid>

                      <Grid item lg={6} xs={12}>
                        <Field.DateRangePicker
                          name="time"
                          label={t('maintenancePlan.form.time')}
                          placeholder={t('maintenancePlan.form.time')}
                          minDate={startOfTomorrow()}
                          maxDate={add(new Date(), {
                            years: 1,
                            months: 0,
                            weeks: 0,
                            days: 0,
                            hours: 0,
                            minutes: 0,
                            seconds: 0,
                          })}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4" component="span">
                          {t('maintenancePlan.form.table.jobPlan')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.Autocomplete
                          name="factory"
                          label={t('general.placeholder.factoryName')}
                          placeholder={t('general.placeholder.factoryName')}
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
                          getOptionLabel={(option) => option.name}
                          isOptionEqualToValue={(opt, val) =>
                            opt?.id === val?.id
                          }
                          onChange={() => setFieldValue('items', [])}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.Autocomplete
                          name="articleDevices"
                          label={t('maintenancePlan.form.deviceGroup')}
                          placeholder={t('maintenancePlan.form.deviceGroup')}
                          asyncRequest={(s) =>
                            searchArticleDeviceApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                            })
                          }
                          asyncRequestHelper={(res) => res?.data?.items}
                          getOptionLabel={(option) => option.name}
                          onChange={() => setFieldValue('items', [])}
                          multiple
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.Autocomplete
                          name="deviceGroups"
                          label={t('maintenancePlan.form.deviceCategory')}
                          placeholder={t('maintenancePlan.form.deviceCategory')}
                          asyncRequest={(s) =>
                            searchDeviceGroupApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                              filter: convertFilterParams({
                                articleDeviceIds: values?.articleDevices
                                  ?.map((e) => e?.id)
                                  .join(','),
                              }),
                            })
                          }
                          asyncRequestDeps={values?.articleDevices}
                          asyncRequestHelper={(res) => res?.data?.items}
                          getOptionLabel={(option) => option.name}
                          onChange={() => setFieldValue('items', [])}
                          multiple
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.Autocomplete
                          name="areas"
                          label={t('maintenancePlan.form.area')}
                          placeholder={t('maintenancePlan.form.area')}
                          asyncRequest={(s) =>
                            searchAreaApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                              filter: convertFilterParams({
                                factoryId: values?.factory?.id,
                              }),
                            })
                          }
                          asyncRequestDeps={values?.factory?.id}
                          asyncRequestHelper={(res) => res?.data?.items}
                          getOptionLabel={(option) => option.name}
                          onChange={() => setFieldValue('items', [])}
                          multiple
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <Button
                          onClick={() => handleViewPlan(setFieldValue, values)}
                          sx={{ ml: 4 / 3 }}
                          disabled={!values?.factory?.id || !values?.time}
                        >
                          {t('maintenancePlan.form.detailPlan')}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <ItemSettingTable
                        items={values?.items || []}
                        arrayHelpers={arrayHelpers}
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
      </Paper>
    </Page>
  )
}

export default MaintenancePlanForm
