import React, { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks/useQueryState'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  MAINTAIN_STATUS,
  MAINTAIN_STATUS_OPTIONS,
  PRIORITY_LEVEL_MAP,
} from '~/modules/mmsx/constants'
import useMaintainRequest from '~/modules/mmsx/redux/hooks/useMaintainRequest'
import { exportMaintainRequestApi } from '~/modules/mmsx/redux/sagas/maintain-request/import-export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'maintenance',
  },
  {
    route: ROUTE.MAINTAIN_REQUEST.LIST.PATH,
    title: ROUTE.MAINTAIN_REQUEST.LIST.TITLE,
  },
]
const MaintainRequest = () => {
  const {
    data: { maintainRequestList, isLoading, meta },
    actions,
  } = useMaintainRequest()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const [tempItem, setTempItem] = useState(null)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    user: '',
    serial: '',
    deviceName: '',
    priority: '',
    status: '',
    createdAt: '',
    updateAt: '',
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
        headerName: t('maintainRequest.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('maintainRequest.name'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'user',
        headerName: t('maintainRequest.user'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params.row.user?.fullName
        },
      },
      {
        field: 'serial',
        headerName: t('maintainRequest.serial'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params.row.deviceAssignment?.serial
        },
      },
      {
        field: 'deviceName',
        headerName: t('maintainRequest.deviceName'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params.row.deviceAssignment?.device?.name
        },
      },
      {
        field: 'description',
        headerName: t('maintainRequest.description'),
        width: 150,
        sortable: true,
      },
      {
        field: 'priority',
        headerName: t('maintainRequest.priority'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return t(PRIORITY_LEVEL_MAP[params.row?.priority])
        },
      },
      {
        field: 'status',
        headerName: t('maintainRequest.status'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={MAINTAIN_STATUS_OPTIONS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'createdAt',
        headerName: t('maintainRequest.createdAt'),
        width: 150,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'updatedAt',
        headerName: t('maintainRequest.updatedAt'),
        width: 150,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.updatedAt)
        },
      },
      {
        field: 'actions',
        headerName: t('maintainRequest.action'),
        width: 200,
        visible: 'always',
        align: 'center',
        sticky: 'right',
        renderCell: (params) => {
          const { id, status } = params?.row
          const isPending = status === MAINTAIN_STATUS.PENDING

          return (
            <>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.MAINTAIN_REQUEST.DETAIL.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
              {isPending && (
                <>
                  <IconButton onClick={() => onClickConfirmed(params.row)}>
                    <Icon name="tick" />
                  </IconButton>
                  <IconButton onClick={() => onClickRejected(params.row)}>
                    <Icon name="remove" />
                  </IconButton>
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
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.getMaintainRequest(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps])

  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    const params = {
      id: tempItem?.id,
      status: tempItem?.status,
    }
    actions.confirmMaintainRequest(params, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const onClickRejected = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenRejectModal(true)
  }
  const submitReject = () => {
    const params = {
      id: tempItem?.id,
      status: tempItem?.status,
    }
    actions.rejectMaintainRequest(params, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <ImportExport
        name={t('maintainRequest.export')}
        onExport={() =>
          exportMaintainRequestApi({
            columnSettings: JSON.stringify(columnsSettings),
            queryIds: JSON.stringify(selectedRows?.map((x) => ({ id: x?.id }))),
            keyword: keyword.trim(),
            filter: convertFilterParams(filters, [
              { field: 'createdAt', filterFormat: 'date' },
            ]),
            page,
            limit: pageSize,
            sort: convertSortParams(sort),
          })
        }
        onRefresh={refreshData}
        disabled
      />
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.maintainRequest')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('maintainRequest.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('maintainRequest.title')}
        columns={columns}
        rows={maintainRequestList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={meta.total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
      />
      <Dialog
        open={isOpenConfirmModal}
        title={t('general:common.notify')}
        onCancel={() => setIsOpenConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LV
          label={t('maintainRequest.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('maintainRequest.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenRejectModal}
        title={t('general:common.reject')}
        onCancel={() => setIsOpenRejectModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitReject}
        submitLabel={t('general:common.yes')}
        submitProps={{ color: 'error' }}
        noBorderBottom
      >
        {t('general:common.confirmMessage.reject')}
        <LV
          label={t('maintainRequest.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('maintainRequest.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default MaintainRequest
