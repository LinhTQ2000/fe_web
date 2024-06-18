import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createDeviceNameFailed,
  createDeviceNameSuccess,
  MMSX_CREATE_DEVICE_NAME_START,
} from '../../actions/device-name'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createDeviceNameApi = (body) => {
  const uri = `/v1/mms/device-name`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateDeviceName(action) {
  try {
    const response = yield call(createDeviceNameApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createDeviceNameSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createDeviceNameFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createDeviceNameFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateDeviceName() {
  yield takeLatest(MMSX_CREATE_DEVICE_NAME_START, doCreateDeviceName)
}