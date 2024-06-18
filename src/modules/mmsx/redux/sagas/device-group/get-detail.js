import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_GET_DETAIL_DEVICE_GROUP_START,
  getDetailDeviceGroupFailed,
  getDetailDeviceGroupSuccess,
} from '../../actions/device-group'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getDeviceGroupDetailsApi = (params) => {
  const uri = `/v1/mms/device-groups/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDeviceGroupDetails(action) {
  try {
    const response = yield call(getDeviceGroupDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailDeviceGroupSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getDetailDeviceGroupFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailDeviceGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDeviceGroupDetails() {
  yield takeLatest(MMSX_GET_DETAIL_DEVICE_GROUP_START, doGetDeviceGroupDetails)
}
