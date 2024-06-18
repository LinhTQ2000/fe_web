import React, { useEffect, useState } from 'react'

import { Box, FormControlLabel, Grid, Paper, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Checkbox from '~/components/Checkbox'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import {
  JOB_STATUS,
  JOB_STATUS_LIST,
  JOB_STATUS_MAP,
  JOB_TYPE,
  JOB_TYPE_MAP,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import Activities from '~/modules/mmsx/partials/Activities'
import useJob from '~/modules/mmsx/redux/hooks/useJob'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import DialogAccept from '../dialogs/accept'
import DialogConfirm from '../dialogs/confirm'
import DialogReject from '../dialogs/reject'
// import DialogUpdateStatus from '../dialogs/update-status'
import DialogUpdateTime from '../dialogs/update-time'
import ItemSettingTable from './item-setting-table'
import SupplyRequestTable from './supply-request'
import SupplyTable from './supply-table'

const JobDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const [isOpenNote, setIsOpenNote] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isAcceptance, setIsAcceptance] = useState(false)
  const [isUpdateTime, setIsUpdateTime] = useState(false)
  // const [isUpdateStatus, setIsUpdateStatus] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)

  const breadcrumbs = [
    {
      title: 'plan',
    },
    {
      route: withSearch(ROUTE.JOB.LIST.PATH),
      title: ROUTE.JOB.LIST.TITLE,
    },
    {
      route: ROUTE.JOB.DETAIL.PATH,
      title: ROUTE.JOB.DETAIL.TITLE,
    },
  ]

  const {
    data: { jobDetail, isLoading },
    actions,
  } = useJob()

  const refreshData = () => actions.getJobDetail({ id })

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetJob()
    }
  }, [actions, id])

  const backToList = () => {
    history.push(withSearch(ROUTE.JOB.LIST.PATH))
  }

  const histories = jobDetail?.histories?.map((item) => ({
    content: item?.content,
    createdAt: item?.createdAt,
    id: item?.userId,
    username: item?.userName,
    reason: item?.reason,
  }))

  const renderHeaderRight = () => {
    //BA confirn tạm thời ẩn button
    // return (
    //   <>
    //     <Box>
    //       <Button variant="outlined" sx={{ ml: 4 / 3 }}>
    //         {t('job.button.deviceButton')}
    //       </Button>
    //       <Button variant="outlined" sx={{ ml: 4 / 3 }}>
    //         {t('job.button.jobs')}
    //       </Button>
    //     </Box>
    //   </>
    // )
  }

  const onSubmitNote = (val) => {
    actions.noteJobDetail({ id, reason: val?.reason }, () =>
      setIsOpenNote(false),
    )
  }

  const actionBefore = () => {
    const status = jobDetail?.status
    const canUpdateJobTime = jobDetail?.canUpdateJobTime
    return (
      <Box sx={{ mr: 'auto' }}>
        {status === JOB_STATUS.IN_PROGRESS && (
          <Button
            variant="outlined"
            icon="tick"
            onClick={() => setIsOpenNote(true)}
          >
            {t('job.note')}
          </Button>
        )}
        {(status === JOB_STATUS.NON_ASSIGN || status === JOB_STATUS.REJECT) && (
          <Guard code={FUNCTION_CODE.ASSIGNMENT_JOB}>
            <Button
              variant="outlined"
              icon="assign"
              onClick={() =>
                history.push(ROUTE.JOB.ASSIGN.PATH.replace(':id', id))
              }
            >
              {t('deviceAssign.assignButton')}
            </Button>
          </Guard>
        )}
        {status === JOB_STATUS.WAIT_CONFIRM && (
          <Guard code={FUNCTION_CODE.UPDATE_STATUS_JOB}>
            <Button
              variant="outlined"
              icon="tick"
              color="success"
              onClick={() => setIsOpenConfirmModal(true)}
            >
              {t('general:common.accept')}
            </Button>
          </Guard>
        )}
        {[
          JOB_STATUS.WAIT_CONFIRM,
          JOB_STATUS.IN_PROGRESS,
          JOB_STATUS.RESOLVED,
        ].includes(status) && (
          <Guard code={FUNCTION_CODE.UPDATE_STATUS_JOB}>
            <Button
              variant="outlined"
              icon="remove"
              color="error"
              onClick={() => setIsOpenRejectModal(true)}
            >
              {t('general:common.reject')}
            </Button>
          </Guard>
        )}
        {status === JOB_STATUS.COMPLETED && (
          <Button
            variant="outlined"
            icon="checkDouble"
            onClick={() => setIsAcceptance(true)}
          >
            {t('job.acceptanceButton')}
          </Button>
        )}
        {canUpdateJobTime && (
          <Button
            variant="outlined"
            icon="clock"
            onClick={() => setIsUpdateTime(true)}
          >
            {t('job.updateTime')}
          </Button>
        )}
        {/* {[
          JOB_STATUS.WAIT_CONFIRM,
          JOB_STATUS.IN_PROGRESS,
          JOB_STATUS.RESOLVED,
          JOB_STATUS.COMPLETED,
        ].includes(status) && (
          <Button
            variant="outlined"
            icon="circularArrow"
            onClick={() => setIsUpdateStatus(true)}
          >
            {t('job.updateStatus')}
          </Button>
        )} */}
      </Box>
    )
  }

  const onSubmitUpdateTime = (val) => {
    actions.updateTimeJob(
      {
        executionTime: +val?.executionTime,
        stopTime: +val?.stopTime || null,
        id: id,
      },
      () => {
        setIsUpdateTime(false)
        refreshData()
      },
    )
  }

  const onSubmitAcceptance = (val) => {
    actions.approvedJob(
      {
        ...val,
        executionTime: +val?.executionTime,
        stopTime: +val?.stopTime || null,
        id: id,
      },
      () => {
        setIsAcceptance(false)
        refreshData()
      },
    )
  }

  const onSubmitUpdateJobStatus = (val) => {
    actions.updateJobStatus(
      { id: id, action: 'confirm', reason: val?.reason },
      () => {
        refreshData()
        setIsOpenConfirmModal(false)
      },
    )
  }

  const onSubmitRejectJob = (val) => {
    actions.updateJobStatus(
      { id: id, action: 'reject', reason: val?.reason },
      () => {
        refreshData()
        setIsOpenRejectModal(false)
      },
    )
  }

  // const onSubmitUpdateStatus = (val) => {
  //   actions.jobUpdateStatus({ status: +val?.status, id: id }, () => {
  //     refreshData()
  //     setIsUpdateStatus(false)
  //   })
  // }

  const renderFooter = () => {
    const { handleReset } = useFormikContext()
    return (
      <>
        <Button
          onClick={() => {
            handleReset()
            setIsAcceptance(false)
          }}
          color="grayF4"
          bold={false}
        >
          {t('general:common.cancel')}
        </Button>
        <Button
          onClick={() => {
            actions.reworkJob(id, () => {
              setIsAcceptance(false)
              refreshData()
            })
          }}
          variant="outlined"
        >
          {t('job.rework')}
        </Button>
        <Button type="submit">{t('general:common.accept')}</Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.jobDetail')}
      onBack={backToList}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
      freeSolo
    >
      <HotKeys
        handlers={{
          onBack: backToList,
        }}
      />
      <Paper sx={{ p: 2 }}>
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
                        {`${t(JOB_STATUS_MAP[jobDetail?.status])} - ${t(
                          'common.statusList.overdue',
                        )}`}
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
                <LV label={t('job.detail.workCode')} value={jobDetail?.code} />
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

        {/* Thông tin thiết bị */}
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
                  label={t('deviceList.identificationNo')}
                  value={jobDetail?.device?.identificationNo}
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

        {/* Thông tin bảo trì */}
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
                <LV
                  label={t('job.detail.maintenanceInformation.assignUser')}
                  value={jobDetail?.assign?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isNeedAccept"
                      checked={Boolean(jobDetail?.isNeedAccept)}
                      disabled
                    />
                  }
                  label={t(
                    'job.detail.maintenanceInformation.canAcceptanceFromLeader',
                  )}
                />
              </Grid>
              {!isNil(jobDetail?.executionTime) && (
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t(
                      'job.detail.maintenanceInformation.maintenanceTime',
                    )}
                    value={`${jobDetail?.executionTime} ${t(
                      'general:minutes',
                    )}`}
                  />
                </Grid>
              )}
              {![JOB_TYPE.INSTALL].includes(jobDetail?.type) &&
                jobDetail?.stopTime && (
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('job.detail.maintenanceInformation.stopTime')}
                      value={
                        jobDetail?.stopTime
                          ? `${jobDetail?.stopTime} ${t('general:minutes')}`
                          : ''
                      }
                    />
                  </Grid>
                )}
            </Grid>
          </Grid>
        </Grid>
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
        >
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12} lg={6}>
                <Typography variant="h4" mt={1}>
                  {t('job.detail.planDay')}
                </Typography>
                <LV
                  label={t('job.detail.fromDay')}
                  value={convertUtcDateToLocalTz(jobDetail?.planFrom)}
                  mt={4 / 3}
                />
                <LV
                  label={t('job.detail.toDay')}
                  value={convertUtcDateToLocalTz(jobDetail?.planTo)}
                  mt={4 / 3}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography variant="h4" mt={1}>
                  {t('job.detail.actualDay')}
                </Typography>
                <LV
                  label={t('job.detail.fromDay')}
                  value={convertUtcDateToLocalTz(jobDetail?.executionDateFrom)}
                  mt={4 / 3}
                />
                <LV
                  label={t('job.detail.toDay')}
                  value={convertUtcDateToLocalTz(jobDetail?.executionDateTo)}
                  mt={4 / 3}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {[
          JOB_TYPE.ACCREDITATION,
          JOB_TYPE.INSTALL,
          JOB_TYPE.PERIOD_CHECK,
        ].includes(jobDetail?.type) && (
          <>
            <ItemSettingTable />
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item xs={12} lg={6}>
                    <LV
                      label={t('job.detail.result')}
                      value={
                        jobDetail?.result?.result
                          ? t('jobList.checklistDetail.pass')
                          : t('jobList.checklistDetail.fail')
                      }
                      mt={4 / 3}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        {/* Table */}
        {[JOB_TYPE.SCHEDULE_MAINTAIN, JOB_TYPE.REQUEST].includes(
          jobDetail?.type,
        ) && (
          <Tabs
            list={[
              t('job.detail.titleSupply'),
              t('job.detail.titleSupplyRequest'),
            ]}
            sx={{ mt: 3 }}
          >
            <SupplyTable />
            <SupplyRequestTable />
          </Tabs>
        )}
        <ActionBar onBack={backToList} elBefore={actionBefore} />
      </Paper>
      <Activities data={histories} />
      <Dialog
        open={isOpenNote}
        title={t('job.note')}
        onCancel={() => setIsOpenNote(false)}
        cancelLabel={t('general:common.cancel')}
        submitLabel={t('general:common.accept')}
        noBorderBottom
        formikProps={{
          initialValues: { reason: '' },
          onSubmit: onSubmitNote,
          validationSchema: Yup.object().shape({
            reason: Yup.string().required(t('general:form.required')),
          }),
          enableReinitialize: true,
        }}
      >
        <Field.TextField
          vertical
          name="reason"
          label={t('job.comment')}
          placeholder={t('job.comment')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.REASON.MAX,
          }}
          multiline
          rows={3}
        />
      </Dialog>
      <DialogUpdateTime
        open={isUpdateTime}
        onCancel={() => {
          setIsUpdateTime(false)
        }}
        onSubmit={onSubmitUpdateTime}
        tempItem={jobDetail}
      />
      <DialogAccept
        open={isAcceptance}
        onCancel={() => {
          setIsAcceptance(false)
        }}
        renderDeps={jobDetail}
        renderFooter={renderFooter}
        onSubmit={onSubmitAcceptance}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={onSubmitUpdateJobStatus}
        tempItem={jobDetail}
      />
      <DialogReject
        open={isOpenRejectModal}
        onCancel={() => setIsOpenRejectModal(false)}
        onSubmit={onSubmitRejectJob}
        tempItem={jobDetail}
      />
      {/* <DialogUpdateStatus
        open={isUpdateStatus}
        onCancel={() => {
          setIsUpdateStatus(false)
        }}
        onSubmit={onSubmitUpdateStatus}
        tempItem={jobDetail}
      /> */}
    </Page>
  )
}

export default JobDetail
