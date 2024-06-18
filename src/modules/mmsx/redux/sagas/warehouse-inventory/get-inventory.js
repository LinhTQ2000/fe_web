import { api } from '~/services/api'

export const getInventoryApi = (data) => {
  const { factoryId, assetId } = data
  const uri = `v1/mms/warehouses/inventories/asset/${assetId}/factory/${factoryId}`
  return api.get(uri)
}

export const getInventorySupplyByWarehouseApi = (data) => {
  const { warehouseId, assetId } = data
  const params = {
    ...data,
  }
  delete params.warehouseId
  delete params.assetId
  const uri = `v1/mms/warehouses/inventories/asset/${assetId}/warehouse/${warehouseId}`
  return api.get(uri, params)
}
