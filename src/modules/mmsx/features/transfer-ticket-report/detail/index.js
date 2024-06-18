import { useEffect, useMemo } from 'react'

import { Grid } from '@mui/material'
import { first, isEmpty, isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { TYPE_EXPORT } from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import ImportExport from '~/components/ImportExport'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import { TRANSFER_REQUEST_TYPE_MAP } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useReport from '~/modules/mmsx/redux/hooks/useReport'
import { exportDeviceApi } from '~/modules/mmsx/redux/sagas/define-device/import-export-device'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

function TransferTicketReportDetail() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { fromFactoryId, toFactoryId } = useParams()
  const {
    data: { transferTicketDetail, isLoading, totalTransferTicketDetail },
    actions,
  } = useReport()
  const {
    page,
    pageSize,
    sort,
    setPage,
    setPageSize,
    withSearch,
    quickFilters,
  } = useQueryState()

  const breadcrumbs = [
    {
      title: 'report',
    },
    {
      route: withSearch(ROUTE.TRANSFER_TICKET_REPORT.LIST.PATH),
      title: ROUTE.TRANSFER_TICKET_REPORT.LIST.TITLE,
    },
    {
      route: ROUTE.TRANSFER_TICKET_REPORT.DETAIL.PATH.replace(
        ':toFactoryId',
        toFactoryId,
      ).replace(':fromFactoryId', fromFactoryId),
      title: ROUTE.TRANSFER_TICKET_REPORT.DETAIL.TITLE,
    },
  ]

  const backToList = () => {
    history.push(withSearch(ROUTE.TRANSFER_TICKET_REPORT.LIST.PATH))
  }

  const convertList = useMemo(
    () =>
      transferTicketDetail.map((item, index) => ({
        ...item,
        id: `${item?.id}${index}`,
      })),
    [transferTicketDetail],
  )

  const toFactory = useMemo(() => {
    return first(transferTicketDetail)?.toFactory
  }, [transferTicketDetail])

  const fromFactory = useMemo(() => {
    return first(transferTicketDetail)?.fromFactory
  }, [transferTicketDetail])

  const transferDate = useMemo(() => quickFilters?.transferDate, [quickFilters])

  const refreshData = () => {
    const params = {
      page,
      limit: pageSize,
      toFactoryId: toFactoryId,
      fromFactoryId: fromFactoryId,
      filter: convertFilterParams({
        transferDate:
          !isNil(quickFilters?.transferDate) &&
          !isEmpty(quickFilters?.transferDate.filter((item) => item))
            ? quickFilters?.transferDate?.join('|')
            : null,
      }),
    }
    actions.reportTransferTicketDetail(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort])

  const columns = [
    {
      field: 'name',
      headerName: t('transferTicketReport.name'),
      width: 150,
      visible: 'always',
    },
    {
      field: 'manufacturer',
      headerName: t('transferTicketReport.manufacturer'),
      width: 150,
    },
    {
      field: 'model',
      headerName: t('transferTicketReport.model'),
      width: 150,
    },
    {
      field: 'serial',
      headerName: t('transferTicketReport.serial'),
      width: 150,
    },
    {
      field: 'actualSerial',
      headerName: t('transferTicketReport.actualSerial'),
      width: 150,
    },
    {
      field: 'identificationNo',
      headerName: t('deviceList.identificationNo'),
      width: 150,
    },
    {
      field: 'unit',
      headerName: t('transferTicketReport.unit'),
      width: 150,
    },
    {
      field: 'quantity',
      headerName: t('transferTicketReport.quantity'),
      width: 150,
    },
    {
      field: 'toFactory',
      headerName: t('transferTicketReport.toFactory'),
      width: 150,
      visible: 'always',
      renderCell: (params) => params.row?.toFactory?.name,
    },
    {
      field: 'transferDate',
      headerName: t('transferTicketReport.transferDate'),
      width: 150,
      renderCell: (params) => convertUtcDateToLocalTz(params.row?.transferDate),
    },
    {
      field: 'fromFactory',
      headerName: t('transferTicketReport.fromFactory'),
      width: 150,
      visible: 'always',
      renderCell: (params) => params.row?.fromFactory?.name,
    },
    {
      field: 'returnDate',
      headerName: t('transferTicketReport.returnDate'),
      width: 150,
      renderCell: (params) => convertUtcDateToLocalTz(params.row?.returnDate),
    },
    {
      field: 'transferType',
      headerName: t('transferTicketReport.transferType'),
      width: 150,
      renderCell: (params) => {
        return t(TRANSFER_REQUEST_TYPE_MAP[params.row?.transferType])
      },
    },
  ]

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.transferTicketReportDetail')}
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
                label={t('transferTicketReport.toFactory')}
                value={toFactory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('transferTicketReport.fromFactory')}
                value={fromFactory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('transferTicketReport.time')}
                value={
                  !isEmpty(transferDate)
                    ? `${convertUtcDateToLocalTz(
                        transferDate[0],
                      )} - ${convertUtcDateToLocalTz(transferDate[1])}`
                    : null
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DataTable
        title={t('transferTicketReport.titleDetail')}
        // tableSettingKey="transferTicketReportDetail"
        columns={columns}
        rows={convertList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        total={totalTransferTicketDetail}
        beforeTopbar={
          <Guard code={FUNCTION_CODE.EXPORT_REPORT_DETAIL_DEVICE_TRANSFER}>
            <ImportExport
              name={t('transferTicketReport.exportDetail')}
              onExport={() =>
                exportDeviceApi({
                  type: TYPE_EXPORT.REPORT_TRANSFER_DETAIL,
                  toFactoryId,
                  fromFactoryId,
                })
              }
            />
          </Guard>
        }
      />
    </Page>
  )
}

export default TransferTicketReportDetail
