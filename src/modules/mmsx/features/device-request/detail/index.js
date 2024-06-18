import React, { useEffect, useState } from 'react'

import { Box, Grid, Paper } from '@mui/material'
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
  TYPE_REQUEST,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useRequestDevice from '~/modules/mmsx/redux/hooks/useRequestDevice'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import ItemsTableRequest from '../form/item-setting-table'
import ItemsTableReturn from '../return-form/items-setting-table'

const RequestDeviceDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()

  const {
    data: { requestDeviceDetail, isLoading },
    actions,
  } = useRequestDevice()

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)

  const mode = MODAL_MODE.DETAIL
  const isReturnDevice = requestDeviceDetail?.type === TYPE_REQUEST.RETURN

  const renderBreadcrumbs = () => {
    const breadcrumbs = [
      {
        title: ROUTE.DEVICE_MANAGEMENT.TITLE,
      },
      {
        route: withSearch(ROUTE.REQUEST_DEVICE.LIST.PATH),
        title: ROUTE.REQUEST_DEVICE.LIST.TITLE,
      },
    ]

    breadcrumbs.push({
      route: ROUTE.REQUEST_DEVICE.DETAIL.PATH,
      title: isReturnDevice
        ? 'viewDetailReturnDevice'
        : ROUTE.REQUEST_DEVICE.DETAIL.TITLE,
    })

    return breadcrumbs
  }

  const refreshData = () => actions.getRequestDeviceDetail(id)

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetStateRequestDevice()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.REQUEST_DEVICE.LIST.PATH))
  }

  const onSubmitDelete = () => {
    actions.deleteRequestDevice(id, backToList)
    setIsOpenDeleteModal(false)
  }

  const submitReject = () => {
    const params = {
      id: id,
      action: 'rejected',
    }
    actions.changeStatusRequestDevice(params, refreshData)
    setIsOpenRejectModal(false)
  }

  const submitConfirm = () => {
    const params = {
      id: id,
      action: 'confirmed',
    }
    actions.changeStatusRequestDevice(params, refreshData)
    setIsOpenConfirmModal(false)
  }

  const actionBefore = () => {
    const isPending =
      requestDeviceDetail?.status === DEVICE_REQUEST_STATUS.WAITING_APPROVE
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          {requestDeviceDetail?.type === TYPE_REQUEST.REQUEST && (
            <Guard code={FUNCTION_CODE.UPDATE_DEVICE_REQUEST_TICKET}>
              <Button
                variant="outlined"
                icon="edit"
                onClick={() =>
                  history.push(
                    ROUTE.REQUEST_DEVICE.EDIT.PATH.replace(':id', id),
                  )
                }
              >
                {t('general:common.update')}
              </Button>
            </Guard>
          )}
          {requestDeviceDetail?.type === TYPE_REQUEST.RETURN && (
            <Guard code={FUNCTION_CODE.UPDATE_DEVICE_REQUEST_TICKET}>
              <Button
                variant="outlined"
                icon="edit"
                onClick={() =>
                  history.push(
                    ROUTE.REQUEST_DEVICE.RETURN_EDIT.PATH.replace(':id', id),
                  )
                }
              >
                {t('general:common.update')}
              </Button>
            </Guard>
          )}
          <Guard code={FUNCTION_CODE.DELETE_DEVICE_REQUEST_TICKET}>
            <Button
              variant="outlined"
              icon="delete"
              color="subText"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              {t('mmsx:common.delete')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.CONFIRM_DEVICE_REQUEST}>
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
      breadcrumbs={renderBreadcrumbs()}
      title={
        isReturnDevice
          ? t('requestDevice.form.viewDetailReturnDevice')
          : t('requestDevice.form.viewDetailRequestDevice')
      }
      onBack={backToList}
      loading={isLoading}
      freeSolo
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onDelete: () => setIsOpenDeleteModal(true),
          onApprove: () => setIsOpenConfirmModal(true),
          onReject: () => setIsOpenRejectModal(true),
          ...(requestDeviceDetail?.type === TYPE_REQUEST.REQUEST
            ? {
                onEdit: () => {
                  if (canAccess(FUNCTION_CODE.UPDATE_DEVICE_REQUEST_TICKET))
                    history.push(
                      ROUTE.REQUEST_DEVICE.EDIT.PATH.replace(':id', id),
                    )
                },
              }
            : {
                onEdit: () => {
                  if (canAccess(FUNCTION_CODE.UPDATE_DEVICE_REQUEST_TICKET))
                    history.push(
                      ROUTE.REQUEST_DEVICE.RETURN_EDIT.PATH.replace(':id', id),
                    )
                },
              }),
        }}
      />
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12}>
                <LV
                  label={t('requestDevice.category.status')}
                  value={
                    <Status
                      options={DEVICE_REQUEST_STATUS_OPTIONS}
                      value={requestDeviceDetail?.status}
                    />
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestDevice.form.field.code')}
                  value={requestDeviceDetail?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('requestDevice.form.field.name')}
                  value={requestDeviceDetail?.name}
                />
              </Grid>
              {!isReturnDevice && (
                <>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('requestDevice.form.field.toFactory')}
                      value={requestDeviceDetail?.factory?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('requestDevice.form.field.expectReturnDate')}
                      value={convertUtcDateToLocalTz(
                        requestDeviceDetail?.expectReturnDate,
                      )}
                    />
                  </Grid>
                </>
              )}
              {isReturnDevice && (
                <>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('requestDevice.form.field.transferTicket')}
                      value={requestDeviceDetail?.transferTicket?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('requestDevice.form.field.fromFactory')}
                      value={requestDeviceDetail?.fromFactory?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('requestDevice.form.field.toFactory')}
                      value={requestDeviceDetail?.toFactory?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('requestDevice.form.field.expectReturnDate')}
                      value={convertUtcDateToLocalTz(
                        requestDeviceDetail?.estimatedReturnDate,
                      )}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('requestDevice.form.field.actualReturnDate')}
                      value={
                        requestDeviceDetail?.expectReturnDate
                          ? convertUtcDateToLocalTz(
                              requestDeviceDetail?.expectReturnDate,
                            )
                          : null
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('requestDevice.form.field.description')}
                  multiline
                  rows={3}
                  value={requestDeviceDetail?.description}
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
        {!isReturnDevice && (
          <Box sx={{ mt: 3 }}>
            <ItemsTableRequest
              items={requestDeviceDetail?.deviceGroupRequest}
              mode={mode}
            />
          </Box>
        )}
        {isReturnDevice && (
          <Box sx={{ mt: 3 }}>
            <ItemsTableReturn
              items={requestDeviceDetail?.devices || []}
              mode={MODAL_MODE.DETAIL}
            />
          </Box>
        )}
        <ActionBar onBack={backToList} elBefore={actionBefore} />
        <DialogDelete
          open={isOpenDeleteModal}
          onCancel={() => setIsOpenDeleteModal(false)}
          onSubmit={onSubmitDelete}
          tempItem={requestDeviceDetail}
        />
        <DialogConfirm
          open={isOpenConfirmModal}
          onCancel={() => setIsOpenConfirmModal(false)}
          onSubmit={submitConfirm}
          tempItem={requestDeviceDetail}
        />
        <DialogReject
          open={isOpenRejectModal}
          onCancel={() => setIsOpenRejectModal(false)}
          onSubmit={submitReject}
          tempItem={requestDeviceDetail}
        />
      </Paper>
    </Page>
  )
}

export default RequestDeviceDetail
