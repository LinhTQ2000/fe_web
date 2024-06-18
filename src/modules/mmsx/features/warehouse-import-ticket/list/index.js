import React, { useEffect, useMemo, useState } from 'react'

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
import {
  WAREHOUSE_IMPORT_REQUEST_TYPE_MAP,
  WAREHOUSE_IMPORT_STATUS,
  WAREHOUSE_IMPORT_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarehouseImportManagement from '~/modules/mmsx/redux/hooks/useWarehouseImportManagement'
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
    route: ROUTE.WAREHOUSE_IMPORT_TICKET.LIST.PATH,
    title: ROUTE.WAREHOUSE_IMPORT_TICKET.LIST.TITLE,
  },
]
const WarehouseImportManagementList = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const {
    data: { warehouseImportManagementList, isLoading, total },
    actions,
  } = useWarehouseImportManagement()
  const { canAccess } = useApp()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    status: null,
    warehouseIds: [],
    requestName: '',
    requestType: null,
    importDate: null,
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

  const columns = useMemo(
    () => [
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
          return t(WAREHOUSE_IMPORT_REQUEST_TYPE_MAP[params.row?.requestType])
        },
      },
      {
        field: 'requestCode',
        headerName: t('warehouseExportManagement.code'),
        width: 150,
        renderCell: (params) => params.row.warehouseImportRequest?.code,
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
        field: 'importDate',
        headerName: t('warehouseImportManagement.importDate'),
        width: 150,
        filterFormat: 'date',
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.importDate)
        },
      },
      {
        field: 'status',
        headerName: t('general:common.status'),
        width: 200,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={WAREHOUSE_IMPORT_STATUS_OPTIONS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'actions',
        headerName: t('warehouseImportManagement.table.action'),
        width: 200,
        visible: 'always',
        align: 'center',
        sticky: 'right',
        renderCell: (params) => {
          const { id, status } = params?.row
          const isPending = status === WAREHOUSE_IMPORT_STATUS.PENDING
          return (
            <div>
              <Guard code={FUNCTION_CODE.DETAIL_WAREHOUSE_IMPORT}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.WAREHOUSE_IMPORT_TICKET.DETAIL.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.UPDATE_WAREHOUSE_IMPORT}>
                    <IconButton
                      onClick={() =>
                        history.push(
                          withSearch(
                            ROUTE.WAREHOUSE_IMPORT_TICKET.EDIT.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.DELETE_WAREHOUSE_IMPORT}>
                    <IconButton onClick={() => onClickDelete(params.row)}>
                      <Icon name="delete" />
                    </IconButton>
                  </Guard>
                  <Guard code={FUNCTION_CODE.UPDATE_STATUS_WAREHOUSE_IMPORT}>
                    <IconButton onClick={() => onClickConfirmed(params.row)}>
                      <Icon name="tick" />
                    </IconButton>
                    <IconButton onClick={() => onClickRejected(params.row)}>
                      <Icon name="remove" />
                    </IconButton>
                  </Guard>
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
          warehouseIds: filters?.warehouseIds?.map((item) => item?.id),
          fromFactoryIds: filters?.fromFactoryIds?.map((item) => item?.id),
          toFactoryIds: filters?.toFactoryIds?.map((item) => item?.id),
          warehouseImportRequestId: filters?.warehouseImportRequestId?.id,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.getWarehouseImportManagementList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteWarehouseImportManagement(tempItem?.id, () => {
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
    actions.confirmWarehouseImportManagement(tempItem?.id, () => {
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
    actions.rejectWarehouseImportManagement(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectedModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <Guard code={FUNCTION_CODE.CREATE_WAREHOUSE_IMPORT}>
        <Button
          onClick={() =>
            history.push(withSearch(ROUTE.WAREHOUSE_IMPORT_TICKET.CREATE.PATH))
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
      title={t('menu.warehouseImportManagement')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('warehouseImportManagement.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_WAREHOUSE_IMPORT)) {
              history.push(
                withSearch(ROUTE.WAREHOUSE_IMPORT_TICKET.CREATE.PATH),
              )
            }
          },
        }}
      />
      <DataTable
        title={t('warehouseImportManagement.title')}
        columns={columns}
        tableSettingKey="warehouseImportManagement"
        rows={warehouseImportManagementList}
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

export default WarehouseImportManagementList
