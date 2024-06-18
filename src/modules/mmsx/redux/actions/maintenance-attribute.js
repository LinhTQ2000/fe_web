export const MMSX_SEARCH_MAINTENANCE_ATTRIBUTE_START =
  'MMSX_SEARCH_MAINTENANCE_ATTRIBUTE_START'
export const MMSX_SEARCH_MAINTENANCE_ATTRIBUTE_SUCCESS =
  'MMSX_SEARCH_MAINTENANCE_ATTRIBUTE_SUCCESS'
export const MMSX_SEARCH_MAINTENANCE_ATTRIBUTE_FAILED =
  'MMSX_SEARCH_MAINTENANCE_ATTRIBUTE_FAILED'

export const MMSX_GET_DETAIL_MAINTENANCE_ATTRIBUTE_START =
  'MMSX_GET_DETAIL_MAINTENANCE_ATTRIBUTE_START'
export const MMSX_GET_DETAIL_MAINTENANCE_ATTRIBUTE_SUCCESS =
  'MMSX_GET_DETAIL_MAINTENANCE_ATTRIBUTE_SUCCESS'
export const MMSX_GET_DETAIL_MAINTENANCE_ATTRIBUTE_FAILED =
  'MMSX_GET_DETAIL_MAINTENANCE_ATTRIBUTE_FAILED'

export const MMSX_ACTIVE_MAINTENANCE_ATTRIBUTE_START =
  'MMSX_ACTIVE_MAINTENANCE_ATTRIBUTE_START'
export const MMSX_ACTIVE_MAINTENANCE_ATTRIBUTE_SUCCESS =
  'MMSX_ACTIVE_MAINTENANCE_ATTRIBUTE_SUCCESS'
export const MMSX_ACTIVE_MAINTENANCE_ATTRIBUTE_FAILED =
  'MMSX_ACTIVE_MAINTENANCE_ATTRIBUTE_FAILED'

export const MMSX_IN_ACTIVE_MAINTENANCE_ATTRIBUTE_START =
  'MMSX_IN_ACTIVE_MAINTENANCE_ATTRIBUTE_START'
export const MMSX_IN_ACTIVE_MAINTENANCE_ATTRIBUTE_SUCCESS =
  'MMSX_IN_ACTIVE_MAINTENANCE_ATTRIBUTE_SUCCESS'
export const MMSX_IN_ACTIVE_MAINTENANCE_ATTRIBUTE_FAILED =
  'MMSX_IN_ACTIVE_MAINTENANCE_ATTRIBUTE_FAILED'

export const MMSX_RESET_MAINTENANCE_ATTRIBUTE_STATE =
  'MMSX_RESET_MAINTENANCE_ATTRIBUTE_STATE'

export const MMSX_CREATE_MAINTENANCE_ATTRIBUTE_START =
  'MMSX_CREATE_MAINTENANCE_ATTRIBUTE_START'
export const MMSX_CREATE_MAINTENANCE_ATTRIBUTE_SUCCESS =
  'MMSX_CREATE_MAINTENANCE_ATTRIBUTE_SUCCESS'
export const MMSX_CREATE_MAINTENANCE_ATTRIBUTE_FAILED =
  'MMSX_CREATE_MAINTENANCE_ATTRIBUTE_FAILED'

export const MMSX_UPDATE_MAINTENANCE_ATTRIBUTE_START =
  'MMSX_UPDATE_MAINTENANCE_ATTRIBUTE_START'
export const MMSX_UPDATE_MAINTENANCE_ATTRIBUTE_SUCCESS =
  'MMSX_UPDATE_MAINTENANCE_ATTRIBUTE_SUCCESS'
export const MMSX_UPDATE_MAINTENANCE_ATTRIBUTE_FAILED =
  'MMSX_UPDATE_MAINTENANCE_ATTRIBUTE_FAILED'

export function searchMaintenanceAttribute(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_MAINTENANCE_ATTRIBUTE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchMaintenanceAttributeSuccess(payload) {
  return {
    type: MMSX_SEARCH_MAINTENANCE_ATTRIBUTE_SUCCESS,
    payload,
  }
}

export function searchMaintenanceAttributeFailed() {
  return {
    type: MMSX_SEARCH_MAINTENANCE_ATTRIBUTE_FAILED,
  }
}

export function getDetailMaintenanceAttribute(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DETAIL_MAINTENANCE_ATTRIBUTE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailMaintenanceAttributeSuccess(payload) {
  return {
    type: MMSX_GET_DETAIL_MAINTENANCE_ATTRIBUTE_SUCCESS,
    payload,
  }
}

export function getDetailMaintenanceAttributeFailed() {
  return {
    type: MMSX_GET_DETAIL_MAINTENANCE_ATTRIBUTE_FAILED,
  }
}

export function resetMaintenanceAttributeState() {
  return {
    type: MMSX_RESET_MAINTENANCE_ATTRIBUTE_STATE,
  }
}

export function activeMaintenanceAttribute(payload, onSuccess, onError) {
  return {
    type: MMSX_ACTIVE_MAINTENANCE_ATTRIBUTE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function activeMaintenanceAttributeSuccess(payload) {
  return {
    type: MMSX_ACTIVE_MAINTENANCE_ATTRIBUTE_SUCCESS,
    payload,
  }
}

export function activeMaintenanceAttributeFailed() {
  return {
    type: MMSX_ACTIVE_MAINTENANCE_ATTRIBUTE_FAILED,
  }
}

export function inActiveMaintenanceAttribute(payload, onSuccess, onError) {
  return {
    type: MMSX_IN_ACTIVE_MAINTENANCE_ATTRIBUTE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function inActiveMaintenanceAttributeSuccess(payload) {
  return {
    type: MMSX_IN_ACTIVE_MAINTENANCE_ATTRIBUTE_SUCCESS,
    payload,
  }
}

export function inActiveMaintenanceAttributeFailed() {
  return {
    type: MMSX_IN_ACTIVE_MAINTENANCE_ATTRIBUTE_FAILED,
  }
}

export function createMaintenanceAttribute(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_MAINTENANCE_ATTRIBUTE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createMaintenanceAttributeSuccess(payload) {
  return {
    type: MMSX_CREATE_MAINTENANCE_ATTRIBUTE_SUCCESS,
    payload,
  }
}

export function createMaintenanceAttributeFailed() {
  return {
    type: MMSX_CREATE_MAINTENANCE_ATTRIBUTE_FAILED,
  }
}

export function updateMaintenanceAttribute(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_MAINTENANCE_ATTRIBUTE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateMaintenanceAttributeSuccess(payload) {
  return {
    type: MMSX_UPDATE_MAINTENANCE_ATTRIBUTE_SUCCESS,
    payload,
  }
}

export function updateMaintenanceAttributeFailed() {
  return {
    type: MMSX_UPDATE_MAINTENANCE_ATTRIBUTE_FAILED,
  }
}

export default {
  searchMaintenanceAttribute,
  searchMaintenanceAttributeSuccess,
  searchMaintenanceAttributeFailed,
  getDetailMaintenanceAttribute,
  getDetailMaintenanceAttributeSuccess,
  getDetailMaintenanceAttributeFailed,
  resetMaintenanceAttributeState,
  activeMaintenanceAttribute,
  activeMaintenanceAttributeSuccess,
  activeMaintenanceAttributeFailed,
  inActiveMaintenanceAttribute,
  inActiveMaintenanceAttributeSuccess,
  inActiveMaintenanceAttributeFailed,
  createMaintenanceAttribute,
  createMaintenanceAttributeSuccess,
  createMaintenanceAttributeFailed,
  updateMaintenanceAttribute,
  updateMaintenanceAttributeSuccess,
  updateMaintenanceAttributeFailed,
}
