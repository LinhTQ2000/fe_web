export const MMSX_SEARCH_MAINTENANCE_PLAN_START =
  'MMSX_SEARCH_MAINTENANCE_PLAN_START'
export const MMSX_SEARCH_MAINTENANCE_PLAN_SUCCESS =
  'MMSX_SEARCH_MAINTENANCE_PLAN_SUCCESS'
export const MMSX_SEARCH_MAINTENANCE_PLAN_FAIL =
  'MMSX_SEARCH_MAINTENANCE_PLAN_FAIL'

export const MMSX_CREATE_MAINTENANCE_PLAN_START =
  'MMSX_CREATE_MAINTENANCE_PLAN_START'
export const MMSX_CREATE_MAINTENANCE_PLAN_SUCCESS =
  'MMSX_CREATE_MAINTENANCE_PLAN_SUCCESS'
export const MMSX_CREATE_MAINTENANCE_PLAN_FAIL =
  'MMSX_CREATE_MAINTENANCE_PLAN_FAIL'

export const MMSX_UPDATE_MAINTENANCE_PLAN_START =
  'MMSX_UPDATE_MAINTENANCE_PLAN_START'
export const MMSX_UPDATE_MAINTENANCE_PLAN_SUCCESS =
  'MMSX_UPDATE_MAINTENANCE_PLAN_SUCCESS'
export const MMSX_UPDATE_MAINTENANCE_PLAN_FAIL =
  'MMSX_UPDATE_MAINTENANCE_PLAN_FAIL'

export const MMSX_DELETE_MAINTENANCE_PLAN_START =
  'MMSX_DELETE_MAINTENANCE_PLAN_START'
export const MMSX_DELETE_MAINTENANCE_PLAN_SUCCESS =
  'MMSX_DELETE_MAINTENANCE_PLAN_SUCCESS'
export const MMSX_DELETE_MAINTENANCE_PLAN_FAIL =
  'MMSX_DELETE_MAINTENANCE_PLAN_FAIL'

export const MMSX_GET_MAINTENANCE_PLAN_START = 'MMSX_GET_MAINTENANCE_PLAN_START'
export const MMSX_GET_MAINTENANCE_PLAN_SUCCESS =
  'MMSX_GET_MAINTENANCE_PLAN_SUCCESS'
export const MMSX_GET_MAINTENANCE_PLAN_FAIL = 'MMSX_GET_MAINTENANCE_PLAN_FAIL'

export const MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_START =
  'MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_START'
export const MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_SUCCESS =
  'MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_SUCCESS'
export const MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_FAIL =
  'MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_FAIL'

export const MMSX_RESET_MAINTENANCE_PLAN_DETAIL =
  'MMSX_RESET_MAINTENANCE_PLAN_DETAIL'

export function searchMaintenancePlan(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_MAINTENANCE_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchMaintenancePlanSuccess(payload) {
  return {
    type: MMSX_SEARCH_MAINTENANCE_PLAN_SUCCESS,
    payload,
  }
}

export function searchMaintenancePlanFail() {
  return {
    type: MMSX_SEARCH_MAINTENANCE_PLAN_FAIL,
  }
}

export function createMaintenancePlan(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_MAINTENANCE_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createMaintenancePlanSuccess(payload) {
  return {
    type: MMSX_CREATE_MAINTENANCE_PLAN_SUCCESS,
    payload,
  }
}

export function createMaintenancePlanFail() {
  return {
    type: MMSX_CREATE_MAINTENANCE_PLAN_FAIL,
  }
}

export function updateMaintenancePlan(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_MAINTENANCE_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateMaintenancePlanSuccess(payload) {
  return {
    type: MMSX_UPDATE_MAINTENANCE_PLAN_SUCCESS,
    payload,
  }
}

export function updateMaintenancePlanFail() {
  return {
    type: MMSX_UPDATE_MAINTENANCE_PLAN_FAIL,
  }
}

export function deleteMaintenancePlan(payload, onSuccess, onError) {
  return {
    type: MMSX_DELETE_MAINTENANCE_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteMaintenancePlanSuccess(payload) {
  return {
    type: MMSX_DELETE_MAINTENANCE_PLAN_SUCCESS,
    payload,
  }
}

export function deleteMaintenancePlanFail() {
  return {
    type: MMSX_DELETE_MAINTENANCE_PLAN_FAIL,
  }
}

export function getDetailMaintenancePlan(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_MAINTENANCE_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailMaintenancePlanSuccess(payload) {
  return {
    type: MMSX_GET_MAINTENANCE_PLAN_SUCCESS,
    payload,
  }
}

export function getDetailMaintenancePlanFail() {
  return {
    type: MMSX_GET_MAINTENANCE_PLAN_FAIL,
  }
}

export function changeStatusMaintenancePlan(payload, onSuccess, onError) {
  return {
    type: MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function changeStatusMaintenancePlanSuccess(payload) {
  return {
    type: MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_SUCCESS,
    payload,
  }
}

export function changeStatusMaintenancePlanFail() {
  return {
    type: MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_FAIL,
  }
}

export function resetMaintenanceDetail() {
  return {
    type: MMSX_RESET_MAINTENANCE_PLAN_DETAIL,
  }
}

export default {
  searchMaintenancePlan,
  searchMaintenancePlanSuccess,
  searchMaintenancePlanFail,
  createMaintenancePlan,
  createMaintenancePlanSuccess,
  createMaintenancePlanFail,
  updateMaintenancePlan,
  updateMaintenancePlanSuccess,
  updateMaintenancePlanFail,
  deleteMaintenancePlan,
  deleteMaintenancePlanSuccess,
  deleteMaintenancePlanFail,
  resetMaintenanceDetail,
  changeStatusMaintenancePlan,
  changeStatusMaintenancePlanSuccess,
  changeStatusMaintenancePlanFail,
  getDetailMaintenancePlan,
  getDetailMaintenancePlanSuccess,
  getDetailMaintenancePlanFail,
}
