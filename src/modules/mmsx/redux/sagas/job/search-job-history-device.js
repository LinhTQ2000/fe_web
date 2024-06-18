import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  searchJobHistoryDeviceFail,
  searchJobHistoryDeviceSuccess,
  SEARCH_JOB_HISTORY_DEVICE_START,
} from '../../actions/job'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

export const searchJobHistoryDeviceApi = (params) => {
  const url = `v1/mms/jobs/histories-of-device`
  return api.get(url, params)
}

function* doSearchJobHistoryDevice(action) {
  try {
    const response = yield call(searchJobHistoryDeviceApi, action.payload)
    if (response.statusCode === 200) {
      yield put(searchJobHistoryDeviceSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      yield put(searchJobHistoryDeviceFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchJobHistoryDeviceFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchJobHistoryDeviceList() {
  yield takeLatest(SEARCH_JOB_HISTORY_DEVICE_START, doSearchJobHistoryDevice)
}
