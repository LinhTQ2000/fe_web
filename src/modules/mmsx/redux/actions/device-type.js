export const MMSX_SEARCH_DEVICE_TYPE_START = 'MMSX_SEARCH_DEVICE_TYPE_START'
export const MMSX_SEARCH_DEVICE_TYPE_SUCCESS = 'MMSX_SEARCH_DEVICE_TYPE_SUCCESS'
export const MMSX_SEARCH_DEVICE_TYPE_FAILED = 'MMSX_SEARCH_DEVICE_TYPE_FAILED'

export const MMSX_GET_DETAIL_DEVICE_TYPE_START =
  'MMSX_GET_DETAIL_DEVICE_TYPE_START'
export const MMSX_GET_DETAIL_DEVICE_TYPE_SUCCESS =
  'MMSX_GET_DETAIL_DEVICE_TYPE_SUCCESS'
export const MMSX_GET_DETAIL_DEVICE_TYPE_FAILED =
  'MMSX_GET_DETAIL_DEVICE_TYPE_FAILED'

export const MMSX_ACTIVE_DEVICE_TYPE_START = 'MMSX_ACTIVE_DEVICE_TYPE_START'
export const MMSX_ACTIVE_DEVICE_TYPE_SUCCESS = 'MMSX_ACTIVE_DEVICE_TYPE_SUCCESS'
export const MMSX_ACTIVE_DEVICE_TYPE_FAILED = 'MMSX_ACTIVE_DEVICE_TYPE_FAILED'

export const MMSX_IN_ACTIVE_DEVICE_TYPE_START =
  'MMSX_IN_ACTIVE_DEVICE_TYPE_START'
export const MMSX_IN_ACTIVE_DEVICE_TYPE_SUCCESS =
  'MMSX_IN_ACTIVE_DEVICE_TYPE_SUCCESS'
export const MMSX_IN_ACTIVE_DEVICE_TYPE_FAILED =
  'MMSX_IN_ACTIVE_DEVICE_TYPE_FAILED'

export const MMSX_RESET_DEVICE_TYPE_STATE = 'MMSX_RESET_DEVICE_TYPE_STATE'

export const MMSX_CREATE_DEVICE_TYPE_START = 'MMSX_CREATE_DEVICE_TYPE_START'
export const MMSX_CREATE_DEVICE_TYPE_SUCCESS = 'MMSX_CREATE_DEVICE_TYPE_SUCCESS'
export const MMSX_CREATE_DEVICE_TYPE_FAILED = 'MMSX_CREATE_DEVICE_TYPE_FAILED'

export const MMSX_UPDATE_DEVICE_TYPE_START = 'MMSX_UPDATE_DEVICE_TYPE_START'
export const MMSX_UPDATE_DEVICE_TYPE_SUCCESS = 'MMSX_UPDATE_DEVICE_TYPE_SUCCESS'
export const MMSX_UPDATE_DEVICE_TYPE_FAILED = 'MMSX_UPDATE_DEVICE_TYPE_FAILED'

export function searchDeviceType(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_DEVICE_TYPE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchDeviceTypeSuccess(payload) {
  return {
    type: MMSX_SEARCH_DEVICE_TYPE_SUCCESS,
    payload,
  }
}

export function searchDeviceTypeFailed() {
  return {
    type: MMSX_SEARCH_DEVICE_TYPE_FAILED,
  }
}

export function getDetailDeviceType(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DETAIL_DEVICE_TYPE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailDeviceTypeSuccess(payload) {
  return {
    type: MMSX_GET_DETAIL_DEVICE_TYPE_SUCCESS,
    payload,
  }
}

export function getDetailDeviceTypeFailed() {
  return {
    type: MMSX_GET_DETAIL_DEVICE_TYPE_FAILED,
  }
}

export function resetDeviceTypeState() {
  return {
    type: MMSX_RESET_DEVICE_TYPE_STATE,
  }
}

export function activeDeviceType(payload, onSuccess, onError) {
  return {
    type: MMSX_ACTIVE_DEVICE_TYPE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function activeDeviceTypeSuccess(payload) {
  return {
    type: MMSX_ACTIVE_DEVICE_TYPE_SUCCESS,
    payload,
  }
}

export function activeDeviceTypeFailed() {
  return {
    type: MMSX_ACTIVE_DEVICE_TYPE_FAILED,
  }
}

export function inActiveDeviceType(payload, onSuccess, onError) {
  return {
    type: MMSX_IN_ACTIVE_DEVICE_TYPE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function inActiveDeviceTypeSuccess(payload) {
  return {
    type: MMSX_IN_ACTIVE_DEVICE_TYPE_SUCCESS,
    payload,
  }
}

export function inActiveDeviceTypeFailed() {
  return {
    type: MMSX_IN_ACTIVE_DEVICE_TYPE_FAILED,
  }
}

export function createDeviceType(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_DEVICE_TYPE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createDeviceTypeSuccess(payload) {
  return {
    type: MMSX_CREATE_DEVICE_TYPE_SUCCESS,
    payload,
  }
}

export function createDeviceTypeFailed() {
  return {
    type: MMSX_CREATE_DEVICE_TYPE_FAILED,
  }
}

export function updateDeviceType(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_DEVICE_TYPE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateDeviceTypeSuccess(payload) {
  return {
    type: MMSX_UPDATE_DEVICE_TYPE_SUCCESS,
    payload,
  }
}

export function updateDeviceTypeFailed() {
  return {
    type: MMSX_UPDATE_DEVICE_TYPE_FAILED,
  }
}

export default {
  searchDeviceType,
  searchDeviceTypeSuccess,
  searchDeviceTypeFailed,
  getDetailDeviceType,
  getDetailDeviceTypeSuccess,
  getDetailDeviceTypeFailed,
  resetDeviceTypeState,
  activeDeviceType,
  activeDeviceTypeSuccess,
  activeDeviceTypeFailed,
  inActiveDeviceType,
  inActiveDeviceTypeSuccess,
  inActiveDeviceTypeFailed,
  createDeviceType,
  createDeviceTypeSuccess,
  createDeviceTypeFailed,
  updateDeviceType,
  updateDeviceTypeSuccess,
  updateDeviceTypeFailed,
}
