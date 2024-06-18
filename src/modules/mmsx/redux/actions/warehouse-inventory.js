export const MMSX_SEARCH_WAREHOUSE_INVENTORY_START =
  'MMSX_SEARCH_WAREHOUSE_INVENTORY_START'
export const MMSX_SEARCH_WAREHOUSE_INVENTORY_SUCCESS =
  'MMSX_SEARCH_WAREHOUSE_INVENTORY_SUCCESS'
export const MMSX_SEARCH_WAREHOUSE_INVENTORY_FAILED =
  'MMSX_SEARCH_WAREHOUSE_INVENTORY_FAILED'

export const MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_START =
  'MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_START'
export const MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_SUCCESS =
  'MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_SUCCESS'
export const MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_FAILED =
  'MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_FAILED'

export const MMSX_GET_INVENTORY_DETAIL_START = 'MMSX_GET_INVENTORY_DETAIL_START'
export const MMSX_GET_INVENTORY_DETAIL_SUCCESS =
  'MMSX_GET_INVENTORY_DETAIL_SUCCESS'
export const MMSX_GET_INVENTORY_DETAIL_FAILED =
  'MMSX_GET_INVENTORY_DETAIL_FAILED'

export const MMSX_RESET_INVENTORY_DETAIL = 'MMSX_RESET_INVENTORY_DETAIL'

export function searchWarehouseInventory(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_WAREHOUSE_INVENTORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchWarehouseInventorySuccess(payload) {
  return {
    type: MMSX_SEARCH_WAREHOUSE_INVENTORY_SUCCESS,
    payload,
  }
}

export function searchWarehouseInventoryFailed() {
  return {
    type: MMSX_SEARCH_WAREHOUSE_INVENTORY_FAILED,
  }
}

export function getInventoryByWarehouseDeviceGroup(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getInventoryByWarehouseDeviceGroupSuccess(payload) {
  return {
    type: MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_SUCCESS,
    payload,
  }
}

export function getInventoryByWarehouseDeviceGroupFailed() {
  return {
    type: MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_FAILED,
  }
}

export function getInventoryDetail(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_INVENTORY_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getInventoryDetailSuccess(payload) {
  return {
    type: MMSX_GET_INVENTORY_DETAIL_SUCCESS,
    payload,
  }
}

export function getInventoryDetailFailed() {
  return {
    type: MMSX_GET_INVENTORY_DETAIL_FAILED,
  }
}

export function resetInventoryDetail() {
  return {
    type: MMSX_RESET_INVENTORY_DETAIL,
  }
}

export default {
  searchWarehouseInventory,
  searchWarehouseInventorySuccess,
  searchWarehouseInventoryFailed,
  getInventoryByWarehouseDeviceGroup,
  getInventoryByWarehouseDeviceGroupSuccess,
  getInventoryByWarehouseDeviceGroupFailed,
  getInventoryDetail,
  getInventoryDetailSuccess,
  getInventoryDetailFailed,
  resetInventoryDetail,
}
