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
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import {
  WAREHOUSE_IMPORT_STATUS_OPTIONS,
  WAREHOUSE_IMPORT_STATUS,
  WAREHOUSE_IMPORT_REQUEST_TYPE_MAP,
  WAREHOUSE_IMPORT_REQUEST_TYPE,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarehouseImportManagement from '~/modules/mmsx/redux/hooks/useWarehouseImportManagement'
import { exportWarehouseImport } from '~/modules/mmsx/redux/sagas/warehouse-export-management/export'
import { getWarehouseImportRequestDetailsApi } from '~/modules/mmsx/redux/sagas/warehouse-import-request/get-detail'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import BuyInfoTable from '../form/buy-info-table'
import ItemSettingTable from '../form/item-setting-table'

const WarehouseImportManagementDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [deviceGroups, setDeviceGroups] = useState([])

  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE.TITLE,
    },
    {
      route: withSearch(ROUTE.WAREHOUSE_IMPORT_TICKET.LIST.PATH),
      title: ROUTE.WAREHOUSE_IMPORT_TICKET.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_IMPORT_TICKET.DETAIL.PATH,
      title: ROUTE.WAREHOUSE_IMPORT_TICKET.DETAIL.TITLE,
    },
  ]

  const {
    data: { warehouseImportManagementDetail, isLoading },
    actions,
  } = useWarehouseImportManagement()
  const { canAccess } = useApp()
  const refreshData = () => actions.getWarehouseImportManagementDetail(id)

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetStateWarehouseImportManagement()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.WAREHOUSE_IMPORT_TICKET.LIST.PATH))
  }

  const convertItems = () => {
    switch (warehouseImportManagementDetail?.requestType) {
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST:
        return warehouseImportManagementDetail?.devices
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST:
        return warehouseImportManagementDetail?.supplies
      default:
        return []
    }
  }

  useEffect(() => {
    const fetchList = async () => {
      const res = await getWarehouseImportRequestDetailsApi(
        warehouseImportManagementDetail?.warehouseImportRequest?.id,
      )
      if (res?.statusCode === 200) {
        const deviceGroups =
          res?.data?.deviceGroups.map((e) => ({
            ...e,
            remainQuantity:
              (e.quantity || e.requestQuantity) - e.importedQuantity || 0,
          })) || []
        setDeviceGroups(deviceGroups)
      }
    }
    if (
      warehouseImportManagementDetail?.requestType ===
      WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST
    ) {
      fetchList()
    }
  }, [warehouseImportManagementDetail])

  const renderHeaderRight = () => {
    return (
      <Guard code={FUNCTION_CODE.EXPORT_WAREHOUSE_IMPORT}>
        <ImportExport
          name={t('warehouseImportManagement.export')}
          title={t('common.printTicket')}
          onExport={() => exportWarehouseImport(id)}
        />
      </Guard>
    )
  }

  const onSubmitDelete = () => {
    actions.deleteWarehouseImportManagement(id, backToList)
    setIsOpenDeleteModal(false)
  }

  const submitConfirm = () => {
    actions.confirmWarehouseImportManagement(id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }

  const onSubmitRejected = () => {
    actions.rejectWarehouseImportManagement(id, () => {
      refreshData()
    })
    setIsOpenRejectedModal(false)
  }

  const actionBefore = () => {
    const isPending =
      warehouseImportManagementDetail?.status ===
      WAREHOUSE_IMPORT_STATUS.PENDING
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_WAREHOUSE_IMPORT}>
            <Button
              variant="outlined"
              icon="edit"
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_IMPORT_TICKET.EDIT.PATH.replace(':id', id),
                )
              }
            >
              {t('general:common.update')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.DELETE_WAREHOUSE_IMPORT}>
            <Button
              variant="outlined"
              icon="delete"
              color="subText"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              {t('mmsx:common.delete')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.UPDATE_STATUS_WAREHOUSE_IMPORT}>
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
      title={t('menu.warehouseImportManagementDetail')}
      onBack={backToList}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (
              canAccess(FUNCTION_CODE.UPDATE_WAREHOUSE_IMPORT) &&
              warehouseImportManagementDetail?.status ===
                WAREHOUSE_IMPORT_STATUS.PENDING
            )
              history.push(
                ROUTE.WAREHOUSE_IMPORT_REQUEST.EDIT.PATH.replace(':id', id),
              )
          },
          onDelete: () => {
            if (
              canAccess(FUNCTION_CODE.DELETE_TRANSFER_REQUEST) &&
              warehouseImportManagementDetail?.status ===
                WAREHOUSE_IMPORT_STATUS.PENDING
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
                label={t('warehouseImportManagement.table.status')}
                value={
                  <Status
                    options={WAREHOUSE_IMPORT_STATUS_OPTIONS}
                    value={warehouseImportManagementDetail?.status}
                  />
                }
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportTicket.code')}
                value={warehouseImportManagementDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportTicket.name')}
                value={warehouseImportManagementDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportManagement.form.field.requestType')}
                value={t(
                  WAREHOUSE_IMPORT_REQUEST_TYPE_MAP[
                    warehouseImportManagementDetail?.requestType
                  ],
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportManagement.code')}
                value={
                  warehouseImportManagementDetail?.warehouseImportRequest?.code
                }
              />
            </Grid>
            {warehouseImportManagementDetail?.requestType ===
              WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST && (
              <>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('requestDevice.form.field.fromFactory')}
                    value={warehouseImportManagementDetail?.fromFactory?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('requestDevice.form.field.toFactory')}
                    value={warehouseImportManagementDetail?.toFactory?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t(
                      'warehouseImportManagement.form.field.importWarehouse',
                    )}
                    value={warehouseImportManagementDetail?.warehouse?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('warehouseImportRequest.importDate')}
                    value={convertUtcDateToLocalTz(
                      warehouseImportManagementDetail?.warehouseImportRequest
                        ?.importDate,
                    )}
                  />
                </Grid>
              </>
            )}
            {[
              WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST,
              WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST,
            ].includes(warehouseImportManagementDetail?.requestType) && (
              <>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('requestDevice.form.field.toFactory')}
                    value={warehouseImportManagementDetail?.toFactory?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('warehouseImportRequest.warehouse')}
                    value={warehouseImportManagementDetail?.warehouse?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('warehouseImportRequest.importDate')}
                    value={convertUtcDateToLocalTz(
                      warehouseImportManagementDetail?.warehouseImportRequest
                        ?.importDate,
                    )}
                  />
                </Grid>
              </>
            )}
            {warehouseImportManagementDetail?.requestType ===
              WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET && (
              <>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('transferTicket.table.transferFactory')}
                    value={warehouseImportManagementDetail?.fromFactory?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('requestDevice.form.field.toFactory')}
                    value={warehouseImportManagementDetail?.toFactory?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t(
                      'warehouseImportManagement.form.field.importWarehouse',
                    )}
                    value={warehouseImportManagementDetail?.warehouse?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('warehouseImportRequest.importDate')}
                    value={convertUtcDateToLocalTz(
                      warehouseImportManagementDetail?.warehouseImportRequest
                        ?.importDate,
                    )}
                  />
                </Grid>
              </>
            )}
            {warehouseImportManagementDetail?.requestType ===
              WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST && (
              <>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('warehouseImportRequest.ticketName')}
                    value={warehouseImportManagementDetail?.requestCode}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('requestDevice.form.field.toFactory')}
                    value={warehouseImportManagementDetail?.toFactory?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('warehouseImportRequest.warehouse')}
                    value={warehouseImportManagementDetail?.warehouse?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('warehouseImportRequest.importDate')}
                    value={convertUtcDateToLocalTz(
                      warehouseImportManagementDetail?.warehouseImportRequest
                        ?.importDate,
                    )}
                  />
                </Grid>
              </>
            )}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportManagement.importDate')}
                value={convertUtcDateToLocalTz(
                  warehouseImportManagementDetail?.importDate,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportManagement.form.field.number')}
                value={warehouseImportManagementDetail?.number}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportManagement.form.field.debit')}
                value={warehouseImportManagementDetail?.debit}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportManagement.form.field.remain')}
                value={warehouseImportManagementDetail?.remain}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportManagement.form.field.reason')}
                value={warehouseImportManagementDetail?.reason}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportManagement.form.field.contractNum')}
                value={warehouseImportManagementDetail?.contractNum}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportManagement.form.field.symbol')}
                value={warehouseImportManagementDetail?.symbol}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportManagement.form.field.date')}
                value={convertUtcDateToLocalTz(
                  warehouseImportManagementDetail?.date,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseImportManagement.form.field.gdiNo')}
                value={warehouseImportManagementDetail?.gdiNo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="note"
                label={t('warehouseImportManagement.form.field.note')}
                multiline
                rows={3}
                value={warehouseImportManagementDetail?.note}
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
      {Boolean(
        warehouseImportManagementDetail?.requestType ||
          warehouseImportManagementDetail?.requestType === 0,
      ) &&
        !(
          warehouseImportManagementDetail?.requestType ===
          WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST
        ) && (
          <Box sx={{ mt: 3 }}>
            <ItemSettingTable
              items={convertItems()}
              mode={MODAL_MODE.DETAIL}
              values={warehouseImportManagementDetail}
            />
          </Box>
        )}
      {Boolean(
        warehouseImportManagementDetail?.requestType ||
          warehouseImportManagementDetail?.requestType === 0,
      ) &&
        warehouseImportManagementDetail?.requestType ===
          WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST && (
          <Tabs
            list={[
              t('warehouseImportManagement.deviceInfo'),
              t('warehouseImportManagement.buyInfo'),
            ]}
            sx={{ mt: 3 }}
          >
            <ItemSettingTable
              items={convertItems()}
              mode={MODAL_MODE.DETAIL}
              values={warehouseImportManagementDetail}
            />
            <BuyInfoTable items={deviceGroups} />
          </Tabs>
        )}
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogDelete
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        tempItem={warehouseImportManagementDetail}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={warehouseImportManagementDetail}
      />
      <DialogReject
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={warehouseImportManagementDetail}
      />
    </Page>
  )
}

export default WarehouseImportManagementDetail
