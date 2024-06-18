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
  REQUEST_TYPE_EXPORT,
  WAREHOUSE_EXPORT_REQUEST_TYPE,
  WAREHOUSE_EXPORT_REQUEST_TYPE_MAP,
  WAREHOUSE_EXPORT_STATUS,
  WAREHOUSE_EXPORT_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarehouseExportManagement from '~/modules/mmsx/redux/hooks/useWarehouseExportManagement'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import ItemSettingTable from '../form/itemSetting-table'

const WarehouseExportManagementDetail = () => {
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
      route: withSearch(ROUTE.WAREHOUSE_EXPORT_REQUEST.LIST.PATH),
      title: ROUTE.WAREHOUSE_EXPORT_REQUEST.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_EXPORT_REQUEST.DETAIL.PATH,
      title: ROUTE.WAREHOUSE_EXPORT_REQUEST.DETAIL.TITLE,
    },
  ]

  const {
    data: { warehouseExportManagementDetail, isLoading },
    actions,
  } = useWarehouseExportManagement()

  const refreshData = () => actions.getWarehouseExportManagementDetail(id)

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetStateWarehouseExportManagement()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.WAREHOUSE_EXPORT_REQUEST.LIST.PATH))
  }

  const onSubmitDelete = () => {
    actions.deleteWarehouseExportManagement(id, backToList)
    setIsOpenDeleteModal(false)
  }

  const submitConfirm = () => {
    actions.confirmWarehouseExportManagement(id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }

  const onSubmitRejected = () => {
    actions.rejectWarehouseExportManagement(id, () => {
      refreshData()
    })
    setIsOpenRejectedModal(false)
  }

  const actionBefore = () => {
    const isPending =
      warehouseExportManagementDetail?.status ===
      WAREHOUSE_EXPORT_STATUS.PENDING
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_WAREHOUSE_EXPORT_REQUEST}>
            <Button
              variant="outlined"
              icon="edit"
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_EXPORT_REQUEST.EDIT.PATH.replace(':id', id),
                )
              }
            >
              {t('general:common.update')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.DELETE_WAREHOUSE_EXPORT_REQUEST}>
            <Button
              variant="outlined"
              icon="delete"
              color="subText"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              {t('mmsx:common.delete')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.UPDATE_STATUS_WAREHOUSE_EXPORT_REQUEST}>
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
      title={t('menu.warehouseExportManagementDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (
              canAccess(FUNCTION_CODE.UPDATE_WAREHOUSE_EXPORT_REQUEST) &&
              warehouseExportManagementDetail?.status ===
                WAREHOUSE_EXPORT_STATUS.PENDING
            )
              history.push(
                ROUTE.WAREHOUSE_IMPORT_REQUEST.EDIT.PATH.replace(':id', id),
              )
          },
          onDelete: () => {
            if (
              canAccess(FUNCTION_CODE.DELETE_TRANSFER_REQUEST) &&
              warehouseExportManagementDetail?.status ===
                WAREHOUSE_EXPORT_STATUS.PENDING
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
                label={t('warehouseExportManagement.table.status')}
                value={
                  <Status
                    options={WAREHOUSE_EXPORT_STATUS_OPTIONS}
                    value={warehouseExportManagementDetail?.status}
                  />
                }
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportManagement.form.field.code')}
                value={warehouseExportManagementDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportManagement.form.field.name')}
                value={warehouseExportManagementDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportManagement.form.field.requestType')}
                value={t(
                  WAREHOUSE_EXPORT_REQUEST_TYPE_MAP[
                    warehouseExportManagementDetail?.requestType
                  ],
                )}
              />
            </Grid>
            {!Boolean(
              warehouseExportManagementDetail?.requestType ||
                warehouseExportManagementDetail?.requestType === 0,
            ) && (
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('warehouseExportManagement.form.field.exportDate')}
                  value={convertUtcDateToLocalTz(
                    warehouseExportManagementDetail?.exportDate,
                  )}
                />
              </Grid>
            )}
            {warehouseExportManagementDetail?.requestType ===
              WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST && (
              <>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t(
                      'warehouseExportManagement.form.field.requestCode',
                    )}
                    value={warehouseExportManagementDetail?.request?.code}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('warehouseExportManagement.form.field.exportDate')}
                    value={convertUtcDateToLocalTz(
                      warehouseExportManagementDetail?.exportDate,
                    )}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('requestDevice.form.field.fromFactory')}
                    value={warehouseExportManagementDetail?.fromFactory?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('requestDevice.form.field.toFactory')}
                    value={warehouseExportManagementDetail?.toFactory?.name}
                  />
                </Grid>
              </>
            )}
            {warehouseExportManagementDetail?.requestType ===
              WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST && (
              <>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t(
                      'warehouseExportManagement.form.field.requestCode',
                    )}
                    value={warehouseExportManagementDetail?.request?.code}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('warehouseExportManagement.form.field.exportDate')}
                    value={convertUtcDateToLocalTz(
                      warehouseExportManagementDetail?.exportDate,
                    )}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('requestDevice.form.field.fromFactory')}
                    value={warehouseExportManagementDetail?.fromFactory?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('warehouseExportManagement.table.exportWarehouse')}
                    value={warehouseExportManagementDetail?.warehouse?.name}
                  />
                </Grid>
              </>
            )}
            {warehouseExportManagementDetail?.requestType ===
              WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET && (
              <>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('transferTicket.form.field.code')}
                    value={warehouseExportManagementDetail?.request?.code}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('warehouseExportManagement.form.field.exportDate')}
                    value={convertUtcDateToLocalTz(
                      warehouseExportManagementDetail?.exportDate,
                    )}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('transferTicket.table.transferFactory')}
                    value={warehouseExportManagementDetail?.fromFactory?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('transferTicket.table.receivedFactory')}
                    value={warehouseExportManagementDetail?.toFactory?.name}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('warehouseExportManagement.table.description')}
                multiline
                rows={3}
                value={warehouseExportManagementDetail?.description}
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
          items={
            warehouseExportManagementDetail?.requestType ===
            REQUEST_TYPE_EXPORT.PROVIDE_SUPPLY_REQUEST
              ? warehouseExportManagementDetail?.supplies
              : warehouseExportManagementDetail?.devices
          }
          mode={MODAL_MODE.DETAIL}
          values={warehouseExportManagementDetail}
        />
      </Box>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogDelete
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        tempItem={warehouseExportManagementDetail}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={warehouseExportManagementDetail}
      />
      <DialogReject
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={warehouseExportManagementDetail}
      />
    </Page>
  )
}

export default WarehouseExportManagementDetail
