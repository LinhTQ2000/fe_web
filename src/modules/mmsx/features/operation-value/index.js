import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import {
  endOfQuarter,
  getYear,
  lastDayOfMonth,
  lastDayOfYear,
  startOfMonth,
  startOfQuarter,
  startOfYear,
} from 'date-fns'
import { isEmpty, map } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { REPORT_TYPE } from '~/modules/database/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
  getQuarter,
} from '~/utils'

import { TYPE_ENUM_EXPORT } from '../../constants'
import useOperationValue from '../../redux/hooks/useOperationValue'
import { exportOperationValueApi } from '../../redux/sagas/operation-value/import-export-operation-value'
import QuickFilter from './filter-quick-form'

const breadcrumbs = [
  {
    title: 'deviceManagement',
  },
  {
    route: ROUTE.OPERATION_VALUE.LIST.PATH,
    title: ROUTE.OPERATION_VALUE.LIST.TITLE,
  },
]
export default function OperationValue() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const [columnsSettings, setColumnsSettings] = useState([])
  const { canAccess } = useApp()

  const {
    data: { userInfo },
  } = useUserInfo()

  const DEFAULT_FILTER = {
    factoryIds: userInfo?.factories || [],
    timeUnit: REPORT_TYPE.DAY,
    year: new Date(),
    timeMonth: new Date().getMonth(),
    timeQuarter: getQuarter(new Date()),
    time: null,
  }
  const {
    page,
    pageSize,
    sort,
    keyword,
    quickFilters,
    setPage,
    setPageSize,
    setSort,
    setQuickFilters,
    withSearch,
    setKeyword,
  } = useQueryState()

  const {
    data: { isLoading, operationList, total },
    actions,
  } = useOperationValue()

  const getDateRangeByQuickFilter = () => {
    const { timeUnit, time, timeMonth, timeQuarter, year } = quickFilters
    const yearInt = year ? getYear(new Date(year)) : getYear(new Date())
    const dateOfYear = new Date(yearInt, 1, 1)
    let start = startOfYear(dateOfYear)
    let end = lastDayOfYear(dateOfYear)
    if (!isEmpty(time) && time && !timeUnit) {
      start = time[0]
      end = time[1]
    }
    if (timeMonth && timeUnit === REPORT_TYPE.MONTH) {
      const dateToGetMonth = new Date(yearInt, timeMonth, 1)
      start = startOfMonth(dateToGetMonth)
      end = lastDayOfMonth(dateToGetMonth)
    }
    if (timeQuarter && timeUnit === REPORT_TYPE.QUARTER) {
      const monthOfQuarter = +timeQuarter * 3 - 2
      const dateToGetQuarter = new Date(yearInt, monthOfQuarter, 1)
      start = startOfQuarter(dateToGetQuarter)
      end = endOfQuarter(dateToGetQuarter)
    }
    return [start, end]
  }

  const dateRange = getDateRangeByQuickFilter()
  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          factoryIds: map(quickFilters?.factoryIds, 'id'),
          date: dateRange,
        },
        [
          ...columns,
          {
            field: 'date',
            filterFormat: 'date',
          },
        ],
      ),
      sort: convertSortParams(sort),
      timeUnit: quickFilters?.timeUnit ?? REPORT_TYPE.DAY,
    }
    actions.getListOperationValue(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, keyword, quickFilters])

  const columns = [
    {
      field: 'factoryCode',
      headerName: t('database:defineFactory.code'),
      width: 200,
      // sortable: true,
      visible: 'always',
      renderCell: (params) => params.row?.factory?.code,
    },
    {
      field: 'factoryName',
      headerName: t('database:defineFactory.name'),
      width: 200,
      // sortable: true,
      visible: 'always',
      renderCell: (params) => params.row?.factory?.name,
    },
    {
      field: 'time',
      headerName: t('operationValue.time'),
      width: 200,
      renderCell: (params) => {
        return !quickFilters?.timeUnit ||
          quickFilters?.timeUnit === REPORT_TYPE.DAY
          ? convertUtcDateToLocalTz(params.row?.startDate)
          : `${convertUtcDateToLocalTz(
              params.row?.startDate,
            )} - ${convertUtcDateToLocalTz(params.row?.endDate)} `
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 200,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      renderCell: (params) => {
        const { id, factory, startDate, endDate } = params.row
        return (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_OPERATION_VALUE}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.OPERATION_VALUE.DETAIL.PATH.replace(':id', id)
                        .replace(':factoryId', factory.id)
                        .replace(':startDate', startDate)
                        .replace(':endDate', endDate),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            {startDate === endDate && (
              <Guard code={FUNCTION_CODE.UPDATE_OPERATION_VALUE}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.OPERATION_VALUE.EDIT.PATH.replace(':id', id)
                          .replace(':factoryId', factory.id)
                          .replace(':startDate', startDate)
                          .replace(':endDate', endDate),
                      ),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              </Guard>
            )}
          </>
        )
      },
    },
  ]

  const renderHeaderRight = () => {
    return (
      <Guard code={FUNCTION_CODE.CREATE_OPERATION_VALUE}>
        <Button
          onClick={() => history.push(ROUTE.OPERATION_VALUE.CREATE.PATH)}
          icon="add"
          sx={{ mr: 4 / 3 }}
        >
          {t('general:common.create')}
        </Button>
      </Guard>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.operationValue')}
      loading={isLoading}
      onSearch={setKeyword}
      keyword={keyword}
      renderHeaderRight={renderHeaderRight}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_OPERATION_VALUE))
              history.push(ROUTE.OPERATION_VALUE.CREATE.PATH)
          },
        }}
      />
      <QuickFilter
        defaultFilter={DEFAULT_FILTER}
        setQuickFilters={setQuickFilters}
        quickFilters={isEmpty(quickFilters) ? DEFAULT_FILTER : quickFilters}
      />
      <DataTable
        title={t('operationValue.title')}
        columns={columns}
        rows={operationList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        total={total}
        sort={sort}
        beforeTopbar={
          <Guard code={FUNCTION_CODE.EXPORT_OPERATION_VALUE}>
            <ImportExport
              name={t('operationValue.export')}
              onExport={() =>
                exportOperationValueApi({
                  columnSettings: JSON.stringify(columnsSettings),
                  keyword: keyword.trim(),
                  filter: convertFilterParams(
                    {
                      factoryIds: map(quickFilters?.factoryIds, 'id'),
                      date: dateRange,
                    },
                    [
                      ...columns,
                      {
                        field: 'date',
                        filterFormat: 'date',
                      },
                    ],
                  ),
                  page,
                  limit: pageSize,
                  sort: convertSortParams(sort),
                  type: TYPE_ENUM_EXPORT.OPERATION_VALUE,
                  timeUnit: quickFilters?.timeUnit ?? REPORT_TYPE.DAY,
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
