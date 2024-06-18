import React, { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  TRANSFER_TICKET_STATUS_OPTIONS,
  TRANSFER_REQUEST_TYPE_MAP,
  TRANSFER_TICKET_STATUS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useTransferTicket from '~/modules/mmsx/redux/hooks/useTransferTicket'
import {
  exportTransferTicketApi,
  getTransferTicketTemplateApi,
  importTransferTicketApi,
} from '~/modules/mmsx/redux/sagas/transfer-ticket/import-export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
  convertUtcDateToLocalTz,
} from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE.TITLE,
  },
  {
    route: ROUTE.TRANSFER_TICKET.LIST.PATH,
    title: ROUTE.TRANSFER_TICKET.LIST.TITLE,
  },
]
const TransferTicketList = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const { canAccess } = useApp()
  const {
    data: { transferTicketList, isLoading, total },
    actions,
  } = useTransferTicket()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    status: null,
    type: null,
    fromFactoryIds: [],
    toFactoryIds: [],
    transferDate: null,
    manageBy: null,
  }
  const {
    page,
    pageSize,
    sort,
    filters,
    keyword,
    selectedRowsDeps,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    withSearch,
    setKeyword,
  } = useQueryState()

  const columns = useMemo(
    () => [
      {
        field: 'code',
        headerName: t('transferTicket.table.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('transferTicket.table.name'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'type',
        headerName: t('transferTicket.table.type'),
        width: 150,
        renderCell: (params) => {
          return t(TRANSFER_REQUEST_TYPE_MAP[params.row?.type])
        },
      },
      {
        field: 'transferDay',
        headerName: t('transferTicket.table.transferDay'),
        width: 150,
        filterFormat: 'date',
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.transferDate)
        },
      },
      {
        field: 'estimatedReturnDate',
        headerName: t('transferTicket.table.estimatedReturnDate'),
        width: 150,
        filterFormat: 'date',
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.estimatedReturnDate)
        },
      },
      {
        field: 'fromFactory',
        headerName: t('transferTicket.table.transferFactory'),
        width: 150,
        renderCell: (params) => {
          return params?.row?.fromFactory?.name
        },
      },
      {
        field: 'toFactory',
        headerName: t('transferTicket.table.receivedFactory'),
        width: 150,
        renderCell: (params) => {
          return params?.row?.toFactory?.name
        },
      },
      {
        field: 'manageBy',
        headerName: t('database:general.manageBy.title'),
        width: 150,
        visible: 'always',
        renderCell: (params) => {
          const { manageBy } = params.row
          return manageBy
            ? t('database:general.manageBy.wfx')
            : t('database:general.manageBy.mmsx')
        },
      },
      {
        field: 'status',
        headerName: t('suppliesCategory.form.status'),
        width: 200,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={TRANSFER_TICKET_STATUS_OPTIONS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'actions',
        headerName: t('suppliesCategory.action'),
        width: 200,
        visible: 'always',
        align: 'center',
        sticky: 'right',
        renderCell: (params) => {
          const { id, status } = params?.row
          const isPending = status === TRANSFER_TICKET_STATUS.PENDING

          return (
            <div>
              <Guard code={FUNCTION_CODE.DETAIL_TRANSFER_TICKET}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.TRANSFER_TICKET.DETAIL.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.UPDATE_TRANSFER_TICKET}>
                    <IconButton
                      onClick={() =>
                        history.push(
                          withSearch(
                            ROUTE.TRANSFER_TICKET.EDIT.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.DELETE_TRANSFER_TICKET}>
                    <IconButton onClick={() => onClickDelete(params.row)}>
                      <Icon name="delete" />
                    </IconButton>
                  </Guard>
                  <Guard code={FUNCTION_CODE.CONFIRM_TRANSFER_TICKET}>
                    <IconButton onClick={() => onClickConfirmed(params.row)}>
                      <Icon name="tick" />
                    </IconButton>
                  </Guard>
                  <IconButton onClick={() => onClickRejected(params.row)}>
                    <Icon name="remove" />
                  </IconButton>
                </>
              )}
            </div>
          )
        },
      },
    ],
    [withSearch],
  )

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          fromFactoryIds: filters?.fromFactoryIds?.map((item) => item?.id),
          toFactoryIds: filters?.toFactoryIds?.map((item) => item?.id),
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.getTransferTicketList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteTransferTicket(tempItem?.id, () => {
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
    actions.confirmTransferTicket(tempItem?.id, () => {
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
    actions.rejectTransferTicket(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectedModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <Guard code={FUNCTION_CODE.CREATE_TRANSFER_TICKET}>
        <Button
          onClick={() =>
            history.push(withSearch(ROUTE.TRANSFER_TICKET.CREATE.PATH))
          }
          icon="add"
        >
          {t('transferTicket.create')}
        </Button>
      </Guard>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.transferTicket')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('transferTicket.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_TRANSFER_TICKET)) {
              history.push(withSearch(ROUTE.TRANSFER_TICKET.CREATE.PATH))
            }
          },
        }}
      />
      <DataTable
        title={t('transferTicket.title')}
        columns={columns}
        rows={transferTicketList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
        beforeTopbar={
          <ImportExport
            name={t('transferTicket.export')}
            onImport={(params) => importTransferTicketApi(params)}
            onExport={() =>
              exportTransferTicketApi({
                columnSettings: JSON.stringify(columnsSettings),
                queryIds: JSON.stringify(
                  selectedRows?.map((x) => ({ id: x?.id })),
                ),
                keyword: keyword.trim(),
                filter: convertFilterParams(filters, [
                  { field: 'createdAt', filterFormat: 'date' },
                ]),
                page,
                limit: pageSize,
                sort: convertSortParams(sort),
              })
            }
            onDownloadTemplate={getTransferTicketTemplateApi}
            onRefresh={refreshData}
            disabled
          />
        }
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

export default TransferTicketList
