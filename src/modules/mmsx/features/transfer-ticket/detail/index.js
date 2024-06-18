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
import Tabs from '~/components/Tabs'
import {
  TRANSFER_TICKET_STATUS_OPTIONS,
  TRANSFER_REQUEST_TYPE_MAP,
  DEVICE_REQUEST_STATUS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useTransferTicket from '~/modules/mmsx/redux/hooks/useTransferTicket'
import { getTransferRequestDetailApi } from '~/modules/mmsx/redux/sagas/transfer-request/get-transfer-request-detail'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import InfoTable from '../form/info-table'
import ItemSettingTable from '../form/itemSetting-table'

const TransferTicketDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [deviceGroupTransfers, setDeviceGroupTransfers] = useState([])
  const { canAccess } = useApp()
  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE.TITLE,
    },
    {
      route: withSearch(ROUTE.TRANSFER_TICKET.LIST.PATH),
      title: ROUTE.TRANSFER_TICKET.LIST.TITLE,
    },
    {
      route: ROUTE.TRANSFER_TICKET.DETAIL.PATH,
      title: ROUTE.TRANSFER_TICKET.DETAIL.TITLE,
    },
  ]

  const {
    data: { transferTicketDetail, isLoading },
    actions,
  } = useTransferTicket()
  const refreshData = () => actions.getTransferTicketDetail(id)

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetStateTransferTicket()
    }
  }, [id])

  useEffect(() => {
    const fetchList = async () => {
      const res = await getTransferRequestDetailApi(
        transferTicketDetail?.transferRequest?.id,
      )
      if (res?.statusCode === 200) {
        setDeviceGroupTransfers(res?.data?.deviceGroups)
      }
    }
    if (transferTicketDetail?.transferRequest?.id) {
      fetchList()
    }
  }, [transferTicketDetail])

  const backToList = () => {
    history.push(withSearch(ROUTE.TRANSFER_TICKET.LIST.PATH))
  }

  const onSubmitDelete = () => {
    actions.deleteTransferTicket(id, backToList)
    setIsOpenDeleteModal(false)
  }

  const submitConfirm = () => {
    actions.confirmTransferTicket(id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }

  const onSubmitRejected = () => {
    actions.rejectTransferTicket(id, () => {
      refreshData()
    })
    setIsOpenRejectedModal(false)
  }

  const actionBefore = () => {
    const isPending =
      transferTicketDetail?.status === DEVICE_REQUEST_STATUS.WAITING_APPROVE
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_TRANSFER_TICKET}>
            <Button
              variant="outlined"
              icon="edit"
              onClick={() =>
                history.push(ROUTE.TRANSFER_TICKET.EDIT.PATH.replace(':id', id))
              }
            >
              {t('general:common.update')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.DELETE_TRANSFER_TICKET}>
            <Button
              variant="outlined"
              icon="delete"
              color="subText"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              {t('mmsx:common.delete')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.CONFIRM_TRANSFER_TICKET}>
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
      title={t('menu.transferTicketDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (
              canAccess(FUNCTION_CODE.UPDATE_TRANSFER_TICKET) &&
              transferTicketDetail?.status === DEVICE_REQUEST_STATUS.PENDING
            )
              history.push(ROUTE.TRANSFER_TICKET.EDIT.PATH.replace(':id', id))
          },
          onDelete: () => {
            if (
              canAccess(FUNCTION_CODE.DELETE_TRANSFER_REQUEST) &&
              transferTicketDetail?.status === DEVICE_REQUEST_STATUS.PENDING
            ) {
              setIsOpenDeleteModal(true)
            }
          },
          onApprove: () => {
            if (
              canAccess(FUNCTION_CODE.CONFIRM_TRANSFER_REQUEST) &&
              transferTicketDetail?.status === DEVICE_REQUEST_STATUS.PENDING
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
                label={t('transferTicket.table.status')}
                value={
                  <Status
                    options={TRANSFER_TICKET_STATUS_OPTIONS}
                    value={transferTicketDetail?.status}
                  />
                }
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferTicket.form.field.code')}
                value={transferTicketDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferTicket.form.field.name')}
                value={transferTicketDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferTicket.table.transferName')}
                value={transferTicketDetail?.transferRequest?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferTicket.table.type')}
                value={t(
                  TRANSFER_REQUEST_TYPE_MAP[
                    transferTicketDetail?.transferRequest?.type
                  ],
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferTicket.table.transferDay')}
                value={convertUtcDateToLocalTz(
                  transferTicketDetail?.transferDate,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferTicket.table.estimatedReturnDate')}
                value={convertUtcDateToLocalTz(
                  transferTicketDetail?.estimatedReturnDate,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferTicket.table.transferFactory')}
                value={transferTicketDetail?.fromFactory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('transferTicket.table.receivedFactory')}
                value={transferTicketDetail?.toFactory?.name}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}></Box>
      <Tabs
        list={[
          t('transferTicket.transferDevice'),
          t('transferTicket.transferInfo'),
        ]}
        sx={{ mt: 3 }}
      >
        <ItemSettingTable
          items={transferTicketDetail?.devices || []}
          mode={MODAL_MODE.DETAIL}
        />
        <InfoTable items={deviceGroupTransfers} />
      </Tabs>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogDelete
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        tempItem={transferTicketDetail}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={transferTicketDetail}
      />
      <DialogReject
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={transferTicketDetail}
      />
    </Page>
  )
}

export default TransferTicketDetail
