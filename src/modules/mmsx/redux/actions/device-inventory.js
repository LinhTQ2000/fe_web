export const GET_DEVICE_INVENTORY_LIST_START =
  'MMSX_GET_DEVICE_INVENTORY_LIST_START'
export const GET_DEVICE_INVENTORY_LIST_SUCCESS =
  'MMSX_GET_DEVICE_INVENTORY_LIST_SUCCESS'
export const GET_DEVICE_INVENTORY_LIST_FAIL =
  'MMSX_GET_DEVICE_INVENTORY_LIST_FAIL'

export const GET_DEVICE_INVENTORY_DETAIL_START =
  'MMSX_GET_DEVICE_INVENTORY_DETAIL_START'
export const GET_DEVICE_INVENTORY_DETAIL_SUCCESS =
  'MMSX_GET_DEVICE_INVENTORY_DETAIL_SUCCESS'
export const GET_DEVICE_INVENTORY_DETAIL_FAIL =
  'MMSX_GET_DEVICE_INVENTORY_DETAIL_FAIL'

export const CONFIRM_DEVICE_INVENTORY_START =
  'MMSX_CONFIRM_DEVICE_INVENTORY_START'
export const CONFIRM_DEVICE_INVENTORY_SUCCESS =
  'MMSX_CONFIRM_DEVICE_INVENTORY_SUCCESS'
export const CONFIRM_DEVICE_INVENTORY_FAIL =
  'MMSX_CONFIRM_DEVICE_INVENTORY_FAIL'

export const REJECT_DEVICE_INVENTORY_START =
  'MMSX_REJECT_DEVICE_INVENTORY_START'
export const REJECT_DEVICE_INVENTORY_SUCCESS =
  'MMSX_REJECT_DEVICE_INVENTORY_SUCCESS'
export const REJECT_DEVICE_INVENTORY_FAIL = 'MMSX_REJECT_DEVICE_INVENTORY_FAIL'

export const CREATE_DEVICE_INVENTORY = 'MMSX_CREATE_DEVICE_INVENTORY'
export const CREATE_DEVICE_INVENTORY_SUCCESS =
  'MMSX_CREATE_DEVICE_INVENTORY_SUCCESS'
export const CREATE_DEVICE_INVENTORY_FAIL = 'MMSX_CREATE_DEVICE_INVENTORY_FAIL'

export const UPDATE_DEVICE_INVENTORY = 'MMSX_UPDATE_DEVICE_INVENTORY'
export const UPDATE_DEVICE_INVENTORY_SUCCESS =
  'MMSX_UPDATE_DEVICE_INVENTORY_SUCCESS'
export const UPDATE_DEVICE_INVENTORY_FAIL = 'MMSX_UPDATE_DEVICE_INVENTORY_FAIL'

export const DELETE_DEVICE_INVENTORY_START =
  'MMSX_DELETE_DEVICE_INVENTORY_START'
export const DELETE_DEVICE_INVENTORY_SUCCESS =
  'MMSX_DELETE_DEVICE_INVENTORY_SUCCESS'
export const DELETE_DEVICE_INVENTORY_FAIL = 'MMSX_DELETE_DEVICE_INVENTORY_FAIL'

export const RESET_STATE_DEVICE_INVENTORY = 'MMSX_RESET_STATE_DEVICE_INVENTORY'

export function getDeviceInventoryList(payload, onSuccess, onError) {
  return {
    type: GET_DEVICE_INVENTORY_LIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDeviceInventoryListSuccess(payload) {
  return {
    type: GET_DEVICE_INVENTORY_LIST_SUCCESS,
    payload,
  }
}

export function getDeviceInventoryListFail() {
  return {
    type: GET_DEVICE_INVENTORY_LIST_FAIL,
  }
}

export function getDeviceInventoryDetail(payload, onSuccess, onError) {
  return {
    type: GET_DEVICE_INVENTORY_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDeviceInventoryDetailSuccess(payload) {
  return {
    type: GET_DEVICE_INVENTORY_DETAIL_SUCCESS,
    payload,
  }
}

export function getDeviceInventoryDetailFail() {
  return {
    type: GET_DEVICE_INVENTORY_DETAIL_FAIL,
  }
}

export function confirmDeviceInventory(payload, onSuccess, onError) {
  return {
    type: CONFIRM_DEVICE_INVENTORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmDeviceInventorySuccess(payload) {
  return {
    type: CONFIRM_DEVICE_INVENTORY_SUCCESS,
    payload,
  }
}

export function confirmDeviceInventoryFail() {
  return {
    type: CONFIRM_DEVICE_INVENTORY_FAIL,
  }
}
export function rejectDeviceInventory(payload, onSuccess, onError) {
  return {
    type: REJECT_DEVICE_INVENTORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectDeviceInventorySuccess(payload) {
  return {
    type: REJECT_DEVICE_INVENTORY_SUCCESS,
    payload,
  }
}

export function rejectDeviceInventoryFail() {
  return {
    type: REJECT_DEVICE_INVENTORY_FAIL,
  }
}

export function createDeviceInventory(payload, onSuccess, onError) {
  return {
    type: CREATE_DEVICE_INVENTORY,
    payload,
    onSuccess,
    onError,
  }
}

export function createDeviceInventorySuccess(payload) {
  return {
    type: CREATE_DEVICE_INVENTORY_SUCCESS,
    payload,
  }
}

export function createDeviceInventoryFail() {
  return {
    type: CREATE_DEVICE_INVENTORY_FAIL,
  }
}

export function updateDeviceInventory(payload, onSuccess, onError) {
  return {
    type: UPDATE_DEVICE_INVENTORY,
    payload,
    onSuccess,
    onError,
  }
}

export function updateDeviceInventorySuccess(payload) {
  return {
    type: UPDATE_DEVICE_INVENTORY_SUCCESS,
    payload,
  }
}

export function updateDeviceInventoryFail() {
  return {
    type: UPDATE_DEVICE_INVENTORY_FAIL,
  }
}

export function deleteDeviceInventory(payload, onSuccess, onError) {
  return {
    type: DELETE_DEVICE_INVENTORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteDeviceInventorySuccess(payload) {
  return {
    type: DELETE_DEVICE_INVENTORY_SUCCESS,
    payload,
  }
}

export function deleteDeviceInventoryFail() {
  return {
    type: DELETE_DEVICE_INVENTORY_FAIL,
  }
}

export function resetStateDeviceInventory() {
  return {
    type: RESET_STATE_DEVICE_INVENTORY,
  }
}
export default {
  getDeviceInventoryList,
  getDeviceInventoryListSuccess,
  getDeviceInventoryListFail,
  getDeviceInventoryDetail,
  getDeviceInventoryDetailSuccess,
  getDeviceInventoryDetailFail,
  confirmDeviceInventory,
  confirmDeviceInventorySuccess,
  confirmDeviceInventoryFail,
  rejectDeviceInventory,
  rejectDeviceInventorySuccess,
  rejectDeviceInventoryFail,
  createDeviceInventory,
  createDeviceInventorySuccess,
  createDeviceInventoryFail,
  updateDeviceInventory,
  updateDeviceInventorySuccess,
  updateDeviceInventoryFail,
  deleteDeviceInventory,
  deleteDeviceInventorySuccess,
  deleteDeviceInventoryFail,
  resetStateDeviceInventory,
}
