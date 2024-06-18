import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { Box } from '@mui/system'
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
  DEVICE_ASSIGN_STATUS,
  DEVICE_ASSIGN_STATUS_ENUM,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDeviceAssign from '~/modules/mmsx/redux/hooks/useDeviceAssign'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import TableItems from './table-items'

const DeviceAssignDetail = () => {
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
      title: ROUTE.DEVICE_MANAGEMENT.TITLE,
    },
    {
      route: withSearch(ROUTE.DEVICE_ASSIGN.LIST.PATH),
      title: ROUTE.DEVICE_ASSIGN.LIST.TITLE,
    },
    {
      route: ROUTE.DEVICE_ASSIGN.DETAIL.PATH,
      title: ROUTE.DEVICE_ASSIGN.DETAIL.TITLE,
    },
  ]

  const {
    data: { isLoading, deviceAssignDetail },
    actions,
  } = useDeviceAssign()

  const refreshData = () => actions.detailDeviceAssign(id)

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetDeviceAssignState()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.DEVICE_ASSIGN.LIST.PATH))
  }

  const onSubmitDelete = () => {
    actions.deleteDeviceAssign(id, backToList)
    setIsOpenDeleteModal(false)
  }

  const onSubmitRejected = () => {
    const params = {
      id: id,
      reason: null,
    }
    actions.rejectDeviceAssign(params, () => {
      refreshData()
    })
    setIsOpenRejectedModal(false)
  }

  const submitConfirm = () => {
    const params = {
      id: id,
      reason: null,
    }
    actions.confirmDeviceAssign(params, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }

  const actionBefore = () => {
    const isPending =
      deviceAssignDetail?.status === DEVICE_ASSIGN_STATUS_ENUM.WAIT_CONFIRM
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_DEVICE_ASSIGNMENT}>
            <Button
              variant="outlined"
              icon="edit"
              onClick={() =>
                history.push(ROUTE.DEVICE_ASSIGN.EDIT.PATH.replace(':id', id))
              }
            >
              {t('general:common.update')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.DELETE_DEVICE_ASSIGNMENT}>
            <Button
              variant="outlined"
              icon="delete"
              color="subText"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              {t('mmsx:common.delete')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.UPDATE_STATUS_DEVICE_ASSIGNMENT}>
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

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceAssignDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_DEVICE_GROUP))
              history.push(ROUTE.DEVICE_ASSIGN.EDIT.PATH.replace(':id', id))
          },
          onDelete: () => setIsOpenDeleteModal(true),
          onApprove: () => setIsOpenConfirmModal(true),
          onReject: () => setIsOpenRejectedModal(true),
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('deviceAssign.assign.status')}
                value={
                  <Status
                    options={DEVICE_ASSIGN_STATUS}
                    value={deviceAssignDetail?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('deviceAssign.assign.code')}
                value={deviceAssignDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('deviceAssign.assign.assignCode')}
                value={deviceAssignDetail?.deviceRequest?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('deviceAssign.assign.assignDate')}
                value={convertUtcDateToLocalTz(deviceAssignDetail?.assignDate)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('deviceAssign.assign.factory')}
                value={deviceAssignDetail?.factory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('deviceAssign.assign.usageUser')}
                value={deviceAssignDetail?.assignUser}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <TableItems
          items={deviceAssignDetail?.details || []}
          mode={MODAL_MODE.DETAIL}
        />
      </Box>

      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogDelete
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        tempItem={deviceAssignDetail}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={deviceAssignDetail}
      />
      <DialogReject
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={deviceAssignDetail}
      />
    </Page>
  )
}

export default DeviceAssignDetail
