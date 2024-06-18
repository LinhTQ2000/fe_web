export const SEARCH_JOB_LIST_START = 'MMSX_SEARCH_JOB_LIST_START'
export const SEARCH_JOB_LIST_SUCCESS = 'MMSX_SEARCH_JOB_LIST_SUCCESS'
export const SEARCH_JOB_LIST_FAIL = 'MMSX_SEARCH_JOB_LIST_FAIL'

export const SEARCH_JOB_HISTORY_DEVICE_START =
  'MMSX_SEARCH_JOB_HISTORY_DEVICE_START'
export const SEARCH_JOB_HISTORY_DEVICE_SUCCESS =
  'MMSX_SEARCH_JOB_HISTORY_DEVICE_SUCCESS'
export const SEARCH_JOB_HISTORY_DEVICE_FAIL =
  'MMSX_SEARCH_JOB_HISTORY_DEVICE_FAIL'

export const RESET_JOB_HISTORY_DEVICE = 'RESET_JOB_HISTORY_DEVICE'

export const GET_JOB_LIST_START = 'MMSX_GET_JOB_LIST_START'
export const GET_JOB_LIST_SUCCESS = 'MMSX_GET_JOB_LIST_SUCCESS'
export const GET_JOB_LIST_FAIL = 'MMSX_GET_JOB_LIST_FAIL'

export const GET_JOB_DETAIL_START = 'MMSX_GET_JOB_DETAIL_START'
export const GET_JOB_DETAIL_SUCCESS = 'MMSX_GET_JOB_DETAIL_SUCCESS'
export const GET_JOB_DETAIL_FAIL = 'MMSX_GET_JOB_DETAIL_FAIL'

export const ASSIGN_JOB_START = 'MMSX_ASSIGN_JOB_START'
export const ASSIGN_JOB_SUCCESS = 'MMSX_ASSIGN_JOB_SUCCESS'
export const ASSIGN_JOB_FAIL = 'MMSX_ASSIGN_JOB_FAIL'

export const DELETE_JOB_START = 'MMSX_DELETE_JOB_START'
export const DELETE_JOB_SUCCESS = 'MMSX_DELETE_JOB_SUCCESS'
export const DELETE_JOB_FAIL = 'MMSX_DELETE_MAKE_PLAN_FAIL'

export const UPDATE_STATUS_JOB_START = 'MMSX_UPDATE_STATUS_JOB_START'
export const UPDATE_STATUS_JOB_SUCCESS = 'MMSX_UPDATE_STATUS_JOB_SUCCESS'
export const UPDATE_STATUS_JOB_FAILD = 'MMSX_UPDATE_STATUS_JOB_FAILD'

export const GET_JOB_SUPPLIES_START = 'MMSX_GET_JOB_SUPPLIES_START'
export const GET_JOB_SUPPLIES_SUCCESS = 'MMSX_GET_JOB_SUPPLIES_SUCCESS'
export const GET_JOB_SUPPLIES_FAIL = 'MMSX_GET_JOB_SUPPLIES_FAIL'

export const RESET_JOB = 'MMSX_RESET_JOB'
export const RESET_JOB_SUPPLIES = 'MMSX_RESET_JOB_SUPPLIES'

export const NOTE_JOB_DETAIL_START = 'MMSX_NOTE_JOB_DETAIL_START'
export const NOTE_JOB_DETAIL_SUCCESS = 'MMSX_NOTE_JOB_DETAIL_SUCCESS'
export const NOTE_JOB_DETAIL_FAIL = 'MMSX_NOTE_JOB_DETAIL_FAIL'

export const APPROVED_JOB_START = 'MMSX_APPROVED_JOB_START'
export const APPROVED_JOB_SUCCESS = 'MMSX_APPROVED_JOB_SUCCESS'
export const APPROVED_JOB_FAIL = 'MMSX_APPROVED_JOB_FAIL'

export const REWORK_JOB_START = 'MMSX_REWORK_JOB_START'
export const REWORK_JOB_SUCCESS = 'MMSX_REWORK_JOB_SUCCESS'
export const REWORK_JOB_FAIL = 'MMSX_REWORK_JOB_FAIL'

export const QUICK_ASSIGN_JOB_START = 'MMSX_QUICK_ASSIGN_JOB_START'
export const QUICK_ASSIGN_JOB_SUCCESS = 'MMSX_QUICK_ASSIGN_JOB_SUCCESS'
export const QUICK_ASSIGN_JOB_FAIL = 'MMSX_QUICK_ASSIGN_JOB_FAIL'

export const UPDATE_TIME_JOB_START = 'MMSX_UPDATE_TIME_JOB_START'
export const UPDATE_TIME_JOB_SUCCESS = 'MMSX_UPDATE_TIME_JOB_SUCCESS'
export const UPDATE_TIME_JOB_FAIL = 'MMSX_UPDATE_TIME_JOB_FAIL'

/**
 * Search block
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchJobList(payload, onSuccess, onError) {
  return {
    type: SEARCH_JOB_LIST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchJobListSuccess(payload) {
  return {
    type: SEARCH_JOB_LIST_SUCCESS,
    payload: payload,
  }
}

export function searchJobListFail() {
  return {
    type: SEARCH_JOB_LIST_FAIL,
  }
}

export function searchJobHistoryDevice(payload, onSuccess, onError) {
  return {
    type: SEARCH_JOB_HISTORY_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchJobHistoryDeviceSuccess(payload) {
  return {
    type: SEARCH_JOB_HISTORY_DEVICE_SUCCESS,
    payload,
  }
}

export function searchJobHistoryDeviceFail() {
  return {
    type: SEARCH_JOB_HISTORY_DEVICE_FAIL,
  }
}

export function resetJobHistoryDevice() {
  return {
    type: RESET_JOB_HISTORY_DEVICE,
  }
}

export function getJobList(payload, onSuccess, onError) {
  return {
    type: GET_JOB_LIST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getJobListSuccess(payload) {
  return {
    type: GET_JOB_LIST_SUCCESS,
    payload,
  }
}

export function updateJobStatus(payload, onSuccess, onError) {
  return {
    type: UPDATE_STATUS_JOB_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateJobStatusSuccess(payload) {
  return {
    type: UPDATE_STATUS_JOB_SUCCESS,
    payload,
  }
}

export function updateJobStatusFaild(payload) {
  return {
    type: UPDATE_STATUS_JOB_FAILD,
    payload,
  }
}

export function getJobListFail() {
  return {
    type: GET_JOB_LIST_FAIL,
  }
}

export function getJobDetail(payload, onSuccess, onError) {
  return {
    type: GET_JOB_DETAIL_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getJobDetailSuccess(payload) {
  return {
    type: GET_JOB_DETAIL_SUCCESS,
    payload,
  }
}

export function getJobDetailFail() {
  return {
    type: GET_JOB_DETAIL_FAIL,
  }
}

export function assignJob(payload, onSuccess, onError) {
  return {
    type: ASSIGN_JOB_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function assignJobSuccess(payload) {
  return {
    type: ASSIGN_JOB_SUCCESS,
    payload,
  }
}

export function assignJobFail() {
  return {
    type: ASSIGN_JOB_FAIL,
  }
}

export function resetJob() {
  return {
    type: RESET_JOB,
  }
}

export function deleteJob(payload, onSuccess, onError) {
  return {
    type: DELETE_JOB_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteJobSuccess(payload) {
  return {
    type: DELETE_JOB_SUCCESS,
    payload,
  }
}

export function deleteJobFail() {
  return {
    type: DELETE_JOB_FAIL,
  }
}

export function getJobSupplies(payload, onSuccess, onError) {
  return {
    type: GET_JOB_SUPPLIES_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getJobSuppliesSuccess(payload) {
  return {
    type: GET_JOB_SUPPLIES_SUCCESS,
    payload,
  }
}

export function getJobSuppliesFail() {
  return {
    type: GET_JOB_SUPPLIES_FAIL,
  }
}

export function resetJobSupplies() {
  return {
    type: RESET_JOB_SUPPLIES,
  }
}

export function noteJobDetail(payload, onSuccess, onError) {
  return {
    type: NOTE_JOB_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function noteJobDetailSuccess(payload) {
  return {
    type: NOTE_JOB_DETAIL_SUCCESS,
    payload,
  }
}

export function noteJobDetailFail() {
  return {
    type: NOTE_JOB_DETAIL_FAIL,
  }
}

export function approvedJob(payload, onSuccess, onError) {
  return {
    type: APPROVED_JOB_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function approvedJobSuccess(payload) {
  return {
    type: APPROVED_JOB_SUCCESS,
    payload,
  }
}

export function approvedJobFail() {
  return {
    type: APPROVED_JOB_FAIL,
  }
}

export function reworkJob(payload, onSuccess, onError) {
  return {
    type: REWORK_JOB_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function reworkJobSuccess(payload) {
  return {
    type: REWORK_JOB_SUCCESS,
    payload,
  }
}

export function reworkJobFail() {
  return {
    type: REWORK_JOB_FAIL,
  }
}

export function quickAssignJob(payload, onSuccess, onError) {
  return {
    type: QUICK_ASSIGN_JOB_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function quickAssignJobSuccess(payload) {
  return {
    type: QUICK_ASSIGN_JOB_SUCCESS,
    payload,
  }
}

export function quickAssignJobFail() {
  return {
    type: QUICK_ASSIGN_JOB_FAIL,
  }
}

export function updateTimeJob(payload, onSuccess, onError) {
  return {
    type: UPDATE_TIME_JOB_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function updateTimeJobSuccess(payload) {
  return {
    type: UPDATE_TIME_JOB_SUCCESS,
    payload,
  }
}

export function updateTimeJobFail() {
  return {
    type: UPDATE_TIME_JOB_FAIL,
  }
}

export default {
  searchJobList,
  searchJobListSuccess,
  searchJobListFail,
  getJobList,
  getJobListSuccess,
  getJobListFail,
  getJobDetail,
  getJobDetailSuccess,
  getJobDetailFail,
  assignJobFail,
  assignJobSuccess,
  assignJob,
  resetJob,
  deleteJob,
  deleteJobSuccess,
  deleteJobFail,
  updateJobStatus,
  updateJobStatusSuccess,
  updateJobStatusFaild,
  getJobSupplies,
  getJobSuppliesSuccess,
  getJobSuppliesFail,
  resetJobSupplies,
  searchJobHistoryDevice,
  searchJobHistoryDeviceSuccess,
  searchJobHistoryDeviceFail,
  noteJobDetail,
  noteJobDetailSuccess,
  noteJobDetailFail,
  approvedJob,
  approvedJobSuccess,
  approvedJobFail,
  reworkJob,
  reworkJobSuccess,
  reworkJobFail,
  quickAssignJob,
  quickAssignJobSuccess,
  quickAssignJobFail,
  updateTimeJob,
  updateTimeJobSuccess,
  updateTimeJobFail,
  resetJobHistoryDevice,
}
