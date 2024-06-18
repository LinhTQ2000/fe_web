export const MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_START =
  'MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_START'
export const MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_SUCCESS =
  'MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_SUCCESS'
export const MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_FAIL =
  'MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_FAIL'

export const MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_START =
  'MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_START'
export const MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_SUCCESS =
  'MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_SUCCESS'
export const MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_FAIL =
  'MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_FAIL'

export const MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_START =
  'MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_START'
export const MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_SUCCESS =
  'MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_SUCCESS'
export const MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_FAIL =
  'MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_FAIL'

export const MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_START =
  'MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_START'
export const MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_SUCCESS =
  'MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_SUCCESS'
export const MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_FAIL =
  'MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_FAIL'

export const CONFIRM_WAREHOUSE_IMPORT_REQUEST_START =
  'MMSX_CONFIRM_WAREHOUSE_IMPORT_REQUEST_START'
export const CONFIRM_WAREHOUSE_IMPORT_REQUEST_SUCCESS =
  'MMSX_CONFIRM_WAREHOUSE_IMPORT_REQUEST_SUCCESS'
export const CONFIRM_WAREHOUSE_IMPORT_REQUEST_FAIL =
  'MMSX_CONFIRM_WAREHOUSE_IMPORT_REQUEST_FAIL'

export const REJECT_WAREHOUSE_IMPORT_REQUEST_START =
  'MMSX_REJECT_WAREHOUSE_IMPORT_REQUEST_START'
export const REJECT_WAREHOUSE_IMPORT_REQUEST_SUCCESS =
  'MMSX_REJECT_WAREHOUSE_IMPORT_REQUEST_SUCCESS'
export const REJECT_WAREHOUSE_IMPORT_REQUEST_FAIL =
  'MMSX_REJECT_WAREHOUSE_IMPORT_REQUEST_FAIL'

export const DELETE_WAREHOUSE_IMPORT_REQUEST_START =
  'MMSX_DELETE_WAREHOUSE_IMPORT_REQUEST_START'
export const DELETE_WAREHOUSE_IMPORT_REQUEST_SUCCESS =
  'MMSX_DELETE_WAREHOUSE_IMPORT_REQUEST_SUCCESS'
export const DELETE_WAREHOUSE_IMPORT_REQUEST_FAIL =
  'MMSX_DELETE_WAREHOUSE_IMPORT_REQUEST_FAIL'

export const MMSX_RESET_WAREHOUSE_IMPORT_REQUEST_STATE =
  'MMSX_RESET_WAREHOUSE_IMPORT_REQUEST_STATE'
export function searchWarehouseImportRequest(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_START,
    payload: payload,
    onError,
    onSuccess,
  }
}
export function searchWarehouseImportRequestSuccess(payload) {
  return {
    type: MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
    payload: payload,
  }
}

export function searchWarehouseImportRequestFail() {
  return {
    type: MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_FAIL,
  }
}
export function createWarehouseImportRequest(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function createWarehouseImportRequestSuccess(payload) {
  return {
    type: MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
    payload: payload,
  }
}

export function createWarehouseImportRequestFail() {
  return {
    type: MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_FAIL,
  }
}

export function getDetailWarehouseImportRequest(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDetailWarehouseImportRequestSuccess(payload) {
  return {
    type: MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
    payload,
  }
}

export function getDetailWarehouseImportRequestFail() {
  return {
    type: MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_FAIL,
  }
}

export function updateWarehouseImportRequest(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_START,
    payload,
    onError,
    onSuccess,
  }
}

export function updateWarehouseImportRequestSuccess(payload) {
  return {
    type: MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
    payload,
  }
}

export function updateWarehouseImportRequestFail() {
  return {
    type: MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_FAIL,
  }
}

export function resetState() {
  return {
    type: MMSX_RESET_WAREHOUSE_IMPORT_REQUEST_STATE,
  }
}

export function confirmWarehouseImportRequest(payload, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmWarehouseImportRequestSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
    payload,
  }
}

export function confirmWarehouseImportRequestFail() {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_REQUEST_FAIL,
  }
}
export function rejectWarehouseImportRequest(payload, onSuccess, onError) {
  return {
    type: REJECT_WAREHOUSE_IMPORT_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectWarehouseImportRequestSuccess(payload) {
  return {
    type: REJECT_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
    payload,
  }
}

export function rejectWarehouseImportRequestFail() {
  return {
    type: REJECT_WAREHOUSE_IMPORT_REQUEST_FAIL,
  }
}

export function deleteWarehouseImportRequest(payload, onSuccess, onError) {
  return {
    type: DELETE_WAREHOUSE_IMPORT_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteWarehouseImportRequestSuccess(payload) {
  return {
    type: DELETE_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
    payload,
  }
}

export function deleteWarehouseImportRequestFail() {
  return {
    type: DELETE_WAREHOUSE_IMPORT_REQUEST_FAIL,
  }
}

export default {
  searchWarehouseImportRequest,
  searchWarehouseImportRequestFail,
  searchWarehouseImportRequestSuccess,
  createWarehouseImportRequest,
  createWarehouseImportRequestFail,
  createWarehouseImportRequestSuccess,
  getDetailWarehouseImportRequest,
  getDetailWarehouseImportRequestFail,
  getDetailWarehouseImportRequestSuccess,
  updateWarehouseImportRequest,
  updateWarehouseImportRequestFail,
  updateWarehouseImportRequestSuccess,
  confirmWarehouseImportRequest,
  confirmWarehouseImportRequestSuccess,
  confirmWarehouseImportRequestFail,
  rejectWarehouseImportRequest,
  rejectWarehouseImportRequestSuccess,
  rejectWarehouseImportRequestFail,
  deleteWarehouseImportRequest,
  deleteWarehouseImportRequestSuccess,
  deleteWarehouseImportRequestFail,
  resetState,
}
