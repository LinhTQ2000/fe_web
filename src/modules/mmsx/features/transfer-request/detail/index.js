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
import TextField from '~/components/TextField'
import {
  DEVICE_REQUEST_STATUS,
  DEVICE_REQUEST_STATUS_OPTIONS,
  TRANSFER_REQUEST_TYPE_MAP,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useTransferRequest from '~/modules/mmsx/redux/hooks/useTransferRequest'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import ItemSettingTable from '../form/itemSetting-table'

const TransferRequestDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { canAccess } = useApp()
  const { withSearch } = useQueryState()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE.TITLE,
    },
    {
      route: withSearch(ROUTE.TRANSFER_REQUEST.LIST.PATH),
      title: ROUTE.TRANSFER_REQUEST.LIST.TITLE,
    },
    {
      route: ROUTE.TRANSFER_REQUEST.DETAIL.PATH,
      title: ROUTE.TRANSFER_REQUEST.DETAIL.TITLE,
    },
  ]

  const {
    data: { transferRequestDetail, isLoading },
    actions,
  } = useTransferRequest()
  const refreshData = () => actions.getTransferRequestDetail(id)
  useEffect(() => {
    refreshData()
    return () => {
      actions.resetStateTransferRequest()
    }
  }, [id])
  const backToList = () => {
    history.push(withSearch(ROUTE.TRANSFER_REQUEST.LIST.PATH))
  }

  const onSubmitDelete = () => {
    actions.deleteTransferRequest(id, backToList)
    setIsOpenDeleteModal(false)
  }

  const submitConfirm = () => {
    actions.confirmTransferRequest(id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }

  const onSubmitRejected = () => {
    actions.rejectTransferRequest(id, () => {
      refreshData()
    })
    setIsOpenRejectedModal(false)
  }

  const actionBefore = () => {
    const isPending =
      transferRequestDetail?.status === DEVICE_REQUEST_STATUS.WAITING_APPROVE
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_TRANSFER_REQUEST}>
            <Button
              variant="outlined"
              icon="edit"
              onClick={() =>
                history.push(
                  ROUTE.TRANSFER_REQUEST.EDIT.PATH.replace(':id', id),
                )
              }
            >
              {t('general:common.update')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.DELETE_TRANSFER_REQUEST}>
            <Button
              variant="outlined"
              icon="delete"
              color="subText"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              {t('mmsx:common.delete')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.CONFIRM_TRANSFER_REQUEST}>
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
      title={t('menu.transferRequestDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (
              canAccess(FUNCTION_CODE.UPDATE_TRANSFER_REQUEST) &&
              transferRequestDetail?.status ===
                DEVICE_REQUEST_STATUS.WAITING_APPROVE
            )
              history.push(ROUTE.TRANSFER_REQUEST.EDIT.PATH.replace(':id', id))
          },
          onDelete: () => {
            if (
              canAccess(FUNCTION_CODE.DELETE_TRANSFER_REQUEST) &&
              transferRequestDetail?.status ===
                DEVICE_REQUEST_STATUS.WAITING_APPROVE
            ) {
              setIsOpenDeleteModal(true)
            }
          },
          onApprove: () => {
            if (
              canAccess(FUNCTION_CODE.CONFIRM_TRANSFER_REQUEST) &&
              transferRequestDetail?.status ===
                DEVICE_REQUEST_STATUS.WAITING_APPROVE
            ) {
              setIsOpenConfirmModal(true)
            }
          },
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('transferRequest.table.status')}
                value={
                  <Status
                    options={DEVICE_REQUEST_STATUS_OPTIONS}
                    value={transferRequestDetail?.status}
                  />
                }
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferRequest.form.field.code')}
                value={transferRequestDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferRequest.form.field.name')}
                value={transferRequestDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferRequest.form.field.deviceRequest')}
                value={transferRequestDetail?.request?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferRequest.table.type')}
                value={t(
                  TRANSFER_REQUEST_TYPE_MAP[transferRequestDetail?.type],
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferRequest.table.estimatedReturnDate')}
                value={convertUtcDateToLocalTz(
                  transferRequestDetail?.estimatedReturnDate,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferRequest.table.receivedFactory')}
                value={transferRequestDetail?.toFactory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferTicket.table.transferFactory')}
                value={transferRequestDetail?.fromFactory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferRequest.table.expectedTransferDay')}
                value={convertUtcDateToLocalTz(
                  transferRequestDetail?.estimatedTransferDate,
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('transferRequest.table.description')}
                multiline
                rows={3}
                value={transferRequestDetail?.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <ItemSettingTable
          items={transferRequestDetail?.deviceGroups || []}
          mode={MODAL_MODE.DETAIL}
        />
      </Box>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogDelete
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        tempItem={transferRequestDetail}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={transferRequestDetail}
      />
      <DialogReject
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={transferRequestDetail}
      />
    </Page>
  )
}

export default TransferRequestDetail
