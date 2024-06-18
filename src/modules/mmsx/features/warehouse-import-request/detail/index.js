import { useEffect, useMemo, useState } from 'react'

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
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  WAREHOUSE_EXPORT_STATUS,
  WAREHOUSE_EXPORT_STATUS_OPTIONS,
  WAREHOUSE_IMPORT_REQUEST_TYPE,
  WAREHOUSE_IMPORT_REQUEST_TYPE_MAP,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarehouseImportRequest from '~/modules/mmsx/redux/hooks/useWarehouseImportRequest'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import ItemSettingTable from '../form/item-setting-table'

export default function WarehouseImportRequestDetail() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const { canAccess } = useApp()
  const {
    data: { isLoading, detail },
    actions,
  } = useWarehouseImportRequest()

  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE.TITLE,
    },
    {
      route: withSearch(ROUTE.WAREHOUSE_IMPORT_REQUEST.LIST.PATH),
      title: ROUTE.WAREHOUSE_IMPORT_REQUEST.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_IMPORT_REQUEST.DETAIL.PATH,
      title: ROUTE.WAREHOUSE_IMPORT_REQUEST.DETAIL.TITLE,
    },
  ]

  const backToList = () => {
    history.push(withSearch(ROUTE.WAREHOUSE_IMPORT_REQUEST.LIST.PATH))
  }

  const refreshData = () => actions.getDetailWarehouseImportRequest(id)

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetState()
    }
  }, [id])

  const items = useMemo(() => {
    switch (detail?.requestType) {
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
        return detail?.devices
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST:
        return detail?.supplies
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST:
        return detail?.deviceGroups
      default:
        return []
    }
  }, [detail])

  const onSubmitDelete = () => {
    actions.deleteWarehouseImportRequest(id, backToList)
    setIsOpenDeleteModal(false)
  }

  const submitConfirm = () => {
    actions.confirmWarehouseImportRequest(id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }

  const onSubmitRejected = () => {
    actions.rejectWarehouseImportRequest(id, () => {
      refreshData()
    })
    setIsOpenRejectedModal(false)
  }

  const actionBefore = () => {
    const isPending = detail?.status === WAREHOUSE_EXPORT_STATUS.PENDING
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_WAREHOUSE_IMPORT_REQUEST}>
            <Button
              variant="outlined"
              icon="edit"
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_IMPORT_REQUEST.EDIT.PATH.replace(':id', id),
                )
              }
            >
              {t('general:common.update')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.DELETE_WAREHOUSE_IMPORT_REQUEST}>
            <Button
              variant="outlined"
              icon="delete"
              color="subText"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              {t('mmsx:common.delete')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.UPDATE_STATUS_WAREHOUSE_IMPORT_REQUEST}>
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
      title={t('menu.warehouseImportRequestDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (
              canAccess(FUNCTION_CODE.UPDATE_WAREHOUSE_IMPORT_REQUEST) &&
              detail?.status === WAREHOUSE_EXPORT_STATUS.PENDING
            )
              history.push(
                ROUTE.WAREHOUSE_IMPORT_REQUEST.EDIT.PATH.replace(':id', id),
              )
          },
          onDelete: () => {
            if (
              canAccess(FUNCTION_CODE.DELETE_TRANSFER_REQUEST) &&
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
                label={t('warehouseExportManagement.code')}
                value={detail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportManagement.name')}
                value={detail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseExportManagement.form.field.requestType')}
                value={t(
                  WAREHOUSE_IMPORT_REQUEST_TYPE_MAP[detail?.requestType],
                )}
              />
            </Grid>
            {detail?.requestType ===
              WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST && (
              <>
                <Grid item xs={12} lg={6}>
                  <LabelValue
                    label={t(
                      'warehouseExportManagement.form.field.requestCode',
                    )}
                    value={detail?.request?.code}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LabelValue
                    label={t('warehouseExportManagement.fromFactory')}
                    value={detail?.fromFactory?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LabelValue
                    label={t('requestDevice.form.field.toFactory')}
                    value={detail?.toFactory?.name}
                  />
                </Grid>
              </>
            )}
            {detail?.requestType ===
              WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST && (
              <>
                <Grid item xs={12} lg={6}>
                  <LabelValue
                    label={t(
                      'warehouseExportManagement.form.field.requestCode',
                    )}
                    value={detail?.request?.code}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LabelValue
                    label={t('requestDevice.form.field.toFactory')}
                    value={detail?.toFactory?.name}
                  />
                </Grid>
              </>
            )}
            {[
              WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST,
              WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST,
            ].includes(detail?.requestType) && (
              <>
                <Grid item xs={12} lg={6}>
                  <LabelValue
                    label={t('warehouseImportRequest.ticketName')}
                    value={detail?.requestCode}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LabelValue
                    label={t('requestDevice.form.field.toFactory')}
                    value={detail?.toFactory?.name}
                  />
                </Grid>
              </>
            )}
            {detail?.requestType ===
              WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET && (
              <>
                <Grid item xs={12} lg={6}>
                  <LabelValue
                    label={t('transferTicket.form.field.code')}
                    value={detail?.request?.code}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LabelValue
                    label={t('transferTicket.table.transferFactory')}
                    value={detail?.fromFactory?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LabelValue
                    label={t('transferTicket.table.receivedFactory')}
                    value={detail?.toFactory?.name}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('warehouseImportRequest.warehouse')}
                value={detail?.warehouse?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('warehouseImportRequest.importDate')}
                value={convertUtcDateToLocalTz(detail?.importDate)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('warehouseExportManagement.table.description')}
                multiline
                rows={3}
                value={detail?.description}
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
          items={items}
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
