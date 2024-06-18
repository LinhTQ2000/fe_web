import React, { useEffect } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks/useQueryState'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { DEVICE_STATUS_ENUM_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDeviceStatus from '~/modules/mmsx/redux/hooks/useDeviceStatus'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: ROUTE.DEVICE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEVICE_STATUS.LIST.PATH,
    title: ROUTE.DEVICE_STATUS.LIST.TITLE,
  },
]
const DeviceStatus = () => {
  const {
    data: { deviceStatusList, isLoading, total },
    actions,
  } = useDeviceStatus()

  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    serial: '',
    deviceName: '',
    status: '',
    oee: '',
    date: null,
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

  const columns = [
    {
      field: 'serial',
      headerName: t('deviceStatus.serial'),
      width: 120,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'identificationNo',
      headerName: t('deviceList.identificationNo'),
      width: 120,
    },
    {
      field: 'deviceGroup',
      headerName: t('deviceStatus.deviceGroup'),
      width: 120,
      sortable: true,
      visible: 'always',
      renderCell: (params) => params?.row?.deviceGroup?.name || '',
    },
    {
      field: 'name',
      headerName: t('deviceStatus.deviceName'),
      width: 120,
    },
    {
      field: 'updatedAt',
      headerName: t('deviceStatus.lastUpdatedDate'),
      width: 100,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateTimeToLocalTz(params?.row?.updatedAt)
      },
    },
    {
      field: 'deviceStatus',
      headerName: t('deviceStatus.status.title'),
      width: 150,
      renderCell: (params) => {
        const { deviceStatus } = params.row
        return (
          <Status
            options={DEVICE_STATUS_ENUM_OPTIONS}
            value={deviceStatus}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('deviceStatus.action'),
      width: 150,
      visible: 'always',
      align: 'center',
      sticky: 'right',
      renderCell: (params) => {
        const { id } = params.row
        return (
          <Guard code={FUNCTION_CODE.DETAIL_DEVICE_STATUS}>
            <IconButton
              onClick={() =>
                history.push({
                  pathname: ROUTE.DEVICE_STATUS.DETAIL.PATH.replace(':id', id),
                  search: withSearch(),
                })
              }
            >
              <Icon name="show" />
            </IconButton>
          </Guard>
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
          deviceGroupId: filters?.deviceGroupId?.id,
          deviceNameId: filters?.deviceNameId?.id,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.getListDeviceStatus(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceStatus')}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('deviceStatus.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('deviceStatus.title')}
        columns={columns}
        rows={deviceStatusList}
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
    </Page>
  )
}

export default DeviceStatus
