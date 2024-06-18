import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { useQueryState } from '~/common/hooks/useQueryState'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import ImportExport from '~/components/ImportExport'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDeviceStatusReport from '~/modules/mmsx/redux/hooks/useDeviceStatusReport'
import { exportDeviceStatusReportDetailApi } from '~/modules/mmsx/redux/sagas/device-status-report/import-export-device-status'
import { ROUTE } from '~/modules/mmsx/routes/config'

function DeviceStatusReportDetail() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { state } = useLocation()
  const {
    data: { deviceStatusDetail, isLoading, totalDetail },
    actions,
  } = useDeviceStatusReport()

  const { page, pageSize, sort, setPage, setPageSize, setSort, withSearch } =
    useQueryState()

  const breadcrumbs = [
    {
      title: 'report',
    },
    {
      route: withSearch(ROUTE.DEVICE_STATUS_REPORT.LIST.PATH),
      title: ROUTE.DEVICE_STATUS_REPORT.LIST.TITLE,
    },
    {
      route: ROUTE.DEVICE_STATUS_REPORT.DETAIL.PATH,
      title: ROUTE.DEVICE_STATUS_REPORT.DETAIL.TITLE,
    },
  ]

  const refreshData = () => {
    const params = {
      page,
      limit: pageSize,
      factoryId: id,
    }
    actions.searchDeviceStatusDetail(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize])

  const columns = [
    {
      field: 'deviceGroup',
      headerName: t('deviceStatusReport.deviceGroup'),
      width: 150,
      visible: 'always',
      renderCell: (params) => params.row?.name,
    },
    {
      field: 'unit',
      headerName: t('deviceStatusReport.unit'),
      width: 150,
      renderCell: (params) => params.row?.unit?.name,
    },
    {
      field: 'total',
      headerName: t('deviceStatusReport.quantity'),
      width: 150,
      visible: 'always',
    },
    {
      field: 'totalUsing',
      headerName: t('deviceStatusReport.using'),
      width: 150,
    },
    {
      field: 'totalPreventive',
      headerName: t('deviceStatusReport.preventive'),
      width: 150,
    },
    {
      field: 'totalBroken',
      headerName: t('deviceStatusReport.broken'),
      width: 150,
    },
    {
      field: 'totalAwaitClearance',
      headerName: t('deviceStatusReport.awaitClearance'),
      width: 150,
    },
  ]

  const backToList = () => {
    history.push(withSearch(ROUTE.DEVICE_STATUS_REPORT.LIST.PATH))
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceStatusReportDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
        }}
      />
      <Grid container justifyContent="center" sx={{ mb: 2 }}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 11, xs: 12 }}>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceStatusReport.factory')}
                value={state?.factory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue label={t('deviceStatusReport.time')} value={null} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DataTable
        title={t('deviceStatusReport.title')}
        tableSettingKey="deviceStatusReportDetail"
        columns={columns}
        rows={deviceStatusDetail}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={totalDetail}
        sort={sort}
        beforeTopbar={
          <Guard code={FUNCTION_CODE.EXPORT_DETAIL_REPORT_DEVICE_STATUS}>
            <ImportExport
              name={t('deviceStatusReport.export')}
              onExport={() =>
                exportDeviceStatusReportDetailApi({
                  page,
                  limit: pageSize,
                  id,
                })
              }
            />
          </Guard>
        }
      />
    </Page>
  )
}

export default DeviceStatusReportDetail
