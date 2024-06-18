export const MMSX_SEARCH_ACCREDITATION_TEMPLATE_START =
  'MMSX_SEARCH_ACCREDITATION_TEMPLATE_START'
export const MMSX_SEARCH_ACCREDITATION_TEMPLATE_SUCCESS =
  'MMSX_SEARCH_ACCREDITATION_TEMPLATE_SUCCESS'
export const MMSX_SEARCH_ACCREDITATION_TEMPLATE_FAILED =
  'MMSX_SEARCH_ACCREDITATION_TEMPLATE_FAILED'

export const MMSX_GET_DETAIL_ACCREDITATION_TEMPLATE_START =
  'MMSX_GET_DETAIL_ACCREDITATION_TEMPLATE_START'
export const MMSX_GET_DETAIL_ACCREDITATION_TEMPLATE_SUCCESS =
  'MMSX_GET_DETAIL_ACCREDITATION_TEMPLATE_SUCCESS'
export const MMSX_GET_DETAIL_ACCREDITATION_TEMPLATE_FAILED =
  'MMSX_GET_DETAIL_ACCREDITATION_TEMPLATE_FAILED'

export const MMSX_ACTIVE_ACCREDITATION_TEMPLATE_START =
  'MMSX_ACTIVE_ACCREDITATION_TEMPLATE_START'
export const MMSX_ACTIVE_ACCREDITATION_TEMPLATE_SUCCESS =
  'MMSX_ACTIVE_ACCREDITATION_TEMPLATE_SUCCESS'
export const MMSX_ACTIVE_ACCREDITATION_TEMPLATE_FAILED =
  'MMSX_ACTIVE_ACCREDITATION_TEMPLATE_FAILED'

export const MMSX_IN_ACTIVE_ACCREDITATION_TEMPLATE_START =
  'MMSX_IN_ACTIVE_ACCREDITATION_TEMPLATE_START'
export const MMSX_IN_ACTIVE_ACCREDITATION_TEMPLATE_SUCCESS =
  'MMSX_IN_ACTIVE_ACCREDITATION_TEMPLATE_SUCCESS'
export const MMSX_IN_ACTIVE_ACCREDITATION_TEMPLATE_FAILED =
  'MMSX_IN_ACTIVE_ACCREDITATION_TEMPLATE_FAILED'

export const MMSX_RESET_ACCREDITATION_TEMPLATE_STATE =
  'MMSX_RESET_ACCREDITATION_TEMPLATE_STATE'

export const MMSX_CREATE_ACCREDITATION_TEMPLATE_START =
  'MMSX_CREATE_ACCREDITATION_TEMPLATE_START'
export const MMSX_CREATE_ACCREDITATION_TEMPLATE_SUCCESS =
  'MMSX_CREATE_ACCREDITATION_TEMPLATE_SUCCESS'
export const MMSX_CREATE_ACCREDITATION_TEMPLATE_FAILED =
  'MMSX_CREATE_ACCREDITATION_TEMPLATE_FAILED'

export const MMSX_UPDATE_ACCREDITATION_TEMPLATE_START =
  'MMSX_UPDATE_ACCREDITATION_TEMPLATE_START'
export const MMSX_UPDATE_ACCREDITATION_TEMPLATE_SUCCESS =
  'MMSX_UPDATE_ACCREDITATION_TEMPLATE_SUCCESS'
export const MMSX_UPDATE_ACCREDITATION_TEMPLATE_FAILED =
  'MMSX_UPDATE_ACCREDITATION_TEMPLATE_FAILED'

export function searchAccreditationTemplate(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_ACCREDITATION_TEMPLATE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchAccreditationTemplateSuccess(payload) {
  return {
    type: MMSX_SEARCH_ACCREDITATION_TEMPLATE_SUCCESS,
    payload,
  }
}

export function searchAccreditationTemplateFailed() {
  return {
    type: MMSX_SEARCH_ACCREDITATION_TEMPLATE_FAILED,
  }
}

export function getDetailAccreditationTemplate(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DETAIL_ACCREDITATION_TEMPLATE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailAccreditationTemplateSuccess(payload) {
  return {
    type: MMSX_GET_DETAIL_ACCREDITATION_TEMPLATE_SUCCESS,
    payload,
  }
}

export function getDetailAccreditationTemplateFailed() {
  return {
    type: MMSX_GET_DETAIL_ACCREDITATION_TEMPLATE_FAILED,
  }
}

export function resetAccreditationTemplateState() {
  return {
    type: MMSX_RESET_ACCREDITATION_TEMPLATE_STATE,
  }
}

export function activeAccreditationTemplate(payload, onSuccess, onError) {
  return {
    type: MMSX_ACTIVE_ACCREDITATION_TEMPLATE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function activeAccreditationTemplateSuccess(payload) {
  return {
    type: MMSX_ACTIVE_ACCREDITATION_TEMPLATE_SUCCESS,
    payload,
  }
}

export function activeAccreditationTemplateFailed() {
  return {
    type: MMSX_ACTIVE_ACCREDITATION_TEMPLATE_FAILED,
  }
}

export function inActiveAccreditationTemplate(payload, onSuccess, onError) {
  return {
    type: MMSX_IN_ACTIVE_ACCREDITATION_TEMPLATE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function inActiveAccreditationTemplateSuccess(payload) {
  return {
    type: MMSX_IN_ACTIVE_ACCREDITATION_TEMPLATE_SUCCESS,
    payload,
  }
}

export function inActiveAccreditationTemplateFailed() {
  return {
    type: MMSX_IN_ACTIVE_ACCREDITATION_TEMPLATE_FAILED,
  }
}

export function createAccreditationTemplate(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_ACCREDITATION_TEMPLATE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createAccreditationTemplateSuccess(payload) {
  return {
    type: MMSX_CREATE_ACCREDITATION_TEMPLATE_SUCCESS,
    payload,
  }
}

export function createAccreditationTemplateFailed() {
  return {
    type: MMSX_CREATE_ACCREDITATION_TEMPLATE_FAILED,
  }
}

export function updateAccreditationTemplate(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_ACCREDITATION_TEMPLATE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateAccreditationTemplateSuccess(payload) {
  return {
    type: MMSX_UPDATE_ACCREDITATION_TEMPLATE_SUCCESS,
    payload,
  }
}

export function updateAccreditationTemplateFailed() {
  return {
    type: MMSX_UPDATE_ACCREDITATION_TEMPLATE_FAILED,
  }
}

export default {
  searchAccreditationTemplate,
  searchAccreditationTemplateSuccess,
  searchAccreditationTemplateFailed,
  getDetailAccreditationTemplate,
  getDetailAccreditationTemplateSuccess,
  getDetailAccreditationTemplateFailed,
  resetAccreditationTemplateState,
  activeAccreditationTemplate,
  activeAccreditationTemplateSuccess,
  activeAccreditationTemplateFailed,
  inActiveAccreditationTemplate,
  inActiveAccreditationTemplateSuccess,
  inActiveAccreditationTemplateFailed,
  createAccreditationTemplate,
  createAccreditationTemplateSuccess,
  createAccreditationTemplateFailed,
  updateAccreditationTemplate,
  updateAccreditationTemplateSuccess,
  updateAccreditationTemplateFailed,
}
