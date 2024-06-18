export const MMSX_SEARCH_DEVICE_NAME_START = 'MMSX_SEARCH_DEVICE_NAME_START'
export const MMSX_SEARCH_DEVICE_NAME_SUCCESS = 'MMSX_SEARCH_DEVICE_NAME_SUCCESS'
export const MMSX_SEARCH_DEVICE_NAME_FAILED = 'MMSX_SEARCH_DEVICE_NAME_FAILED'

export const MMSX_GET_DETAIL_DEVICE_NAME_START =
  'MMSX_GET_DETAIL_DEVICE_NAME_START'
export const MMSX_GET_DETAIL_DEVICE_NAME_SUCCESS =
  'MMSX_GET_DETAIL_DEVICE_NAME_SUCCESS'
export const MMSX_GET_DETAIL_DEVICE_NAME_FAILED =
  'MMSX_GET_DETAIL_DEVICE_NAME_FAILED'

export const MMSX_ACTIVE_DEVICE_NAME_START = 'MMSX_ACTIVE_DEVICE_NAME_START'
export const MMSX_ACTIVE_DEVICE_NAME_SUCCESS = 'MMSX_ACTIVE_DEVICE_NAME_SUCCESS'
export const MMSX_ACTIVE_DEVICE_NAME_FAILED = 'MMSX_ACTIVE_DEVICE_NAME_FAILED'

export const MMSX_IN_ACTIVE_DEVICE_NAME_START =
  'MMSX_IN_ACTIVE_DEVICE_NAME_START'
export const MMSX_IN_ACTIVE_DEVICE_NAME_SUCCESS =
  'MMSX_IN_ACTIVE_DEVICE_NAME_SUCCESS'
export const MMSX_IN_ACTIVE_DEVICE_NAME_FAILED =
  'MMSX_IN_ACTIVE_DEVICE_NAME_FAILED'

export const MMSX_RESET_DEVICE_NAME_STATE = 'MMSX_RESET_DEVICE_NAME_STATE'

export const MMSX_CREATE_DEVICE_NAME_START = 'MMSX_CREATE_DEVICE_NAME_START'
export const MMSX_CREATE_DEVICE_NAME_SUCCESS = 'MMSX_CREATE_DEVICE_NAME_SUCCESS'
export const MMSX_CREATE_DEVICE_NAME_FAILED = 'MMSX_CREATE_DEVICE_NAME_FAILED'

export const MMSX_UPDATE_DEVICE_NAME_START = 'MMSX_UPDATE_DEVICE_NAME_START'
export const MMSX_UPDATE_DEVICE_NAME_SUCCESS = 'MMSX_UPDATE_DEVICE_NAME_SUCCESS'
export const MMSX_UPDATE_DEVICE_NAME_FAILED = 'MMSX_UPDATE_DEVICE_NAME_FAILED'

export function searchDeviceName(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_DEVICE_NAME_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchDeviceNameSuccess(payload) {
  return {
    type: MMSX_SEARCH_DEVICE_NAME_SUCCESS,
    payload,
  }
}

export function searchDeviceNameFailed() {
  return {
    type: MMSX_SEARCH_DEVICE_NAME_FAILED,
  }
}

export function getDetailDeviceName(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DETAIL_DEVICE_NAME_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailDeviceNameSuccess(payload) {
  return {
    type: MMSX_GET_DETAIL_DEVICE_NAME_SUCCESS,
    payload,
  }
}

export function getDetailDeviceNameFailed() {
  return {
    type: MMSX_GET_DETAIL_DEVICE_NAME_FAILED,
  }
}

export function resetDeviceNameState() {
  return {
    type: MMSX_RESET_DEVICE_NAME_STATE,
  }
}

export function activeDeviceName(payload, onSuccess, onError) {
  return {
    type: MMSX_ACTIVE_DEVICE_NAME_START,
    payload,
    onSuccess,
    onError,
  }
}

export function activeDeviceNameSuccess(payload) {
  return {
    type: MMSX_ACTIVE_DEVICE_NAME_SUCCESS,
    payload,
  }
}

export function activeDeviceNameFailed() {
  return {
    type: MMSX_ACTIVE_DEVICE_NAME_FAILED,
  }
}

export function inActiveDeviceName(payload, onSuccess, onError) {
  return {
    type: MMSX_IN_ACTIVE_DEVICE_NAME_START,
    payload,
    onSuccess,
    onError,
  }
}

export function inActiveDeviceNameSuccess(payload) {
  return {
    type: MMSX_IN_ACTIVE_DEVICE_NAME_SUCCESS,
    payload,
  }
}

export function inActiveDeviceNameFailed() {
  return {
    type: MMSX_IN_ACTIVE_DEVICE_NAME_FAILED,
  }
}

export function createDeviceName(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_DEVICE_NAME_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createDeviceNameSuccess(payload) {
  return {
    type: MMSX_CREATE_DEVICE_NAME_SUCCESS,
    payload,
  }
}

export function createDeviceNameFailed() {
  return {
    type: MMSX_CREATE_DEVICE_NAME_FAILED,
  }
}

export function updateDeviceName(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_DEVICE_NAME_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateDeviceNameSuccess(payload) {
  return {
    type: MMSX_UPDATE_DEVICE_NAME_SUCCESS,
    payload,
  }
}

export function updateDeviceNameFailed() {
  return {
    type: MMSX_UPDATE_DEVICE_NAME_FAILED,
  }
}

export default {
  searchDeviceName,
  searchDeviceNameSuccess,
  searchDeviceNameFailed,
  getDetailDeviceName,
  getDetailDeviceNameSuccess,
  getDetailDeviceNameFailed,
  resetDeviceNameState,
  activeDeviceName,
  activeDeviceNameSuccess,
  activeDeviceNameFailed,
  inActiveDeviceName,
  inActiveDeviceNameSuccess,
  inActiveDeviceNameFailed,
  createDeviceName,
  createDeviceNameSuccess,
  createDeviceNameFailed,
  updateDeviceName,
  updateDeviceNameSuccess,
  updateDeviceNameFailed,
}
