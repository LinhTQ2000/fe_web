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
  SUPPLY_REQUEST_STATUS_ENUM,
  SUPPLY_REQUEST_STATUS_OPTIONS,
  SUPPLY_REQUEST_TYPE_ENUM,
  SUPPLY_REQUEST_TYPE_MAP,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useSuppliesRequest from '~/modules/mmsx/redux/hooks/useSuppliesRequest'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: ROUTE.DEVICE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.SUPPLIES_REQUEST.LIST.PATH,
    title: ROUTE.SUPPLIES_REQUEST.LIST.TITLE,
  },
]
const SuppliesRequest = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const {
    data: { suppliesRequestList, isLoading, total },
    actions,
  } = useSuppliesRequest()
  const { canAccess } = useApp()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    type: null,
    factoryIds: [],
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
    setKeyword,
    withSearch,
  } = useQueryState()

  const columns = useMemo(
    () => [
      {
        field: 'code',
        headerName: t('suppliesRequest.table.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('suppliesRequest.table.name'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'type',
        headerName: t('suppliesRequest.table.type'),
        width: 150,
        renderCell: (params) => {
          return t(SUPPLY_REQUEST_TYPE_MAP[params.row?.type])
        },
      },
      {
        field: 'factory',
        headerName: t('suppliesRequest.table.factory'),
        width: 150,
        renderCell: (params) => {
          return params.row?.factory?.name
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
              options={SUPPLY_REQUEST_STATUS_OPTIONS}
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
          const { id, status, type } = params?.row
          const isPending = status === SUPPLY_REQUEST_STATUS_ENUM.WAITING
          return type === SUPPLY_REQUEST_TYPE_ENUM.PROVIDE ? (
            <>
              <Guard code={FUNCTION_CODE.DETAIL_SUPPLY_REQUEST_TICKET}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.SUPPLIES_REQUEST.DETAIL.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.UPDATE_SUPPLY_REQUEST_TICKET}>
                    <IconButton
                      onClick={() =>
                        history.push(
                          withSearch(
                            ROUTE.SUPPLIES_REQUEST.EDIT.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.DELETE_SUPPLY_REQUEST_TICKET}>
                    <IconButton onClick={() => onClickDelete(params.row)}>
                      <Icon name="delete" />
                    </IconButton>
                  </Guard>
                  <Guard code={FUNCTION_CODE.CONFIRM_SUPPLY_REQUEST_TICKET}>
                    <IconButton onClick={() => onClickConfirmed(params.row)}>
                      <Icon name="tick" />
                    </IconButton>
                  </Guard>
                  <Guard code={FUNCTION_CODE.CONFIRM_SUPPLY_REQUEST_TICKET}>
                    <IconButton onClick={() => onClickRejected(params.row)}>
                      <Icon name="remove" />
                    </IconButton>
                  </Guard>
                </>
              )}
            </>
          ) : (
            <>
              <Guard code={FUNCTION_CODE.DETAIL_SUPPLY_REQUEST_TICKET}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.SUPPLIES_REQUEST.RETURN_DETAIL.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.UPDATE_SUPPLY_REQUEST_TICKET}>
                    <IconButton
                      onClick={() =>
                        history.push(
                          withSearch(
                            ROUTE.SUPPLIES_REQUEST.RETURN_EDIT.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.DELETE_SUPPLY_REQUEST_TICKET}>
                    <IconButton onClick={() => onClickDelete(params.row)}>
                      <Icon name="delete" />
                    </IconButton>
                  </Guard>
                  <Guard code={FUNCTION_CODE.CONFIRM_SUPPLY_REQUEST_TICKET}>
                    <IconButton onClick={() => onClickConfirmed(params.row)}>
                      <Icon name="tick" />
                    </IconButton>
                  </Guard>
                  <Guard code={FUNCTION_CODE.CONFIRM_SUPPLY_REQUEST_TICKET}>
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
          factoryIds: filters?.factoryIds?.map((item) => item?.id),
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.getSuppliesRequestList(params)
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
    actions.deleteSuppliesRequest(tempItem?.id, () => {
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
    actions.confirmSuppliesRequest(tempItem?.id, () => {
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
    actions.rejectSuppliesRequest(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectedModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Guard code={FUNCTION_CODE.CREATE_SUPPLY_REQUEST_TICKET}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.SUPPLIES_REQUEST.CREATE.PATH))
            }
            icon="add"
          >
            {t('suppliesRequest.create')}
          </Button>
          <Button
            onClick={() =>
              history.push(
                withSearch(ROUTE.SUPPLIES_REQUEST.RETURN_CREATE.PATH),
              )
            }
            icon="add"
            sx={{ ml: 4 / 3 }}
          >
            {t('suppliesRequest.returnCreate')}
          </Button>
        </Guard>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.suppliesRequest')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('suppliesRequest.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_SUPPLY_REQUEST_TICKET))
              history.push(ROUTE.SUPPLIES_REQUEST.CREATE.PATH)
          },
        }}
      />
      <DataTable
        title={t('suppliesRequest.title')}
        columns={columns}
        rows={suppliesRequestList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
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

export default SuppliesRequest
