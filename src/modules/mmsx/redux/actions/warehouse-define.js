export const MMSX_SEARCH_WAREHOUSE_DEFINE_START =
  'MMSX_SEARCH_WAREHOUSE_DEFINE_START'
export const MMSX_SEARCH_WAREHOUSE_DEFINE_SUCCESS =
  'MMSX_SEARCH_WAREHOUSE_DEFINE_SUCCESS'
export const MMSX_SEARCH_WAREHOUSE_DEFINE_FAIL =
  'MMSX_SEARCH_WAREHOUSE_DEFINE_FAIL'

export const MMSX_GET_DETAIL_WAREHOUSE_DEFINE_START =
  'MMSX_GET_DETAIL_WAREHOUSE_DEFINE_START'
export const MMSX_GET_DETAIL_WAREHOUSE_DEFINE_SUCCESS =
  'MMSX_GET_DETAIL_WAREHOUSE_DEFINE_SUCCESS'
export const MMSX_GET_DETAIL_WAREHOUSE_DEFINE_FAIL =
  'MMSX_GET_DETAIL_WAREHOUSE_DEFINE_FAIL'

export const MMSX_UPDATE_WAREHOUSE_DEFINE_START =
  'MMSX_UPDATE_WAREHOUSE_DEFINE_START'
export const MMSX_UPDATE_WAREHOUSE_DEFINE_SUCCESS =
  'MMSX_UPDATE_WAREHOUSE_DEFINE_SUCCESS'
export const MMSX_UPDATE_WAREHOUSE_DEFINE_FAIL =
  'MMSX_UPDATE_WAREHOUSE_DEFINE_FAIL'

export const MMSX_CREATE_WAREHOUSE_DEFINE_START =
  'MMSX_CREATE_WAREHOUSE_DEFINE_START'
export const MMSX_CREATE_WAREHOUSE_DEFINE_SUCCESS =
  'MMSX_CREATE_WAREHOUSE_DEFINE_SUCCESS'
export const MMSX_CREATE_WAREHOUSE_DEFINE_FAIL =
  'MMSX_CREATE_WAREHOUSE_DEFINE_FAIL'

export const MMSX_RESET_WAREHOUSE_DEFINE_STATE =
  'MMSX_RESET_WAREHOUSE_DEFINE_STATE'
export function searchWarehouseDefine(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_WAREHOUSE_DEFINE_START,
    payload: payload,
    onError,
    onSuccess,
  }
}
export function searchWarehouseDefineSuccess(payload) {
  return {
    type: MMSX_SEARCH_WAREHOUSE_DEFINE_SUCCESS,
    payload: payload,
  }
}

export function searchWarehouseDefineFail() {
  return {
    type: MMSX_SEARCH_WAREHOUSE_DEFINE_FAIL,
  }
}
export function createWarehouseDefine(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_WAREHOUSE_DEFINE_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function createWarehouseDefineSuccess(payload) {
  return {
    type: MMSX_CREATE_WAREHOUSE_DEFINE_SUCCESS,
    payload: payload,
  }
}

export function createWarehouseDefineFail() {
  return {
    type: MMSX_CREATE_WAREHOUSE_DEFINE_FAIL,
  }
}

export function getDetailWarehouseDefine(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DETAIL_WAREHOUSE_DEFINE_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDetailWarehouseDefineSuccess(payload) {
  return {
    type: MMSX_GET_DETAIL_WAREHOUSE_DEFINE_SUCCESS,
    payload,
  }
}

export function getDetailWarehouseDefineFail() {
  return {
    type: MMSX_GET_DETAIL_WAREHOUSE_DEFINE_FAIL,
  }
}

export function updateWarehouseDefine(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_WAREHOUSE_DEFINE_START,
    payload,
    onError,
    onSuccess,
  }
}

export function updateWarehouseDefineSuccess(payload) {
  return {
    type: MMSX_UPDATE_WAREHOUSE_DEFINE_SUCCESS,
    payload,
  }
}

export function updateWarehouseDefineFail() {
  return {
    type: MMSX_UPDATE_WAREHOUSE_DEFINE_FAIL,
  }
}

export function resetState() {
  return {
    type: MMSX_RESET_WAREHOUSE_DEFINE_STATE,
  }
}

export default {
  searchWarehouseDefine,
  searchWarehouseDefineFail,
  searchWarehouseDefineSuccess,
  createWarehouseDefine,
  createWarehouseDefineFail,
  createWarehouseDefineSuccess,
  getDetailWarehouseDefine,
  getDetailWarehouseDefineFail,
  getDetailWarehouseDefineSuccess,
  updateWarehouseDefine,
  updateWarehouseDefineFail,
  updateWarehouseDefineSuccess,
  resetState,
}
