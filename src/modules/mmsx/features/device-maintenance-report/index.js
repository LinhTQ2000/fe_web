import { useEffect, useMemo, useState } from 'react'

import { getYear, lastDayOfYear, startOfYear } from 'date-fns'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { TYPE_EXPORT } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import { REPORT_JOB_TYPE_ENUM } from '../../constants'
import useReport from '../../redux/hooks/useReport'
import { exportDeviceApi } from '../../redux/sagas/define-device/import-export-device'
import QuickFilter from './quick-filter-form'
const breadcrumb = [
  {
    title: 'report',
  },
  {
    route: ROUTE.DEVICE_MAINTENANCE_REPORT.LIST.PATH,
    title: ROUTE.DEVICE_MAINTENANCE_REPORT.LIST.TITLE,
  },
]
function DeviceMaintenanceReport() {
  const { t } = useTranslation(['mmsx'])
  const [typeReport, setTypeReport] = useState(0)

  const DEFAULT_FILTER = useMemo(() => {
    return {
      year: new Date(),
      factoryIds: [],
      typeReport: typeReport,
      type: REPORT_JOB_TYPE_ENUM.PERIOD_MAINTENANCE,
    }
  }, [])

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
  const {
    data: { deviceMaintenances, isLoading, totalDeviceMaintenance },
    actions,
  } = useReport()

  const deviceMaintenanceData = useMemo(() => {
    return deviceMaintenances.map((item) => {
      const tempData = {
        factory: item?.factory,
      }

      item?.reportByUnits?.forEach((unit, index) => {
        tempData[`month${index + 1}`] = unit
      })

      const sumPlan = item?.reportByUnits?.reduce(
        (prev, curr) => prev + curr.plan,
        0,
      )
      const sumActual = item?.reportByUnits?.reduce(
        (prev, curr) => prev + curr.actual,
        0,
      )
      tempData['sumPlan'] = sumPlan
      tempData['sumActual'] = sumActual
      return tempData
    })
  }, [deviceMaintenances])

  const columns = [
    {
      field: 'factory',
      headerName: t('deviceMaintenanceReport.factory'),
      width: 150,
      visible: 'always',
      renderCell: (params) => params.row?.factory?.name,
    },
    // month 1
    {
      field: 'm1Plan',
      headerName: t('deviceMaintenanceReport.m1Plan'),
      width: 150,
      renderCell: (params) => params.row?.month1?.plan || 0,
    },
    {
      field: 'm1Actual',
      headerName: t('deviceMaintenanceReport.m1Actual'),
      width: 150,
      renderCell: (params) => params.row?.month1?.actual || 0,
    },
    {
      field: 'm1Scale',
      headerName: t('deviceMaintenanceReport.m1Scale'),
      width: 150,
      renderCell: (params) => {
        const number = params.row?.month1?.scale || 0
        return `${number.toFixed(2)}%`
      },
    },
    // month 2
    {
      field: 'm2Plan',
      headerName: t('deviceMaintenanceReport.m2Plan'),
      width: 150,
      renderCell: (params) => params.row?.month2?.plan || 0,
    },
    {
      field: 'm2Actual',
      headerName: t('deviceMaintenanceReport.m2Actual'),
      width: 150,
      renderCell: (params) => params.row?.month2?.actual || 0,
    },
    {
      field: 'm2Scale',
      headerName: t('deviceMaintenanceReport.m2Scale'),
      width: 150,
      renderCell: (params) => {
        const number = params.row?.month2?.scale || 0
        return `${number.toFixed(2)}%`
      },
    },
    // month 3
    {
      field: 'm3Plan',
      headerName: t('deviceMaintenanceReport.m3Plan'),
      width: 150,
      renderCell: (params) => params.row?.month3?.plan || 0,
    },
    {
      field: 'm3Actual',
      headerName: t('deviceMaintenanceReport.m3Actual'),
      width: 150,
      renderCell: (params) => params.row?.month3?.actual || 0,
    },
    {
      field: 'm3Scale',
      headerName: t('deviceMaintenanceReport.m3Scale'),
      width: 150,
      renderCell: (params) => {
        const number = params.row?.month3?.scale || 0
        return `${number.toFixed(2)}%`
      },
    },
    // month 4
    {
      field: 'm4Plan',
      headerName: t('deviceMaintenanceReport.m4Plan'),
      width: 150,
      renderCell: (params) => params.row?.month4?.plan || 0,
    },
    {
      field: 'm4Actual',
      headerName: t('deviceMaintenanceReport.m4Actual'),
      width: 150,
      renderCell: (params) => params.row?.month4?.actual || 0,
    },
    {
      field: 'm4Scale',
      headerName: t('deviceMaintenanceReport.m4Scale'),
      width: 150,
      renderCell: (params) => {
        const number = params.row?.month4?.scale || 0
        return `${number.toFixed(2)}%`
      },
    },
    // month 5
    {
      field: 'm5Plan',
      headerName: t('deviceMaintenanceReport.m5Plan'),
      width: 150,
      renderCell: (params) => params.row?.month5?.plan || 0,
    },
    {
      field: 'm5Actual',
      headerName: t('deviceMaintenanceReport.m5Actual'),
      width: 150,
      renderCell: (params) => params.row?.month5?.actual || 0,
    },
    {
      field: 'm5Scale',
      headerName: t('deviceMaintenanceReport.m5Scale'),
      width: 150,
      renderCell: (params) => {
        const number = params.row?.month5?.scale || 0
        return `${number.toFixed(2)}%`
      },
    },
    // month 6
    {
      field: 'm6Plan',
      headerName: t('deviceMaintenanceReport.m6Plan'),
      width: 150,
      renderCell: (params) => params.row?.month6?.plan || 0,
    },
    {
      field: 'm6Actual',
      headerName: t('deviceMaintenanceReport.m6Actual'),
      width: 150,
      renderCell: (params) => params.row?.month6?.actual || 0,
    },
    {
      field: 'm6Scale',
      headerName: t('deviceMaintenanceReport.m6Scale'),
      width: 150,
      renderCell: (params) => {
        const number = params.row?.month6?.scale || 0
        return `${number.toFixed(2)}%`
      },
    },
    // month 7
    {
      field: 'm7Plan',
      headerName: t('deviceMaintenanceReport.m7Plan'),
      width: 150,
      renderCell: (params) => params.row?.month7?.plan || 0,
    },
    {
      field: 'm7Actual',
      headerName: t('deviceMaintenanceReport.m7Actual'),
      width: 150,
      renderCell: (params) => params.row?.month7?.actual || 0,
    },
    {
      field: 'm7Scale',
      headerName: t('deviceMaintenanceReport.m7Scale'),
      width: 150,
      renderCell: (params) => {
        const number = params.row?.month7?.scale || 0
        return `${number.toFixed(2)}%`
      },
    },
    // month 8
    {
      field: 'm8Plan',
      headerName: t('deviceMaintenanceReport.m8Plan'),
      width: 150,
      renderCell: (params) => params.row?.month8?.plan || 0,
    },
    {
      field: 'm8Actual',
      headerName: t('deviceMaintenanceReport.m8Actual'),
      width: 150,
      renderCell: (params) => params.row?.month8?.actual || 0,
    },
    {
      field: 'm8Scale',
      headerName: t('deviceMaintenanceReport.m8Scale'),
      width: 150,
      renderCell: (params) => {
        const number = params.row?.month8?.scale || 0
        return `${number.toFixed(2)}%`
      },
    },
    // month 9
    {
      field: 'm9Plan',
      headerName: t('deviceMaintenanceReport.m9Plan'),
      width: 150,
      renderCell: (params) => params.row?.month9?.plan || 0,
    },
    {
      field: 'm9Actual',
      headerName: t('deviceMaintenanceReport.m9Actual'),
      width: 150,
      renderCell: (params) => params.row?.month9?.actual || 0,
    },
    {
      field: 'm9Scale',
      headerName: t('deviceMaintenanceReport.m9Scale'),
      width: 150,
      renderCell: (params) => {
        const number = params.row?.month9?.scale || 0
        return `${number.toFixed(2)}%`
      },
    },
    // month 10
    {
      field: 'm10Plan',
      headerName: t('deviceMaintenanceReport.m10Plan'),
      width: 150,
      renderCell: (params) => params.row?.month10?.plan || 0,
    },
    {
      field: 'm10Actual',
      headerName: t('deviceMaintenanceReport.m10Actual'),
      width: 150,
      renderCell: (params) => params.row?.month10?.actual || 0,
    },
    {
      field: 'm10Scale',
      headerName: t('deviceMaintenanceReport.m10Scale'),
      width: 150,
      renderCell: (params) => {
        const number = params.row?.month10?.scale || 0
        return `${number.toFixed(2)}%`
      },
    },
    // month 11
    {
      field: 'm11Plan',
      headerName: t('deviceMaintenanceReport.m11Plan'),
      width: 150,
      renderCell: (params) => params.row?.month11?.plan || 0,
    },
    {
      field: 'm11Actual',
      headerName: t('deviceMaintenanceReport.m11Actual'),
      width: 150,
      renderCell: (params) => params.row?.month11?.actual || 0,
    },
    {
      field: 'm11Scale',
      headerName: t('deviceMaintenanceReport.m11Scale'),
      width: 150,
      renderCell: (params) => {
        const number = params.row?.month11?.scale || 0
        return `${number.toFixed(2)}%`
      },
    },
    // month 12
    {
      field: 'm12Plan',
      headerName: t('deviceMaintenanceReport.m12Plan'),
      width: 150,
      renderCell: (params) => params.row?.month12?.plan || 0,
    },
    {
      field: 'm12Actual',
      headerName: t('deviceMaintenanceReport.m12Actual'),
      width: 150,
      renderCell: (params) => params.row?.month12?.actual || 0,
    },
    {
      field: 'm12Scale',
      headerName: t('deviceMaintenanceReport.m12Scale'),
      width: 150,
      renderCell: (params) => {
        const number = params.row?.month12?.scale || 0
        return `${number.toFixed(2)}%`
      },
    },
    {
      field: 'sumPlan',
      headerName: t('deviceMaintenanceReport.sumPlan'),
      width: 150,
      visible: 'always',
    },
    {
      field: 'sumActual',
      headerName: t('deviceMaintenanceReport.sumActual'),
      width: 150,
      visible: 'always',
    },
    {
      field: 'sumScale',
      headerName: t('deviceMaintenanceReport.sumScale'),
      width: 150,
      visible: 'always',
      renderCell: (params) => {
        const number = (params.row.sumActual / params.row.sumPlan) * 100
        return `${number.toFixed(2)}%`
      },
    },
  ]

  const columnsQuarter = [
    {
      field: 'factoryQ',
      headerName: t('deviceMaintenanceReport.factory'),
      width: 150,
      visible: 'always',
      renderCell: (params) => params.row?.factory?.name,
    },
    // Q1
    {
      field: 'q1Plan',
      headerName: t('deviceMaintenanceReport.q1Plan'),
      width: 150,
      renderCell: (params) => {
        const number =
          params.row?.month1?.plan +
            params.row?.month2?.plan +
            params.row?.month3?.plan || 0
        return number
      },
    },
    {
      field: 'q1Actual',
      headerName: t('deviceMaintenanceReport.q1Actual'),
      width: 150,
      renderCell: (params) => {
        const number =
          params.row?.month1?.actual +
            params.row?.month2?.actual +
            params.row?.month3?.actual || 0
        return number
      },
    },
    {
      field: 'q1Scale',
      headerName: t('deviceMaintenanceReport.q1Scale'),
      width: 150,
      renderCell: (params) => {
        const number =
          ((params.row?.month1?.actual +
            params.row?.month2?.actual +
            params.row?.month3?.actual) /
            (params.row?.month1?.plan +
              params.row?.month2?.plan +
              params.row?.month3?.plan)) *
            100 || 0
        return `${number.toFixed(2)}%`
      },
    },
    // Q2
    {
      field: 'q2Plan',
      headerName: t('deviceMaintenanceReport.q2Plan'),
      width: 150,
      renderCell: (params) => {
        const number =
          params.row?.month4?.plan +
            params.row?.month5?.plan +
            params.row?.month6?.plan || 0
        return number
      },
    },
    {
      field: 'q2Actual',
      headerName: t('deviceMaintenanceReport.q2Actual'),
      width: 150,
      renderCell: (params) => {
        const number =
          params.row?.month4?.actual +
            params.row?.month5?.actual +
            params.row?.month6?.actual || 0
        return number
      },
    },
    {
      field: 'q2Scale',
      headerName: t('deviceMaintenanceReport.q2Scale'),
      width: 150,
      renderCell: (params) => {
        const number =
          ((params.row?.month4?.actual +
            params.row?.month5?.actual +
            params.row?.month6?.actual) /
            (params.row?.month4?.plan +
              params.row?.month5?.plan +
              params.row?.month6?.plan)) *
            100 || 0
        return `${number.toFixed(2)}%`
      },
    },
    // Q3
    {
      field: 'q3Plan',
      headerName: t('deviceMaintenanceReport.q3Plan'),
      width: 150,
      renderCell: (params) => {
        const number =
          params.row?.month7?.plan +
            params.row?.month8?.plan +
            params.row?.month9?.plan || 0
        return number
      },
    },
    {
      field: 'q3Actual',
      headerName: t('deviceMaintenanceReport.q3Actual'),
      width: 150,
      renderCell: (params) => {
        const number =
          params.row?.month7?.actual +
            params.row?.month8?.actual +
            params.row?.month9?.actual || 0
        return number
      },
    },
    {
      field: 'q3Scale',
      headerName: t('deviceMaintenanceReport.q3Scale'),
      width: 150,
      renderCell: (params) => {
        const number =
          ((params.row?.month7?.actual +
            params.row?.month8?.actual +
            params.row?.month9?.actual) /
            (params.row?.month7?.plan +
              params.row?.month8?.plan +
              params.row?.month9?.plan)) *
            100 || 0
        return `${number.toFixed(2)}%`
      },
    },
    // Q4
    {
      field: 'q4Plan',
      headerName: t('deviceMaintenanceReport.q4Plan'),
      width: 150,
      renderCell: (params) => {
        const number =
          params.row?.month10?.plan +
            params.row?.month11?.plan +
            params.row?.month12?.plan || 0
        return number
      },
    },
    {
      field: 'q4Actual',
      headerName: t('deviceMaintenanceReport.q4Actual'),
      width: 150,
      renderCell: (params) => {
        const number =
          params.row?.month10?.actual +
            params.row?.month11?.actual +
            params.row?.month12?.actual || 0
        return number
      },
    },
    {
      field: 'q4Scale',
      headerName: t('deviceMaintenanceReport.q4Scale'),
      width: 150,
      renderCell: (params) => {
        const number =
          ((params.row?.month10?.actual +
            params.row?.month11?.actual +
            params.row?.month12?.actual) /
            (params.row?.month10?.plan +
              params.row?.month11?.plan +
              params.row?.month12?.plan)) *
            100 || 0
        return `${number.toFixed(2)}%`
      },
    },
    {
      field: 'sumPlanQ',
      headerName: t('deviceMaintenanceReport.sumPlan'),
      width: 150,
      visible: 'always',
      renderCell: (params) => params.row.sumPlan,
    },
    {
      field: 'sumActualQ',
      headerName: t('deviceMaintenanceReport.sumActual'),
      width: 150,
      visible: 'always',
      renderCell: (params) => params.row.sumActual,
    },
    {
      field: 'sumScaleQ',
      headerName: t('deviceMaintenanceReport.sumScale'),
      width: 150,
      visible: 'always',
      renderCell: (params) => {
        const number = (params.row.sumActual / params.row.sumPlan) * 100
        return `${number.toFixed(2)}%`
      },
    },
  ]

  useEffect(() => {
    const yearInt = quickFilters?.year
      ? getYear(new Date(quickFilters?.year))
      : getYear(new Date())
    const dateOfYear = new Date(yearInt, 1, 1)
    let startDate = startOfYear(dateOfYear).toISOString()
    let endDate = lastDayOfYear(dateOfYear).toISOString()

    const params = {
      page,
      limit: pageSize,
      reportUnitType: 0,
      type: REPORT_JOB_TYPE_ENUM.PERIOD_MAINTENANCE,
      startDate,
      endDate,
      filter: convertFilterParams({
        ...quickFilters,
        year: getYear(new Date(quickFilters?.year)),
        factoryIds: quickFilters?.factoryIds?.map((item) => item?.id),
      }),
    }
    actions.reportDeviceMaintenance(params)
  }, [page, sort, quickFilters])
  const yearInt = quickFilters?.year
    ? getYear(new Date(quickFilters?.year))
    : getYear(new Date())
  const dateOfYear = new Date(yearInt, 1, 1)
  let startDate = startOfYear(dateOfYear).toISOString()
  let endDate = lastDayOfYear(dateOfYear).toISOString()
  return (
    <Page
      breadcrumbs={breadcrumb}
      title={t('menu.deviceMaintenanceReport')}
      loading={isLoading}
    >
      <QuickFilter
        defaultFilter={DEFAULT_FILTER}
        quickFilters={isEmpty(quickFilters) ? DEFAULT_FILTER : quickFilters}
        setQuickFilters={setQuickFilters}
        setTypeReport={setTypeReport}
      />
      {typeReport === 0 && (
        <DataTable
          title={t('deviceMaintenanceReport.title')}
          tableSettingKey="deviceMaintenanceReport"
          columns={columns}
          rows={deviceMaintenanceData}
          pageSize={pageSize}
          page={page}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSortChange={setSort}
          total={totalDeviceMaintenance}
          sort={sort}
          beforeTopbar={
            <Guard code={FUNCTION_CODE.EXPORT_REPORT_DEVICE_MAINTENANCE}>
              <ImportExport
                name={t('deviceMaintenanceReport.export')}
                onExport={() =>
                  exportDeviceApi({
                    type: TYPE_EXPORT.REPORT_DEVICE_MAINTENANCE,
                    page,
                    limit: pageSize,
                    reportUnitType: 0,
                    startDate,
                    endDate,
                    filter: convertFilterParams({
                      ...quickFilters,
                      year: getYear(new Date(quickFilters?.year)),
                      factoryIds: quickFilters?.factoryIds?.map(
                        (item) => item?.id,
                      ),
                    }),
                  })
                }
              />
            </Guard>
          }
        />
      )}
      {typeReport === 1 && (
        <DataTable
          title={t('deviceMaintenanceReport.title')}
          tableSettingKey="deviceMaintenanceReportQuarter"
          columns={columnsQuarter}
          rows={deviceMaintenanceData}
          pageSize={pageSize}
          page={page}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSortChange={setSort}
          total={totalDeviceMaintenance}
          sort={sort}
        />
      )}
    </Page>
  )
}

export default DeviceMaintenanceReport
