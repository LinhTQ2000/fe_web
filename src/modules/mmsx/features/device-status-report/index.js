import React, { useEffect } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks/useQueryState'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { convertFilterParams } from '~/utils'

import useDeviceStatusReport from '../../redux/hooks/useDeviceStatusReport'
import { exportDeviceStatusReportApi } from '../../redux/sagas/device-status-report/import-export-device-status'
import { ROUTE } from '../../routes/config'
import QuickFilter from './filter-quick-form'
const breadcrumb = [
  {
    title: 'report',
  },
  {
    route: ROUTE.DEVICE_STATUS_REPORT.LIST.PATH,
    title: ROUTE.DEVICE_STATUS_REPORT.LIST.TITLE,
  },
]
const DeviceStatusReport = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const {
    page,
    pageSize,
    sort,
    setPage,
    setPageSize,
    setSort,
    quickFilters,
    setQuickFilters,
    withSearch,
  } = useQueryState()

  const {
    data: { deviceStatus, isLoading, total },
    actions,
  } = useDeviceStatusReport()

  const DEFAULT_FILTER = {
    factoryIds: [],
    // time: null,
  }

  const columns = [
    {
      field: 'factory',
      headerName: t('deviceStatusReport.factory'),
      width: 150,
      visible: 'always',
      renderCell: (params) => params.row?.factory?.name,
    },
    {
      field: 'total',
      headerName: t('deviceStatusReport.total'),
      width: 150,
      visible: 'always',
    },
    {
      field: 'totalUsing',
      headerName: t('deviceStatusReport.totalUsing'),
      width: 150,
    },
    {
      field: 'proportion1',
      headerName: t('deviceStatusReport.proportion'),
      width: 150,
      renderCell: (params) => {
        const { totalUsing, total } = params.row
        const number = (totalUsing / total) * 100 || 0
        return number.toFixed(2)
      },
    },
    {
      field: 'totalPreventive',
      headerName: t('deviceStatusReport.totalPreventive'),
      width: 150,
    },
    {
      field: 'proportion2',
      headerName: t('deviceStatusReport.proportion'),
      width: 150,
      renderCell: (params) => {
        const { totalPreventive, total } = params.row
        const number = (totalPreventive / total) * 100 || 0
        return number.toFixed(2)
      },
    },
    {
      field: 'totalBroken',
      headerName: t('deviceStatusReport.totalBroken'),
      width: 150,
    },
    {
      field: 'proportion3',
      headerName: t('deviceStatusReport.proportion'),
      width: 150,
      renderCell: (params) => {
        const { totalBroken, total } = params.row
        const number = (totalBroken / total) * 100 || 0
        return number.toFixed(2)
      },
    },
    {
      field: 'totalAwaitClearance',
      headerName: t('deviceStatusReport.totalAwaitClearance'),
      width: 150,
    },
    {
      field: 'proportion4',
      headerName: t('deviceStatusReport.proportion'),
      width: 150,
      renderCell: (params) => {
        const { totalAwaitClearance, total } = params.row
        const number = (totalAwaitClearance / total) * 100 || 0
        return number.toFixed(2)
      },
    },
    {
      field: 'actions',
      headerName: t('general:common.action'),
      width: 150,
      visible: 'always',
      align: 'center',
      sticky: 'right',
      renderCell: (params) => {
        const { factory } = params.row
        return (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_REPORT_DEVICE_STATUS}>
              <IconButton
                onClick={() =>
                  history.push({
                    pathname: ROUTE.DEVICE_STATUS_REPORT.DETAIL.PATH.replace(
                      ':id',
                      factory?.id,
                    ),
                    search: withSearch(),
                    state: params.row,
                  })
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
          </>
        )
      },
    },
  ]

  const refreshData = () => {
    const params = {
      page,
      limit: pageSize,
      filter: convertFilterParams({
        factoryIds: quickFilters?.factoryIds?.map((item) => item?.id),
      }),
    }
    actions.searchDeviceStatus(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, quickFilters])

  return (
    <Page
      breadcrumbs={breadcrumb}
      title={t('menu.deviceStatusReport')}
      loading={isLoading}
    >
      <QuickFilter
        defaultFilter={DEFAULT_FILTER}
        quickFilters={quickFilters}
        setQuickFilters={setQuickFilters}
      />
      <DataTable
        title={t('deviceStatusReport.title')}
        tableSettingKey="deviceStatusReport"
        columns={columns}
        rows={deviceStatus}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        beforeTopbar={
          <Guard code={FUNCTION_CODE.EXPORT_SYNTHESIS_REPORT_DEVICE_STATUS}>
            <ImportExport
              name={t('deviceStatusReport.export')}
              onExport={() =>
                exportDeviceStatusReportApi({
                  page,
                  limit: pageSize,
                  filter: convertFilterParams({
                    factoryId: quickFilters?.factory?.id,
                  }),
                })
              }
            />
          </Guard>
        }
      />
    </Page>
  )
}

export default DeviceStatusReport
