import React, { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks/useQueryState'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  WARNING_STATUS,
  WARNING_STATUS_LIST,
  WARNING_TYPE,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarningSystem from '~/modules/mmsx/redux/hooks/useWarningSystem'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogReject from '../dialogs/reject'
import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'maintenance',
  },
  {
    route: ROUTE.WARNING_SYSTEM.LIST.PATH,
    title: ROUTE.WARNING_SYSTEM.LIST.TITLE,
  },
]

const WarningSystem = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const {
    data: { warningLists, isLoading, meta },
    actions,
  } = useWarningSystem()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
    updateAt: '',
    status: '',
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
        headerName: t('warningList.table.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('warningList.table.name'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'type',
        headerName: t('warningList.table.type'),
        width: 150,
        sortable: true,
        visible: 'always',
        renderCell: (params) => {
          const maintainType = WARNING_TYPE.find(
            (e) => e.value === params?.row?.type,
          )
          return t(maintainType?.text)
        },
      },
      {
        field: 'serial',
        headerName: t('warningList.table.serial'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.serial
        },
      },
      {
        field: 'identificationNo',
        headerName: t('deviceList.identificationNo'),
        width: 150,
      },
      {
        field: 'deviceName',
        headerName: t('warningList.table.deviceName'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.deviceName
        },
      },
      {
        field: 'status',
        headerName: t('warningList.table.status'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={WARNING_STATUS_LIST}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'actions',
        headerName: t('warningList.table.actions'),
        width: 200,
        visible: 'always',
        align: 'center',
        sticky: 'right',
        renderCell: (params) => {
          const { id, status } = params?.row
          const isPending = status === WARNING_STATUS.WAITING
          return (
            <div>
              <Guard code={FUNCTION_CODE.DETAIL_WARNING}>
                <IconButton
                  onClick={() => {
                    history.push(
                      withSearch(
                        ROUTE.WARNING_SYSTEM.DETAIL.PATH.replace(
                          ':id',
                          `${id}`,
                        ),
                      ),
                    )
                  }}
                >
                  <Icon name="show" />
                </IconButton>
              </Guard>
              {isPending && (
                <Guard code={FUNCTION_CODE.UPDATE_STATUS_WARNING}>
                  <IconButton onClick={() => onClickConfirmed(params.row)}>
                    <Icon name="tick" />
                  </IconButton>
                </Guard>
              )}
              {isPending && (
                <Guard code={FUNCTION_CODE.UPDATE_STATUS_WARNING}>
                  <IconButton onClick={() => onClickReject(params.row)}>
                    <Icon name="remove" />
                  </IconButton>
                </Guard>
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
          deviceNameId: filters?.deviceNameId?.id,
          areaId: filters?.areaId?.id,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.getWarningList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps])

  const onClickReject = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenRejectModal(true)
  }
  const onSubmitReject = (values) => {
    const params = {
      id: tempItem?.id,
      reason: values?.comment,
    }
    actions.rejectWarning(params, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectModal(false)
  }

  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    actions.confirmWarning(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warningList')}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('warningList.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('warningList.title')}
        columns={columns}
        rows={warningLists}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={meta?.total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={tempItem}
      />
      <DialogReject
        open={isOpenRejectModal}
        onCancel={() => setIsOpenRejectModal(false)}
        onSubmit={onSubmitReject}
        tempItem={tempItem}
      />
    </Page>
  )
}

export default WarningSystem
