export const GET_WAREHOUSE_IMPORT_TICKET_LIST_START =
  'MMSX_GET_WAREHOUSE_IMPORT_TICKET_LIST_START'
export const GET_WAREHOUSE_IMPORT_TICKET_LIST_SUCCESS =
  'MMSX_GET_WAREHOUSE_IMPORT_TICKET_LIST_SUCCESS'
export const GET_WAREHOUSE_IMPORT_TICKET_LIST_FAIL =
  'MMSX_GET_WAREHOUSE_IMPORT_TICKET_LIST_FAIL'

export const GET_WAREHOUSE_IMPORT_TICKET_DETAIL_START =
  'MMSX_GET_WAREHOUSE_IMPORT_TICKET_DETAIL_START'
export const GET_WAREHOUSE_IMPORT_TICKET_DETAIL_SUCCESS =
  'MMSX_GET_WAREHOUSE_IMPORT_TICKET_DETAIL_SUCCESS'
export const GET_WAREHOUSE_IMPORT_TICKET_DETAIL_FAIL =
  'MMSX_GET_WAREHOUSE_IMPORT_TICKET_DETAIL_FAIL'

export const CONFIRM_WAREHOUSE_IMPORT_TICKET_START =
  'MMSX_CONFIRM_WAREHOUSE_IMPORT_TICKET_START'
export const CONFIRM_WAREHOUSE_IMPORT_TICKET_SUCCESS =
  'MMSX_CONFIRM_WAREHOUSE_IMPORT_TICKET_SUCCESS'
export const CONFIRM_WAREHOUSE_IMPORT_TICKET_FAIL =
  'MMSX_CONFIRM_WAREHOUSE_IMPORT_TICKET_FAIL'

export const REJECT_WAREHOUSE_IMPORT_TICKET_START =
  'MMSX_REJECT_WAREHOUSE_IMPORT_TICKET_START'
export const REJECT_WAREHOUSE_IMPORT_TICKET_SUCCESS =
  'MMSX_REJECT_WAREHOUSE_IMPORT_TICKET_SUCCESS'
export const REJECT_WAREHOUSE_IMPORT_TICKET_FAIL =
  'MMSX_REJECT_WAREHOUSE_IMPORT_TICKET_FAIL'

export const CREATE_WAREHOUSE_IMPORT_TICKET =
  'MMSX_CREATE_WAREHOUSE_IMPORT_TICKET'
export const CREATE_WAREHOUSE_IMPORT_TICKET_SUCCESS =
  'MMSX_CREATE_WAREHOUSE_IMPORT_TICKET_SUCCESS'
export const CREATE_WAREHOUSE_IMPORT_TICKET_FAIL =
  'MMSX_CREATE_WAREHOUSE_IMPORT_TICKET_FAIL'

export const UPDATE_WAREHOUSE_IMPORT_TICKET =
  'MMSX_UPDATE_WAREHOUSE_IMPORT_TICKET'
export const UPDATE_WAREHOUSE_IMPORT_TICKET_SUCCESS =
  'MMSX_UPDATE_WAREHOUSE_IMPORT_TICKET_SUCCESS'
export const UPDATE_WAREHOUSE_IMPORT_TICKET_FAIL =
  'MMSX_UPDATE_WAREHOUSE_IMPORT_TICKET_FAIL'

export const DELETE_WAREHOUSE_IMPORT_TICKET_START =
  'MMSX_DELETE_WAREHOUSE_IMPORT_TICKET_START'
export const DELETE_WAREHOUSE_IMPORT_TICKET_SUCCESS =
  'MMSX_DELETE_WAREHOUSE_IMPORT_TICKET_SUCCESS'
export const DELETE_WAREHOUSE_IMPORT_TICKET_FAIL =
  'MMSX_DELETE_WAREHOUSE_IMPORT_TICKET_FAIL'

export const RESET_STATE_WAREHOUSE_IMPORT_TICKET =
  'MMSX_RESET_STATE_WAREHOUSE_IMPORT_TICKET'

export function getWarehouseImportManagementList(payload, onSuccess, onError) {
  return {
    type: GET_WAREHOUSE_IMPORT_TICKET_LIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getWarehouseImportManagementListSuccess(payload) {
  return {
    type: GET_WAREHOUSE_IMPORT_TICKET_LIST_SUCCESS,
    payload,
  }
}

export function getWarehouseImportManagementListFail() {
  return {
    type: GET_WAREHOUSE_IMPORT_TICKET_LIST_FAIL,
  }
}

export function getWarehouseImportManagementDetail(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: GET_WAREHOUSE_IMPORT_TICKET_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getWarehouseImportManagementDetailSuccess(payload) {
  return {
    type: GET_WAREHOUSE_IMPORT_TICKET_DETAIL_SUCCESS,
    payload,
  }
}

export function getWarehouseImportManagementDetailFail() {
  return {
    type: GET_WAREHOUSE_IMPORT_TICKET_DETAIL_FAIL,
  }
}

export function confirmWarehouseImportManagement(payload, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_TICKET_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmWarehouseImportManagementSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_TICKET_SUCCESS,
    payload,
  }
}

export function confirmWarehouseImportManagementFail() {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_TICKET_FAIL,
  }
}
export function rejectWarehouseImportManagement(payload, onSuccess, onError) {
  return {
    type: REJECT_WAREHOUSE_IMPORT_TICKET_START,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectWarehouseImportManagementSuccess(payload) {
  return {
    type: REJECT_WAREHOUSE_IMPORT_TICKET_SUCCESS,
    payload,
  }
}

export function rejectWarehouseImportManagementFail() {
  return {
    type: REJECT_WAREHOUSE_IMPORT_TICKET_FAIL,
  }
}

export function createWarehouseImportManagement(payload, onSuccess, onError) {
  return {
    type: CREATE_WAREHOUSE_IMPORT_TICKET,
    payload,
    onSuccess,
    onError,
  }
}

export function createWarehouseImportManagementSuccess(payload) {
  return {
    type: CREATE_WAREHOUSE_IMPORT_TICKET_SUCCESS,
    payload,
  }
}

export function createWarehouseImportManagementFail() {
  return {
    type: CREATE_WAREHOUSE_IMPORT_TICKET_FAIL,
  }
}

export function updateWarehouseImportManagement(payload, onSuccess, onError) {
  return {
    type: UPDATE_WAREHOUSE_IMPORT_TICKET,
    payload,
    onSuccess,
    onError,
  }
}

export function updateWarehouseImportManagementSuccess(payload) {
  return {
    type: UPDATE_WAREHOUSE_IMPORT_TICKET_SUCCESS,
    payload,
  }
}

export function updateWarehouseImportManagementFail() {
  return {
    type: UPDATE_WAREHOUSE_IMPORT_TICKET_FAIL,
  }
}

export function deleteWarehouseImportManagement(payload, onSuccess, onError) {
  return {
    type: DELETE_WAREHOUSE_IMPORT_TICKET_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteWarehouseImportManagementSuccess(payload) {
  return {
    type: DELETE_WAREHOUSE_IMPORT_TICKET_SUCCESS,
    payload,
  }
}

export function deleteWarehouseImportManagementFail() {
  return {
    type: DELETE_WAREHOUSE_IMPORT_TICKET_FAIL,
  }
}

export function resetStateWarehouseImportManagement() {
  return {
    type: RESET_STATE_WAREHOUSE_IMPORT_TICKET,
  }
}
export default {
  getWarehouseImportManagementList,
  getWarehouseImportManagementListSuccess,
  getWarehouseImportManagementListFail,
  getWarehouseImportManagementDetail,
  getWarehouseImportManagementDetailSuccess,
  getWarehouseImportManagementDetailFail,
  confirmWarehouseImportManagement,
  confirmWarehouseImportManagementSuccess,
  confirmWarehouseImportManagementFail,
  rejectWarehouseImportManagement,
  rejectWarehouseImportManagementSuccess,
  rejectWarehouseImportManagementFail,
  createWarehouseImportManagement,
  createWarehouseImportManagementSuccess,
  createWarehouseImportManagementFail,
  updateWarehouseImportManagement,
  updateWarehouseImportManagementSuccess,
  updateWarehouseImportManagementFail,
  deleteWarehouseImportManagement,
  deleteWarehouseImportManagementSuccess,
  deleteWarehouseImportManagementFail,
  resetStateWarehouseImportManagement,
}
