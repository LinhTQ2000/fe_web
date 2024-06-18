import React, { useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import Page from '~/components/Page'
import {
  DashboardProvider,
  DashboardConsumer,
} from '~/contexts/DashboardContext'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { DASHBOARD_CHART, MMSX_DASHBOARD_CHART_OPTION } from '../../constants'
import { useDashboardDeviceUseByArea } from '../../redux/hooks/useDashboard'
import DeviceError from './components/device-error'
import DeviceStatus from './components/device-status'
import DeviceUsingStatus from './components/device-using-status'
import ItemSummary from './components/item-summary'
import JobHistory from './components/job-history'
import JobSummary from './components/job-summary'
import MaintainanceProgress from './components/maintainance-progress'
import TransferSummary from './components/transfer-summary'

const breadcrumbs = [
  {
    route: ROUTE.DASHBOARD.PATH,
    title: ROUTE.DASHBOARD.TITLE,
  },
]

function Dashboard() {
  const { t } = useTranslation(['mmsx'])
  const [factory, setFactory] = useState([])
  const { actions: actionByArea } = useDashboardDeviceUseByArea()

  return (
    <DashboardProvider chartOptions={MMSX_DASHBOARD_CHART_OPTION}>
      <DashboardConsumer>
        {({ isVisibleChart }) => (
          <Page title={t('dashboard.title')} breadcrumbs={breadcrumbs} freeSolo>
            <Grid container spacing={2} columns={20}>
              <Grid item xs={8}>
                <Autocomplete
                  placeholder={t('dashboard.factory')}
                  asyncRequest={(s) =>
                    searchFactoriesApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                    })
                  }
                  value={factory}
                  asyncRequestHelper={(res) => res?.data?.items}
                  getOptionLabel={(opt) => opt?.name}
                  getOptionSubLabel={(opt) => opt?.code}
                  onChange={(val) => {
                    setFactory(val)
                    actionByArea.resetDeviceStatusUseByArea()
                  }}
                  multiple
                />
              </Grid>
              <Grid item xs={20}>
                <ItemSummary factory={factory} />
              </Grid>
              {isVisibleChart(DASHBOARD_CHART.JOB_SUMMARY) && (
                <Grid item xs={20} lg={10} md={10}>
                  <JobSummary factory={factory} />
                </Grid>
              )}
              {isVisibleChart(DASHBOARD_CHART.JOB_SPEED) && (
                <Grid item xs={20} lg={10} md={10}>
                  <MaintainanceProgress factory={factory} />
                </Grid>
              )}
              {isVisibleChart(DASHBOARD_CHART.JOB_HISTORY) && (
                <Grid item xs={20} lg={10} md={10}>
                  <JobHistory factory={factory} />
                </Grid>
              )}
              {isVisibleChart(DASHBOARD_CHART.DEVICE_USAGE) && (
                <Grid item xs={20} lg={10} md={10}>
                  <DeviceStatus factory={factory} />
                </Grid>
              )}
              {isVisibleChart(DASHBOARD_CHART.DEVICE_ERROR) && (
                <Grid item xs={20}>
                  <DeviceError factory={factory} />
                </Grid>
              )}
              {isVisibleChart(DASHBOARD_CHART.TRANSFER_SUMMARY) && (
                <Grid item xs={20}>
                  <TransferSummary factory={factory} />
                </Grid>
              )}
              {isVisibleChart(DASHBOARD_CHART.DEVICE_STATUS) && (
                <Grid item xs={20}>
                  <DeviceUsingStatus factory={factory} />
                </Grid>
              )}
            </Grid>
          </Page>
        )}
      </DashboardConsumer>
    </DashboardProvider>
  )
}

export default Dashboard
