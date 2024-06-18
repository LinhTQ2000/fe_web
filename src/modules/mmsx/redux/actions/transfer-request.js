export const GET_TRANSFER_REQUEST_LIST_START =
  'MMSX_GET_TRANSFER_REQUEST_LIST_START'
export const GET_TRANSFER_REQUEST_LIST_SUCCESS =
  'MMSX_GET_TRANSFER_REQUEST_LIST_SUCCESS'
export const GET_TRANSFER_REQUEST_LIST_FAIL =
  'MMSX_GET_TRANSFER_REQUEST_LIST_FAIL'

export const GET_TRANSFER_REQUEST_DETAIL_START =
  'MMSX_GET_TRANSFER_REQUEST_DETAIL_START'
export const GET_TRANSFER_REQUEST_DETAIL_SUCCESS =
  'MMSX_GET_TRANSFER_REQUEST_DETAIL_SUCCESS'
export const GET_TRANSFER_REQUEST_DETAIL_FAIL =
  'MMSX_GET_TRANSFER_REQUEST_DETAIL_FAIL'

export const CONFIRM_TRANSFER_REQUEST_START =
  'MMSX_CONFIRM_TRANSFER_REQUEST_START'
export const CONFIRM_TRANSFER_REQUEST_SUCCESS =
  'MMSX_CONFIRM_TRANSFER_REQUEST_SUCCESS'
export const CONFIRM_TRANSFER_REQUEST_FAIL =
  'MMSX_CONFIRM_TRANSFER_REQUEST_FAIL'

export const REJECT_TRANSFER_REQUEST_START =
  'MMSX_REJECT_TRANSFER_REQUEST_START'
export const REJECT_TRANSFER_REQUEST_SUCCESS =
  'MMSX_REJECT_TRANSFER_REQUEST_SUCCESS'
export const REJECT_TRANSFER_REQUEST_FAIL = 'MMSX_REJECT_TRANSFER_REQUEST_FAIL'

export const CREATE_TRANSFER_REQUEST = 'MMSX_CREATE_TRANSFER_REQUEST'
export const CREATE_TRANSFER_REQUEST_SUCCESS =
  'MMSX_CREATE_TRANSFER_REQUEST_SUCCESS'
export const CREATE_TRANSFER_REQUEST_FAIL = 'MMSX_CREATE_TRANSFER_REQUEST_FAIL'

export const UPDATE_TRANSFER_REQUEST = 'MMSX_UPDATE_TRANSFER_REQUEST'
export const UPDATE_TRANSFER_REQUEST_SUCCESS =
  'MMSX_UPDATE_TRANSFER_REQUEST_SUCCESS'
export const UPDATE_TRANSFER_REQUEST_FAIL = 'MMSX_UPDATE_TRANSFER_REQUEST_FAIL'

export const DELETE_TRANSFER_REQUEST_START =
  'MMSX_DELETE_TRANSFER_REQUEST_START'
export const DELETE_TRANSFER_REQUEST_SUCCESS =
  'MMSX_DELETE_TRANSFER_REQUEST_SUCCESS'
export const DELETE_TRANSFER_REQUEST_FAIL = 'MMSX_DELETE_TRANSFER_REQUEST_FAIL'

export const RESET_STATE_TRANSFER_REQUEST = 'MMSX_RESET_STATE_TRANSFER_REQUEST'

export function getTransferRequestList(payload, onSuccess, onError) {
  return {
    type: GET_TRANSFER_REQUEST_LIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getTransferRequestListSuccess(payload) {
  return {
    type: GET_TRANSFER_REQUEST_LIST_SUCCESS,
    payload,
  }
}

export function getTransferRequestListFail() {
  return {
    type: GET_TRANSFER_REQUEST_LIST_FAIL,
  }
}

export function getTransferRequestDetail(payload, onSuccess, onError) {
  return {
    type: GET_TRANSFER_REQUEST_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getTransferRequestDetailSuccess(payload) {
  return {
    type: GET_TRANSFER_REQUEST_DETAIL_SUCCESS,
    payload,
  }
}

export function getTransferRequestDetailFail() {
  return {
    type: GET_TRANSFER_REQUEST_DETAIL_FAIL,
  }
}

export function confirmTransferRequest(payload, onSuccess, onError) {
  return {
    type: CONFIRM_TRANSFER_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmTransferRequestSuccess(payload) {
  return {
    type: CONFIRM_TRANSFER_REQUEST_SUCCESS,
    payload,
  }
}

export function confirmTransferRequestFail() {
  return {
    type: CONFIRM_TRANSFER_REQUEST_FAIL,
  }
}
export function rejectTransferRequest(payload, onSuccess, onError) {
  return {
    type: REJECT_TRANSFER_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectTransferRequestSuccess(payload) {
  return {
    type: REJECT_TRANSFER_REQUEST_SUCCESS,
    payload,
  }
}

export function rejectTransferRequestFail() {
  return {
    type: REJECT_TRANSFER_REQUEST_FAIL,
  }
}

export function createTransferRequest(payload, onSuccess, onError) {
  return {
    type: CREATE_TRANSFER_REQUEST,
    payload,
    onSuccess,
    onError,
  }
}

export function createTransferRequestSuccess(payload) {
  return {
    type: CREATE_TRANSFER_REQUEST_SUCCESS,
    payload,
  }
}

export function createTransferRequestFail() {
  return {
    type: CREATE_TRANSFER_REQUEST_FAIL,
  }
}

export function updateTransferRequest(payload, onSuccess, onError) {
  return {
    type: UPDATE_TRANSFER_REQUEST,
    payload,
    onSuccess,
    onError,
  }
}

export function updateTransferRequestSuccess(payload) {
  return {
    type: UPDATE_TRANSFER_REQUEST_SUCCESS,
    payload,
  }
}

export function updateTransferRequestFail() {
  return {
    type: UPDATE_TRANSFER_REQUEST_FAIL,
  }
}

export function deleteTransferRequest(payload, onSuccess, onError) {
  return {
    type: DELETE_TRANSFER_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteTransferRequestSuccess(payload) {
  return {
    type: DELETE_TRANSFER_REQUEST_SUCCESS,
    payload,
  }
}

export function deleteTransferRequestFail() {
  return {
    type: DELETE_TRANSFER_REQUEST_FAIL,
  }
}

export function resetStateTransferRequest() {
  return {
    type: RESET_STATE_TRANSFER_REQUEST,
  }
}
export default {
  getTransferRequestList,
  getTransferRequestListSuccess,
  getTransferRequestListFail,
  getTransferRequestDetail,
  getTransferRequestDetailSuccess,
  getTransferRequestDetailFail,
  confirmTransferRequest,
  confirmTransferRequestSuccess,
  confirmTransferRequestFail,
  rejectTransferRequest,
  rejectTransferRequestSuccess,
  rejectTransferRequestFail,
  createTransferRequest,
  createTransferRequestSuccess,
  createTransferRequestFail,
  updateTransferRequest,
  updateTransferRequestSuccess,
  updateTransferRequestFail,
  deleteTransferRequest,
  deleteTransferRequestSuccess,
  deleteTransferRequestFail,
  resetStateTransferRequest,
}
