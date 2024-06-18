export const MMSX_SEARCH_AREA_START = 'MMSX_SEARCH_AREA_START'
export const MMSX_SEARCH_AREA_SUCCESS = 'MMSX_SEARCH_AREA_SUCCESS'
export const MMSX_SEARCH_AREA_FAILED = 'MMSX_SEARCH_AREA_FAILED'

export const MMSX_GET_DETAIL_AREA_START = 'MMSX_GET_DETAIL_AREA_START'
export const MMSX_GET_DETAIL_AREA_SUCCESS = 'MMSX_GET_DETAIL_AREA_SUCCESS'
export const MMSX_GET_DETAIL_AREA_FAILED = 'MMSX_GET_DETAIL_AREA_FAILED'

export const MMSX_ACTIVE_AREA_START = 'MMSX_ACTIVE_AREA_START'
export const MMSX_ACTIVE_AREA_SUCCESS = 'MMSX_ACTIVE_AREA_SUCCESS'
export const MMSX_ACTIVE_AREA_FAILED = 'MMSX_ACTIVE_AREA_FAILED'

export const MMSX_IN_ACTIVE_AREA_START = 'MMSX_IN_ACTIVE_AREA_START'
export const MMSX_IN_ACTIVE_AREA_SUCCESS = 'MMSX_IN_ACTIVE_AREA_SUCCESS'
export const MMSX_IN_ACTIVE_AREA_FAILED = 'MMSX_IN_ACTIVE_AREA_FAILED'

export const MMSX_RESET_AREA_STATE = 'MMSX_RESET_AREA_STATE'

export const MMSX_CREATE_AREA_START = 'MMSX_CREATE_AREA_START'
export const MMSX_CREATE_AREA_SUCCESS = 'MMSX_CREATE_AREA_SUCCESS'
export const MMSX_CREATE_AREA_FAILED = 'MMSX_CREATE_AREA_FAILED'

export const MMSX_UPDATE_AREA_START = 'MMSX_UPDATE_AREA_START'
export const MMSX_UPDATE_AREA_SUCCESS = 'MMSX_UPDATE_AREA_SUCCESS'
export const MMSX_UPDATE_AREA_FAILED = 'MMSX_UPDATE_AREA_FAILED'

export function searchArea(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_AREA_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchAreaSuccess(payload) {
  return {
    type: MMSX_SEARCH_AREA_SUCCESS,
    payload,
  }
}

export function searchAreaFailed() {
  return {
    type: MMSX_SEARCH_AREA_FAILED,
  }
}

export function getDetailArea(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DETAIL_AREA_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailAreaSuccess(payload) {
  return {
    type: MMSX_GET_DETAIL_AREA_SUCCESS,
    payload,
  }
}

export function getDetailAreaFailed() {
  return {
    type: MMSX_GET_DETAIL_AREA_FAILED,
  }
}

export function resetAreaState() {
  return {
    type: MMSX_RESET_AREA_STATE,
  }
}

export function activeArea(payload, onSuccess, onError) {
  return {
    type: MMSX_ACTIVE_AREA_START,
    payload,
    onSuccess,
    onError,
  }
}

export function activeAreaSuccess(payload) {
  return {
    type: MMSX_ACTIVE_AREA_SUCCESS,
    payload,
  }
}

export function activeAreaFailed() {
  return {
    type: MMSX_ACTIVE_AREA_FAILED,
  }
}

export function inActiveArea(payload, onSuccess, onError) {
  return {
    type: MMSX_IN_ACTIVE_AREA_START,
    payload,
    onSuccess,
    onError,
  }
}

export function inActiveAreaSuccess(payload) {
  return {
    type: MMSX_IN_ACTIVE_AREA_SUCCESS,
    payload,
  }
}

export function inActiveAreaFailed() {
  return {
    type: MMSX_IN_ACTIVE_AREA_FAILED,
  }
}

export function createArea(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_AREA_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createAreaSuccess(payload) {
  return {
    type: MMSX_CREATE_AREA_SUCCESS,
    payload,
  }
}

export function createAreaFailed() {
  return {
    type: MMSX_CREATE_AREA_FAILED,
  }
}

export function updateArea(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_AREA_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateAreaSuccess(payload) {
  return {
    type: MMSX_UPDATE_AREA_SUCCESS,
    payload,
  }
}

export function updateAreaFailed() {
  return {
    type: MMSX_UPDATE_AREA_FAILED,
  }
}

export default {
  searchArea,
  searchAreaSuccess,
  searchAreaFailed,
  getDetailArea,
  getDetailAreaSuccess,
  getDetailAreaFailed,
  resetAreaState,
  activeArea,
  activeAreaSuccess,
  activeAreaFailed,
  inActiveArea,
  inActiveAreaSuccess,
  inActiveAreaFailed,
  createArea,
  createAreaSuccess,
  createAreaFailed,
  updateArea,
  updateAreaSuccess,
  updateAreaFailed,
}
