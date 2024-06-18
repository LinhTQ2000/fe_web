import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_SEARCH_DEVICE_NAME_START,
  searchDeviceNameFailed,
  searchDeviceNameSuccess,
} from '../../actions/device-name'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchDeviceNameApi = (params) => {
  const uri = `/v1/mms/device-name`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchDeviceName(action) {
  try {
    const response = yield call(searchDeviceNameApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchDeviceNameSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(searchDeviceNameFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchDeviceNameFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchDeviceName() {
  yield takeLatest(MMSX_SEARCH_DEVICE_NAME_START, doSearchDeviceName)
}
