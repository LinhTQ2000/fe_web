import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { TYPE_EXPORT } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import {
  ASSET_TYPE_OPTIONS,
  DEVICE_STATUS_ENUM_OPTIONS,
  DEVICE_STATUS_OPTIONS,
} from '../../constants'
import useReport from '../../redux/hooks/useReport'
import { exportDeviceApi } from '../../redux/sagas/define-device/import-export-device'
import QuickFilter from './quick-filter-form'

const breadcrumb = [
  {
    title: 'report',
  },
  {
    route: ROUTE.DEVICE_SYNTHESIS_REPORT.LIST.PATH,
    title: ROUTE.DEVICE_SYNTHESIS_REPORT.LIST.TITLE,
  },
]
function DeviceSynthesisReport() {
  const { t } = useTranslation(['mmsx'])

  const DEFAULT_FILTER = {
    factoryIds: [],
    articleDevice: null,
    deviceGroup: null,
    deviceType: null,
    name: null,
    // serial: null,
    // model: null,
    assetType: null,
    vendor: null,
    status: null,
    createdAt: null,
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

  const {
    data: { deviceSynthesis, isLoading, totalDevice },
    actions,
  } = useReport()

  const columns = [
    {
      field: 'code',
      headerName: t('deviceSynthesisReport.code'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('deviceSynthesisReport.name'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'articleDevice',
      headerName: t('deviceSynthesisReport.articleDevice'),
      width: 150,
      visible: 'always',
      sortable: true,
      renderCell: (params) => params.row?.articleDeviceGroup?.name,
    },
    {
      field: 'groupName',
      headerName: t('deviceSynthesisReport.deviceGroup'),
      width: 150,
      sortable: true,
      renderCell: (params) => params.row?.deviceGroup?.name,
    },
    {
      field: 'deviceType',
      headerName: t('deviceSynthesisReport.deviceType'),
      width: 150,
      visible: 'always',
      sortable: true,
      renderCell: (params) => params.row?.deviceType?.name,
    },
    {
      field: 'factory',
      headerName: t('deviceSynthesisReport.factory'),
      width: 150,
      renderCell: (params) => params.row?.factory?.name,
    },
    {
      field: 'warehouse',
      headerName: t('deviceSynthesisReport.warehouse'),
      width: 150,
      renderCell: (params) => params.row?.warehouse?.name,
    },
    {
      field: 'vendor',
      headerName: t('deviceSynthesisReport.vendor'),
      width: 150,
      renderCell: (params) => params.row?.vendor?.name,
    },
    {
      field: 'serial',
      headerName: t('deviceSynthesisReport.serial'),
      width: 150,
    },
    {
      field: 'actualSerial',
      headerName: t('deviceSynthesisReport.actualSerial'),
      width: 150,
    },
    {
      field: 'identificationNo',
      headerName: t('deviceList.identificationNo'),
      width: 200,
    },
    {
      field: 'model',
      headerName: t('deviceSynthesisReport.model'),
      width: 150,
    },
    {
      field: 'manufacturer',
      headerName: t('deviceSynthesisReport.manufacturer'),
      width: 150,
    },
    {
      field: 'unit',
      headerName: t('deviceSynthesisReport.unit'),
      width: 150,
      renderCell: (params) => params.row?.unit?.name,
    },
    // {
    //   field: 'depreciation',
    //   headerName: t('deviceSynthesisReport.depreciation'),
    //   width: 150,
    //   renderCell: (params) => {
    //     const number = +params.row?.depreciation || 0
    //     return number.toFixed(2)
    //   },
    // },
    {
      field: 'assetType',
      headerName: t('deviceSynthesisReport.assetType'),
      width: 150,
      renderCell: (params) => {
        const { assetType } = params.row
        return (
          <Status
            options={ASSET_TYPE_OPTIONS}
            value={assetType}
            variant="text"
          />
        )
      },
    },
    {
      field: 'manager',
      headerName: t('deviceSynthesisReport.manager'),
      width: 150,
      renderCell: (params) => {
        const { isFixedAsset } = params.row
        return isFixedAsset
          ? t('deviceList.manageBy.wfx')
          : t('deviceList.manageBy.mmsx')
      },
    },
    {
      field: 'createdAt',
      headerName: t('deviceSynthesisReport.createdAt'),
      width: 150,
      renderCell: (params) => convertUtcDateToLocalTz(params.row.creationDate),
    },
    {
      field: 'importUnit',
      headerName: t('deviceSynthesisReport.importUnit'),
      width: 150,
      renderCell: (params) => params.row?.factory?.name,
    },
    {
      field: 'useUnit',
      headerName: t('deviceSynthesisReport.useUnit'),
      width: 150,
      renderCell: (params) => params.row?.factory?.name,
    },
    {
      field: 'user',
      headerName: t('deviceSynthesisReport.user'),
      width: 150,
    },
    {
      field: 'useStatus',
      headerName: t('deviceSynthesisReport.useStatus'),
      width: 150,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={DEVICE_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'status',
      headerName: t('deviceSynthesisReport.status'),
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
  ]

  const refreshData = () => {
    const params = {
      page,
      limit: pageSize,
      sort: convertSortParams(sort),
      filter: convertFilterParams(
        {
          ...quickFilters,
          factoryIds: quickFilters?.factoryIds?.map((item) => item?.id),
          articleDeviceGroupId: quickFilters?.articleDeviceGroupId?.id,
          deviceGroupId: quickFilters?.deviceGroup?.id,
          deviceTypeId: quickFilters?.deviceType?.id,
          vendorId: quickFilters?.vendor?.id,
        },
        [
          {
            field: 'createdAt',
            filterFormat: 'date',
          },
        ],
      ),
    }
    actions.reportDeviceSynthesis(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, quickFilters])

  return (
    <Page
      breadcrumbs={breadcrumb}
      title={t('menu.deviceSynthesisReport')}
      loading={isLoading}
    >
      <QuickFilter
        defaultFilter={DEFAULT_FILTER}
        setQuickFilters={setQuickFilters}
        quickFilters={quickFilters}
      />
      <DataTable
        title={t('deviceSynthesisReport.title')}
        columns={columns}
        rows={deviceSynthesis}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={totalDevice}
        sort={sort}
        beforeTopbar={
          <Guard code={FUNCTION_CODE.EXPORT_REPORT_DEVICE_SYNTHESIS}>
            <ImportExport
              name={t('deviceSynthesisReport.export')}
              onExport={() =>
                exportDeviceApi({
                  type: TYPE_EXPORT.REPORT_DEVICE_SYNTHESIS,
                  page,
                  limit: pageSize,
                  sort,
                  filter: convertFilterParams(
                    {
                      ...quickFilters,
                      factoryIds: quickFilters?.factoryIds?.map(
                        (item) => item?.id,
                      ),
                      articleDeviceGroupId:
                        quickFilters?.articleDeviceGroupId?.id,
                      deviceGroupId: quickFilters?.deviceGroup?.id,
                      deviceTypeId: quickFilters?.deviceType?.id,
                      vendorId: quickFilters?.vendor?.id,
                    },
                    [
                      {
                        field: 'createdAt',
                        filterFormat: 'date',
                      },
                    ],
                  ),
                })
              }
            />
          </Guard>
        }
      />
    </Page>
  )
}

export default DeviceSynthesisReport
