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
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  WAREHOUSE_EXPORT_REQUEST_TYPE_MAP,
  WAREHOUSE_EXPORT_STATUS,
  WAREHOUSE_EXPORT_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarehouseExportManagement from '~/modules/mmsx/redux/hooks/useWarehouseExportManagement'
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
    route: ROUTE.WAREHOUSE_EXPORT_REQUEST.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_REQUEST.LIST.TITLE,
  },
]
const WarehouseExportManagementList = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const {
    data: { warehouseExportManagementList, isLoading, total },
    actions,
  } = useWarehouseExportManagement()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    requestType: null,
    status: null,
    fromFactoryIds: [],
    toFactoryIds: [],
    exportDate: null,
  }
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
  const columns = useMemo(
    () => [
      {
        field: 'code',
        headerName: t('warehouseExportManagement.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('warehouseExportManagement.name'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'exportType',
        headerName: t('warehouseExportManagement.form.field.requestType'),
        width: 150,
        renderCell: (params) => {
          return t(WAREHOUSE_EXPORT_REQUEST_TYPE_MAP[params.row?.requestType])
        },
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
        headerName: t('warehouseExportManagement.form.field.exportDate'),
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
              options={WAREHOUSE_EXPORT_STATUS_OPTIONS}
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
              <Guard code={FUNCTION_CODE.DETAIL_WAREHOUSE_EXPORT_REQUEST}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.WAREHOUSE_EXPORT_REQUEST.DETAIL.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.UPDATE_WAREHOUSE_EXPORT_REQUEST}>
                    <IconButton
                      onClick={() =>
                        history.push(
                          withSearch(
                            ROUTE.WAREHOUSE_EXPORT_REQUEST.EDIT.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.DELETE_WAREHOUSE_EXPORT_REQUEST}>
                    <IconButton onClick={() => onClickDelete(params.row)}>
                      <Icon name="delete" />
                    </IconButton>
                  </Guard>
                  <Guard
                    code={FUNCTION_CODE.UPDATE_STATUS_WAREHOUSE_EXPORT_REQUEST}
                  >
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
    actions.getWarehouseExportManagementList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteWarehouseExportManagement(tempItem?.id, () => {
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
    actions.confirmWarehouseExportManagement(tempItem?.id, () => {
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
    actions.rejectWarehouseExportManagement(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectedModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <Guard code={FUNCTION_CODE.CREATE_WAREHOUSE_EXPORT_REQUEST}>
        <Button
          onClick={() =>
            history.push(withSearch(ROUTE.WAREHOUSE_EXPORT_REQUEST.CREATE.PATH))
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
      title={t('menu.warehouseExportManagement')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('warehouseExportManagement.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_WAREHOUSE_EXPORT_REQUEST)) {
              history.push(
                withSearch(ROUTE.WAREHOUSE_EXPORT_REQUEST.CREATE.PATH),
              )
            }
          },
        }}
      />
      <DataTable
        title={t('warehouseExportManagement.title')}
        columns={columns}
        rows={warehouseExportManagementList}
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

export default WarehouseExportManagementList
