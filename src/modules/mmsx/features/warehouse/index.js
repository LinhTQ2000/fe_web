import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { TYPE_EXPORT } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import useWarehouseDefine from '../../redux/hooks/useWarehouseDefine'
import {
  exportWarehouseApi,
  importWarehouseApi,
} from '../../redux/sagas/warehouse-define/import-export'
import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_DEFINE.LIST.PATH,
    title: ROUTE.WAREHOUSE_DEFINE.LIST.TITLE,
  },
]
function WarehouseDefine() {
  const { t } = useTranslation(['mmsx'])
  const [selectedRows, setSelectedRows] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])
  const history = useHistory()
  const { canAccess } = useApp()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    factoryIds: [],
    manageBy: null,
  }

  const {
    page,
    pageSize,
    sort,
    filters,
    keyword,
    selectedRowsDeps,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    setKeyword,
    withSearch,
  } = useQueryState()

  const {
    data: { warehouselList, isLoading, total },
    actions,
  } = useWarehouseDefine()

  const columns = [
    {
      field: 'code',
      headerName: t('warehouseDefine.code'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('warehouseDefine.name'),
      width: 150,
      sortable: true,
    },

    {
      field: 'factory',
      headerName: t('warehouseDefine.factory'),
      width: 200,
      renderCell: (params) => {
        return params.row?.factory?.name
      },
    },
    {
      field: 'description',
      headerName: t('warehouseDefine.description'),
      width: 200,
    },
    {
      field: 'manageBy',
      headerName: t('database:general.manageBy.title'),
      width: 150,
      visible: 'always',
      renderCell: (params) => {
        const { manageBy } = params.row
        return manageBy
          ? t('database:general.manageBy.wfx')
          : t('database:general.manageBy.mmsx')
      },
    },
    {
      field: 'codeOnWfx',
      headerName: t('general.codeOnWfx'),
      width: 150,
    },
    {
      field: 'updatedAt',
      headerName: t('general:common.updatedAt'),
      width: 150,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.updatedAt)
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 200,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      renderCell: (params) => {
        const { id } = params?.row
        return (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_WAREHOUSE}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.WAREHOUSE_DEFINE.DETAIL.PATH.replace(':id', id),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.UPDATE_WAREHOUSE}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.WAREHOUSE_DEFINE.EDIT.PATH.replace(':id', id),
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
          </>
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
          factoryIds: filters?.factoryIds?.map((item) => item?.id),
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchWarehouseDefine(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps])

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('warehouseDefine.export')}
          {...(canAccess(FUNCTION_CODE.IMPORT_WAREHOUSE)
            ? {
                onImport: (params) => importWarehouseApi(params),
              }
            : {})}
          {...(canAccess(FUNCTION_CODE.EXPORT_WAREHOUSE)
            ? {
                onExport: () =>
                  exportWarehouseApi({
                    keyword: keyword.trim(),
                    columnSettings: JSON.stringify(columnsSettings),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: x?.id })),
                    ),
                    filter: convertFilterParams(filters, [
                      { field: 'createdAt', filterFormat: 'date' },
                    ]),
                    page,
                    limit: pageSize,
                    sort: convertSortParams(sort),
                    type: TYPE_EXPORT.WAREHOUSE,
                  }),
              }
            : {})}
          onRefresh={refreshData}
        />
        <Guard code={FUNCTION_CODE.CREATE_WAREHOUSE}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.WAREHOUSE_DEFINE.CREATE.PATH))
            }
            icon="add"
            sx={{ ml: 4 / 3 }}
          >
            {t('general:common.create')}
          </Button>
        </Guard>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseDefine')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('warehouseDefine.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_WAREHOUSE)) {
              history.push(withSearch(ROUTE.WAREHOUSE_DEFINE.CREATE.PATH))
            }
          },
        }}
      />
      <DataTable
        title={t('warehouseDefine.title')}
        columns={columns}
        rows={warehouselList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        onSettingChange={setColumnsSettings}
        filters={{
          form: <FilterForm />,
          values: filters,
          onApply: setFilters,
          defaultValue: DEFAULT_FILTERS,
        }}
      />
    </Page>
  )
}

export default WarehouseDefine
