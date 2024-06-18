import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getDetailOfStatusFail,
  getDetailOfStatusSuccess,
  GET_DETAIL_OF_DEVICE_STATUS,
} from '../../actions/device-status'

/**
 * Search user API
 * @returns {Promise}
 */
const getDetailOfDeviceStatusApi = (id) => {
  const uri = `v1/mms/device-status/${id}/detail-status`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetailOfDeviceStatus(action) {
  try {
    const response = yield call(getDetailOfDeviceStatusApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailOfStatusSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      yield put(getDetailOfStatusFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailOfStatusFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDetailOfDeviceStatus() {
  yield takeLatest(GET_DETAIL_OF_DEVICE_STATUS, doGetDetailOfDeviceStatus)
}
