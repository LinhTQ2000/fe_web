import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_GET_DETAIL_DEVICE_NAME_START,
  getDetailDeviceNameFailed,
  getDetailDeviceNameSuccess,
} from '../../actions/device-name'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getdeviceNameDetailApi = (params) => {
  const uri = `/v1/mms/device-name/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetdeviceNameDetail(action) {
  try {
    const response = yield call(getdeviceNameDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailDeviceNameSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getDetailDeviceNameFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailDeviceNameFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetdeviceNameDetail() {
  yield takeLatest(MMSX_GET_DETAIL_DEVICE_NAME_START, doGetdeviceNameDetail)
}
