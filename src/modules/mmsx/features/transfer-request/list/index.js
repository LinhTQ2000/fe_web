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
  DEVICE_REQUEST_STATUS,
  DEVICE_REQUEST_STATUS_OPTIONS,
  TRANSFER_REQUEST_TYPE_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useTransferRequest from '~/modules/mmsx/redux/hooks/useTransferRequest'
import {
  exportTransferRequestApi,
  getTransferRequestTemplateApi,
} from '~/modules/mmsx/redux/sagas/transfer-request/import-export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
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
    route: ROUTE.TRANSFER_REQUEST.LIST.PATH,
    title: ROUTE.TRANSFER_REQUEST.LIST.TITLE,
  },
]
const TransferRequestList = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const { canAccess } = useApp()
  const {
    data: { transferRequestList, isLoading, total },
    actions,
  } = useTransferRequest()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    deviceRequestId: null,
    type: null,
    factoryIds: [],
    estimatedTransferDate: null,
    manageBy: null,
    status: null,
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
        headerName: t('transferRequest.table.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('transferRequest.table.name'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'grantRequest',
        headerName: t('transferRequest.table.grantRequest'),
        width: 150,
        renderCell: (params) => {
          return params.row?.request?.name
        },
      },
      {
        field: 'type',
        headerName: t('transferRequest.table.type'),
        width: 150,
        renderCell: (params) => {
          const { type } = params.row
          return (
            <Status
              options={TRANSFER_REQUEST_TYPE_OPTIONS}
              value={type}
              variant="text"
            />
          )
        },
      },
      {
        field: 'receivedFactory',
        headerName: t('transferRequest.table.receivedFactory'),
        width: 150,
        renderCell: (params) => {
          return params.row?.toFactory?.name
        },
      },
      {
        field: 'estimatedTransferDate',
        headerName: t('transferRequest.table.expectedTransferDay'),
        width: 150,
        filterFormat: 'date',
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.estimatedTransferDate)
        },
      },
      {
        field: 'estimatedReturnDate',
        headerName: t('transferRequest.table.estimatedReturnDate'),
        width: 150,
        filterFormat: 'date',
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.estimatedReturnDate)
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
              options={DEVICE_REQUEST_STATUS_OPTIONS}
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
          const isPending = status === DEVICE_REQUEST_STATUS.WAITING_APPROVE

          return (
            <div>
              <Guard code={FUNCTION_CODE.DETAIL_TRANSFER_REQUEST}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.TRANSFER_REQUEST.DETAIL.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.UPDATE_TRANSFER_REQUEST}>
                    <IconButton
                      onClick={() =>
                        history.push(
                          withSearch(
                            ROUTE.TRANSFER_REQUEST.EDIT.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.DELETE_TRANSFER_REQUEST}>
                    <IconButton onClick={() => onClickDelete(params.row)}>
                      <Icon name="delete" />
                    </IconButton>
                  </Guard>
                  <Guard code={FUNCTION_CODE.CONFIRM_TRANSFER_REQUEST}>
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
          deviceRequestId: filters?.deviceRequestId?.id,
          factoryIds: filters?.factoryIds?.map((item) => item?.id),
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.getTransferRequestList(params)
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
    actions.deleteTransferRequest(tempItem?.id, () => {
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
    actions.confirmTransferRequest(tempItem?.id, () => {
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
    actions.rejectTransferRequest(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectedModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <Guard code={FUNCTION_CODE.CREATE_TRANSFER_REQUEST}>
        <Button
          onClick={() =>
            history.push(withSearch(ROUTE.TRANSFER_REQUEST.CREATE.PATH))
          }
          icon="add"
        >
          {t('transferRequest.create')}
        </Button>
      </Guard>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.transferRequest')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('transferRequest.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_TRANSFER_REQUEST)) {
              history.push(withSearch(ROUTE.TRANSFER_REQUEST.CREATE.PATH))
            }
          },
        }}
      />
      <DataTable
        title={t('transferRequest.title')}
        columns={columns}
        rows={transferRequestList}
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
          onApply: setFilters,
          defaultValue: DEFAULT_FILTERS,
        }}
        beforeTopbar={
          <ImportExport
            name={t('transferRequest.export')}
            onExport={() =>
              exportTransferRequestApi({
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
            onDownloadTemplate={getTransferRequestTemplateApi}
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

export default TransferRequestList
