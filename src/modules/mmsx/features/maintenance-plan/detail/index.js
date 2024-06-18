import React, { useEffect, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  CREATE_PLAN_STATUS,
  CREATE_PLAN_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useMaintenancePlan from '~/modules/mmsx/redux/hooks/useMaintenancePlan'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import ItemSettingTable from '../form/item-setting-table'
// import JobSettingTable from './job-setting-table'

const MaintenancePlanDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)

  const breadcrumbs = [
    {
      title: 'plan',
    },
    {
      route: withSearch(ROUTE.MAINTENANCE_PLAN.LIST.PATH),
      title: ROUTE.MAINTENANCE_PLAN.LIST.TITLE,
    },
    {
      route: ROUTE.MAINTENANCE_PLAN.DETAIL.PATH,
      title: ROUTE.MAINTENANCE_PLAN.DETAIL.TITLE,
    },
  ]

  const {
    data: { isLoading, maintenancePlanDetail },
    actions,
  } = useMaintenancePlan()

  const refreshData = () => actions.getDetailMaintenancePlan(id)

  useEffect(() => {
    refreshData()
    return () => actions.resetMaintenanceDetail()
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.MAINTENANCE_PLAN.LIST.PATH))
  }
  const isPending = maintenancePlanDetail?.status === CREATE_PLAN_STATUS.PENDING

  const actionBefore = () => {
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_MAINTENANCE_PLAN}>
            <Button
              variant="outlined"
              icon="edit"
              onClick={() =>
                history.push(
                  ROUTE.MAINTENANCE_PLAN.EDIT.PATH.replace(':id', id),
                )
              }
            >
              {t('general:common.update')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.DELETE_MAINTENANCE_PLAN}>
            <Button
              variant="outlined"
              icon="delete"
              color="subText"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              {t('mmsx:common.delete')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.UPDATE_STATUS_MAINTENANCE_PLAN}>
            <Button
              variant="outlined"
              icon="tick"
              color="success"
              onClick={() => setIsOpenConfirmModal(true)}
            >
              {t('general:common.accept')}
            </Button>
            <Button
              variant="outlined"
              icon="remove"
              color="error"
              onClick={() => setIsOpenRejectedModal(true)}
            >
              {t('general:common.reject')}
            </Button>
          </Guard>
        </Box>
      )
    )
  }

  const renderHeaderRight = () => {
    return (
      <Guard code={FUNCTION_CODE.GANTT_CHART_PLAN}>
        <Button
          onClick={() =>
            history.push(
              ROUTE.MAINTENANCE_PLAN.GANNT_CHART.PATH.replace(':id', id),
            )
          }
          icon="ganttChart"
          sx={{ ml: 4 / 3 }}
          variant="outlined"
          disabled={
            maintenancePlanDetail?.status !== CREATE_PLAN_STATUS.CONFIRMED
          }
        >
          {t('jobList.button.ganttChart')}
        </Button>
      </Guard>
    )
  }

  const onSubmitRejected = () => {
    const params = {
      id: id,
      action: 'reject',
    }
    actions.changeStatusMaintenancePlan(params, () => {
      refreshData()
    })
    setIsOpenRejectedModal(false)
  }

  const onSubmitDelete = () => {
    actions.deleteMaintenancePlan(id, backToList)
    setIsOpenDeleteModal(false)
  }

  const submitConfirm = () => {
    const params = {
      id: id,
      action: 'confirm',
    }
    actions.changeStatusMaintenancePlan(params, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.maintenancePlanDetail')}
      onBack={backToList}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
    >
      <HotKeys
        handlers={{
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_MAINTENANCE_PLAN) && isPending)
              history.push(ROUTE.MAINTENANCE_PLAN.EDIT.PATH.replace(':id', id))
          },
          onBack: backToList,
          onDelete: () => {
            if (canAccess(FUNCTION_CODE.DELETE_MAINTENANCE_PLAN) && isPending)
              setIsOpenDeleteModal(true)
          },
          onApprove: () => {
            if (
              canAccess(FUNCTION_CODE.UPDATE_STATUS_MAINTENANCE_PLAN) &&
              isPending
            )
              setIsOpenConfirmModal(true)
          },
          onReject: () => {
            if (
              canAccess(FUNCTION_CODE.UPDATE_STATUS_MAINTENANCE_PLAN) &&
              isPending
            )
              setIsOpenRejectedModal(true)
          },
        }}
      />
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
                )} - ${convertUtcDateToLocalTz(maintenancePlanDetail?.planTo)}`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('general.placeholder.factoryName')}
                value={maintenancePlanDetail?.factory?.name}
              />
            </Grid>
            {/*<Grid item xs={12}>
                <Typography variant="h4" component="span">
                  {t('maintenancePlan.form.table.jobPlan')}
                </Typography>
              </Grid>
               {maintenancePlanDetail?.status === 0 && (
                <>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('general.placeholder.factoryName')}
                      value={maintenancePlanDetail?.factoryName}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('maintenancePlan.form.subTable.serial')}
                      value={maintenancePlanDetail?.workCenterName}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('maintenancePlan.form.subTable.deviceName')}
                      value={maintenancePlanDetail?.workCenterName}
                    />
                  </Grid>
                </>
              )} */}
          </Grid>
        </Grid>
      </Grid>
      {/* {maintenancePlanDetail?.status === 0 && (
          <Box sx={{ mt: 2 }}>
            <JobSettingTable
              items={maintenancePlanDetail?.devices || []}
              mode={MODAL_MODE.DETAIL}
            />
          </Box>
        )} */}
      <Grid item xs={12} mt={5}>
        <Typography variant="h4" component="span">
          {t('maintenancePlan.form.table.deviceList')}
        </Typography>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <ItemSettingTable
          items={maintenancePlanDetail?.details || []}
          mode={MODAL_MODE.DETAIL}
          status={maintenancePlanDetail?.status}
          idPlan={id}
        />
      </Box>

      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogDelete
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        tempItem={maintenancePlanDetail}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={maintenancePlanDetail}
      />
      <DialogReject
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={maintenancePlanDetail}
      />
    </Page>
  )
}

export default MaintenancePlanDetail
