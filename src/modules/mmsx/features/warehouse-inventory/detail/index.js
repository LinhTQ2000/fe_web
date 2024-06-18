import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { TYPE_EXPORT } from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import DataTable from '~/components/DataTable'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import { ASSET_INVENTORY } from '~/modules/mmsx/constants'
import useWarehouseInventory from '~/modules/mmsx/redux/hooks/useWarehouseInventory'
import { exportInventoryApi } from '~/modules/mmsx/redux/sagas/warehouse-inventory/export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import QuickFilter from './quick-filter'

function WarehouseInventoryDetail() {
  const { warehouseId, deviceGroupId, id } = useParams()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const DEFAULT_QUICK_FILTERS = {
    deviceId: null,
    model: '',
    manufacturer: '',
  }
  const {
    page,
    pageSize,
    sort,
    quickFilters,
    selectedRowsDeps,
    setPage,
    setPageSize,
    setSort,
    setQuickFilters,
    withSearch,
  } = useQueryState({ quickFilters: DEFAULT_QUICK_FILTERS }, { prefix: '_' })

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE.TITLE,
    },
    {
      route: withSearch(ROUTE.WAREHOUSE_INVENTORY.LIST.PATH, {
        omitPrefixKeys: true,
      }),
      title: ROUTE.WAREHOUSE_INVENTORY.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_INVENTORY.DETAIL.PATH,
      title: ROUTE.WAREHOUSE_INVENTORY.DETAIL.TITLE,
    },
  ]

  const {
    data: { inventoryDeviceList, isLoading, total },
    actions,
  } = useWarehouseInventory()

  const columns = [
    {
      field: 'serial',
      headerName: t('warehouseInventory.serial'),
      width: 200,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'identificationNo',
      headerName: t('warehouseInventory.identificationNo'),
      width: 200,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('warehouseInventory.name'),
      width: 200,
      visible: 'always',
    },
    {
      field: 'vendor',
      headerName: t('warehouseInventory.vendor'),
      width: 200,
      renderCell: (params) => {
        return params.row?.vendor?.name
      },
    },
    {
      field: 'model',
      headerName: t('warehouseInventory.model'),
      width: 200,
    },
    {
      field: 'manufacturer',
      headerName: t('warehouseInventory.production'),
      width: 200,
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
            <IconButton
              onClick={() =>
                history.push({
                  pathname: ROUTE.DEVICE_LIST.DETAIL.PATH.replace(':id', id),
                })
              }
            >
              <Icon name="show" />
            </IconButton>
          </>
        )
      },
    },
  ]

  const refreshData = () => {
    const params = {
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...quickFilters,
          deviceId: quickFilters?.deviceId?.id,
          vendorId: quickFilters?.vendorId?.id,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.getInventoryByWarehouseDeviceGroup({
      ...params,
      warehouseId,
      deviceGroupId,
    })
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, quickFilters])

  useEffect(() => {
    actions.getInventoryDetail({ id, type: ASSET_INVENTORY.DEVICE_GROUP })
    return () => actions.resetInventoryDetail()
  }, [])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps])

  const backToList = () => {
    history.push(
      withSearch(ROUTE.WAREHOUSE_INVENTORY.LIST.PATH, {
        omitPrefixKeys: true,
      }),
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseInventoryDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
        }}
      />
      <QuickFilter
        setQuickFilters={setQuickFilters}
        defaultFilter={DEFAULT_QUICK_FILTERS}
      />
      <DataTable
        rows={inventoryDeviceList}
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
          <ImportExport
            name={t('warehouseInventory.exportDeviceDetail')}
            onExport={() =>
              exportInventoryApi({
                columnSettings: JSON.stringify(columnsSettings),
                queryIds: JSON.stringify(
                  selectedRows?.map((x) => ({ id: x?.id })),
                ),
                filter: convertFilterParams({
                  ...quickFilters,
                  deviceId: quickFilters?.deviceId?.id,
                  warehouseId,
                  deviceGroupId,
                }),
                page,
                limit: pageSize,
                sort: convertSortParams(sort),
                type: TYPE_EXPORT.DEVICE_INVENTORY,
              })
            }
          />
        }
      />
    </Page>
  )
}

export default WarehouseInventoryDetail
