export const MMSX_SEARCH_MAINTENANCE_TEMPLATE_START =
  'MMSX_SEARCH_MAINTENANCE_TEMPLATE_START'
export const MMSX_SEARCH_MAINTENANCE_TEMPLATE_SUCCESS =
  'MMSX_SEARCH_MAINTENANCE_TEMPLATE_SUCCESS'
export const MMSX_SEARCH_MAINTENANCE_TEMPLATE_FAILED =
  'MMSX_SEARCH_MAINTENANCE_TEMPLATE_FAILED'

export const MMSX_GET_DETAIL_MAINTENANCE_TEMPLATE_START =
  'MMSX_GET_DETAIL_MAINTENANCE_TEMPLATE_START'
export const MMSX_GET_DETAIL_MAINTENANCE_TEMPLATE_SUCCESS =
  'MMSX_GET_DETAIL_MAINTENANCE_TEMPLATE_SUCCESS'
export const MMSX_GET_DETAIL_MAINTENANCE_TEMPLATE_FAILED =
  'MMSX_GET_DETAIL_MAINTENANCE_TEMPLATE_FAILED'

export const MMSX_ACTIVE_MAINTENANCE_TEMPLATE_START =
  'MMSX_ACTIVE_MAINTENANCE_TEMPLATE_START'
export const MMSX_ACTIVE_MAINTENANCE_TEMPLATE_SUCCESS =
  'MMSX_ACTIVE_MAINTENANCE_TEMPLATE_SUCCESS'
export const MMSX_ACTIVE_MAINTENANCE_TEMPLATE_FAILED =
  'MMSX_ACTIVE_MAINTENANCE_TEMPLATE_FAILED'

export const MMSX_IN_ACTIVE_MAINTENANCE_TEMPLATE_START =
  'MMSX_IN_ACTIVE_MAINTENANCE_TEMPLATE_START'
export const MMSX_IN_ACTIVE_MAINTENANCE_TEMPLATE_SUCCESS =
  'MMSX_IN_ACTIVE_MAINTENANCE_TEMPLATE_SUCCESS'
export const MMSX_IN_ACTIVE_MAINTENANCE_TEMPLATE_FAILED =
  'MMSX_IN_ACTIVE_MAINTENANCE_TEMPLATE_FAILED'

export const MMSX_RESET_MAINTENANCE_TEMPLATE_STATE =
  'MMSX_RESET_MAINTENANCE_TEMPLATE_STATE'

export const MMSX_CREATE_MAINTENANCE_TEMPLATE_START =
  'MMSX_CREATE_MAINTENANCE_TEMPLATE_START'
export const MMSX_CREATE_MAINTENANCE_TEMPLATE_SUCCESS =
  'MMSX_CREATE_MAINTENANCE_TEMPLATE_SUCCESS'
export const MMSX_CREATE_MAINTENANCE_TEMPLATE_FAILED =
  'MMSX_CREATE_MAINTENANCE_TEMPLATE_FAILED'

export const MMSX_UPDATE_MAINTENANCE_TEMPLATE_START =
  'MMSX_UPDATE_MAINTENANCE_TEMPLATE_START'
export const MMSX_UPDATE_MAINTENANCE_TEMPLATE_SUCCESS =
  'MMSX_UPDATE_MAINTENANCE_TEMPLATE_SUCCESS'
export const MMSX_UPDATE_MAINTENANCE_TEMPLATE_FAILED =
  'MMSX_UPDATE_MAINTENANCE_TEMPLATE_FAILED'

export function searchMaintenanceTemplate(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_MAINTENANCE_TEMPLATE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchMaintenanceTemplateSuccess(payload) {
  return {
    type: MMSX_SEARCH_MAINTENANCE_TEMPLATE_SUCCESS,
    payload,
  }
}

export function searchMaintenanceTemplateFailed() {
  return {
    type: MMSX_SEARCH_MAINTENANCE_TEMPLATE_FAILED,
  }
}

export function getDetailMaintenanceTemplate(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DETAIL_MAINTENANCE_TEMPLATE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailMaintenanceTemplateSuccess(payload) {
  return {
    type: MMSX_GET_DETAIL_MAINTENANCE_TEMPLATE_SUCCESS,
    payload,
  }
}

export function getDetailMaintenanceTemplateFailed() {
  return {
    type: MMSX_GET_DETAIL_MAINTENANCE_TEMPLATE_FAILED,
  }
}

export function resetMaintenanceTemplateState() {
  return {
    type: MMSX_RESET_MAINTENANCE_TEMPLATE_STATE,
  }
}

export function activeMaintenanceTemplate(payload, onSuccess, onError) {
  return {
    type: MMSX_ACTIVE_MAINTENANCE_TEMPLATE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function activeMaintenanceTemplateSuccess(payload) {
  return {
    type: MMSX_ACTIVE_MAINTENANCE_TEMPLATE_SUCCESS,
    payload,
  }
}

export function activeMaintenanceTemplateFailed() {
  return {
    type: MMSX_ACTIVE_MAINTENANCE_TEMPLATE_FAILED,
  }
}

export function inActiveMaintenanceTemplate(payload, onSuccess, onError) {
  return {
    type: MMSX_IN_ACTIVE_MAINTENANCE_TEMPLATE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function inActiveMaintenanceTemplateSuccess(payload) {
  return {
    type: MMSX_IN_ACTIVE_MAINTENANCE_TEMPLATE_SUCCESS,
    payload,
  }
}

export function inActiveMaintenanceTemplateFailed() {
  return {
    type: MMSX_IN_ACTIVE_MAINTENANCE_TEMPLATE_FAILED,
  }
}

export function createMaintenanceTemplate(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_MAINTENANCE_TEMPLATE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createMaintenanceTemplateSuccess(payload) {
  return {
    type: MMSX_CREATE_MAINTENANCE_TEMPLATE_SUCCESS,
    payload,
  }
}

export function createMaintenanceTemplateFailed() {
  return {
    type: MMSX_CREATE_MAINTENANCE_TEMPLATE_FAILED,
  }
}

export function updateMaintenanceTemplate(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_MAINTENANCE_TEMPLATE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateMaintenanceTemplateSuccess(payload) {
  return {
    type: MMSX_UPDATE_MAINTENANCE_TEMPLATE_SUCCESS,
    payload,
  }
}

export function updateMaintenanceTemplateFailed() {
  return {
    type: MMSX_UPDATE_MAINTENANCE_TEMPLATE_FAILED,
  }
}

export default {
  searchMaintenanceTemplate,
  searchMaintenanceTemplateSuccess,
  searchMaintenanceTemplateFailed,
  getDetailMaintenanceTemplate,
  getDetailMaintenanceTemplateSuccess,
  getDetailMaintenanceTemplateFailed,
  resetMaintenanceTemplateState,
  activeMaintenanceTemplate,
  activeMaintenanceTemplateSuccess,
  activeMaintenanceTemplateFailed,
  inActiveMaintenanceTemplate,
  inActiveMaintenanceTemplateSuccess,
  inActiveMaintenanceTemplateFailed,
  createMaintenanceTemplate,
  createMaintenanceTemplateSuccess,
  createMaintenanceTemplateFailed,
  updateMaintenanceTemplate,
  updateMaintenanceTemplateSuccess,
  updateMaintenanceTemplateFailed,
}
