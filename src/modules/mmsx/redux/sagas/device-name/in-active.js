import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_IN_ACTIVE_DEVICE_NAME_START,
  inActiveDeviceNameFailed,
  inActiveDeviceNameSuccess,
} from '../../actions/device-name'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveDeviceNameApi = (params) => {
  const uri = `v1/mms/device-name/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveDeviceName(action) {
  try {
    const response = yield call(inActiveDeviceNameApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(inActiveDeviceNameSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveDeviceNameFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveDeviceNameFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveDeviceName() {
  yield takeLatest(MMSX_IN_ACTIVE_DEVICE_NAME_START, doInActiveDeviceName)
}
