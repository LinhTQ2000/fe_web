export const GET_LIST_TEMPLATE_INSTALL_START =
  'MMSX_GET_LIST_TEMPLATE_INSTALL_START'
export const GET_LIST_TEMPLATE_INSTALL_SUCCESS =
  'MMSX_GET_LIST_TEMPLATE_INSTALL_SUCCESS'
export const GET_LIST_TEMPLATE_INSTALL_FAIL =
  'MMSX_GET_LIST_TEMPLATE_INSTALL_FAIL'

export const GET_DETAIL_TEMPLATE_INSTALL_START =
  'MMSX_GET_DETAIL_TEMPLATE_INSTALL_START'
export const GET_DETAIL_TEMPLATE_INSTALL_SUCCESS =
  'MMSX_GET_DETAIL_TEMPLATE_INSTALL_SUCCESS'
export const GET_DETAIL_TEMPLATE_INSTALL_FAIL =
  'MMSX_GET_DETAIL_TEMPLATE_INSTALL_FAIL'

export const CREATE_TEMPLATE_INSTALL_START =
  'MMSX_CREATE_TEMPLATE_INSTALL_START'
export const CREATE_TEMPLATE_INSTALL_SUCCESS =
  'MMSX_CREATE_TEMPLATE_INSTALL_SUCCESS'
export const CREATE_TEMPLATE_INSTALL_FAIL = 'MMSX_CREATE_TEMPLATE_INSTALL_FAIL'

export const UPDATE_TEMPLATE_INSTALL_START =
  'MMSX_UPDATE_TEMPLATE_INSTALL_START'
export const UPDATE_TEMPLATE_INSTALL_SUCCESS =
  'MMSX_UPDATE_TEMPLATE_INSTALL_SUCCESS'
export const UPDATE_TEMPLATE_INSTALL_FAIL = 'MMSX_UPDATE_TEMPLATE_INSTALL_FAIL'

export const DELETE_TEMPLATE_INSTALL_START =
  'MMSX_DELETE_TEMPLATE_INSTALL_START'
export const DELETE_TEMPLATE_INSTALL_SUCCESS =
  'MMSX_DELETE_TEMPLATE_INSTALL_SUCCESS'
export const DELETE_TEMPLATE_INSTALL_FAIL = 'MMSX_DELETE_TEMPLATE_INSTALL_FAIL'
export const RESET_STATE_TEMPLATE_INSTALL = 'MMSX_RESET_STATE_TEAMPLATE_INSTALL'

export const MMSX_ACTIVE_TEMPLATE_INSTALL_START =
  'MMSX_ACTIVE_TEMPLATE_INSTALL_START'
export const MMSX_ACTIVE_TEMPLATE_INSTALL_SUCCESS =
  'MMSX_ACTIVE_TEMPLATE_INSTALL_SUCCESS'
export const MMSX_ACTIVE_TEMPLATE_INSTALL_FAILED =
  'MMSX_ACTIVE_TEMPLATE_INSTALL_FAILED'

export const MMSX_IN_ACTIVE_TEMPLATE_INSTALL_START =
  'MMSX_IN_ACTIVE_TEMPLATE_INSTALL_START'
export const MMSX_IN_ACTIVE_TEMPLATE_INSTALL_SUCCESS =
  'MMSX_IN_ACTIVE_TEMPLATE_INSTALL_SUCCESS'
export const MMSX_IN_ACTIVE_TEMPLATE_INSTALL_FAILED =
  'MMSX_IN_ACTIVE_TEMPLATE_INSTALL_FAILED'

export function getListTemplateInstall(payload, onSuccess, onError) {
  return {
    type: GET_LIST_TEMPLATE_INSTALL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getListTemplateInstallSuccess(payload) {
  return {
    type: GET_LIST_TEMPLATE_INSTALL_SUCCESS,
    payload,
  }
}

export function getListTemplateInstallFail() {
  return {
    type: GET_LIST_TEMPLATE_INSTALL_FAIL,
  }
}

export function createTemplateInstall(payload, onSuccess, onError) {
  return {
    type: CREATE_TEMPLATE_INSTALL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createTemplateInstallSuccess(payload) {
  return {
    type: CREATE_TEMPLATE_INSTALL_SUCCESS,
    payload,
  }
}

export function createTemplateInstallFail() {
  return {
    type: CREATE_TEMPLATE_INSTALL_FAIL,
  }
}

export function getDetailTemplateInstall(payload, onSuccess, onError) {
  return {
    type: GET_DETAIL_TEMPLATE_INSTALL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailTemplateInstallSuccess(payload) {
  return {
    type: GET_DETAIL_TEMPLATE_INSTALL_SUCCESS,
    payload,
  }
}

export function getDetailTemplateInstallFail() {
  return {
    type: GET_DETAIL_TEMPLATE_INSTALL_FAIL,
  }
}

export function updateTemplateInstall(payload, onSuccess, onError) {
  return {
    type: UPDATE_TEMPLATE_INSTALL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateTemplateInstallSuccess(payload) {
  return {
    type: UPDATE_TEMPLATE_INSTALL_SUCCESS,
    payload,
  }
}

export function updateTemplateInstallFail() {
  return {
    type: UPDATE_TEMPLATE_INSTALL_FAIL,
  }
}

export function deleteTemplateInstall(payload, onSuccess, onError) {
  return {
    type: DELETE_TEMPLATE_INSTALL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteTemplateInstallSuccess(payload) {
  return {
    type: DELETE_TEMPLATE_INSTALL_SUCCESS,
    payload,
  }
}

export function deleteTemplateInstallFail() {
  return {
    type: DELETE_TEMPLATE_INSTALL_FAIL,
  }
}
export function resetTempalteInstall() {
  return {
    type: RESET_STATE_TEMPLATE_INSTALL,
  }
}

export function activeTemplateInstall(payload, onSuccess, onError) {
  return {
    type: MMSX_ACTIVE_TEMPLATE_INSTALL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function activeTemplateInstallSuccess(payload) {
  return {
    type: MMSX_ACTIVE_TEMPLATE_INSTALL_SUCCESS,
    payload,
  }
}

export function activeTemplateInstallFailed() {
  return {
    type: MMSX_ACTIVE_TEMPLATE_INSTALL_FAILED,
  }
}

export function inActiveTemplateInstall(payload, onSuccess, onError) {
  return {
    type: MMSX_IN_ACTIVE_TEMPLATE_INSTALL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function inActiveTemplateInstallSuccess(payload) {
  return {
    type: MMSX_IN_ACTIVE_TEMPLATE_INSTALL_SUCCESS,
    payload,
  }
}

export function inActiveTemplateInstallFailed() {
  return {
    type: MMSX_IN_ACTIVE_TEMPLATE_INSTALL_FAILED,
  }
}

export default {
  updateTemplateInstall,
  updateTemplateInstallSuccess,
  updateTemplateInstallFail,
  getListTemplateInstall,
  getListTemplateInstallSuccess,
  getListTemplateInstallFail,
  createTemplateInstall,
  createTemplateInstallFail,
  createTemplateInstallSuccess,
  deleteTemplateInstall,
  deleteTemplateInstallFail,
  deleteTemplateInstallSuccess,
  getDetailTemplateInstall,
  getDetailTemplateInstallFail,
  getDetailTemplateInstallSuccess,
  resetTempalteInstall,
  activeTemplateInstall,
  activeTemplateInstallSuccess,
  activeTemplateInstallFailed,
  inActiveTemplateInstall,
  inActiveTemplateInstallSuccess,
  inActiveTemplateInstallFailed,
}
