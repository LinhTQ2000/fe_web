export const GET_WAREHOUSE_EXPORT_REQUEST_LIST_START =
  'MMSX_GET_WAREHOUSE_EXPORT_REQUEST_LIST_START'
export const GET_WAREHOUSE_EXPORT_REQUEST_LIST_SUCCESS =
  'MMSX_GET_WAREHOUSE_EXPORT_REQUEST_LIST_SUCCESS'
export const GET_WAREHOUSE_EXPORT_REQUEST_LIST_FAIL =
  'MMSX_GET_WAREHOUSE_EXPORT_REQUEST_LIST_FAIL'

export const GET_WAREHOUSE_EXPORT_REQUEST_DETAIL_START =
  'MMSX_GET_WAREHOUSE_EXPORT_REQUEST_DETAIL_START'
export const GET_WAREHOUSE_EXPORT_REQUEST_DETAIL_SUCCESS =
  'MMSX_GET_WAREHOUSE_EXPORT_REQUEST_DETAIL_SUCCESS'
export const GET_WAREHOUSE_EXPORT_REQUEST_DETAIL_FAIL =
  'MMSX_GET_WAREHOUSE_EXPORT_REQUEST_DETAIL_FAIL'

export const CONFIRM_WAREHOUSE_EXPORT_REQUEST_START =
  'MMSX_CONFIRM_WAREHOUSE_EXPORT_REQUEST_START'
export const CONFIRM_WAREHOUSE_EXPORT_REQUEST_SUCCESS =
  'MMSX_CONFIRM_WAREHOUSE_EXPORT_REQUEST_SUCCESS'
export const CONFIRM_WAREHOUSE_EXPORT_REQUEST_FAIL =
  'MMSX_CONFIRM_WAREHOUSE_EXPORT_REQUEST_FAIL'

export const REJECT_WAREHOUSE_EXPORT_REQUEST_START =
  'MMSX_REJECT_WAREHOUSE_EXPORT_REQUEST_START'
export const REJECT_WAREHOUSE_EXPORT_REQUEST_SUCCESS =
  'MMSX_REJECT_WAREHOUSE_EXPORT_REQUEST_SUCCESS'
export const REJECT_WAREHOUSE_EXPORT_REQUEST_FAIL =
  'MMSX_REJECT_WAREHOUSE_EXPORT_REQUEST_FAIL'

export const CREATE_WAREHOUSE_EXPORT_REQUEST =
  'MMSX_CREATE_WAREHOUSE_EXPORT_REQUEST'
export const CREATE_WAREHOUSE_EXPORT_REQUEST_SUCCESS =
  'MMSX_CREATE_WAREHOUSE_EXPORT_REQUEST_SUCCESS'
export const CREATE_WAREHOUSE_EXPORT_REQUEST_FAIL =
  'MMSX_CREATE_WAREHOUSE_EXPORT_REQUEST_FAIL'

export const UPDATE_WAREHOUSE_EXPORT_REQUEST =
  'MMSX_UPDATE_WAREHOUSE_EXPORT_REQUEST'
export const UPDATE_WAREHOUSE_EXPORT_REQUEST_SUCCESS =
  'MMSX_UPDATE_WAREHOUSE_EXPORT_REQUEST_SUCCESS'
export const UPDATE_WAREHOUSE_EXPORT_REQUEST_FAIL =
  'MMSX_UPDATE_WAREHOUSE_EXPORT_REQUEST_FAIL'

export const DELETE_WAREHOUSE_EXPORT_REQUEST_START =
  'MMSX_DELETE_WAREHOUSE_EXPORT_REQUEST_START'
export const DELETE_WAREHOUSE_EXPORT_REQUEST_SUCCESS =
  'MMSX_DELETE_WAREHOUSE_EXPORT_REQUEST_SUCCESS'
export const DELETE_WAREHOUSE_EXPORT_REQUEST_FAIL =
  'MMSX_DELETE_WAREHOUSE_EXPORT_REQUEST_FAIL'

export const RESET_STATE_WAREHOUSE_EXPORT_REQUEST =
  'MMSX_RESET_STATE_WAREHOUSE_EXPORT_REQUEST'

export function getWarehouseExportManagementList(payload, onSuccess, onError) {
  return {
    type: GET_WAREHOUSE_EXPORT_REQUEST_LIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getWarehouseExportManagementListSuccess(payload) {
  return {
    type: GET_WAREHOUSE_EXPORT_REQUEST_LIST_SUCCESS,
    payload,
  }
}

export function getWarehouseExportManagementListFail() {
  return {
    type: GET_WAREHOUSE_EXPORT_REQUEST_LIST_FAIL,
  }
}

export function getWarehouseExportManagementDetail(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: GET_WAREHOUSE_EXPORT_REQUEST_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getWarehouseExportManagementDetailSuccess(payload) {
  return {
    type: GET_WAREHOUSE_EXPORT_REQUEST_DETAIL_SUCCESS,
    payload,
  }
}

export function getWarehouseExportManagementDetailFail() {
  return {
    type: GET_WAREHOUSE_EXPORT_REQUEST_DETAIL_FAIL,
  }
}

export function confirmWarehouseExportManagement(payload, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmWarehouseExportManagementSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_REQUEST_SUCCESS,
    payload,
  }
}

export function confirmWarehouseExportManagementFail() {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_REQUEST_FAIL,
  }
}
export function rejectWarehouseExportManagement(payload, onSuccess, onError) {
  return {
    type: REJECT_WAREHOUSE_EXPORT_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectWarehouseExportManagementSuccess(payload) {
  return {
    type: REJECT_WAREHOUSE_EXPORT_REQUEST_SUCCESS,
    payload,
  }
}

export function rejectWarehouseExportManagementFail() {
  return {
    type: REJECT_WAREHOUSE_EXPORT_REQUEST_FAIL,
  }
}

export function createWarehouseExportManagement(payload, onSuccess, onError) {
  return {
    type: CREATE_WAREHOUSE_EXPORT_REQUEST,
    payload,
    onSuccess,
    onError,
  }
}

export function createWarehouseExportManagementSuccess(payload) {
  return {
    type: CREATE_WAREHOUSE_EXPORT_REQUEST_SUCCESS,
    payload,
  }
}

export function createWarehouseExportManagementFail() {
  return {
    type: CREATE_WAREHOUSE_EXPORT_REQUEST_FAIL,
  }
}

export function updateWarehouseExportManagement(payload, onSuccess, onError) {
  return {
    type: UPDATE_WAREHOUSE_EXPORT_REQUEST,
    payload,
    onSuccess,
    onError,
  }
}

export function updateWarehouseExportManagementSuccess(payload) {
  return {
    type: UPDATE_WAREHOUSE_EXPORT_REQUEST_SUCCESS,
    payload,
  }
}

export function updateWarehouseExportManagementFail() {
  return {
    type: UPDATE_WAREHOUSE_EXPORT_REQUEST_FAIL,
  }
}

export function deleteWarehouseExportManagement(payload, onSuccess, onError) {
  return {
    type: DELETE_WAREHOUSE_EXPORT_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteWarehouseExportManagementSuccess(payload) {
  return {
    type: DELETE_WAREHOUSE_EXPORT_REQUEST_SUCCESS,
    payload,
  }
}

export function deleteWarehouseExportManagementFail() {
  return {
    type: DELETE_WAREHOUSE_EXPORT_REQUEST_FAIL,
  }
}

export function resetStateWarehouseExportManagement() {
  return {
    type: RESET_STATE_WAREHOUSE_EXPORT_REQUEST,
  }
}
export default {
  getWarehouseExportManagementList,
  getWarehouseExportManagementListSuccess,
  getWarehouseExportManagementListFail,
  getWarehouseExportManagementDetail,
  getWarehouseExportManagementDetailSuccess,
  getWarehouseExportManagementDetailFail,
  confirmWarehouseExportManagement,
  confirmWarehouseExportManagementSuccess,
  confirmWarehouseExportManagementFail,
  rejectWarehouseExportManagement,
  rejectWarehouseExportManagementSuccess,
  rejectWarehouseExportManagementFail,
  createWarehouseExportManagement,
  createWarehouseExportManagementSuccess,
  createWarehouseExportManagementFail,
  updateWarehouseExportManagement,
  updateWarehouseExportManagementSuccess,
  updateWarehouseExportManagementFail,
  deleteWarehouseExportManagement,
  deleteWarehouseExportManagementSuccess,
  deleteWarehouseExportManagementFail,
  resetStateWarehouseExportManagement,
}
