export const SEARCH_ERROR_TYPE_START = 'MMSX_SEARCH_ERROR_TYPE_START'
export const SEARCH_ERROR_TYPE_SUCCESS = 'MMSX_SEARCH_ERROR_TYPE_SUCCESS'
export const SEARCH_ERROR_TYPE_FAILED = 'MMSX_SEARCH_ERROR_TYPE_FAILED'

export const CREATE_ERROR_TYPE_START = 'MMSX_CREATE_ERROR_TYPE_START'
export const CREATE_ERROR_TYPE_SUCCESS = 'MMSX_CREATE_ERROR_TYPE_SUCCESS'
export const CREATE_ERROR_TYPE_FAILED = 'MMSX_CREATE_ERROR_TYPE_FAILED'

export const UPDATE_ERROR_TYPE_START = 'MMSX_UPDATE_ERROR_TYPE_START'
export const UPDATE_ERROR_TYPE_SUCCESS = 'MMSX_UPDATE_ERROR_TYPE_SUCCESS'
export const UPDATE_ERROR_TYPE_FAILED = 'MMSX_UPDATE_ERROR_TYPE_FAILED'

export const DELETE_ERROR_TYPE_START = 'MMSX_DELETE_ERROR_TYPE_START'
export const DELETE_ERROR_TYPE_SUCCESS = 'MMSX_DELETE_ERROR_TYPE_SUCCESS'
export const DELETE_ERROR_TYPE_FAILED = 'MMSX_DELETE_ERROR_TYPE_FAILED'

export const GET_ERROR_TYPE_DETAILS_START = 'MMSX_GET_ERROR_TYPE_DETAILS_START'
export const GET_ERROR_TYPE_DETAILS_SUCCESS =
  'MMSX_GET_ERROR_TYPE_DETAILS_SUCCESS'
export const GET_ERROR_TYPE_DETAILS_FAILED =
  'MMSX_GET_ERROR_TYPE_DETAILS_FAILED'

export const RESET_ERROR_TYPE_DETAILS_STATE =
  'MMSX_RESET_ERROR_TYPE_DETAILS_STATE'

export const MMSX_ACTIVE_ERROR_TYPE_START = 'MMSX_ACTIVE_ERROR_TYPE_START'
export const MMSX_ACTIVE_ERROR_TYPE_SUCCESS = 'MMSX_ACTIVE_ERROR_TYPE_SUCCESS'
export const MMSX_ACTIVE_ERROR_TYPE_FAILED = 'MMSX_ACTIVE_ERROR_TYPE_FAILED'

export const MMSX_IN_ACTIVE_ERROR_TYPE_START = 'MMSX_IN_ACTIVE_ERROR_TYPE_START'
export const MMSX_IN_ACTIVE_ERROR_TYPE_SUCCESS =
  'MMSX_IN_ACTIVE_ERROR_TYPE_SUCCESS'
export const MMSX_IN_ACTIVE_ERROR_TYPE_FAILED =
  'MMSX_IN_ACTIVE_ERROR_TYPE_FAILED'

export function searchErrorType(payload, onSuccess, onError) {
  return {
    type: SEARCH_ERROR_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function searchErrorTypeSuccess(payload) {
  return {
    type: SEARCH_ERROR_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Search warehouse failed action
 * @returns {object}
 */
export function searchErrorTypeFailed() {
  return {
    type: SEARCH_ERROR_TYPE_FAILED,
  }
}

/**
 * Create warehouse
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createErrorType(payload, onSuccess, onError) {
  return {
    type: CREATE_ERROR_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function createErrorTypeSuccess(payload) {
  return {
    type: CREATE_ERROR_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Create warehouse failed action
 * @returns {object}
 */
export function createErrorTypeFailed() {
  return {
    type: CREATE_ERROR_TYPE_FAILED,
  }
}

/**
 * Update warehouse
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateErrorType(payload, onSuccess, onError) {
  return {
    type: UPDATE_ERROR_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function updateErrorTypeSuccess(payload) {
  return {
    type: UPDATE_ERROR_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Update warehouse failed action
 * @returns {object}
 */
export function updateErrorTypeFailed() {
  return {
    type: UPDATE_ERROR_TYPE_FAILED,
  }
}
/**
 * Delete warehouse
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteErrorType(payload, onSuccess, onError) {
  return {
    type: DELETE_ERROR_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteErrorTypeSuccess(payload) {
  return {
    type: DELETE_ERROR_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete warehouse failed action
 * @returns {object}
 */
export function deleteErrorTypeFailed() {
  return {
    type: DELETE_ERROR_TYPE_FAILED,
  }
}

/**
 * Get warehouse details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getErrorTypeDetailsById(payload, onSuccess, onError) {
  return {
    type: GET_ERROR_TYPE_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get warehouse details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getErrorTypeDetailsByIdSuccess(payload) {
  return {
    type: GET_ERROR_TYPE_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouse details by id failed action
 * @returns {object}
 */
export function getErrorTypeDetailsByIdFailed() {
  return {
    type: GET_ERROR_TYPE_DETAILS_FAILED,
  }
}

export function resetErrorTypeDetailsState() {
  return {
    type: RESET_ERROR_TYPE_DETAILS_STATE,
  }
}

export function activeErrorType(payload, onSuccess, onError) {
  return {
    type: MMSX_ACTIVE_ERROR_TYPE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function activeErrorTypeSuccess(payload) {
  return {
    type: MMSX_ACTIVE_ERROR_TYPE_SUCCESS,
    payload,
  }
}

export function activeErrorTypeFailed() {
  return {
    type: MMSX_ACTIVE_ERROR_TYPE_FAILED,
  }
}

export function inActiveErrorType(payload, onSuccess, onError) {
  return {
    type: MMSX_IN_ACTIVE_ERROR_TYPE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function inActiveErrorTypeSuccess(payload) {
  return {
    type: MMSX_IN_ACTIVE_ERROR_TYPE_SUCCESS,
    payload,
  }
}

export function inActiveErrorTypeFailed() {
  return {
    type: MMSX_IN_ACTIVE_ERROR_TYPE_FAILED,
  }
}

export default {
  searchErrorType,
  searchErrorTypeSuccess,
  searchErrorTypeFailed,
  createErrorType,
  createErrorTypeSuccess,
  createErrorTypeFailed,
  updateErrorType,
  updateErrorTypeSuccess,
  updateErrorTypeFailed,
  deleteErrorType,
  deleteErrorTypeSuccess,
  deleteErrorTypeFailed,
  getErrorTypeDetailsById,
  getErrorTypeDetailsByIdSuccess,
  getErrorTypeDetailsByIdFailed,
  resetErrorTypeDetailsState,
  activeErrorType,
  activeErrorTypeSuccess,
  activeErrorTypeFailed,
  inActiveErrorType,
  inActiveErrorTypeSuccess,
  inActiveErrorTypeFailed,
}
