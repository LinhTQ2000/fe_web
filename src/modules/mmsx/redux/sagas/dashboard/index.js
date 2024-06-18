import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getSummarySuccess,
  getSummaryFailed,
  MMSX_GET_SUMMARY,
  getMaintainanceJobSuccess,
  getMaintainanceJobFailed,
  MMSX_GET_PROGRESS_JOB,
  MMSX_GET_DEVICE_STATUS,
  getDeviceStatusJobFailed,
  getDeviceStatusSuccess,
  getDeviceErrorFailed,
  getDeviceErrorSuccess,
  MMSX_GET_DEVICE_ERROR,
  MMSX_GET_HISTORY_JOB,
  MMSX_GET_MTT_STATS,
  getMttStatusFailed,
  getMttStatusSuccess,
  getDeviceUsingStatusSuccess,
  getDeviceUsingStatusFailed,
  MMSX_GET_DEVICE_USING_STATUS,
  getHistoryJobSuccess,
  getHistoryJobFailed,
  getDeviceStatusUseByAreaSuccess,
  getDeviceStatusUseByAreaFail,
  MMSX_GET_DEVICE_STATUS_USE_BY_AREA_START,
  getTransferSummarySuccess,
  getTransferSummaryFailed,
  getJobSummarySuccess,
  getJobSummaryFailed,
  MMSX_GET_JOB_SUMMARY,
  MMSX_GET_TRANSFER_SUMMARY,
} from '~/modules/mmsx/redux/actions/dashboard'
import { api } from '~/services/api'

const getSummary = (params) => {
  const url = `/v1/mms/dashboard/summary-device`
  return api.get(url, params)
}

const getJobSummary = (params) => {
  const url = `/v1/mms/dashboard/summary-job`
  return api.get(url, params)
}

const getTransferSummary = (params) => {
  const url = `/v1/mms/dashboard/summary-transfer`
  return api.get(url, params)
}

const getMaintainanceJob = (params) => {
  const url = `/v1/mms/dashboard/progress-job`
  return api.get(url, params)
}

const getDeviceSatus = (params) => {
  const url = `v1/mms/dashboard/device-use-status`
  return api.get(url, params)
}

const getDeviceErr = (params) => {
  const url = `v1/mms/dashboard/device-group-error`
  return api.get(url, params)
}

const getHistoryJobUrl = (params) => {
  const url = `v1/mms/dashboard/history-job`
  return api.get(url, params)
}

const getMttStatus = (params) => {
  const url = `v1/mms/dashboard/mttr-mtta-index`
  return api.get(url, params)
}

const callApiGetDeviceUsingStatus = (params) => {
  const url = `v1/mms/dashboard/device-status`
  return api.get(url, params)
}

const getDeviceByAreaApi = (params) => {
  const url = `v1/mms/dashboard/device-use-status-by-area`
  return api.get(url, params)
}

// Summary
function* doGetSummary(action) {
  try {
    const response = yield call(getSummary, action.payload)
    if (response.statusCode === 200) {
      yield put(getSummarySuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(getSummaryFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetTransferSummary(action) {
  try {
    const response = yield call(getTransferSummary, action.payload)
    if (response.statusCode === 200) {
      yield put(getTransferSummarySuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(getTransferSummaryFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetJobSummary(action) {
  try {
    const response = yield call(getJobSummary, action.payload)
    if (response.statusCode === 200) {
      yield put(getJobSummarySuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(getJobSummaryFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

// maintainance job status
function* doGetMaintainanceJob(action) {
  try {
    const response = yield call(getMaintainanceJob, action.payload)
    if (response.statusCode === 200) {
      yield put(getMaintainanceJobSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      yield put(getMaintainanceJobFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getMaintainanceJobFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

// device status
function* doGetDeviceStatus(action) {
  try {
    const response = yield call(getDeviceSatus, action.payload)
    if (response.statusCode === 200) {
      yield put(getDeviceStatusSuccess(response?.data))
      if (action?.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      yield put(getDeviceStatusJobFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDeviceStatusJobFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

// device err
function* doGetDeviceErr(action) {
  try {
    const response = yield call(getDeviceErr, action.payload)
    if (response.statusCode === 200) {
      yield put(getDeviceErrorSuccess(response?.data))
      if (action?.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      yield put(getDeviceErrorFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDeviceErrorFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}
// request stt
function* doGetHistoryJob(action) {
  try {
    const response = yield call(getHistoryJobUrl, action.payload)
    if (response.statusCode === 200) {
      yield put(getHistoryJobSuccess(response?.data))
      if (action?.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      yield put(getHistoryJobFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getHistoryJobFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

// mtt stats
function* dogetMttStatus(action) {
  try {
    const response = yield call(getMttStatus, action.payload)
    if (response.statusCode === 200) {
      yield put(getMttStatusSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(getMttStatusFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetDeviceUsingStatus(action) {
  try {
    const response = yield call(callApiGetDeviceUsingStatus, action.payload)
    if (response.statusCode === 200) {
      yield put(getDeviceUsingStatusSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDeviceUsingStatusFailed())
    if (action.onError) yield action.onError()
  }
}

function* doGetDeviceUseByArea(action) {
  try {
    const response = yield call(getDeviceByAreaApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getDeviceStatusUseByAreaSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      yield put(getDeviceStatusUseByAreaFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(getDeviceStatusUseByAreaFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetSummary() {
  yield takeLatest(MMSX_GET_SUMMARY, doGetSummary)
  yield takeLatest(MMSX_GET_JOB_SUMMARY, doGetJobSummary)
  yield takeLatest(MMSX_GET_TRANSFER_SUMMARY, doGetTransferSummary)
  yield takeLatest(MMSX_GET_PROGRESS_JOB, doGetMaintainanceJob)
  yield takeLatest(MMSX_GET_DEVICE_STATUS, doGetDeviceStatus)
  yield takeLatest(MMSX_GET_DEVICE_ERROR, doGetDeviceErr)
  yield takeLatest(MMSX_GET_HISTORY_JOB, doGetHistoryJob)
  yield takeLatest(MMSX_GET_MTT_STATS, dogetMttStatus)
  yield takeLatest(MMSX_GET_DEVICE_USING_STATUS, doGetDeviceUsingStatus)
  yield takeLatest(
    MMSX_GET_DEVICE_STATUS_USE_BY_AREA_START,
    doGetDeviceUseByArea,
  )
}
