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
  REPAIR_REQUEST_ACTION,
  REPAIR_REQUEST_PRIORITY_MAP,
  REPAIR_REQUEST_STATUS,
  REPAIR_REQUEST_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useRepairRequest from '~/modules/mmsx/redux/hooks/useRepairRequest'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogReject from '../dialogs/reject'
import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: ROUTE.MAINTENANCE.TITLE,
  },
  {
    route: ROUTE.REPAIR_REQUEST.LIST.PATH,
    title: ROUTE.REPAIR_REQUEST.LIST.TITLE,
  },
]
const RepairRequestList = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)

  const {
    data: { isLoading, total, repairRequestList },
    actions,
  } = useRepairRequest()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    deviceIdentificationNo: '',
    deviceSerial: '',
    deviceNameId: null,
    requestedBy: null,
    priority: null,
    areaIds: [],
    status: null,
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
        headerName: t('repairRequest.table.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('repairRequest.table.name'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'serial',
        headerName: t('repairRequest.table.serial'),
        width: 150,
        renderCell: (params) => {
          return params.row?.device?.serial
        },
      },
      {
        field: 'identificationNo',
        headerName: t('deviceList.identificationNo'),
        width: 150,
        renderCell: (params) => {
          return params.row?.device?.identificationNo
        },
      },
      {
        field: 'deviceName',
        headerName: t('repairRequest.table.deviceName'),
        width: 150,
        renderCell: (params) => {
          return params.row?.device?.name
        },
      },
      {
        field: 'user',
        headerName: t('repairRequest.table.user'),
        width: 150,
        renderCell: (params) => {
          return params.row?.requestedBy?.username
        },
      },
      {
        field: 'priority',
        headerName: t('repairRequest.table.priority'),
        width: 150,
        renderCell: (params) =>
          t(REPAIR_REQUEST_PRIORITY_MAP[params?.row?.priority]),
      },
      {
        field: 'area',
        headerName: t('repairRequest.table.area'),
        width: 150,
        renderCell: (params) => {
          return params.row?.device?.area?.name
        },
      },
      {
        field: 'createdAt',
        headerName: t('repairRequest.table.createdAt'),
        width: 150,
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'status',
        headerName: t('repairRequest.table.status'),
        width: 150,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={REPAIR_REQUEST_STATUS_OPTIONS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'action',
        headerName: t('general:common.action'),
        width: 200,
        visible: 'always',
        align: 'center',
        sticky: 'right',
        renderCell: (params) => {
          const { id, status } = params?.row
          const isPending = status === REPAIR_REQUEST_STATUS.WAIT_APPROVE

          return (
            <>
              <Guard code={FUNCTION_CODE.DETAIL_REPAIR_REQUEST}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.REPAIR_REQUEST.DETAIL.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.UPDATE_REPAIR_REQUEST}>
                    <IconButton onClick={() => onClickConfirmed(params.row)}>
                      <Icon name="tick" />
                    </IconButton>
                  </Guard>
                  <Guard code={FUNCTION_CODE.UPDATE_REPAIR_REQUEST}>
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
          requestedBy: filters?.requestedBy?.id,
          areaIds: filters?.areaIds?.map((item) => item?.id),
          deviceNameId: filters?.deviceNameId?.id,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchRepairRequest(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickRejected = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenRejectModal(true)
  }

  const submitReject = () => {
    const params = {
      id: tempItem.id,
      action: REPAIR_REQUEST_ACTION.REJECTED,
    }
    actions.changeStatusRepairRequest(params, () => {
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
    const params = {
      id: tempItem.id,
      action: REPAIR_REQUEST_ACTION.CONFIRMED,
    }
    actions.changeStatusRepairRequest(params, () => {
      refreshData()
    })

    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.repairRequest')}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('repairRequest.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('repairRequest.title')}
        columns={columns}
        rows={repairRequestList}
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
          onApply: setFilters,
          defaultValue: DEFAULT_FILTERS,
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
        onSubmit={submitReject}
        tempItem={tempItem}
      />
    </Page>
  )
}

export default RepairRequestList
