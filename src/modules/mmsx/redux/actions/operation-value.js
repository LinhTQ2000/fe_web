export const MMSX_OPERATION_VALUE_LIST_START = 'MMSX_OPERATION_VALUE_LIST_START'
export const MMSX_OPERATION_VALUE_LIST_SUCCESS =
  'MMSX_OPERATION_VALUE_LIST_SUCCESS'
export const MMSX_OPERATION_VALUE_LIST_FAIL = 'MMSX_OPERATION_VALUE_LIST_FAIL'

export const MMSX_OPERATION_VALUE_CREATE_START =
  'MMSX_OPERATION_VALUE_CREATE_START'
export const MMSX_OPERATION_VALUE_CREATE_SUCCESS =
  'MMSX_OPERATION_VALUE_CREATE_SUCCESS'
export const MMSX_OPERATION_VALUE_CREATE_FAIL =
  'MMSX_OPERATION_VALUE_CREATE_FAIL'

export const MMSX_OPERATION_VALUE_EDIT_START = 'MMSX_OPERATION_VALUE_EDIT_START'
export const MMSX_OPERATION_VALUE_EDIT_SUCCESS =
  'MMSX_OPERATION_VALUE_EDIT_SUCCESS'
export const MMSX_OPERATION_VALUE_EDIT_FAIL = 'MMSX_OPERATION_VALUE_EDIT_FAIL'

export const MMSX_OPERATION_VALUE_DETAIL_START =
  'MMSX_OPERATION_VALUE_DETAIL_START'
export const MMSX_OPERATION_VALUE_DETAIL_SUCCESS =
  'MMSX_OPERATION_VALUE_DETAIL_SUCCESS'
export const MMSX_OPERATION_VALUE_DETAIL_FAIL =
  'MMSX_OPERATION_VALUE_DETAIL_FAIL'

export const MMSX_RESET_OPERATION_VALUE_DETAIL =
  'MMSX_RESET_OPERATION_VALUE_DETAIL'

export function getListOperationValue(payload, onSuccess, onError) {
  return {
    type: MMSX_OPERATION_VALUE_LIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getListOperationValueSuccess(payload) {
  return {
    type: MMSX_OPERATION_VALUE_LIST_SUCCESS,
    payload,
  }
}

export function getListOperationValueFail() {
  return {
    type: MMSX_OPERATION_VALUE_LIST_FAIL,
  }
}

export function getDetailOperationValue(payload, onSuccess, onError) {
  return {
    type: MMSX_OPERATION_VALUE_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailOperationValueSuccess(payload) {
  return {
    type: MMSX_OPERATION_VALUE_DETAIL_SUCCESS,
    payload,
  }
}

export function getDetailOperationValueFail() {
  return {
    type: MMSX_OPERATION_VALUE_DETAIL_FAIL,
  }
}

export function createOperationValue(payload, onSuccess, onError) {
  return {
    type: MMSX_OPERATION_VALUE_CREATE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createOperationValueSuccess(payload) {
  return {
    type: MMSX_OPERATION_VALUE_CREATE_SUCCESS,
    payload,
  }
}

export function createOperationValueFail() {
  return {
    type: MMSX_OPERATION_VALUE_CREATE_FAIL,
  }
}

export function updateOperationValue(payload, onSuccess, onError) {
  return {
    type: MMSX_OPERATION_VALUE_EDIT_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateOperationValueSuccess(payload) {
  return {
    type: MMSX_OPERATION_VALUE_EDIT_SUCCESS,
    payload,
  }
}

export function updateOperationValueFail() {
  return {
    type: MMSX_OPERATION_VALUE_EDIT_FAIL,
  }
}

export function resetOperationValueDetail() {
  return {
    type: MMSX_RESET_OPERATION_VALUE_DETAIL,
  }
}

export default {
  createOperationValue,
  createOperationValueSuccess,
  createOperationValueFail,
  getDetailOperationValue,
  getDetailOperationValueSuccess,
  getDetailOperationValueFail,
  getListOperationValue,
  getListOperationValueSuccess,
  getListOperationValueFail,
  updateOperationValue,
  updateOperationValueSuccess,
  updateOperationValueFail,
  resetOperationValueDetail,
}
