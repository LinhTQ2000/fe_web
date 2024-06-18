import React, { useEffect } from 'react'

import { Box, Grid, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { CREATE_PLAN_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import useJob from '~/modules/mmsx/redux/hooks/useJob'
import useMaintenancePlan from '~/modules/mmsx/redux/hooks/useMaintenancePlan'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

import JobSettingTable from '../detail/job-setting-table'

const MaintenancePlanDetailJob = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id, deviceId } = useParams()
  const { state } = useLocation()
  const {
    data: { isLoading, maintenancePlanDetail },
    actions,
  } = useMaintenancePlan()
  const { page, pageSize, setPage, setPageSize, withSearch } = useQueryState()

  const breadcrumbs = [
    {
      title: 'plan',
    },
    {
      route: withSearch(ROUTE.MAINTENANCE_PLAN.LIST.PATH),
      title: ROUTE.MAINTENANCE_PLAN.LIST.TITLE,
    },
    {
      route: withSearch(ROUTE.MAINTENANCE_PLAN.DETAIL.PATH.replace(':id', id)),
      title: ROUTE.MAINTENANCE_PLAN.DETAIL.TITLE,
    },
    {
      route: ROUTE.MAINTENANCE_PLAN.DETAIL_JOB.PATH,
      title: ROUTE.MAINTENANCE_PLAN.DETAIL_JOB.TITLE,
    },
  ]

  const { actions: actionJob } = useJob()

  const refreshData = () => {
    const params = {
      page,
      limit: pageSize,
      filter: convertFilterParams({
        maintenancePlanId: id,
        deviceId: deviceId,
      }),
    }
    actionJob.searchJobList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, id, deviceId])

  useEffect(() => {
    actions.getDetailMaintenancePlan(id)
    return () => actions.resetMaintenanceDetail()
  }, [id])

  const backToList = () => {
    history.push(
      withSearch(ROUTE.MAINTENANCE_PLAN.DETAIL.PATH.replace(':id', id)),
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.maintenancePlanDetailJob')}
      onBack={backToList}
      loading={isLoading}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12}>
                <Typography variant="h4" component="span">
                  {t('maintenancePlan.form.table.infoPlan')}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LV
                  label={t('maintenancePlan.form.status')}
                  value={
                    <Status
                      options={CREATE_PLAN_STATUS_OPTIONS}
                      value={maintenancePlanDetail?.status}
                    />
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintenancePlan.table.code')}
                  value={maintenancePlanDetail?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintenancePlan.table.name')}
                  value={maintenancePlanDetail?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintenancePlan.form.time')}
                  value={`${convertUtcDateToLocalTz(
                    maintenancePlanDetail?.planFrom,
                  )} - ${convertUtcDateToLocalTz(
                    maintenancePlanDetail?.planTo,
                  )}`}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h4" component="span">
                  {t('maintenancePlan.form.table.jobPlan')}
                </Typography>
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('general.placeholder.factoryName')}
                  value={maintenancePlanDetail?.factory?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintenancePlan.form.subTable.serial')}
                  value={state?.device?.serial}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintenancePlan.form.subTable.deviceName')}
                  value={state?.device?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintenancePlan.form.subTable.time')}
                  value={`${convertUtcDateToLocalTz(
                    state?.fromDate,
                  )} - ${convertUtcDateToLocalTz(state?.toDate)}`}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <JobSettingTable
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </Box>

        <ActionBar onBack={backToList} />
      </Paper>
    </Page>
  )
}

export default MaintenancePlanDetailJob
