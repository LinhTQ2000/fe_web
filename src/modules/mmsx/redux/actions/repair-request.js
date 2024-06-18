export const SEARCH_REPAIR_REQUEST_START = 'MMSX_SEARCH_REPAIR_REQUEST_START'
export const SEARCH_REPAIR_REQUEST_SUCCESS =
  'MMSX_SEARCH_REPAIR_REQUEST_SUCCESS'
export const SEARCH_REPAIR_REQUEST_FAILED = 'MMSX_SEARCH_REPAIR_REQUEST_FAILED'

export const CHANGE_STATUS_REPAIR_REQUEST_START =
  'MMSX_CHANGE_STATUS_REPAIR_REQUEST_START'
export const CHANGE_STATUS_REPAIR_REQUEST_SUCCESS =
  'MMSX_CHANGE_STATUS_REPAIR_REQUEST_SUCCESS'
export const CHANGE_STATUS_REPAIR_REQUEST_FAILED =
  'MMSX_CHANGE_STATUS_REPAIR_REQUEST_FAILED'

export const DELETE_REPAIR_REQUEST_START = 'MMSX_DELETE_REPAIR_REQUEST_START'
export const DELETE_REPAIR_REQUEST_SUCCESS =
  'MMSX_DELETE_REPAIR_REQUEST_SUCCESS'
export const DELETE_REPAIR_REQUEST_FAILED = 'MMSX_DELETE_REPAIR_REQUEST_FAILED'

export const CREATE_REPAIR_REQUEST_START = 'MMSX_CREATE_REPAIR_REQUEST_START'
export const CREATE_REPAIR_REQUEST_SUCCESS =
  'MMSX_CREATE_REPAIR_REQUEST_SUCCESS'
export const CREATE_REPAIR_REQUEST_FAILED = 'MMSX_CREATE_REPAIR_REQUEST_FAILED'

export const GET_REPAIR_REQUEST_DETAIL_START =
  'MMSX_GET_REPAIR_REQUEST_DETAIL_START'
export const GET_REPAIR_REQUEST_DETAIL_SUCCESS =
  'MMSX_GET_REPAIR_REQUEST_DETAIL_SUCCESS'
export const GET_REPAIR_REQUEST_DETAIL_FAILED =
  'MMSX_GET_REPAIR_REQUEST_DETAIL_FAILED'

export const UPDATE_REPAIR_REQUEST_DETAIL_START =
  'MMSX_UPDATE_REPAIR_REQUEST_DETAIL_START'
export const UPDATE_REPAIR_REQUEST_DETAIL_SUCCESS =
  'MMSX_UPDATE_REPAIR_REQUEST_DETAIL_SUCCESS'
export const UPDATE_REPAIR_REQUEST_DETAIL_FAILED =
  'MMSX_UPDATE_REPAIR_REQUEST_DETAIL_FAILED'

export const RESET_STATE_REPAIR_REQUEST_DETAIL =
  'MMSX_RESET_STATE_REPAIR_REQUEST_DETAIL'

//-------------------------------------------------------------------------------
/** search */
export function searchRepairRequest(payload, onSuccess, onError) {
  return {
    type: SEARCH_REPAIR_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchRepairRequestSuccess(payload) {
  return {
    type: SEARCH_REPAIR_REQUEST_SUCCESS,
    payload,
  }
}

export function searchRepairRequestFailed() {
  return {
    type: SEARCH_REPAIR_REQUEST_FAILED,
  }
}
//1
export function changeStatusRepairRequest(payload, onSuccess, onError) {
  return {
    type: CHANGE_STATUS_REPAIR_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function changeStatusRepairRequestSuccess(payload) {
  return {
    type: CHANGE_STATUS_REPAIR_REQUEST_SUCCESS,
    payload,
  }
}

export function changeStatusRepairRequestFailed() {
  return {
    type: CHANGE_STATUS_REPAIR_REQUEST_FAILED,
  }
}

//5- Delete
export function deleteRepairRequest(payload, onSuccess, onError) {
  return {
    type: DELETE_REPAIR_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteRepairRequestSuccess(payload) {
  return {
    type: DELETE_REPAIR_REQUEST_SUCCESS,
    payload,
  }
}

export function deleteRepairRequestFailed() {
  return {
    type: DELETE_REPAIR_REQUEST_FAILED,
  }
}

//--------------------------------------------------------------------------------
/**Create REQUEST */
export function createRepairRequest(payload, onSuccess, onError) {
  return {
    type: CREATE_REPAIR_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createRepairRequestSuccess(payload) {
  return {
    type: CREATE_REPAIR_REQUEST_SUCCESS,
    payload,
  }
}

export function createRepairRequestFailed() {
  return {
    type: CREATE_REPAIR_REQUEST_FAILED,
  }
}
/**Get DETAIL REQUEST */
export function getRepairRequestDetail(payload, onSuccess, onError) {
  return {
    type: GET_REPAIR_REQUEST_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getRepairRequestDetailSuccess(payload) {
  return {
    type: GET_REPAIR_REQUEST_DETAIL_SUCCESS,
    payload,
  }
}

export function getRepairRequestDetailFailed() {
  return {
    type: GET_REPAIR_REQUEST_DETAIL_FAILED,
  }
}

/**update DETAIL REQUEST */
export function updateRepairRequestDetail(payload, onSuccess, onError) {
  return {
    type: UPDATE_REPAIR_REQUEST_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateRepairRequestDetailSuccess(payload) {
  return {
    type: UPDATE_REPAIR_REQUEST_DETAIL_SUCCESS,
    payload,
  }
}

export function updateRepairRequestDetailFailed() {
  return {
    type: UPDATE_REPAIR_REQUEST_DETAIL_FAILED,
  }
}

export function resetStateRepairRequest() {
  return {
    type: RESET_STATE_REPAIR_REQUEST_DETAIL,
  }
}

export default {
  searchRepairRequest,
  searchRepairRequestFailed,
  searchRepairRequestSuccess,
  changeStatusRepairRequest,
  changeStatusRepairRequestFailed,
  changeStatusRepairRequestSuccess,
  createRepairRequest,
  createRepairRequestFailed,
  createRepairRequestSuccess,
  getRepairRequestDetail,
  getRepairRequestDetailFailed,
  getRepairRequestDetailSuccess,
  updateRepairRequestDetail,
  updateRepairRequestDetailFailed,
  updateRepairRequestDetailSuccess,
  deleteRepairRequest,
  deleteRepairRequestFailed,
  deleteRepairRequestSuccess,
  resetStateRepairRequest,
}
