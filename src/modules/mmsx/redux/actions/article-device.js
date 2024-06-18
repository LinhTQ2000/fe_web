export const MMSX_SEARCH_ARTICLE_DEVICE_START =
  'MMSX_SEARCH_ARTICLE_DEVICE_START'
export const MMSX_SEARCH_ARTICLE_DEVICE_SUCCESS =
  'MMSX_SEARCH_ARTICLE_DEVICE_SUCCESS'
export const MMSX_SEARCH_ARTICLE_DEVICE_FAILED =
  'MMSX_SEARCH_ARTICLE_DEVICE_FAILED'

export const MMSX_GET_DETAIL_ARTICLE_DEVICE_START =
  'MMSX_GET_DETAIL_ARTICLE_DEVICE_START'
export const MMSX_GET_DETAIL_ARTICLE_DEVICE_SUCCESS =
  'MMSX_GET_DETAIL_ARTICLE_DEVICE_SUCCESS'
export const MMSX_GET_DETAIL_ARTICLE_DEVICE_FAILED =
  'MMSX_GET_DETAIL_ARTICLE_DEVICE_FAILED'

export const MMSX_ACTIVE_ARTICLE_DEVICE_START =
  'MMSX_ACTIVE_ARTICLE_DEVICE_START'
export const MMSX_ACTIVE_ARTICLE_DEVICE_SUCCESS =
  'MMSX_ACTIVE_ARTICLE_DEVICE_SUCCESS'
export const MMSX_ACTIVE_ARTICLE_DEVICE_FAILED =
  'MMSX_ACTIVE_ARTICLE_DEVICE_FAILED'

export const MMSX_IN_ACTIVE_ARTICLE_DEVICE_START =
  'MMSX_IN_ACTIVE_ARTICLE_DEVICE_START'
export const MMSX_IN_ACTIVE_ARTICLE_DEVICE_SUCCESS =
  'MMSX_IN_ACTIVE_ARTICLE_DEVICE_SUCCESS'
export const MMSX_IN_ACTIVE_ARTICLE_DEVICE_FAILED =
  'MMSX_IN_ACTIVE_ARTICLE_DEVICE_FAILED'

export const MMSX_RESET_ARTICLE_DEVICE_STATE = 'MMSX_RESET_ARTICLE_DEVICE_STATE'

export const MMSX_CREATE_ARTICLE_DEVICE_START =
  'MMSX_CREATE_ARTICLE_DEVICE_START'
export const MMSX_CREATE_ARTICLE_DEVICE_SUCCESS =
  'MMSX_CREATE_ARTICLE_DEVICE_SUCCESS'
export const MMSX_CREATE_ARTICLE_DEVICE_FAILED =
  'MMSX_CREATE_ARTICLE_DEVICE_FAILED'

export const MMSX_UPDATE_ARTICLE_DEVICE_START =
  'MMSX_UPDATE_ARTICLE_DEVICE_START'
export const MMSX_UPDATE_ARTICLE_DEVICE_SUCCESS =
  'MMSX_UPDATE_ARTICLE_DEVICE_SUCCESS'
export const MMSX_UPDATE_ARTICLE_DEVICE_FAILED =
  'MMSX_UPDATE_ARTICLE_DEVICE_FAILED'

export function searchArticleDevice(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_ARTICLE_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchArticleDeviceSuccess(payload) {
  return {
    type: MMSX_SEARCH_ARTICLE_DEVICE_SUCCESS,
    payload,
  }
}

export function searchArticleDeviceFailed() {
  return {
    type: MMSX_SEARCH_ARTICLE_DEVICE_FAILED,
  }
}

export function getDetailArticleDevice(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DETAIL_ARTICLE_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailArticleDeviceSuccess(payload) {
  return {
    type: MMSX_GET_DETAIL_ARTICLE_DEVICE_SUCCESS,
    payload,
  }
}

export function getDetailArticleDeviceFailed() {
  return {
    type: MMSX_GET_DETAIL_ARTICLE_DEVICE_FAILED,
  }
}

export function resetArticleDeviceState() {
  return {
    type: MMSX_RESET_ARTICLE_DEVICE_STATE,
  }
}

export function activeArticleDevice(payload, onSuccess, onError) {
  return {
    type: MMSX_ACTIVE_ARTICLE_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function activeArticleDeviceSuccess(payload) {
  return {
    type: MMSX_ACTIVE_ARTICLE_DEVICE_SUCCESS,
    payload,
  }
}

export function activeArticleDeviceFailed() {
  return {
    type: MMSX_ACTIVE_ARTICLE_DEVICE_FAILED,
  }
}

export function inActiveArticleDevice(payload, onSuccess, onError) {
  return {
    type: MMSX_IN_ACTIVE_ARTICLE_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function inActiveArticleDeviceSuccess(payload) {
  return {
    type: MMSX_IN_ACTIVE_ARTICLE_DEVICE_SUCCESS,
    payload,
  }
}

export function inActiveArticleDeviceFailed() {
  return {
    type: MMSX_IN_ACTIVE_ARTICLE_DEVICE_FAILED,
  }
}

export function createArticleDevice(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_ARTICLE_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createArticleDeviceSuccess(payload) {
  return {
    type: MMSX_CREATE_ARTICLE_DEVICE_SUCCESS,
    payload,
  }
}

export function createArticleDeviceFailed() {
  return {
    type: MMSX_CREATE_ARTICLE_DEVICE_FAILED,
  }
}

export function updateArticleDevice(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_ARTICLE_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateArticleDeviceSuccess(payload) {
  return {
    type: MMSX_UPDATE_ARTICLE_DEVICE_SUCCESS,
    payload,
  }
}

export function updateArticleDeviceFailed() {
  return {
    type: MMSX_UPDATE_ARTICLE_DEVICE_FAILED,
  }
}

export default {
  searchArticleDevice,
  searchArticleDeviceSuccess,
  searchArticleDeviceFailed,
  getDetailArticleDevice,
  getDetailArticleDeviceSuccess,
  getDetailArticleDeviceFailed,
  resetArticleDeviceState,
  activeArticleDevice,
  activeArticleDeviceSuccess,
  activeArticleDeviceFailed,
  inActiveArticleDevice,
  inActiveArticleDeviceSuccess,
  inActiveArticleDeviceFailed,
  createArticleDevice,
  createArticleDeviceSuccess,
  createArticleDeviceFailed,
  updateArticleDevice,
  updateArticleDeviceSuccess,
  updateArticleDeviceFailed,
}
