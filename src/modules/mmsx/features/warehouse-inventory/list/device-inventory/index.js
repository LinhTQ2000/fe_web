import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { TYPE_EXPORT } from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import { ASSET_INVENTORY } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarehouseInventory from '~/modules/mmsx/redux/hooks/useWarehouseInventory'
import { exportInventoryApi } from '~/modules/mmsx/redux/sagas/warehouse-inventory/export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import QuickFilter from './quick-filter'

function DeviceInventory({ setLoading }) {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const DEFAULT_QUICK_FILTERS = {
    factoryId: null,
    deviceWarehouseId: null,
    assetId: null,
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
    withSearch,
  } = useQueryState({ quickFilters: DEFAULT_QUICK_FILTERS }, { prefix: 'di' })

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const {
    data: { inventoryList, isLoading, total },
    actions,
  } = useWarehouseInventory()

  const columns = [
    {
      field: 'assetName',
      headerName: t('warehouseInventory.deviceInventory.deviceGroup'),
      width: 200,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'factory',
      headerName: t('warehouseInventory.deviceInventory.factory'),
      width: 200,
      renderCell: (params) => {
        return params.row?.factory?.name
      },
    },
    {
      field: 'warehouse',
      headerName: t('warehouseInventory.deviceInventory.warehouse'),
      width: 200,
      visible: 'always',
      renderCell: (params) => {
        return params.row?.warehouse?.name
      },
    },
    {
      field: 'stockQuantity',
      headerName: t('warehouseInventory.deviceInventory.quantity'),
      width: 200,
      // align: 'right',
      // headerAlign: 'left',
    },
    {
      field: 'unit',
      headerName: t('warehouseInventory.deviceInventory.unit'),
      width: 200,
      renderCell: (params) => {
        return params.row?.unit?.name || ''
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
        const { assetId, warehouse, id } = params?.row
        return (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_INVENTORY_DEVICE_GROUP}>
              <IconButton
                onClick={() =>
                  history.push({
                    pathname: ROUTE.WAREHOUSE_INVENTORY.DETAIL.PATH.replace(
                      ':warehouseId',
                      warehouse?.id,
                    )
                      .replace(':deviceGroupId', assetId)
                      .replace(':id', id),
                    search: withSearch(),
                    state: params?.row,
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
      type: ASSET_INVENTORY.DEVICE_GROUP,
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          factoryId: quickFilters?.factoryId?.id,
          warehouseId: quickFilters?.deviceWarehouseId?.id,
          assetId: quickFilters?.assetId?.id,
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
          <Guard code={FUNCTION_CODE.EXPORT_INVENTORY_DEVICE_GROUP}>
            <ImportExport
              name={t('warehouseInventory.exportDevice')}
              onExport={() =>
                exportInventoryApi({
                  columnSettings: JSON.stringify(columnsSettings),
                  queryIds: JSON.stringify(
                    selectedRows?.map((x) => ({ id: x?.id })),
                  ),
                  filter: convertFilterParams({
                    ...quickFilters,
                    factoryId: quickFilters?.factoryId?.id,
                    warehouseId: quickFilters?.warehouseId?.id,
                    assetId: quickFilters?.assetId?.id,
                  }),
                  page,
                  limit: pageSize,
                  sort: convertSortParams(sort),
                  type: TYPE_EXPORT.INVENTORY_DEVICE_GROUP,
                })
              }
            />
          </Guard>
        }
        tableSettingKey="deviceInventory"
      />
    </>
  )
}

export default DeviceInventory
