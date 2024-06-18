import React, { useEffect } from 'react'

import { Box, Card, Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ASYNC_SEARCH_LIMIT, NOTIFICATION_TYPE } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import {
  useDashboardDeviceUseByArea,
  useDashboardDeviceUsingStatus,
} from '~/modules/mmsx/redux/hooks/useDashboard'
import { searchAreaApi } from '~/modules/mmsx/redux/sagas/area/search'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { useClasses } from '~/themes'
import { convertFilterParams, convertUtcDateTimeToLocalTz } from '~/utils'
import addNotification from '~/utils/toast'

import DeviceDetail from '../device-detail'
import style from './style'

function DeviceUsingStatus({ factory }) {
  const { t } = useTranslation(['mmsx'])
  const classes = useClasses(style)
  const history = useHistory()

  const { data, actions } = useDashboardDeviceUsingStatus()

  const {
    data: dataByArea,
    actions: actionByArea,
    isLoading,
  } = useDashboardDeviceUseByArea()

  const handleSubmit = (val) => {
    actionByArea.getDeviceStatusUseByArea(
      {
        filter: convertFilterParams({
          areaIds: val?.areas.map((area) => area?.id).join(','),
          factoryIds: factory?.map((item) => item?.id),
        }),
      },
      (data) => {
        if (isEmpty(data)) {
          addNotification(
            t('general:message.noData'),
            NOTIFICATION_TYPE.WARNING,
          )
        }
      },
    )
  }

  useEffect(() => {
    actions.getDeviceUsingStatus({
      factoryIds: isEmpty(factory)
        ? undefined
        : factory?.map((item) => item?.id).toString(),
    })
  }, [factory])

  return (
    <Card sx={{ p: 2 }}>
      <Box className={classes.container}>
        <Typography variant="h2">
          {t('dashboard.deviceUsingStatus.title')}
        </Typography>
        <Typography variant="body2">
          {t('dashboard.deviceUsingStatus.exportDate')}
          {convertUtcDateTimeToLocalTz(new Date())}
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Formik
          initialValues={{ areas: [] }}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ handleReset }) => (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={20} xs={20}>
                  <Grid
                    container
                    columnSpacing={{ xl: 10, xs: 5 }}
                    rowSpacing={4 / 3}
                  >
                    <Grid item xs={20} lg={10}>
                      <Field.Autocomplete
                        name="areas"
                        placeholder={t('dashboard.areaFactory')}
                        asyncRequest={(s) =>
                          searchAreaApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              factoryIds: factory?.map((item) => item?.id),
                            }),
                            isMasterData: 0,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        asyncRequestDeps={factory}
                        getOptionLabel={(option) =>
                          `${option?.name} - ${option?.factory?.name}`
                        }
                        getOptionSubLabel={(option) => option?.code}
                        multiple
                      />
                    </Grid>
                    <Grid item xs={20} lg={10}>
                      <Button
                        variant="outlined"
                        color="subText"
                        onClick={() => {
                          actionByArea.resetDeviceStatusUseByArea()
                          handleReset()
                        }}
                      >
                        {t('general:common.cancel')}
                      </Button>
                      <Button
                        type="submit"
                        icon="filter"
                        sx={{ ml: 1 }}
                        loading={isLoading}
                      >
                        {t('general:common.filter')}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
      <Box className={classes.boxContainer}>
        <Grid container spacing={2}>
          <Grid item xs={20} lg={4} md={5}>
            <Box className="overall-background">
              <Box className="overall-text">
                <span className="oee-text">
                  {data?.total} {t('general.device')}
                </span>
              </Box>
            </Box>
          </Grid>
          <Grid item sx={20} lg={16} md={15} display="flex" alignItems="center">
            <Grid container spacing={2}>
              <Grid item xl={5} lg={5} xs={10} md={10}>
                <Box className="item">
                  <Box className="stt-box activation">{data?.totalActive}</Box>
                  <span className="status-text">
                    {t('dashboard.deviceUsingStatus.activating')}
                  </span>
                </Box>
              </Grid>
              <Grid item xl={5} lg={5} xs={10} md={10}>
                <Box className="item">
                  <Box className="stt-box stop">{data?.totalStop}</Box>
                  <span className="status-text">
                    {t('dashboard.deviceUsingStatus.stop')}
                  </span>
                </Box>
              </Grid>
              <Grid item xl={5} lg={5} xs={10} md={10}>
                <Box className="item">
                  <Box className="stt-box error">{data?.totalError}</Box>
                  <span className="status-text">
                    {t('dashboard.deviceUsingStatus.error')}
                  </span>
                </Box>
              </Grid>
              <Grid item xl={5} lg={5} xs={10} md={10}>
                <Box className="item">
                  <Box className="stt-box off-maintain">{data?.totalOff}</Box>
                  <span className="status-text">
                    {t('dashboard.deviceUsingStatus.off.maintain')}
                  </span>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex">
        <Button
          sx={{ ml: 'auto' }}
          onClick={() => {
            history.push(ROUTE.DEVICE_STATUS.LIST.PATH)
          }}
        >
          {t('dashboard.deviceUsingStatus.list')}
        </Button>
      </Box>
      <Box sx={{ mb: 2 }}>
        {dataByArea?.map((data) => (
          <DeviceDetail data={data} />
        ))}
      </Box>
    </Card>
  )
}

export default DeviceUsingStatus
