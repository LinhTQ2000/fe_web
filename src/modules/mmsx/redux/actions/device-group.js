export const MMSX_SEARCH_DEVICE_GROUP_START = 'MMSX_SEARCH_DEVICE_GROUP_START'
export const MMSX_SEARCH_DEVICE_GROUP_SUCCESS =
  'MMSX_SEARCH_DEVICE_GROUP_SUCCESS'
export const MMSX_SEARCH_DEVICE_GROUP_FAILED = 'MMSX_SEARCH_DEVICE_GROUP_FAILED'

export const MMSX_GET_DETAIL_DEVICE_GROUP_START =
  'MMSX_GET_DETAIL_DEVICE_GROUP_START'
export const MMSX_GET_DETAIL_DEVICE_GROUP_SUCCESS =
  'MMSX_GET_DETAIL_DEVICE_GROUP_SUCCESS'
export const MMSX_GET_DETAIL_DEVICE_GROUP_FAILED =
  'MMSX_GET_DETAIL_DEVICE_GROUP_FAILED'

export const MMSX_ACTIVE_DEVICE_GROUP_START = 'MMSX_ACTIVE_DEVICE_GROUP_START'
export const MMSX_ACTIVE_DEVICE_GROUP_SUCCESS =
  'MMSX_ACTIVE_DEVICE_GROUP_SUCCESS'
export const MMSX_ACTIVE_DEVICE_GROUP_FAILED = 'MMSX_ACTIVE_DEVICE_GROUP_FAILED'

export const MMSX_IN_ACTIVE_DEVICE_GROUP_START =
  'MMSX_IN_ACTIVE_DEVICE_GROUP_START'
export const MMSX_IN_ACTIVE_DEVICE_GROUP_SUCCESS =
  'MMSX_IN_ACTIVE_DEVICE_GROUP_SUCCESS'
export const MMSX_IN_ACTIVE_DEVICE_GROUP_FAILED =
  'MMSX_IN_ACTIVE_DEVICE_GROUP_FAILED'

export const MMSX_RESET_DEVICE_GROUP_STATE = 'MMSX_RESET_DEVICE_GROUP_STATE'

export const MMSX_CREATE_DEVICE_GROUP_START = 'MMSX_CREATE_DEVICE_GROUP_START'
export const MMSX_CREATE_DEVICE_GROUP_SUCCESS =
  'MMSX_CREATE_DEVICE_GROUP_SUCCESS'
export const MMSX_CREATE_DEVICE_GROUP_FAILED = 'MMSX_CREATE_DEVICE_GROUP_FAILED'

export const MMSX_UPDATE_DEVICE_GROUP_START = 'MMSX_UPDATE_DEVICE_GROUP_START'
export const MMSX_UPDATE_DEVICE_GROUP_SUCCESS =
  'MMSX_UPDATE_DEVICE_GROUP_SUCCESS'
export const MMSX_UPDATE_DEVICE_GROUP_FAILED = 'MMSX_UPDATE_DEVICE_GROUP_FAILED'

export function searchDeviceGroup(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_DEVICE_GROUP_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchDeviceGroupSuccess(payload) {
  return {
    type: MMSX_SEARCH_DEVICE_GROUP_SUCCESS,
    payload,
  }
}

export function searchDeviceGroupFailed() {
  return {
    type: MMSX_SEARCH_DEVICE_GROUP_FAILED,
  }
}

export function getDetailDeviceGroup(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DETAIL_DEVICE_GROUP_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailDeviceGroupSuccess(payload) {
  return {
    type: MMSX_GET_DETAIL_DEVICE_GROUP_SUCCESS,
    payload,
  }
}

export function getDetailDeviceGroupFailed() {
  return {
    type: MMSX_GET_DETAIL_DEVICE_GROUP_FAILED,
  }
}

export function resetDeviceGroupState() {
  return {
    type: MMSX_RESET_DEVICE_GROUP_STATE,
  }
}

export function activeDeviceGroup(payload, onSuccess, onError) {
  return {
    type: MMSX_ACTIVE_DEVICE_GROUP_START,
    payload,
    onSuccess,
    onError,
  }
}

export function activeDeviceGroupSuccess(payload) {
  return {
    type: MMSX_ACTIVE_DEVICE_GROUP_SUCCESS,
    payload,
  }
}

export function activeDeviceGroupFailed() {
  return {
    type: MMSX_ACTIVE_DEVICE_GROUP_FAILED,
  }
}

export function inActiveDeviceGroup(payload, onSuccess, onError) {
  return {
    type: MMSX_IN_ACTIVE_DEVICE_GROUP_START,
    payload,
    onSuccess,
    onError,
  }
}

export function inActiveDeviceGroupSuccess(payload) {
  return {
    type: MMSX_IN_ACTIVE_DEVICE_GROUP_SUCCESS,
    payload,
  }
}

export function inActiveDeviceGroupFailed() {
  return {
    type: MMSX_IN_ACTIVE_DEVICE_GROUP_FAILED,
  }
}

export function createDeviceGroup(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_DEVICE_GROUP_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createDeviceGroupSuccess(payload) {
  return {
    type: MMSX_CREATE_DEVICE_GROUP_SUCCESS,
    payload,
  }
}

export function createDeviceGroupFailed() {
  return {
    type: MMSX_CREATE_DEVICE_GROUP_FAILED,
  }
}

export function updateDeviceGroup(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_DEVICE_GROUP_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateDeviceGroupSuccess(payload) {
  return {
    type: MMSX_UPDATE_DEVICE_GROUP_SUCCESS,
    payload,
  }
}

export function updateDeviceGroupFailed() {
  return {
    type: MMSX_UPDATE_DEVICE_GROUP_FAILED,
  }
}

export default {
  searchDeviceGroup,
  searchDeviceGroupSuccess,
  searchDeviceGroupFailed,
  getDetailDeviceGroup,
  getDetailDeviceGroupSuccess,
  getDetailDeviceGroupFailed,
  resetDeviceGroupState,
  activeDeviceGroup,
  activeDeviceGroupSuccess,
  activeDeviceGroupFailed,
  inActiveDeviceGroup,
  inActiveDeviceGroupSuccess,
  inActiveDeviceGroupFailed,
  createDeviceGroup,
  createDeviceGroupSuccess,
  createDeviceGroupFailed,
  updateDeviceGroup,
  updateDeviceGroupSuccess,
  updateDeviceGroupFailed,
}
