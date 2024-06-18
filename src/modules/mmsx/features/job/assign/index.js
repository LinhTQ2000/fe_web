import React, { useEffect, useState } from 'react'

import { FormControlLabel, Grid, Paper, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  JOB_STATUS_LIST,
  JOB_STATUS_MAP,
  JOB_TYPE_MAP,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useJob from '~/modules/mmsx/redux/hooks/useJob'
import { getMemberMaintenanceTeamApi } from '~/modules/mmsx/redux/sagas/maintenance-team/get-member'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { validateSchema } from './schema'

const JobAssign = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const breadcrumbs = [
    {
      title: 'plan',
    },
    {
      route: withSearch(ROUTE.JOB.LIST.PATH),
      title: ROUTE.JOB.LIST.TITLE,
    },
    {
      route: ROUTE.JOB.ASSIGN.PATH.replace(':id', id),
      title: ROUTE.JOB.ASSIGN.TITLE,
    },
  ]
  const [openDialog, setOpenDialog] = useState(false)
  const [jobObj, setJobObj] = useState({})

  const {
    data: { jobDetail, isLoading },
    actions,
  } = useJob()

  useEffect(() => {
    actions.getJobDetail({ id })
    return () => {
      actions.resetJob()
    }
  }, [actions, id])

  const initialValues = {
    planDay: null,
    expectExecutionDate:
      jobDetail?.planFrom && jobDetail?.planTo
        ? [jobDetail?.planFrom, jobDetail.planTo]
        : null,
    assignId: null,
    isNeedAccept: false,
  }

  const handleSubmit = (values) => {
    const convertValues = {
      id,
      assignId: jobObj?.assignId?.id,
      planFrom: jobObj?.expectExecutionDate[0],
      planTo: jobObj?.expectExecutionDate[1],
      isNeedAccept: jobObj?.isNeedAccept,
      reason: values?.reason,
    }
    actions.assignJob(convertValues, () =>
      history.push(ROUTE.JOB.DETAIL.PATH.replace(':id', id)),
    )
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.JOB.LIST.PATH))
  }

  const histories = jobDetail?.histories?.map((item) => ({
    content: item?.content,
    createdAt: item?.createdAt,
    id: item?.userId,
    username: item?.userName,
  }))

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.jobAssign')}
      onBack={backToList}
      loading={isLoading}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema(t)}
          onSubmit={(val) => {
            setJobObj({ ...val })
            setOpenDialog(true)
          }}
          enableReinitialize
        >
          {({ handleReset }) => {
            return (
              <Form>
                <Grid container justifyContent="center">
                  <Grid item xl={11} xs={12}>
                    {/* thông tin công việc*/}
                    <Grid
                      container
                      rowSpacing={4 / 3}
                      columnSpacing={{ xl: 11, xs: 12 }}
                    >
                      <Grid item xs={12}>
                        <LV
                          label={t('job.status')}
                          value={
                            jobDetail?.isOverdue ? (
                              <Typography
                                component="span"
                                sx={{
                                  display: 'inline-block',
                                  color: 'error',
                                }}
                                variant="contained"
                              >
                                {t(JOB_STATUS_MAP[jobDetail?.status])} -{' '}
                                {t('common.statusList.overdue')}
                              </Typography>
                            ) : (
                              <Status
                                options={JOB_STATUS_LIST}
                                value={jobDetail?.status}
                              />
                            )
                          }
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.workCode')}
                          value={jobDetail?.code}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.workType')}
                          value={t(JOB_TYPE_MAP[jobDetail?.type])}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <LV
                          label={t('job.detail.description')}
                          value={jobDetail?.description}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* thông tin thiết bị */}
                <Grid
                  container
                  sx={(theme) => ({
                    justifyContent: 'center',
                    bgcolor: 'grayF4.main',
                    borderRadius: 1,
                    my: 2,
                    pt: 1,
                    pb: 2,
                    [theme.breakpoints.down('xl')]: {
                      px: 2,
                    },
                  })}
                  rowSpacing={4 / 3}
                >
                  <Grid item xl={11} xs={12}>
                    {/* thông tin công việc*/}
                    <Grid
                      container
                      rowSpacing={4 / 3}
                      columnSpacing={{ xl: 11, xs: 12 }}
                    >
                      <Grid item xs={12}>
                        <Typography variant="h3" mt={1}>
                          {t('job.detail.deviceInformation.title')}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.serial')}
                          value={jobDetail?.device?.serial}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.deviceName')}
                          value={jobDetail?.device?.name}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.deviceInformation.factory')}
                          value={jobDetail?.device?.factory?.name}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('job.detail.deviceInformation.area')}
                          value={jobDetail?.device?.area?.name}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* thông tin bảo trì */}
                <Grid container justifyContent="center">
                  <Grid item xl={11} xs={12}>
                    <Grid
                      container
                      rowSpacing={9 / 3}
                      columnSpacing={{ xl: 11, xs: 12 }}
                    >
                      <Grid item xs={12}>
                        <Typography variant="h3" mt={1}>
                          {t('job.detail.maintenanceInformation.title')}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="assignId"
                          label={t(
                            'job.detail.maintenanceInformation.assignUser',
                          )}
                          placeholder={t('suppliesCategory.responsibleUser')}
                          asyncRequest={(s) =>
                            getMemberMaintenanceTeamApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                              deviceId: jobDetail?.device?.id,
                            })
                          }
                          asyncRequestHelper={(res) => res?.data?.items}
                          getOptionLabel={(opt) => opt?.username}
                          asyncRequestDeps={jobDetail?.device?.id}
                          autoFetch={false}
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <FormControlLabel
                          control={<Field.Checkbox name="isNeedAccept" />}
                          label={t(
                            'job.detail.maintenanceInformation.canAcceptanceFromLeader',
                          )}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.DateRangePicker
                          name="expectExecutionDate"
                          label={t(
                            'job.detail.maintenanceInformation.expectExecutionDate',
                          )}
                          placeholder={t(
                            'job.detail.maintenanceInformation.expectExecutionDate',
                          )}
                          minDate={new Date()}
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.DateRangePicker
                          name="actualExcutionDate"
                          label={t(
                            'job.detail.maintenanceInformation.actualExcutionDate',
                          )}
                          placeholder={t('job.planDay')}
                          required
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <ActionBar
                  onBack={backToList}
                  onCancel={handleReset}
                  mode={MODAL_MODE.UPDATE}
                />
              </Form>
            )
          }}
        </Formik>
      </Paper>
      <Activities data={histories} />
      <Dialog
        open={openDialog}
        title={t('job.messageAssign')}
        onCancel={() => {
          setOpenDialog(false)
        }}
        cancelLabel={t('general:actionBar.cancel')}
        submitLabel={t('general:actionBar.accept')}
        submitProps={{
          color: 'primary',
        }}
        noBorderBottom
        formikProps={{
          initialValues: { reason: null },
          onSubmit: handleSubmit,
          enableReinitialize: true,
        }}
        renderDeps={jobObj}
      >
        <Field.TextField
          name="reason"
          label={t('job.comment')}
          placeholder={t('job.comment')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.REASON.MAX,
          }}
          multiline
          vertical
          rows={3}
        />
      </Dialog>
    </Page>
  )
}

export default JobAssign
