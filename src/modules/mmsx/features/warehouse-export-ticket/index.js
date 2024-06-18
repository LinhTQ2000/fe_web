import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import {
  WAREHOUSE_EXPORT_REQUEST_TYPE_MAP,
  WAREHOUSE_EXPORT_STATUS,
  WAREHOUSE_EXPORT_TICKET_STATUS_OPTIONS,
} from '../../constants'
import useWarehouseExportTicket from '../../redux/hooks/useWarehouseExportTicket'
import { ROUTE } from '../../routes/config'
import DialogConfirm from './dialogs/confirm'
import DialogDelete from './dialogs/delete'
import DialogReject from './dialogs/reject'
import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_TICKET.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_TICKET.LIST.TITLE,
  },
]
export default function WarehouseExportTicket() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    requestType: null,
    status: null,
    warehouseExportRequestId: null,
    fromFactoryIds: [],
    toFactoryIds: [],
    exportDate: null,
  }

  const {
    data: { isLoading, list, total },
    actions,
  } = useWarehouseExportTicket()

  const {
    page,
    pageSize,
    sort,
    filters,
    keyword,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    setKeyword,
    withSearch,
  } = useQueryState()
  const { canAccess } = useApp()
  const columns = [
    {
      field: 'code',
      headerName: t('warehouseExportTicket.code'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('warehouseExportTicket.name'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'requestType',
      headerName: t('warehouseExportManagement.form.field.requestType'),
      width: 150,
      renderCell: (params) => {
        return t(WAREHOUSE_EXPORT_REQUEST_TYPE_MAP[params.row?.requestType])
      },
    },
    {
      field: 'requestCode',
      headerName: t('warehouseExportManagement.code'),
      width: 150,
      renderCell: (params) => params.row?.warehouseExportRequest?.code,
    },
    {
      field: 'fromFactory',
      headerName: t('warehouseExportManagement.fromFactory'),
      width: 150,
      renderCell: (params) => {
        return params.row?.fromFactory?.name
      },
    },
    {
      field: 'toFactory',
      headerName: t('warehouseExportManagement.toFactory'),
      width: 150,
      renderCell: (params) => {
        return params.row?.toFactory?.name
      },
    },
    {
      field: 'exportDate',
      headerName: t('warehouseExportTicket.exportDate'),
      width: 150,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.exportDate)
      },
    },
    {
      field: 'status',
      headerName: t('warehouseExportManagement.table.status'),
      width: 200,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={WAREHOUSE_EXPORT_TICKET_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'actions',
      headerName: t('warehouseExportManagement.table.action'),
      width: 200,
      visible: 'always',
      align: 'center',
      sticky: 'right',
      renderCell: (params) => {
        const { id, status } = params?.row
        const isPending = status === WAREHOUSE_EXPORT_STATUS.PENDING
        return (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_WAREHOUSE_EXPORT}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.WAREHOUSE_EXPORT_TICKET.DETAIL.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            {isPending && (
              <>
                <Guard code={FUNCTION_CODE.UPDATE_WAREHOUSE_EXPORT}>
                  <IconButton
                    onClick={() =>
                      history.push(
                        withSearch(
                          ROUTE.WAREHOUSE_EXPORT_TICKET.EDIT.PATH.replace(
                            ':id',
                            `${id}`,
                          ),
                        ),
                      )
                    }
                  >
                    <Icon name="edit" />
                  </IconButton>
                </Guard>
                <Guard code={FUNCTION_CODE.DELETE_WAREHOUSE_EXPORT}>
                  <IconButton onClick={() => onClickDelete(params.row)}>
                    <Icon name="delete" />
                  </IconButton>
                </Guard>
                <Guard code={FUNCTION_CODE.UPDATE_STATUS_WAREHOUSE_EXPORT}>
                  <IconButton onClick={() => onClickConfirmed(params.row)}>
                    <Icon name="tick" />
                  </IconButton>
                  <IconButton onClick={() => onClickRejected(params.row)}>
                    <Icon name="remove" />
                  </IconButton>
                </Guard>
              </>
            )}
          </>
        )
      },
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          warehouseExportRequestId: filters?.warehouseExportRequestId?.id,
          fromFactoryIds: filters?.fromFactoryIds?.map((item) => item?.id),
          toFactoryIds: filters?.toFactoryIds?.map((item) => item?.id),
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchWarehouseExportTicket(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteWarehouseExportTicket(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    actions.confirmWarehouseExportTicket(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const onClickRejected = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenRejectedModal(true)
  }
  const onSubmitRejected = () => {
    actions.rejectWarehouseExportTicket(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectedModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <Guard code={FUNCTION_CODE.CREATE_WAREHOUSE_EXPORT}>
        <Button
          onClick={() =>
            history.push(withSearch(ROUTE.WAREHOUSE_EXPORT_TICKET.CREATE.PATH))
          }
          icon="add"
        >
          {t('general:common.create')}
        </Button>
      </Guard>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseExportTicket')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('general:page.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_WAREHOUSE_EXPORT)) {
              history.push(
                withSearch(ROUTE.WAREHOUSE_EXPORT_TICKET.CREATE.PATH),
              )
            }
          },
        }}
      />
      <DataTable
        title={t('warehouseExportTicket.title')}
        columns={columns}
        rows={list}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
      />
      <DialogDelete
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        tempItem={tempItem}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={tempItem}
      />
      <DialogReject
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={tempItem}
      />
    </Page>
  )
}
