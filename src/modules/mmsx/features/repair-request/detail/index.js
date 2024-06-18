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
  REPAIR_REQUEST_ACTION,
  REPAIR_REQUEST_PRIORITY_MAP,
  REPAIR_REQUEST_STATUS,
  REPAIR_REQUEST_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useRepairRequest from '~/modules/mmsx/redux/hooks/useRepairRequest'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogConfirm from '../dialogs/confirm'
import DialogReject from '../dialogs/reject'
import ItemSettingTable from '../form/item-setting-table'

const RepairRequestDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)

  const breadcrumbs = [
    {
      title: ROUTE.MAINTENANCE.TITLE,
    },
    {
      route: withSearch(ROUTE.REPAIR_REQUEST.LIST.PATH),
      title: ROUTE.REPAIR_REQUEST.LIST.TITLE,
    },
    {
      route: ROUTE.REPAIR_REQUEST.DETAIL.PATH,
      title: ROUTE.REPAIR_REQUEST.DETAIL.TITLE,
    },
  ]

  const {
    data: { repairRequestDetail, isLoading },
    actions,
  } = useRepairRequest()

  const mode = MODAL_MODE.DETAIL

  const refreshData = () => actions.getRepairRequestDetail(id)

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetStateRepairRequest()
    }
  }, [id])
  const backToList = () => {
    history.push(withSearch(ROUTE.REPAIR_REQUEST.LIST.PATH))
  }

  const submitReject = () => {
    const params = {
      id: id,
      action: REPAIR_REQUEST_ACTION.REJECTED,
    }
    actions.changeStatusRepairRequest(params, () => {
      refreshData()
    })
    setIsOpenRejectModal(false)
  }

  const submitConfirm = () => {
    const params = {
      id: id,
      action: REPAIR_REQUEST_ACTION.CONFIRMED,
    }
    actions.changeStatusRepairRequest(params, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }

  const isPending =
    repairRequestDetail?.status === REPAIR_REQUEST_STATUS.WAIT_APPROVE
  const actionBefore = () => {
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_REPAIR_REQUEST}>
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
              onClick={() => setIsOpenRejectModal(true)}
            >
              {t('general:common.reject')}
            </Button>
          </Guard>
        </Box>
      )
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.repairRequestDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onApprove: () => {
            if (isPending && canAccess(FUNCTION_CODE.UPDATE_REPAIR_REQUEST))
              setIsOpenConfirmModal(true)
          },
          onReject: () => {
            if (isPending && canAccess(FUNCTION_CODE.UPDATE_REPAIR_REQUEST))
              setIsOpenRejectModal(true)
          },
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('repairRequest.table.status')}
                value={
                  <Status
                    options={REPAIR_REQUEST_STATUS_OPTIONS}
                    value={repairRequestDetail?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('repairRequest.table.code')}
                value={repairRequestDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('repairRequest.table.name')}
                value={repairRequestDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('repairRequest.form.field.errorDescription')}
                value={repairRequestDetail?.description}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('repairRequest.form.field.errorType')}
                value={repairRequestDetail?.errorType?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('repairRequest.form.field.priority')}
                value={t(
                  REPAIR_REQUEST_PRIORITY_MAP[repairRequestDetail?.priority],
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12} />
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h3" sx={{ my: 2 }}>
        {t('repairRequest.deviceInfo')}
      </Typography>

      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('repairRequest.table.serial')}
                value={repairRequestDetail?.device?.serial}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('deviceList.identificationNo')}
                value={repairRequestDetail?.device?.identificationNo}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('repairRequest.table.deviceName')}
                value={repairRequestDetail?.device?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('repairRequest.form.field.model')}
                value={repairRequestDetail?.device?.model}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('repairRequest.table.area')}
                value={repairRequestDetail?.device?.area?.name}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <ItemSettingTable items={repairRequestDetail?.supplies} mode={mode} />
      </Box>

      <Typography variant="h4" sx={{ my: 2 }}>
        {t('repairRequest.machineInfo')}
      </Typography>

      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('repairRequest.form.field.maintainUser')}
                value={repairRequestDetail?.executedBy?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('repairRequest.form.field.shutdownTime')}
                value={`${repairRequestDetail?.stopTime || 0} ${t(
                  'repairRequest.minute',
                )}`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('repairRequest.form.field.maintainTime')}
                value={`${repairRequestDetail?.executionTime || 0} ${t(
                  'repairRequest.minute',
                )}`}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={repairRequestDetail}
      />
      <DialogReject
        open={isOpenRejectModal}
        onCancel={() => setIsOpenRejectModal(false)}
        onSubmit={submitReject}
        tempItem={repairRequestDetail}
      />
    </Page>
  )
}

export default RepairRequestDetail
