import { useEffect, useState } from 'react'

import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { TYPE_EXPORT } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import ImportExport from '~/components/ImportExport'
import { ASSET_INVENTORY } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarehouseInventory from '~/modules/mmsx/redux/hooks/useWarehouseInventory'
import { exportInventoryApi } from '~/modules/mmsx/redux/sagas/warehouse-inventory/export'
import { convertFilterParams, convertSortParams } from '~/utils'

import QuickFilter from './quick-filter'

function SupplyInventory({ setLoading }) {
  const { t } = useTranslation(['mmsx'])
  const DEFAULT_QUICK_FILTERS = {
    warehouseId: null,
    supplyGroupId: null,
    supplyType: null,
    assetCode: '',
  }
  const {
    page,
    pageSize,
    sort,
    selectedRowsDeps,
    setPage,
    setPageSize,
    setSort,
    quickFilters,
    setQuickFilters,
  } = useQueryState({ quickFilters: DEFAULT_QUICK_FILTERS }, { prefix: 'si' })
  const {
    data: { inventoryList, isLoading, total },
    actions,
  } = useWarehouseInventory()

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'supplyGroup',
      headerName: t('warehouseInventory.supplyInventory.supplyGroup'),
      width: 150,
      sortable: true,
      visible: 'always',
      renderCell: (params) => params.row?.supplyGroup?.name,
    },
    {
      field: 'code',
      headerName: t('warehouseInventory.supplyInventory.code'),
      width: 150,
      sortable: true,
      visible: 'always',
      renderCell: (params) => params.row?.assetCode,
    },
    {
      field: 'name',
      headerName: t('warehouseInventory.supplyInventory.name'),
      width: 150,
      sortable: true,
      visible: 'always',
      renderCell: (params) => params.row?.assetName,
    },
    {
      field: 'type',
      headerName: t('warehouseInventory.supplyInventory.type'),
      width: 150,
      renderCell: (param) => param?.row?.assetTypeDisplay?.name,
    },
    {
      field: 'factory',
      headerName: t('warehouseInventory.supplyInventory.factory'),
      width: 150,
      renderCell: (params) => params.row?.factory?.name,
    },
    {
      field: 'warehouse',
      headerName: t('warehouseInventory.supplyInventory.warehouse'),
      width: 150,
      renderCell: (params) => params.row?.warehouse?.name,
    },
    {
      field: 'vendor',
      headerName: t('warehouseInventory.supplyInventory.vendor'),
      width: 150,
      renderCell: (params) => params.row?.vendor?.name,
    },
    {
      field: 'quantity',
      headerName: t('warehouseInventory.supplyInventory.quantity'),
      width: 150,
      renderCell: (params) => params.row?.stockQuantity,
    },
    {
      field: 'unit',
      headerName: t('warehouseInventory.supplyInventory.unit'),
      width: 150,
      renderCell: (params) => params.row?.unit?.name,
    },
  ]

  const refreshData = () => {
    const params = {
      type: ASSET_INVENTORY.SUPPLY,
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          warehouseId: quickFilters?.warehouseId?.id,
          supplyGroupId: quickFilters?.supplyGroupId?.id,
          supplyTypeId: quickFilters?.supplyTypeId?.id,
          assetCode: quickFilters?.assetCode,
        },
        columns,
      ),
      sort: convertSortParams(sort),
      isMasterData: 1,
    }
    actions.searchWarehouseInventory(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, quickFilters])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return (
    <>
      <QuickFilter
        setQuickFilters={setQuickFilters}
        defaultFilter={
          isEmpty(quickFilters) ? DEFAULT_QUICK_FILTERS : quickFilters
        }
      />
      <DataTable
        rows={inventoryList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        sort={sort}
        beforeTopbar={
          <Guard code={FUNCTION_CODE.EXPORT_INVENTORY_SUPPLY}>
            <ImportExport
              name={t('warehouseInventory.exportSupply')}
              onExport={() =>
                exportInventoryApi({
                  columnSettings: JSON.stringify(columnsSettings),
                  queryIds: JSON.stringify(
                    selectedRows?.map((x) => ({ id: x?.id })),
                  ),
                  filter: convertFilterParams({
                    ...quickFilters,
                    warehouseId: quickFilters?.warehouseId?.id,
                    supplyGroupId: quickFilters?.supplyGroupId?.id,
                  }),
                  page,
                  limit: pageSize,
                  sort: convertSortParams(sort),
                  type: TYPE_EXPORT.INVENTORY_SUPPLY,
                })
              }
            />
          </Guard>
        }
        tableSettingKey="supplyInventory"
      />
    </>
  )
}

export default SupplyInventory
