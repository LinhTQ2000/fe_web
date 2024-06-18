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
  UPDATE_INVENTORY_STATUS,
  UPDATE_INVENTORY_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDeviceInventory from '~/modules/mmsx/redux/hooks/useDeviceInventory'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import ItemSettingTable from '../form/item-setting-table'

const DeviceInventoryDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE.TITLE,
    },
    {
      route: withSearch(ROUTE.DEVICE_INVENTORY.LIST.PATH),
      title: ROUTE.DEVICE_INVENTORY.LIST.TITLE,
    },
    {
      route: ROUTE.DEVICE_INVENTORY.DETAIL.PATH,
      title: ROUTE.DEVICE_INVENTORY.DETAIL.TITLE,
    },
  ]

  const {
    data: { deviceInventoryDetail, isLoading },
    actions,
  } = useDeviceInventory()

  const refreshData = () => actions.getDeviceInventoryDetail(id)
  const { canAccess } = useApp()

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetStateDeviceInventory()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.DEVICE_INVENTORY.LIST.PATH))
  }

  const formatData = deviceInventoryDetail?.deviceDetails?.map((d) => ({
    device: {
      ...d,
      factory: d?.oldFactory,
      warehouse: d?.oldWarehouse,
      area: d?.oldArea,
      status: d?.oldStatus,
    },
    updatedFactory: d?.factory,
    updatedWarehouse: d?.warehouse,
    updatedArea: d?.area,
    updatedStatus: d?.status,
  }))

  const onSubmitDelete = () => {
    actions.deleteDeviceInventory(id, backToList)
    setIsOpenDeleteModal(false)
  }

  const submitConfirm = () => {
    actions.confirmDeviceInventory(id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }

  const onSubmitRejected = () => {
    actions.rejectDeviceInventory(id, () => {
      refreshData()
    })
    setIsOpenRejectedModal(false)
  }

  const actionBefore = () => {
    const isPending =
      deviceInventoryDetail?.status === UPDATE_INVENTORY_STATUS.PENDING
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_UPDATE_INVENTORY}>
            <Button
              variant="outlined"
              icon="edit"
              onClick={() =>
                history.push(
                  ROUTE.DEVICE_INVENTORY.EDIT.PATH.replace(':id', id),
                )
              }
            >
              {t('general:common.update')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.DELETE_UPDATE_INVENTORY}>
            <Button
              variant="outlined"
              icon="delete"
              color="subText"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              {t('mmsx:common.delete')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.UPDATE_STATUS_UPDATE_INVENTORY}>
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
      title={t('menu.deviceInventoryDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (
              canAccess(FUNCTION_CODE.UPDATE_UPDATE_INVENTORY) &&
              deviceInventoryDetail?.status === UPDATE_INVENTORY_STATUS.PENDING
            )
              history.push(ROUTE.ATTRIBUTE_TYPE.EDIT.PATH.replace(':id', id))
          },
          onDelete: () => {
            if (
              canAccess(FUNCTION_CODE.DELETE_UPDATE_INVENTORY) &&
              deviceInventoryDetail?.status === UPDATE_INVENTORY_STATUS.PENDING
            ) {
              setIsOpenDeleteModal(true)
            }
          },
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('deviceInventory.status')}
                value={
                  <Status
                    options={UPDATE_INVENTORY_STATUS_OPTIONS}
                    value={deviceInventoryDetail?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('deviceInventory.requestCode')}
                value={deviceInventoryDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('deviceInventory.requestName')}
                value={deviceInventoryDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('deviceInventory.factory')}
                value={deviceInventoryDetail?.factory?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t('deviceInventory.description')}
                multiline
                value={deviceInventoryDetail?.description}
                rows={3}
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
        <ItemSettingTable items={formatData || []} mode={MODAL_MODE.DETAIL} />
      </Box>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogDelete
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        tempItem={deviceInventoryDetail}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={deviceInventoryDetail}
      />
      <DialogReject
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={deviceInventoryDetail}
      />
    </Page>
  )
}

export default DeviceInventoryDetail
