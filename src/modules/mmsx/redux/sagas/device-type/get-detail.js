import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_GET_DETAIL_DEVICE_TYPE_START,
  getDetailDeviceTypeFailed,
  getDetailDeviceTypeSuccess,
} from '../../actions/device-type'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDeviceTypeDetailsApi = (params) => {
  const uri = `/v1/mms/device-type/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDeviceTypeDetails(action) {
  try {
    const response = yield call(getDeviceTypeDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailDeviceTypeSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getDetailDeviceTypeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailDeviceTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDeviceTypeDetails() {
  yield takeLatest(MMSX_GET_DETAIL_DEVICE_TYPE_START, doGetDeviceTypeDetails)
}
