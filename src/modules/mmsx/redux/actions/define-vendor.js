export const SEARCH_VENDORS_START = 'MMSX_SEARCH_VENDORS_START'
export const SEARCH_VENDORS_SUCCESS = 'MMSX_SEARCH_VENDORS_SUCCESS'
export const SEARCH_VENDORS_FAILED = 'MMSX_SEARCH_VENDORS_FAILED'

export const CREATE_VENDOR_START = 'MMSX_CREATE_VENDOR_START'
export const CREATE_VENDOR_SUCCESS = 'MMSX_CREATE_VENDOR_SUCCESS'
export const CREATE_VENDOR_FAILED = 'MMSX_CREATE_VENDOR_FAILED'

export const UPDATE_VENDOR_START = 'MMSX_UPDATE_VENDOR_START'
export const UPDATE_VENDOR_SUCCESS = 'MMSX_UPDATE_VENDOR_SUCCESS'
export const UPDATE_VENDOR_FAILED = 'MMSX_UPDATE_VENDOR_FAILED'

export const DELETE_VENDOR_START = 'MMSX_DELETE_VENDOR_START'
export const DELETE_VENDOR_SUCCESS = 'MMSX_DELETE_VENDOR_SUCCESS'
export const DELETE_VENDOR_FAILED = 'MMSX_DELETE_VENDOR_FAILED'

export const GET_VENDOR_DETAILS_START = 'MMSX_GET_VENDOR_DETAILS_START'
export const GET_VENDOR_DETAILS_SUCCESS = 'MMSX_GET_VENDOR_DETAILS_SUCCESS'
export const GET_VENDOR_DETAILS_FAILED = 'MMSX_GET_VENDOR_DETAILS_FAILED'

export const IMPORT_VENDOR_START = 'MMSX_IMPORT_VENDOR_START'
export const IMPORT_VENDOR_SUCCESS = 'MMSX_IMPORT_VENDOR_SUCCESS'
export const IMPORT_VENDOR_FAILED = 'MMSX_IMPORT_VENDOR_FAILED'

export const RESET_DETAIL_VENDOR_STATE = 'MMSX_RESET_DETAIL_VENDOR_STATE'

export const MMSX_ACTIVE_VENDOR_START = 'MMSX_ACTIVE_VENDOR_START'
export const MMSX_ACTIVE_VENDOR_SUCCESS = 'MMSX_ACTIVE_VENDOR_SUCCESS'
export const MMSX_ACTIVE_VENDOR_FAILED = 'MMSX_ACTIVE_VENDOR_FAILED'

export const MMSX_IN_ACTIVE_VENDOR_START = 'MMSX_IN_ACTIVE_VENDOR_START'
export const MMSX_IN_ACTIVE_VENDOR_SUCCESS = 'MMSX_IN_ACTIVE_VENDOR_SUCCESS'
export const MMSX_IN_ACTIVE_VENDOR_FAILED = 'MMSX_IN_ACTIVE_VENDOR_FAILED'
/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchVendors(payload, onSuccess, onError) {
  return {
    type: SEARCH_VENDORS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search user success action
 * @param {*} payload
 * @returns {object}
 */
export function searchVendorsSuccess(payload) {
  return {
    type: SEARCH_VENDORS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchVendorsFailed() {
  return {
    type: SEARCH_VENDORS_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createVendor(payload, onSuccess, onError) {
  return {
    type: CREATE_VENDOR_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create user success action
 * @param {*} payload
 * @returns {object}
 */
export function createVendorSuccess(payload) {
  return {
    type: CREATE_VENDOR_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createVendorFailed() {
  return {
    type: CREATE_VENDOR_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateVendor(payload, onSuccess, onError) {
  return {
    type: UPDATE_VENDOR_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update user success action
 * @param {*} payload
 * @returns {object}
 */
export function updateVendorSuccess(payload) {
  return {
    type: UPDATE_VENDOR_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateVendorFailed() {
  return {
    type: UPDATE_VENDOR_FAILED,
  }
}
/**
 * Delete user
 * @param {int} userId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteVendor(userId, onSuccess, onError) {
  return {
    type: DELETE_VENDOR_START,
    payload: userId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete user success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteVendorSuccess(payload) {
  return {
    type: DELETE_VENDOR_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteVendorFailed() {
  return {
    type: DELETE_VENDOR_FAILED,
  }
}

/**
 * Get user details
 * @param {int} userId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getVendorDetailsById(userId, onSuccess, onError) {
  return {
    type: GET_VENDOR_DETAILS_START,
    payload: userId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get user details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getVendorDetailsByIdSuccess(payload) {
  return {
    type: GET_VENDOR_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getVendorDetailsByIdFailed() {
  return {
    type: GET_VENDOR_DETAILS_FAILED,
  }
}

/**
 * import vendor
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function importVendor(payload, onSuccess, onError) {
  return {
    type: IMPORT_VENDOR_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * import vendor success
 * @param {*} payload
 * @returns {object}
 */
export function importVendorSuccess(payload) {
  return {
    type: IMPORT_VENDOR_SUCCESS,
    payload: payload,
  }
}

/**
 * import vendor failed
 * @returns {object}
 */
export function importVendorFailed() {
  return {
    type: IMPORT_VENDOR_FAILED,
  }
}
export function resetDetailVendorState() {
  return {
    type: RESET_DETAIL_VENDOR_STATE,
  }
}

export function activeVendor(payload, onSuccess, onError) {
  return {
    type: MMSX_ACTIVE_VENDOR_START,
    payload,
    onSuccess,
    onError,
  }
}

export function activeVendorSuccess(payload) {
  return {
    type: MMSX_ACTIVE_VENDOR_SUCCESS,
    payload,
  }
}

export function activeVendorFailed() {
  return {
    type: MMSX_ACTIVE_VENDOR_FAILED,
  }
}

export function inActiveVendor(payload, onSuccess, onError) {
  return {
    type: MMSX_IN_ACTIVE_VENDOR_START,
    payload,
    onSuccess,
    onError,
  }
}

export function inActiveVendorSuccess(payload) {
  return {
    type: MMSX_IN_ACTIVE_VENDOR_SUCCESS,
    payload,
  }
}

export function inActiveVendorFailed() {
  return {
    type: MMSX_IN_ACTIVE_VENDOR_FAILED,
  }
}
export default {
  searchVendors,
  searchVendorsSuccess,
  searchVendorsFailed,
  createVendor,
  createVendorSuccess,
  createVendorFailed,
  updateVendor,
  updateVendorSuccess,
  updateVendorFailed,
  deleteVendor,
  deleteVendorSuccess,
  deleteVendorFailed,
  getVendorDetailsById,
  getVendorDetailsByIdSuccess,
  getVendorDetailsByIdFailed,
  importVendor,
  importVendorSuccess,
  importVendorFailed,
  resetDetailVendorState,
  activeVendor,
  activeVendorSuccess,
  activeVendorFailed,
  inActiveVendor,
  inActiveVendorSuccess,
  inActiveVendorFailed,
}
