import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeDeviceNameFailed,
  activeDeviceNameSuccess,
  MMSX_ACTIVE_DEVICE_NAME_START,
} from '../../actions/device-name'

/**
 * Search user API
 * @returns {Promise}
 */
const activeDeviceNameApi = (params) => {
  const uri = `v1/mms/device-name/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveDeviceName(action) {
  try {
    const response = yield call(activeDeviceNameApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeDeviceNameSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeDeviceNameFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeDeviceNameFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveDeviceName() {
  yield takeLatest(MMSX_ACTIVE_DEVICE_NAME_START, doActiveDeviceName)
}
