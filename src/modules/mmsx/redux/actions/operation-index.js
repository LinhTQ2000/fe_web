export const MMSX_SEARCH_OPERATION_INDEX_START =
  'MMSX_SEARCH_OPERATION_INDEX_START'
export const MMSX_SEARCH_OPERATION_INDEX_SUCCESS =
  'MMSX_SEARCH_OPERATION_INDEX_SUCCESS'
export const MMSX_SEARCH_OPERATION_INDEX_FAILED =
  'MMSX_SEARCH_OPERATION_INDEX_FAILED'

export const MMSX_GET_DETAIL_OPERATION_INDEX_START =
  'MMSX_GET_DETAIL_OPERATION_INDEX_START'
export const MMSX_GET_DETAIL_OPERATION_INDEX_SUCCESS =
  'MMSX_GET_DETAIL_OPERATION_INDEX_SUCCESS'
export const MMSX_GET_DETAIL_OPERATION_INDEX_FAILED =
  'MMSX_GET_DETAIL_OPERATION_INDEX_FAILED'

export const MMSX_ACTIVE_OPERATION_INDEX_START =
  'MMSX_ACTIVE_OPERATION_INDEX_START'
export const MMSX_ACTIVE_OPERATION_INDEX_SUCCESS =
  'MMSX_ACTIVE_OPERATION_INDEX_SUCCESS'
export const MMSX_ACTIVE_OPERATION_INDEX_FAILED =
  'MMSX_ACTIVE_OPERATION_INDEX_FAILED'

export const MMSX_IN_ACTIVE_OPERATION_INDEX_START =
  'MMSX_IN_ACTIVE_OPERATION_INDEX_START'
export const MMSX_IN_ACTIVE_OPERATION_INDEX_SUCCESS =
  'MMSX_IN_ACTIVE_OPERATION_INDEX_SUCCESS'
export const MMSX_IN_ACTIVE_OPERATION_INDEX_FAILED =
  'MMSX_IN_ACTIVE_OPERATION_INDEX_FAILED'

export const MMSX_RESET_OPERATION_INDEX_STATE =
  'MMSX_RESET_OPERATION_INDEX_STATE'
export const MMSX_RESET_OPERATION_INDEX_LIST_STATE =
  'MMSX_RESET_OPERATION_INDEX_LIST_STATE'

export const MMSX_CREATE_OPERATION_INDEX_START =
  'MMSX_CREATE_OPERATION_INDEX_START'
export const MMSX_CREATE_OPERATION_INDEX_SUCCESS =
  'MMSX_CREATE_OPERATION_INDEX_SUCCESS'
export const MMSX_CREATE_OPERATION_INDEX_FAILED =
  'MMSX_CREATE_OPERATION_INDEX_FAILED'

export const MMSX_UPDATE_OPERATION_INDEX_START =
  'MMSX_UPDATE_OPERATION_INDEX_START'
export const MMSX_UPDATE_OPERATION_INDEX_SUCCESS =
  'MMSX_UPDATE_OPERATION_INDEX_SUCCESS'
export const MMSX_UPDATE_OPERATION_INDEX_FAILED =
  'MMSX_UPDATE_OPERATION_INDEX_FAILED'

export function searchOperationIndex(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_OPERATION_INDEX_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchOperationIndexSuccess(payload) {
  return {
    type: MMSX_SEARCH_OPERATION_INDEX_SUCCESS,
    payload,
  }
}

export function searchOperationIndexFailed() {
  return {
    type: MMSX_SEARCH_OPERATION_INDEX_FAILED,
  }
}

export function getDetailOperationIndex(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DETAIL_OPERATION_INDEX_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailOperationIndexSuccess(payload) {
  return {
    type: MMSX_GET_DETAIL_OPERATION_INDEX_SUCCESS,
    payload,
  }
}

export function getDetailOperationIndexFailed() {
  return {
    type: MMSX_GET_DETAIL_OPERATION_INDEX_FAILED,
  }
}

export function resetOperationIndexState() {
  return {
    type: MMSX_RESET_OPERATION_INDEX_STATE,
  }
}

export function activeOperationIndex(payload, onSuccess, onError) {
  return {
    type: MMSX_ACTIVE_OPERATION_INDEX_START,
    payload,
    onSuccess,
    onError,
  }
}

export function activeOperationIndexSuccess(payload) {
  return {
    type: MMSX_ACTIVE_OPERATION_INDEX_SUCCESS,
    payload,
  }
}

export function activeOperationIndexFailed() {
  return {
    type: MMSX_ACTIVE_OPERATION_INDEX_FAILED,
  }
}

export function inActiveOperationIndex(payload, onSuccess, onError) {
  return {
    type: MMSX_IN_ACTIVE_OPERATION_INDEX_START,
    payload,
    onSuccess,
    onError,
  }
}

export function inActiveOperationIndexSuccess(payload) {
  return {
    type: MMSX_IN_ACTIVE_OPERATION_INDEX_SUCCESS,
    payload,
  }
}

export function inActiveOperationIndexFailed() {
  return {
    type: MMSX_IN_ACTIVE_OPERATION_INDEX_FAILED,
  }
}

export function createOperationIndex(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_OPERATION_INDEX_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createOperationIndexSuccess(payload) {
  return {
    type: MMSX_CREATE_OPERATION_INDEX_SUCCESS,
    payload,
  }
}

export function createOperationIndexFailed() {
  return {
    type: MMSX_CREATE_OPERATION_INDEX_FAILED,
  }
}

export function updateOperationIndex(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_OPERATION_INDEX_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateOperationIndexSuccess(payload) {
  return {
    type: MMSX_UPDATE_OPERATION_INDEX_SUCCESS,
    payload,
  }
}

export function updateOperationIndexFailed() {
  return {
    type: MMSX_UPDATE_OPERATION_INDEX_FAILED,
  }
}

export function resetList() {
  return {
    type: MMSX_RESET_OPERATION_INDEX_LIST_STATE,
  }
}

export default {
  searchOperationIndex,
  searchOperationIndexSuccess,
  searchOperationIndexFailed,
  getDetailOperationIndex,
  getDetailOperationIndexSuccess,
  getDetailOperationIndexFailed,
  resetOperationIndexState,
  activeOperationIndex,
  activeOperationIndexSuccess,
  activeOperationIndexFailed,
  inActiveOperationIndex,
  inActiveOperationIndexSuccess,
  inActiveOperationIndexFailed,
  createOperationIndex,
  createOperationIndexSuccess,
  createOperationIndexFailed,
  updateOperationIndex,
  updateOperationIndexSuccess,
  updateOperationIndexFailed,
  resetList,
}
