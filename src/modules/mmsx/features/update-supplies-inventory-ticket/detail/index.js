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
import useSuppliesInventory from '~/modules/mmsx/redux/hooks/useSuppliesInventory'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import ItemSettingTable from '../form/item-setting-table'

const SuppliesInventoryDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const { canAccess } = useApp()
  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE.TITLE,
    },
    {
      route: withSearch(ROUTE.SUPPLIES_INVENTORY.LIST.PATH),
      title: ROUTE.SUPPLIES_INVENTORY.LIST.TITLE,
    },
    {
      route: ROUTE.SUPPLIES_INVENTORY.DETAIL.PATH,
      title: ROUTE.SUPPLIES_INVENTORY.DETAIL.TITLE,
    },
  ]

  const {
    data: { suppliesInventoryDetail, isLoading },
    actions,
  } = useSuppliesInventory()

  const refreshData = () => actions.getSuppliesInventoryDetail(id)

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetStateSuppliesInventory()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.SUPPLIES_INVENTORY.LIST.PATH))
  }

  const formatData = suppliesInventoryDetail?.supplyDetails?.map((s) => ({
    ...s,
    supply: {
      ...s,
      assetName: s?.name,
      assetType: s?.type,
      stockQuantity: s?.oldQuantity,
    },
    updatedQuantity: s?.quantity,
  }))

  const onSubmitDelete = () => {
    actions.deleteSuppliesInventory(id, backToList)
    setIsOpenDeleteModal(false)
  }

  const submitConfirm = () => {
    actions.confirmSuppliesInventory(id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }

  const onSubmitRejected = () => {
    actions.rejectSuppliesInventory(id, () => {
      refreshData()
    })
    setIsOpenRejectedModal(false)
  }

  const actionBefore = () => {
    const isPending =
      suppliesInventoryDetail?.status === UPDATE_INVENTORY_STATUS.PENDING
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_UPDATE_INVENTORY}>
            <Button
              variant="outlined"
              icon="edit"
              onClick={() =>
                history.push(
                  ROUTE.SUPPLIES_INVENTORY.EDIT.PATH.replace(':id', id),
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
      title={t('menu.suppliesInventoryDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (
              canAccess(FUNCTION_CODE.UPDATE_UPDATE_INVENTORY) &&
              suppliesInventoryDetail?.status ===
                UPDATE_INVENTORY_STATUS.PENDING
            )
              history.push(ROUTE.ATTRIBUTE_TYPE.EDIT.PATH.replace(':id', id))
          },
          onDelete: () => {
            if (
              canAccess(FUNCTION_CODE.DELETE_UPDATE_INVENTORY) &&
              suppliesInventoryDetail?.status ===
                UPDATE_INVENTORY_STATUS.PENDING
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
                label={t('suppliesInventory.status')}
                value={
                  <Status
                    options={UPDATE_INVENTORY_STATUS_OPTIONS}
                    value={suppliesInventoryDetail?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('suppliesInventory.requestCode')}
                value={suppliesInventoryDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('suppliesInventory.requestName')}
                value={suppliesInventoryDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('suppliesInventory.factory')}
                value={suppliesInventoryDetail?.factory?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t('suppliesInventory.description')}
                multiline
                value={suppliesInventoryDetail?.description}
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
        tempItem={suppliesInventoryDetail}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={suppliesInventoryDetail}
      />
      <DialogReject
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={suppliesInventoryDetail}
      />
    </Page>
  )
}

export default SuppliesInventoryDetail
