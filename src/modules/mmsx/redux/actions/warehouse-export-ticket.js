export const MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_START =
  'MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_START'
export const MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_SUCCESS =
  'MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_SUCCESS'
export const MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_FAIL =
  'MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_FAIL'

export const MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_START =
  'MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_START'
export const MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_SUCCESS =
  'MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_SUCCESS'
export const MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_FAIL =
  'MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_FAIL'

export const MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_START =
  'MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_START'
export const MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_SUCCESS =
  'MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_SUCCESS'
export const MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_FAIL =
  'MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_FAIL'

export const MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_START =
  'MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_START'
export const MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_SUCCESS =
  'MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_SUCCESS'
export const MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_FAIL =
  'MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_FAIL'

export const CONFIRM_WAREHOUSE_EXPORT_TICKET_START =
  'MMSX_CONFIRM_WAREHOUSE_EXPORT_TICKET_START'
export const CONFIRM_WAREHOUSE_EXPORT_TICKET_SUCCESS =
  'MMSX_CONFIRM_WAREHOUSE_EXPORT_TICKET_SUCCESS'
export const CONFIRM_WAREHOUSE_EXPORT_TICKET_FAIL =
  'MMSX_CONFIRM_WAREHOUSE_EXPORT_TICKET_FAIL'

export const REJECT_WAREHOUSE_EXPORT_TICKET_START =
  'MMSX_REJECT_WAREHOUSE_EXPORT_TICKET_START'
export const REJECT_WAREHOUSE_EXPORT_TICKET_SUCCESS =
  'MMSX_REJECT_WAREHOUSE_EXPORT_TICKET_SUCCESS'
export const REJECT_WAREHOUSE_EXPORT_TICKET_FAIL =
  'MMSX_REJECT_WAREHOUSE_EXPORT_TICKET_FAIL'

export const DELETE_WAREHOUSE_EXPORT_TICKET_START =
  'MMSX_DELETE_WAREHOUSE_EXPORT_TICKET_START'
export const DELETE_WAREHOUSE_EXPORT_TICKET_SUCCESS =
  'MMSX_DELETE_WAREHOUSE_EXPORT_TICKET_SUCCESS'
export const DELETE_WAREHOUSE_EXPORT_TICKET_FAIL =
  'MMSX_DELETE_WAREHOUSE_EXPORT_TICKET_FAIL'

export const MMSX_RESET_WAREHOUSE_EXPORT_TICKET_STATE =
  'MMSX_RESET_WAREHOUSE_EXPORT_TICKET_STATE'
export function searchWarehouseExportTicket(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_START,
    payload: payload,
    onError,
    onSuccess,
  }
}
export function searchWarehouseExportTicketSuccess(payload) {
  return {
    type: MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_SUCCESS,
    payload: payload,
  }
}

export function searchWarehouseExportTicketFail() {
  return {
    type: MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_FAIL,
  }
}
export function createWarehouseExportTicket(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function createWarehouseExportTicketSuccess(payload) {
  return {
    type: MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_SUCCESS,
    payload: payload,
  }
}

export function createWarehouseExportTicketFail() {
  return {
    type: MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_FAIL,
  }
}

export function getDetailWarehouseExportTicket(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDetailWarehouseExportTicketSuccess(payload) {
  return {
    type: MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_SUCCESS,
    payload,
  }
}

export function getDetailWarehouseExportTicketFail() {
  return {
    type: MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_FAIL,
  }
}

export function updateWarehouseExportTicket(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_START,
    payload,
    onError,
    onSuccess,
  }
}

export function updateWarehouseExportTicketSuccess(payload) {
  return {
    type: MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_SUCCESS,
    payload,
  }
}

export function updateWarehouseExportTicketFail() {
  return {
    type: MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_FAIL,
  }
}

export function resetState() {
  return {
    type: MMSX_RESET_WAREHOUSE_EXPORT_TICKET_STATE,
  }
}

export function confirmWarehouseExportTicket(payload, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_TICKET_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmWarehouseExportTicketSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_TICKET_SUCCESS,
    payload,
  }
}

export function confirmWarehouseExportTicketFail() {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_TICKET_FAIL,
  }
}
export function rejectWarehouseExportTicket(payload, onSuccess, onError) {
  return {
    type: REJECT_WAREHOUSE_EXPORT_TICKET_START,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectWarehouseExportTicketSuccess(payload) {
  return {
    type: REJECT_WAREHOUSE_EXPORT_TICKET_SUCCESS,
    payload,
  }
}

export function rejectWarehouseExportTicketFail() {
  return {
    type: REJECT_WAREHOUSE_EXPORT_TICKET_FAIL,
  }
}

export function deleteWarehouseExportTicket(payload, onSuccess, onError) {
  return {
    type: DELETE_WAREHOUSE_EXPORT_TICKET_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteWarehouseExportTicketSuccess(payload) {
  return {
    type: DELETE_WAREHOUSE_EXPORT_TICKET_SUCCESS,
    payload,
  }
}

export function deleteWarehouseExportTicketFail() {
  return {
    type: DELETE_WAREHOUSE_EXPORT_TICKET_FAIL,
  }
}

export default {
  searchWarehouseExportTicket,
  searchWarehouseExportTicketFail,
  searchWarehouseExportTicketSuccess,
  createWarehouseExportTicket,
  createWarehouseExportTicketFail,
  createWarehouseExportTicketSuccess,
  getDetailWarehouseExportTicket,
  getDetailWarehouseExportTicketFail,
  getDetailWarehouseExportTicketSuccess,
  updateWarehouseExportTicket,
  updateWarehouseExportTicketFail,
  updateWarehouseExportTicketSuccess,
  confirmWarehouseExportTicket,
  confirmWarehouseExportTicketSuccess,
  confirmWarehouseExportTicketFail,
  rejectWarehouseExportTicket,
  rejectWarehouseExportTicketSuccess,
  rejectWarehouseExportTicketFail,
  deleteWarehouseExportTicket,
  deleteWarehouseExportTicketSuccess,
  deleteWarehouseExportTicketFail,
  resetState,
}
