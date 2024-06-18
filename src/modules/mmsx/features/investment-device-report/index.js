import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { TYPE_EXPORT } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

import useReport from '../../redux/hooks/useReport'
import { exportDeviceApi } from '../../redux/sagas/define-device/import-export-device'
import QuickFilter from './quick-filter-form'
const breadcrumb = [
  {
    title: 'report',
  },
  {
    route: ROUTE.INVESTMENT_DEVICE_REPORT.LIST.PATH,
    title: ROUTE.INVESTMENT_DEVICE_REPORT.LIST.TITLE,
  },
]
function InvestMentDeviceReport() {
  const { t } = useTranslation(['mmsx'])
  const DEFAULT_FILTER = {
    factoryIds: [],
    deviceNameIds: [],
    capitalizationTime: null,
  }
  const {
    page,
    pageSize,
    sort,
    setPage,
    setPageSize,
    setSort,
    quickFilters,
    setQuickFilters,
  } = useQueryState({ quickFilters: DEFAULT_FILTER })
  const [columnsSettings, setColumnsSettings] = useState([])
  const {
    data: { investmentDevice, isLoading, totalInvestment },
    actions,
  } = useReport()

  const columns = [
    {
      field: 'factory',
      headerName: t('deviceSynthesisReport.factory'),
      width: 150,
      renderCell: (params) => params.row?.factory?.name,
    },
    {
      field: 'deviceName',
      headerName: t('deviceList.deviceName'),
      width: 150,
      renderCell: (params) => params.row?.deviceName?.name,
    },
    {
      field: 'manufacturer',
      headerName: t('deviceList.production'),
      width: 150,
    },
    {
      field: 'serial',
      headerName: t('deviceList.serial'),
      width: 150,
    },
    {
      field: 'actualSerial',
      headerName: t('deviceList.actualSerial'),
      width: 150,
    },
    {
      field: 'model',
      headerName: t('deviceList.model'),
      width: 150,
    },
    {
      field: 'quantity',
      headerName: t('deviceList.quantity'),
      width: 150,
    },
    {
      field: 'capitalizationDate',
      headerName: t('deviceList.capitalizationDate'),
      width: 150,
      renderCell: (params) =>
        convertUtcDateToLocalTz(params.row?.capitalizationDate),
    },
    {
      field: 'company',
      headerName: t('investmentDevice.company'),
      width: 150,
      renderCell: (params) => params.row?.company?.name,
    },
    {
      field: 'vendor',
      headerName: t('deviceSynthesisReport.vendor'),
      width: 150,
      renderCell: (params) => params.row?.vendor?.name,
    },
  ]

  const refreshData = () => {
    const params = {
      page,
      limit: pageSize,
      sort,
      filter: convertFilterParams({
        factoryIds: quickFilters?.factoryIds?.map((item) => item?.id),
        deviceNameIds: quickFilters?.deviceNameIds?.map((item) => item?.id),
        capitalizationTime: quickFilters?.capitalizationTime,
      }),
    }
    actions.investmentDeviceReport(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, quickFilters])

  return (
    <Page
      breadcrumbs={breadcrumb}
      title={t('menu.investmentDevice')}
      loading={isLoading}
    >
      <QuickFilter
        defaultFilter={DEFAULT_FILTER}
        setQuickFilters={setQuickFilters}
      />
      <DataTable
        title={t('deviceList.title')}
        columns={columns}
        rows={investmentDevice}
        pageSize={pageSize}
        page={page}
        onSettingChange={setColumnsSettings}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={totalInvestment}
        sort={sort}
        beforeTopbar={
          <Guard code={FUNCTION_CODE.EXPORT_REPORT_NEW_INVESTMENT_DEVICE}>
            <ImportExport
              name={t('investmentDevice.export')}
              onExport={() =>
                exportDeviceApi({
                  columnSettings: JSON.stringify(columnsSettings),
                  type: TYPE_EXPORT.REPORT_NEW_INVESTMENT_DEVICE,
                  page,
                  limit: pageSize,
                  sort,
                  filter: convertFilterParams({
                    factoryIds: quickFilters?.factoryIds?.map(
                      (item) => item?.id,
                    ),
                    deviceNameId: quickFilters?.deviceNameId?.id,
                    capitalizationTime: quickFilters?.capitalizationTime,
                  }),
                })
              }
              onRefresh={refreshData}
            />
          </Guard>
        }
      />
    </Page>
  )
}

export default InvestMentDeviceReport
