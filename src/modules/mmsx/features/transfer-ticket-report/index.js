import { useEffect } from 'react'

import { IconButton } from '@mui/material'
import { isEmpty, isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { TYPE_EXPORT } from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import useReport from '../../redux/hooks/useReport'
import { exportDeviceApi } from '../../redux/sagas/define-device/import-export-device'
import QuickFilter from './quick-filter-form'
const breadcrumb = [
  {
    title: 'report',
  },
  {
    route: ROUTE.TRANSFER_TICKET_REPORT.LIST.PATH,
    title: ROUTE.TRANSFER_TICKET_REPORT.LIST.TITLE,
  },
]
function TransferTicketReport() {
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
    data: { transferTickets, isLoading, totalTransferTicket },
    actions,
  } = useReport()

  const DEFAULT_FILTER = {
    toFactoryId: null,
    fromFactoryId: null,
    transferDate: [null, null],
  }

  const convertData = transferTickets.map((item, index) => ({
    ...item,
    id: index,
  }))

  const columns = [
    {
      field: 'toFactory',
      headerName: t('transferTicketReport.toFactory'),
      width: 150,
      visible: 'always',
      renderCell: (params) => params.row?.toFactory?.name,
    },
    {
      field: 'fromFactory',
      headerName: t('transferTicketReport.fromFactory'),
      width: 150,
      visible: 'always',
      renderCell: (params) => params.row?.fromFactory?.name,
    },
    {
      field: 'totalBuy',
      headerName: t('transferTicketReport.totalBuy'),
      width: 150,
    },
    {
      field: 'totalRent',
      headerName: t('transferTicketReport.totalRent'),
      width: 150,
    },
    {
      field: 'actions',
      headerName: t('general:common.action'),
      width: 150,
      visible: 'always',
      align: 'center',
      sticky: 'right',
      renderCell: (params) => {
        const { toFactory, fromFactory } = params.row
        return (
          <>
            <Guard code={FUNCTION_CODE.REPORT_DETAIL_DEVICE_TRANSFER}>
              <IconButton
                onClick={() =>
                  history.push({
                    pathname: ROUTE.TRANSFER_TICKET_REPORT.DETAIL.PATH.replace(
                      ':toFactoryId',
                      toFactory?.id,
                    ).replace(':fromFactoryId', fromFactory?.id),
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
        ...quickFilters,
        transferDate:
          !isNil(quickFilters?.transferDate) &&
          !isEmpty(quickFilters?.transferDate.filter((item) => item))
            ? quickFilters?.transferDate?.join('|')
            : null,
        toFactoryId: quickFilters?.toFactoryId?.id,
        fromFactoryId: quickFilters?.fromFactoryId?.id,
      }),
    }
    actions.reportTransferTicket(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, quickFilters])

  return (
    <Page
      breadcrumbs={breadcrumb}
      title={t('menu.transferTicketReport')}
      loading={isLoading}
    >
      <QuickFilter
        defaultFilter={DEFAULT_FILTER}
        quickFilters={quickFilters}
        setQuickFilters={setQuickFilters}
      />
      <DataTable
        title={t('transferTicketReport.title')}
        tableSettingKey="transferTicketReport"
        columns={columns}
        rows={convertData}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={totalTransferTicket}
        sort={sort}
        beforeTopbar={
          <Guard code={FUNCTION_CODE.EXPORT_REPORT_DEVICE_TRANSFER}>
            <ImportExport
              name={t('transferTicketReport.export')}
              onExport={() =>
                exportDeviceApi({
                  type: TYPE_EXPORT.REPORT_TRANSFER,
                  page,
                  limit: pageSize,
                  sort,
                  filter: convertFilterParams(
                    {
                      ...quickFilters,
                      transferDate: quickFilters?.transferDate,
                      toFactoryId: quickFilters?.toFactoryId?.id,
                      fromFactoryId: quickFilters?.fromFactoryId?.id,
                    },
                    [{ field: 'transferDate', filterFormat: 'date' }],
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

export default TransferTicketReport
