export const GET_SUPPLIES_INVENTORY_LIST_START =
  'MMSX_GET_SUPPLIES_INVENTORY_LIST_START'
export const GET_SUPPLIES_INVENTORY_LIST_SUCCESS =
  'MMSX_GET_SUPPLIES_INVENTORY_LIST_SUCCESS'
export const GET_SUPPLIES_INVENTORY_LIST_FAIL =
  'MMSX_GET_SUPPLIES_INVENTORY_LIST_FAIL'

export const GET_SUPPLIES_INVENTORY_DETAIL_START =
  'MMSX_GET_SUPPLIES_INVENTORY_DETAIL_START'
export const GET_SUPPLIES_INVENTORY_DETAIL_SUCCESS =
  'MMSX_GET_SUPPLIES_INVENTORY_DETAIL_SUCCESS'
export const GET_SUPPLIES_INVENTORY_DETAIL_FAIL =
  'MMSX_GET_SUPPLIES_INVENTORY_DETAIL_FAIL'

export const CONFIRM_SUPPLIES_INVENTORY_START =
  'MMSX_CONFIRM_SUPPLIES_INVENTORY_START'
export const CONFIRM_SUPPLIES_INVENTORY_SUCCESS =
  'MMSX_CONFIRM_SUPPLIES_INVENTORY_SUCCESS'
export const CONFIRM_SUPPLIES_INVENTORY_FAIL =
  'MMSX_CONFIRM_SUPPLIES_INVENTORY_FAIL'

export const REJECT_SUPPLIES_INVENTORY_START =
  'MMSX_REJECT_SUPPLIES_INVENTORY_START'
export const REJECT_SUPPLIES_INVENTORY_SUCCESS =
  'MMSX_REJECT_SUPPLIES_INVENTORY_SUCCESS'
export const REJECT_SUPPLIES_INVENTORY_FAIL =
  'MMSX_REJECT_SUPPLIES_INVENTORY_FAIL'

export const CREATE_SUPPLIES_INVENTORY = 'MMSX_CREATE_SUPPLIES_INVENTORY'
export const CREATE_SUPPLIES_INVENTORY_SUCCESS =
  'MMSX_CREATE_SUPPLIES_INVENTORY_SUCCESS'
export const CREATE_SUPPLIES_INVENTORY_FAIL =
  'MMSX_CREATE_SUPPLIES_INVENTORY_FAIL'

export const UPDATE_SUPPLIES_INVENTORY = 'MMSX_UPDATE_SUPPLIES_INVENTORY'
export const UPDATE_SUPPLIES_INVENTORY_SUCCESS =
  'MMSX_UPDATE_SUPPLIES_INVENTORY_SUCCESS'
export const UPDATE_SUPPLIES_INVENTORY_FAIL =
  'MMSX_UPDATE_SUPPLIES_INVENTORY_FAIL'

export const DELETE_SUPPLIES_INVENTORY_START =
  'MMSX_DELETE_SUPPLIES_INVENTORY_START'
export const DELETE_SUPPLIES_INVENTORY_SUCCESS =
  'MMSX_DELETE_SUPPLIES_INVENTORY_SUCCESS'
export const DELETE_SUPPLIES_INVENTORY_FAIL =
  'MMSX_DELETE_SUPPLIES_INVENTORY_FAIL'

export const RESET_STATE_SUPPLIES_INVENTORY =
  'MMSX_RESET_STATE_SUPPLIES_INVENTORY'

export function getSuppliesInventoryList(payload, onSuccess, onError) {
  return {
    type: GET_SUPPLIES_INVENTORY_LIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getSuppliesInventoryListSuccess(payload) {
  return {
    type: GET_SUPPLIES_INVENTORY_LIST_SUCCESS,
    payload,
  }
}

export function getSuppliesInventoryListFail() {
  return {
    type: GET_SUPPLIES_INVENTORY_LIST_FAIL,
  }
}

export function getSuppliesInventoryDetail(payload, onSuccess, onError) {
  return {
    type: GET_SUPPLIES_INVENTORY_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getSuppliesInventoryDetailSuccess(payload) {
  return {
    type: GET_SUPPLIES_INVENTORY_DETAIL_SUCCESS,
    payload,
  }
}

export function getSuppliesInventoryDetailFail() {
  return {
    type: GET_SUPPLIES_INVENTORY_DETAIL_FAIL,
  }
}

export function confirmSuppliesInventory(payload, onSuccess, onError) {
  return {
    type: CONFIRM_SUPPLIES_INVENTORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmSuppliesInventorySuccess(payload) {
  return {
    type: CONFIRM_SUPPLIES_INVENTORY_SUCCESS,
    payload,
  }
}

export function confirmSuppliesInventoryFail() {
  return {
    type: CONFIRM_SUPPLIES_INVENTORY_FAIL,
  }
}
export function rejectSuppliesInventory(payload, onSuccess, onError) {
  return {
    type: REJECT_SUPPLIES_INVENTORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectSuppliesInventorySuccess(payload) {
  return {
    type: REJECT_SUPPLIES_INVENTORY_SUCCESS,
    payload,
  }
}

export function rejectSuppliesInventoryFail() {
  return {
    type: REJECT_SUPPLIES_INVENTORY_FAIL,
  }
}

export function createSuppliesInventory(payload, onSuccess, onError) {
  return {
    type: CREATE_SUPPLIES_INVENTORY,
    payload,
    onSuccess,
    onError,
  }
}

export function createSuppliesInventorySuccess(payload) {
  return {
    type: CREATE_SUPPLIES_INVENTORY_SUCCESS,
    payload,
  }
}

export function createSuppliesInventoryFail() {
  return {
    type: CREATE_SUPPLIES_INVENTORY_FAIL,
  }
}

export function updateSuppliesInventory(payload, onSuccess, onError) {
  return {
    type: UPDATE_SUPPLIES_INVENTORY,
    payload,
    onSuccess,
    onError,
  }
}

export function updateSuppliesInventorySuccess(payload) {
  return {
    type: UPDATE_SUPPLIES_INVENTORY_SUCCESS,
    payload,
  }
}

export function updateSuppliesInventoryFail() {
  return {
    type: UPDATE_SUPPLIES_INVENTORY_FAIL,
  }
}

export function deleteSuppliesInventory(payload, onSuccess, onError) {
  return {
    type: DELETE_SUPPLIES_INVENTORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteSuppliesInventorySuccess(payload) {
  return {
    type: DELETE_SUPPLIES_INVENTORY_SUCCESS,
    payload,
  }
}

export function deleteSuppliesInventoryFail() {
  return {
    type: DELETE_SUPPLIES_INVENTORY_FAIL,
  }
}

export function resetStateSuppliesInventory() {
  return {
    type: RESET_STATE_SUPPLIES_INVENTORY,
  }
}
export default {
  getSuppliesInventoryList,
  getSuppliesInventoryListSuccess,
  getSuppliesInventoryListFail,
  getSuppliesInventoryDetail,
  getSuppliesInventoryDetailSuccess,
  getSuppliesInventoryDetailFail,
  confirmSuppliesInventory,
  confirmSuppliesInventorySuccess,
  confirmSuppliesInventoryFail,
  rejectSuppliesInventory,
  rejectSuppliesInventorySuccess,
  rejectSuppliesInventoryFail,
  createSuppliesInventory,
  createSuppliesInventorySuccess,
  createSuppliesInventoryFail,
  updateSuppliesInventory,
  updateSuppliesInventorySuccess,
  updateSuppliesInventoryFail,
  deleteSuppliesInventory,
  deleteSuppliesInventorySuccess,
  deleteSuppliesInventoryFail,
  resetStateSuppliesInventory,
}
