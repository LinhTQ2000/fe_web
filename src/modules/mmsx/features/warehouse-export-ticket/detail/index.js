import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min'

import { MODAL_MODE } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import ImportExport from '~/components/ImportExport'
import LabelValue from '~/components/LabelValue'
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
import useWarehouseExportTicket from '~/modules/mmsx/redux/hooks/useWarehouseExportTicket'
import { exportWarehouseExport } from '~/modules/mmsx/redux/sagas/warehouse-export-management/export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import ItemSettingTable from '../form/item-setting-table'

export default function WarehouseExportTicketDetail() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const {
    data: { isLoading, detail },
    actions,
  } = useWarehouseExportTicket()

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const { canAccess } = useApp()
  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE.TITLE,
    },
    {
      route: withSearch(ROUTE.WAREHOUSE_EXPORT_TICKET.LIST.PATH),
      title: ROUTE.WAREHOUSE_EXPORT_TICKET.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_EXPORT_TICKET.DETAIL.PATH,
      title: ROUTE.WAREHOUSE_EXPORT_TICKET.DETAIL.TITLE,
    },
  ]

  const refreshData = () => actions.getDetailWarehouseExportTicket(id)

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetState()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.WAREHOUSE_EXPORT_TICKET.LIST.PATH))
  }

  const onSubmitDelete = () => {
    actions.deleteWarehouseExportTicket(id, backToList)
    setIsOpenDeleteModal(false)
  }

  const submitConfirm = () => {
    actions.confirmWarehouseExportTicket(id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }
  const onSubmitRejected = () => {
    actions.rejectWarehouseExportTicket(id, () => {
      refreshData()
    })
    setIsOpenRejectedModal(false)
  }

  const actionBefore = () => {
    const isPending = detail?.status === WAREHOUSE_EXPORT_STATUS.PENDING
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_WAREHOUSE_EXPORT}>
            <Button
              variant="outlined"
              icon="edit"
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_EXPORT_TICKET.EDIT.PATH.replace(':id', id),
                )
              }
            >
              {t('general:common.update')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.DELETE_WAREHOUSE_EXPORT}>
            <Button
              variant="outlined"
              icon="delete"
              color="subText"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              {t('mmsx:common.delete')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.UPDATE_STATUS_WAREHOUSE_EXPORT}>
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
      <Guard code={FUNCTION_CODE.EXPORT_WAREHOUSE_EXPORT}>
        <ImportExport
          name={t('warehouseExportManagement.export')}
          title={t('common.printTicket')}
          onExport={() => exportWarehouseExport(id)}
        />
      </Guard>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseExportTicketDetail')}
      onBack={backToList}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (
              canAccess(FUNCTION_CODE.UPDATE_WAREHOUSE_EXPORT) &&
              detail?.status === WAREHOUSE_EXPORT_STATUS.PENDING
            )
              history.push(
                ROUTE.WAREHOUSE_EXPORT_TICKET.EDIT.PATH.replace(':id', id),
              )
          },
          onDelete: () => {
            if (
              canAccess(FUNCTION_CODE.DELETE_WAREHOUSE_EXPORT) &&
              detail?.status === WAREHOUSE_EXPORT_STATUS.PENDING
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
              <LabelValue
                label={t('general:common.status')}
                value={
                  <Status
                    options={WAREHOUSE_EXPORT_STATUS_OPTIONS}
                    value={detail?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportTicket.code')}
                value={detail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportTicket.name')}
                value={detail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportManagement.form.field.requestType')}
                value={t(
                  WAREHOUSE_EXPORT_REQUEST_TYPE_MAP[detail?.requestType],
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportManagement.code')}
                value={detail?.warehouseExportRequest?.code}
              />
            </Grid>
            {detail?.requestType ===
              WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST && (
              <>
                <Grid item lg={6} xs={12}>
                  <LabelValue
                    label={t('requestDevice.form.field.fromFactory')}
                    value={detail?.fromFactory?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LabelValue
                    label={t('requestDevice.form.field.toFactory')}
                    value={detail?.toFactory?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LabelValue
                    label={t('warehouseExportManagement.form.field.exportDate')}
                    value={convertUtcDateToLocalTz(detail?.planDate)}
                  />
                </Grid>
              </>
            )}
            {detail?.requestType ===
              WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST && (
              <>
                <Grid item lg={6} xs={12}>
                  <LabelValue
                    label={t('warehouseExportManagement.fromFactory')}
                    value={detail?.fromFactory?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LabelValue
                    label={t('warehouseExportManagement.table.exportWarehouse')}
                    value={detail?.warehouse?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LabelValue
                    label={t('warehouseExportManagement.form.field.exportDate')}
                    value={convertUtcDateToLocalTz(detail?.planDate)}
                  />
                </Grid>
              </>
            )}
            {detail?.requestType ===
              WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET && (
              <>
                <Grid item lg={6} xs={12}>
                  <LabelValue
                    label={t('transferTicket.table.transferFactory')}
                    value={detail?.fromFactory?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LabelValue
                    label={t('transferTicket.table.receivedFactory')}
                    value={detail?.toFactory?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LabelValue
                    label={t('warehouseExportManagement.form.field.exportDate')}
                    value={convertUtcDateToLocalTz(detail?.planDate)}
                  />
                </Grid>
              </>
            )}
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportTicket.exportDate')}
                value={convertUtcDateToLocalTz(detail?.exportDate)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportManagement.form.field.number')}
                value={detail?.number}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportManagement.form.field.debit')}
                value={detail?.debit}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportManagement.form.field.credit')}
                value={detail?.credit}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportManagement.form.field.reason')}
                value={detail?.reason}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportManagement.form.field.contractNum')}
                value={detail?.contractNum}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportManagement.form.field.symbol')}
                value={detail?.symbol}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportManagement.form.field.date')}
                value={convertUtcDateToLocalTz(detail?.date)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportManagement.form.field.gdiNo')}
                value={detail?.gdiNo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="note"
                label={t('warehouseImportManagement.form.field.note')}
                multiline
                rows={3}
                value={detail?.note}
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
            detail?.requestType === REQUEST_TYPE_EXPORT.PROVIDE_SUPPLY_REQUEST
              ? detail?.supplies
              : detail?.devices
          }
          mode={MODAL_MODE.DETAIL}
          values={detail}
        />
      </Box>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogDelete
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        tempItem={detail}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={detail}
      />
      <DialogReject
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={detail}
      />
    </Page>
  )
}
