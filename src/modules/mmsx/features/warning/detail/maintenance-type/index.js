import React, { useEffect, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

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
  WARNING_STATUS,
  WARNING_STATUS_LIST,
  WARNING_TYPE_MAP,
  WARNING_TYPE_OPTION,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarningSystem from '~/modules/mmsx/redux/hooks/useWarningSystem'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import DialogConfirm from '../../dialogs/confirm'
import DialogReject from '../../dialogs/reject'
import ItemSettingTable from '../item-setting-table'

const WarningMaintenanceTypeDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const breadcrumbs = [
    {
      title: 'maintenance',
    },
    {
      route: withSearch(ROUTE.WARNING_SYSTEM.LIST.PATH),
      title: ROUTE.WARNING_SYSTEM.LIST.TITLE,
    },
    {
      route: ROUTE.WARNING_SYSTEM.DETAIL.PATH,
      title: ROUTE.WARNING_SYSTEM.DETAIL.TITLE,
    },
  ]

  const {
    data: { warningDetail, isLoading },
    actions,
  } = useWarningSystem()

  const refreshData = () => actions.getWarningDetail(id)
  useEffect(() => {
    refreshData()
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.WARNING_SYSTEM.LIST.PATH))
  }

  const onSubmitReject = (values) => {
    const params = {
      id: id,
      reason: values?.comment,
    }
    actions.rejectWarning(params, () => {
      refreshData()
    })
    setIsOpenRejectModal(false)
  }

  const submitConfirm = () => {
    actions.confirmWarning(id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }

  const isPending = warningDetail?.status === WARNING_STATUS.WAITING
  const actionBefore = () => {
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_STATUS_WARNING}>
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
      title={t('warningList.headerTitle.maintenanceType')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onApprove: () => {
            if (isPending && canAccess(FUNCTION_CODE.UPDATE_STATUS_WARNING))
              setIsOpenConfirmModal(true)
          },
          onReject: () => {
            if (isPending && canAccess(FUNCTION_CODE.UPDATE_STATUS_WARNING))
              setIsOpenRejectModal(true)
          },
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('errorWarning.form.status')}
                value={
                  <Status
                    options={WARNING_STATUS_LIST}
                    value={warningDetail?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warningList.formMaintenanceType.code')}
                value={warningDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warningList.formMaintenanceType.type')}
                value={t(`${WARNING_TYPE_MAP[warningDetail.type]}`)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warningList.formMaintenanceType.name')}
                value={warningDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(
                  'warningList.formMaintenanceType.scheduleMaintenanceDate',
                )}
                value={
                  warningDetail?.planDate
                    ? convertUtcDateToLocalTz(warningDetail?.planDate)
                    : null
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warningList.formMaintenanceType.description')}
                value={warningDetail?.description}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(
                  'warningList.formMaintenanceType.actualMaintenanceDate',
                )}
                value={convertUtcDateToLocalTz(
                  warningDetail?.actualExecutionDate,
                )}
              />
              <LV
                label={t('warningList.formMaintenanceType.completedDate')}
                value={convertUtcDateToLocalTz(warningDetail?.completedDate)}
                mt={4 / 3}
              />
            </Grid>
          </Grid>

          <Typography variant="h4" sx={{ my: 2 }}>
            {t('warningList.deviceInfo')}
          </Typography>
          <Grid container justifyContent="center">
            <Grid item xl={11} xs={12}>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('warningList.formMaintenanceType.serial')}
                    value={warningDetail?.device?.serial}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('deviceList.identificationNo')}
                    value={warningDetail?.device?.identificationNo}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('warningList.formMaintenanceType.deviceName')}
                    value={warningDetail?.device?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('warningList.formMaintenanceType.model')}
                    value={warningDetail?.device?.model}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('warningList.formMaintenanceType.area')}
                    value={warningDetail?.device?.area?.name}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {(warningDetail.type === WARNING_TYPE_OPTION.CHECKLIST ||
            warningDetail.type === WARNING_TYPE_OPTION.ACCREDITATION) && (
            <>
              <Box sx={{ mt: 3 }}>
                <ItemSettingTable items={warningDetail?.details || []} />
              </Box>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
                sx={{ mt: 1 }}
              >
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('warningList.result')}
                    value={
                      warningDetail?.result
                        ? t('jobList.checklistDetail.pass')
                        : t('jobList.checklistDetail.fail')
                    }
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={warningDetail}
      />
      <DialogReject
        open={isOpenRejectModal}
        onCancel={() => setIsOpenRejectModal(false)}
        onSubmit={onSubmitReject}
        tempItem={warningDetail}
      />
    </Page>
  )
}

export default WarningMaintenanceTypeDetail
