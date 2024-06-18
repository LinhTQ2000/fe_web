export const GET_TRANSFER_TICKET_LIST_START =
  'MMSX_GET_TRANSFER_TICKET_LIST_START'
export const GET_TRANSFER_TICKET_LIST_SUCCESS =
  'MMSX_GET_TRANSFER_TICKET_LIST_SUCCESS'
export const GET_TRANSFER_TICKET_LIST_FAIL =
  'MMSX_GET_TRANSFER_TICKET_LIST_FAIL'

export const GET_TRANSFER_TICKET_DETAIL_START =
  'MMSX_GET_TRANSFER_TICKET_DETAIL_START'
export const GET_TRANSFER_TICKET_DETAIL_SUCCESS =
  'MMSX_GET_TRANSFER_TICKET_DETAIL_SUCCESS'
export const GET_TRANSFER_TICKET_DETAIL_FAIL =
  'MMSX_GET_TRANSFER_TICKET_DETAIL_FAIL'

export const CONFIRM_TRANSFER_TICKET_START =
  'MMSX_CONFIRM_TRANSFER_TICKET_START'
export const CONFIRM_TRANSFER_TICKET_SUCCESS =
  'MMSX_CONFIRM_TRANSFER_TICKET_SUCCESS'
export const CONFIRM_TRANSFER_TICKET_FAIL = 'MMSX_CONFIRM_TRANSFER_TICKET_FAIL'

export const REJECT_TRANSFER_TICKET_START = 'MMSX_REJECT_TRANSFER_TICKET_START'
export const REJECT_TRANSFER_TICKET_SUCCESS =
  'MMSX_REJECT_TRANSFER_TICKET_SUCCESS'
export const REJECT_TRANSFER_TICKET_FAIL = 'MMSX_REJECT_TRANSFER_TICKET_FAIL'

export const CREATE_TRANSFER_TICKET = 'MMSX_CREATE_TRANSFER_TICKET'
export const CREATE_TRANSFER_TICKET_SUCCESS =
  'MMSX_CREATE_TRANSFER_TICKET_SUCCESS'
export const CREATE_TRANSFER_TICKET_FAIL = 'MMSX_CREATE_TRANSFER_TICKET_FAIL'

export const UPDATE_TRANSFER_TICKET = 'MMSX_UPDATE_TRANSFER_TICKET'
export const UPDATE_TRANSFER_TICKET_SUCCESS =
  'MMSX_UPDATE_TRANSFER_TICKET_SUCCESS'
export const UPDATE_TRANSFER_TICKET_FAIL = 'MMSX_UPDATE_TRANSFER_TICKET_FAIL'

export const DELETE_TRANSFER_TICKET_START = 'MMSX_DELETE_TRANSFER_TICKET_START'
export const DELETE_TRANSFER_TICKET_SUCCESS =
  'MMSX_DELETE_TRANSFER_TICKET_SUCCESS'
export const DELETE_TRANSFER_TICKET_FAIL = 'MMSX_DELETE_TRANSFER_TICKET_FAIL'

export const RESET_STATE_TRANSFER_TICKET = 'MMSX_RESET_STATE_TRANSFER_TICKET'

export function getTransferTicketList(payload, onSuccess, onError) {
  return {
    type: GET_TRANSFER_TICKET_LIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getTransferTicketListSuccess(payload) {
  return {
    type: GET_TRANSFER_TICKET_LIST_SUCCESS,
    payload,
  }
}

export function getTransferTicketListFail() {
  return {
    type: GET_TRANSFER_TICKET_LIST_FAIL,
  }
}

export function getTransferTicketDetail(payload, onSuccess, onError) {
  return {
    type: GET_TRANSFER_TICKET_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getTransferTicketDetailSuccess(payload) {
  return {
    type: GET_TRANSFER_TICKET_DETAIL_SUCCESS,
    payload,
  }
}

export function getTransferTicketDetailFail() {
  return {
    type: GET_TRANSFER_TICKET_DETAIL_FAIL,
  }
}

export function confirmTransferTicket(payload, onSuccess, onError) {
  return {
    type: CONFIRM_TRANSFER_TICKET_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmTransferTicketSuccess(payload) {
  return {
    type: CONFIRM_TRANSFER_TICKET_SUCCESS,
    payload,
  }
}

export function confirmTransferTicketFail() {
  return {
    type: CONFIRM_TRANSFER_TICKET_FAIL,
  }
}
export function rejectTransferTicket(payload, onSuccess, onError) {
  return {
    type: REJECT_TRANSFER_TICKET_START,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectTransferTicketSuccess(payload) {
  return {
    type: REJECT_TRANSFER_TICKET_SUCCESS,
    payload,
  }
}

export function rejectTransferTicketFail() {
  return {
    type: REJECT_TRANSFER_TICKET_FAIL,
  }
}

export function createTransferTicket(payload, onSuccess, onError) {
  return {
    type: CREATE_TRANSFER_TICKET,
    payload,
    onSuccess,
    onError,
  }
}

export function createTransferTicketSuccess(payload) {
  return {
    type: CREATE_TRANSFER_TICKET_SUCCESS,
    payload,
  }
}

export function createTransferTicketFail() {
  return {
    type: CREATE_TRANSFER_TICKET_FAIL,
  }
}

export function updateTransferTicket(payload, onSuccess, onError) {
  return {
    type: UPDATE_TRANSFER_TICKET,
    payload,
    onSuccess,
    onError,
  }
}

export function updateTransferTicketSuccess(payload) {
  return {
    type: UPDATE_TRANSFER_TICKET_SUCCESS,
    payload,
  }
}

export function updateTransferTicketFail() {
  return {
    type: UPDATE_TRANSFER_TICKET_FAIL,
  }
}

export function deleteTransferTicket(payload, onSuccess, onError) {
  return {
    type: DELETE_TRANSFER_TICKET_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteTransferTicketSuccess(payload) {
  return {
    type: DELETE_TRANSFER_TICKET_SUCCESS,
    payload,
  }
}

export function deleteTransferTicketFail() {
  return {
    type: DELETE_TRANSFER_TICKET_FAIL,
  }
}

export function resetStateTransferTicket() {
  return {
    type: RESET_STATE_TRANSFER_TICKET,
  }
}
export default {
  getTransferTicketList,
  getTransferTicketListSuccess,
  getTransferTicketListFail,
  getTransferTicketDetail,
  getTransferTicketDetailSuccess,
  getTransferTicketDetailFail,
  confirmTransferTicket,
  confirmTransferTicketSuccess,
  confirmTransferTicketFail,
  rejectTransferTicket,
  rejectTransferTicketSuccess,
  rejectTransferTicketFail,
  createTransferTicket,
  createTransferTicketSuccess,
  createTransferTicketFail,
  updateTransferTicket,
  updateTransferTicketSuccess,
  updateTransferTicketFail,
  deleteTransferTicket,
  deleteTransferTicketSuccess,
  deleteTransferTicketFail,
  resetStateTransferTicket,
}
