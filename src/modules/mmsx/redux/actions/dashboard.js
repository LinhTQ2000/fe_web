export const MMSX_GET_SUMMARY = 'MMSX_GET_SUMMARY'
export const MMSX_GET_SUMMARY_SUCCESS = 'MMSX_GET_SUMMARY_SUCCESS'
export const MMSX_GET_SUMMARY_FAIL = 'MMSX_GET_SUMMARY_FAIL'

export const MMSX_GET_PROGRESS_JOB = 'MMSX_GET_PROGRESS_JOB'
export const MMSX_GET_PROGRESS_JOB_SUCCESS = 'MMSX_GET_PROGRESS_JOB_SUCCESS'
export const MMSX_GET_PROGRESS_JOB_FAIL = 'MMSX_GET_PROGRESS_JOB_FAIL'

export const MMSX_GET_DEVICE_STATUS = 'MMSX_GET_DEVICE_STATUS'
export const MMSX_GET_DEVICE_STATUS_SUCCESS = 'MMSX_GET_DEVICE_STATUS_SUCCESS'
export const MMSX_GET_DEVICE_STATUS_FAIL = 'MMSX_GET_DEVICE_STATUS_FAIL'

export const MMSX_GET_DEVICE_ERROR = 'MMSX_GET_DEVICE_ERROR'
export const MMSX_GET_DEVICE_ERROR_SUCCESS = 'MMSX_GET_DEVICE_ERROR_SUCCESS'
export const MMSX_GET_DEVICE_ERROR_FAIL = 'MMSX_GET_DEVICE_ERROR_FAIL'

export const MMSX_GET_HISTORY_JOB = 'MMSX_GET_HISTORY_JOB'
export const MMSX_GET_HISTORY_JOB_SUCCESS = 'MMSX_GET_HISTORY_JOB_SUCCESS'
export const MMSX_GET_HISTORY_JOB_FAIL = 'MMSX_GET_HISTORY_JOB_FAIL'

export const MMSX_GET_MTT_STATS = 'MMSX_GET_MTT_STATS'
export const MMSX_GET_MTT_STATS_SUCCESS = 'MMSX_GET_MTT_STATSSUCCESS'
export const MMSX_GET_MTT_STATS_FAIL = 'MMSX_GET_MTT_STATSFAIL'

export const MMSX_GET_DEVICE_USING_STATUS = 'MMSX_GET_DEVICE_USING_STATUS'
export const MMSX_GET_DEVICE_USING_STATUS_SUCCESS =
  'MMSX_GET_DEVICE_USING_STATUS_SUCCESS'
export const MMSX_GET_DEVICE_USING_STATUS_FAIL =
  'MMSX_GET_DEVICE_USING_STATUS_FAIL'

export const MMSX_GET_DEVICE_STATUS_USE_BY_AREA_START =
  'MMSX_GET_DEVICE_STATUS_USE_BY_AREA_START'
export const MMSX_GET_DEVICE_STATUS_USE_BY_AREA_SUCCESS =
  'MMSX_GET_DEVICE_STATUS_USE_BY_AREA_SUCCESS'
export const MMSX_GET_DEVICE_STATUS_USE_BY_AREA_FAIL =
  'MMSX_GET_DEVICE_STATUS_USE_BY_AREA_FAIL'

export const MMSX_RESET_DEVICE_STATUS_USE_BY_AREA =
  'MMSX_RESET_DEVICE_STATUS_USE_BY_AREA'

export const MMSX_GET_JOB_SUMMARY = 'MMSX_GET_JOB_SUMMARY'
export const MMSX_GET_JOB_SUMMARY_SUCCESS = 'MMSX_GET_JOB_SUMMARY_SUCCESS'
export const MMSX_GET_JOB_SUMMARY_FAIL = 'MMSX_GET_JOB_SUMMARY_FAIL'

export const MMSX_GET_TRANSFER_SUMMARY = 'MMSX_GET_TRANSFER_SUMMARY'
export const MMSX_GET_TRANSFER_SUMMARY_SUCCESS =
  'MMSX_GET_TRANSFER_SUMMARY_SUCCESS'
export const MMSX_GET_TRANSFER_SUMMARY_FAIL = 'MMSX_GET_TRANSFER_SUMMARY_FAIL'

// get summary
export function getSummary(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_SUMMARY,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDeviceUsingStatus(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEVICE_USING_STATUS,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDeviceUsingStatusSuccess(payload) {
  return {
    type: MMSX_GET_DEVICE_USING_STATUS_SUCCESS,
    payload: payload,
  }
}

export function getDeviceUsingStatusFailed() {
  return {
    type: MMSX_GET_DEVICE_USING_STATUS_FAIL,
  }
}

export function getSummarySuccess(payload) {
  return {
    type: MMSX_GET_SUMMARY_SUCCESS,
    payload: payload,
  }
}

export function getSummaryFailed() {
  return {
    type: MMSX_GET_SUMMARY_FAIL,
  }
}

//get maintainance progress
export function getMaintainanceJob(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_PROGRESS_JOB,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getMaintainanceJobSuccess(payload) {
  return {
    type: MMSX_GET_PROGRESS_JOB_SUCCESS,
    payload: payload,
  }
}

export function getMaintainanceJobFailed() {
  return {
    type: MMSX_GET_PROGRESS_JOB_FAIL,
  }
}

//get device status
export function getDeviceStatus(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEVICE_STATUS,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDeviceStatusSuccess(payload) {
  return {
    type: MMSX_GET_DEVICE_STATUS_SUCCESS,
    payload: payload,
  }
}

export function getDeviceStatusJobFailed() {
  return {
    type: MMSX_GET_DEVICE_STATUS_FAIL,
  }
}

//get device err
export function getDeviceError(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEVICE_ERROR,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDeviceErrorSuccess(payload) {
  return {
    type: MMSX_GET_DEVICE_ERROR_SUCCESS,
    payload: payload,
  }
}

export function getDeviceErrorFailed() {
  return {
    type: MMSX_GET_DEVICE_ERROR_FAIL,
  }
}

//get request stt
export function getHistoryJob(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_HISTORY_JOB,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getHistoryJobSuccess(payload) {
  return {
    type: MMSX_GET_HISTORY_JOB_SUCCESS,
    payload: payload,
  }
}

export function getHistoryJobFailed() {
  return {
    type: MMSX_GET_HISTORY_JOB_FAIL,
  }
}

//get mtt stats
export function getMttStatus(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_MTT_STATS,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getMttStatusSuccess(payload) {
  return {
    type: MMSX_GET_MTT_STATS_SUCCESS,
    payload: payload,
  }
}

export function getMttStatusFailed() {
  return {
    type: MMSX_GET_MTT_STATS_FAIL,
  }
}

export function getDeviceStatusUseByArea(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEVICE_STATUS_USE_BY_AREA_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDeviceStatusUseByAreaSuccess(payload) {
  return {
    type: MMSX_GET_DEVICE_STATUS_USE_BY_AREA_SUCCESS,
    payload,
  }
}

export function getDeviceStatusUseByAreaFail() {
  return {
    type: MMSX_GET_DEVICE_STATUS_USE_BY_AREA_FAIL,
  }
}

export function resetDeviceStatusUseByArea() {
  return {
    type: MMSX_RESET_DEVICE_STATUS_USE_BY_AREA,
  }
}

export function getJobSummary(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_JOB_SUMMARY,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getJobSummarySuccess(payload) {
  return {
    type: MMSX_GET_JOB_SUMMARY_SUCCESS,
    payload: payload,
  }
}

export function getJobSummaryFailed() {
  return {
    type: MMSX_GET_JOB_SUMMARY_FAIL,
  }
}

export function getTransferSummary(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_TRANSFER_SUMMARY,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getTransferSummarySuccess(payload) {
  return {
    type: MMSX_GET_TRANSFER_SUMMARY_SUCCESS,
    payload: payload,
  }
}

export function getTransferSummaryFailed() {
  return {
    type: MMSX_GET_TRANSFER_SUMMARY_FAIL,
  }
}

export default {
  getSummary,
  getSummarySuccess,
  getSummaryFailed,
  getMaintainanceJob,
  getMaintainanceJobSuccess,
  getMaintainanceJobFailed,
  getDeviceStatus,
  getDeviceStatusSuccess,
  getDeviceStatusJobFailed,
  getDeviceError,
  getDeviceErrorSuccess,
  getDeviceErrorFailed,
  getHistoryJob,
  getHistoryJobSuccess,
  getHistoryJobFailed,
  getMttStatus,
  getMttStatusSuccess,
  getMttStatusFailed,
  getDeviceUsingStatus,
  getDeviceUsingStatusSuccess,
  getDeviceUsingStatusFailed,
  getDeviceStatusUseByArea,
  getDeviceStatusUseByAreaSuccess,
  getDeviceStatusUseByAreaFail,
  resetDeviceStatusUseByArea,
  getJobSummary,
  getJobSummarySuccess,
  getJobSummaryFailed,
  getTransferSummary,
  getTransferSummarySuccess,
  getTransferSummaryFailed,
}
