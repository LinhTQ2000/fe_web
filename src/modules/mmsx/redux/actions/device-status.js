export const GET_LIST_DEVICE_STATUS = 'MMSX_GET_LIST_DEVICE_STATUS'
export const GET_LIST_DEVICE_STATUS_SUCCESS =
  'MMSX_GET_LIST_DEVICE_STATUS_SUCCESS'
export const GET_LIST_DEVICE_STATUS_FAIL = 'MMSX_GET_LIST_DEVICE_STATUS_FAIL'

export const GET_DETAIL_DEVICE_STATUS = 'MMSX_GET_DETAIL_DEVICE_STATUS'
export const GET_DETAIL_DEVICE_STATUS_SUCCESS =
  'MMSX_GET_DETAIL_DEVICE_STATUS_SUCCESS'
export const GET_DETAIL_DEVICE_STATUS_FAIL =
  'MMSX_GET_DETAIL_DEVICE_STATUS_FAIL'

export const UPDATE_DEVICE_STATUS = 'MMSX_UPDATE_DEVICE_STATUS'
export const UPDATE_DEVICE_STATUS_SUCCESS = 'MMSX_UPDATE_DEVICE_STATUS_SUCCESS'
export const UPDATE_DEVICE_STATUS_FAIL = 'MMSX_UPDATE_DEVICE_STATUS_FAIL'

export const CREATE_INFO_DEVICE_STATUS = 'MMSX_CREATE_INFO_DEVICE_STATUS'
export const CREATE_INFO_DEVICE_STATUS_SUCCESS =
  'MMSX_CREATE_INFO_DEVICE_STATUS_SUCCESS'
export const CREATE_INFO_DEVICE_STATUS_FAIL =
  'MMSX_CREATE_INFO_DEVICE_STATUS_FAIL'

export const UPDATE_INFO_DEVICE_STATUS = 'MMSX_UPDATE_INFO_DEVICE_STATUS'
export const UPDATE_INFO_DEVICE_STATUS_SUCCESS =
  'MMSX_UPDATE_INFO_DEVICE_STATUS_SUCCESS'
export const UPDATE_INFO_DEVICE_STATUS_FAIL =
  'MMSX_UPDATE_INFO_DEVICE_STATUS_FAIL'

export const GET_CREATE_INFO_FORM_DATA = 'MMSX_GET_CREATE_INFO_FORM_DATA'
export const GET_CREATE_INFO_FORM_DATA_SUCCESS =
  'MMSX_GET_CREATE_INFO_FORM_DATA_SUCCESS'
export const GET_CREATE_INFO_FORM_DATA_FAIL =
  'MMSX_GET_CREATE_INFO_FORM_DATA_FAIL'

export const RESET_DEVICE_STATUS = 'MMSX_RESET_DEVICE_STATUS'

export const GET_DETAIL_OF_DEVICE_STATUS = 'MMSX_GET_DETAIL_OF_DEVICE_STATUS'
export const GET_DETAIL_OF_DEVICE_STATUS_SUCCESS =
  'MMSX_GET_DETAIL_OF_DEVICE_STATUS_SUCCESS'
export const GET_DETAIL_OF_DEVICE_STATUS_FAIL =
  'MMSX_GET_DETAIL_OF_DEVICE_STATUS_FAIL'

export const RESET_DETAIL_OF_DEVICE_STATUS =
  'MMSX_RESET_DETAIL_OF_DEVICE_STATUS'

export function getListDeviceStatus(payload, onSuccess, onError) {
  return {
    type: GET_LIST_DEVICE_STATUS,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getListDeviceStatusSuccess(payload) {
  return {
    type: GET_LIST_DEVICE_STATUS_SUCCESS,
    payload: payload,
  }
}

export function getListDeviceStatusFail() {
  return {
    type: GET_LIST_DEVICE_STATUS_FAIL,
  }
}

export function getDetailDeviceStatus(payload, onSuccess, onError) {
  return {
    type: GET_DETAIL_DEVICE_STATUS,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDetailDeviceStatusSuccess(payload) {
  return {
    type: GET_DETAIL_DEVICE_STATUS_SUCCESS,
    payload: payload,
  }
}

export function getDetailDeviceStatusFail() {
  return {
    type: GET_DETAIL_DEVICE_STATUS_FAIL,
  }
}

export function updateDeviceStatus(payload, onSuccess, onError) {
  return {
    type: UPDATE_DEVICE_STATUS,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function updateDeviceStatusSuccess(payload) {
  return {
    type: UPDATE_DEVICE_STATUS_SUCCESS,
    payload: payload,
  }
}

export function updateDeviceStatusFail() {
  return {
    type: UPDATE_DEVICE_STATUS_FAIL,
  }
}

export function createInfoDeviceStatus(payload, onSuccess, onError) {
  return {
    type: CREATE_INFO_DEVICE_STATUS,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function createInfoDeviceStatusSuccess(payload) {
  return {
    type: CREATE_INFO_DEVICE_STATUS_SUCCESS,
    payload: payload,
  }
}

export function createInfoDeviceStatusFail() {
  return {
    type: CREATE_INFO_DEVICE_STATUS_FAIL,
  }
}

export function updateInfoDeviceStatus(payload, onSuccess, onError) {
  return {
    type: UPDATE_INFO_DEVICE_STATUS,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function updateInfoDeviceStatusSuccess(payload) {
  return {
    type: UPDATE_INFO_DEVICE_STATUS_SUCCESS,
    payload: payload,
  }
}

export function updateInfoDeviceStatusFail() {
  return {
    type: UPDATE_INFO_DEVICE_STATUS_FAIL,
  }
}

export function getInfoData(payload, onSuccess, onError) {
  return {
    type: GET_CREATE_INFO_FORM_DATA,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getInfoDataSuccess(payload) {
  return {
    type: GET_CREATE_INFO_FORM_DATA_SUCCESS,
    payload: payload,
  }
}

export function getInfoDataFail() {
  return {
    type: GET_CREATE_INFO_FORM_DATA_FAIL,
  }
}

export function resetDeviceStatus() {
  return {
    type: RESET_DEVICE_STATUS,
  }
}

export function getDetailOfStatus(payload, onSuccess, onError) {
  return {
    type: GET_DETAIL_OF_DEVICE_STATUS,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailOfStatusSuccess(payload) {
  return {
    type: GET_DETAIL_OF_DEVICE_STATUS_SUCCESS,
    payload,
  }
}

export function getDetailOfStatusFail() {
  return {
    type: GET_DETAIL_OF_DEVICE_STATUS_FAIL,
  }
}

export function resetDetailOfStatus() {
  return {
    type: RESET_DETAIL_OF_DEVICE_STATUS,
  }
}

export default {
  getListDeviceStatus,
  getListDeviceStatusSuccess,
  getListDeviceStatusFail,
  getDetailDeviceStatus,
  getDetailDeviceStatusFail,
  getDetailDeviceStatusSuccess,
  updateDeviceStatus,
  updateDeviceStatusFail,
  updateDeviceStatusSuccess,
  createInfoDeviceStatus,
  createInfoDeviceStatusFail,
  createInfoDeviceStatusSuccess,
  updateInfoDeviceStatus,
  updateInfoDeviceStatusFail,
  updateInfoDeviceStatusSuccess,
  getInfoData,
  getInfoDataSuccess,
  getInfoDataFail,
  resetDeviceStatus,
  getDetailOfStatus,
  getDetailOfStatusSuccess,
  getDetailOfStatusFail,
  resetDetailOfStatus,
}
