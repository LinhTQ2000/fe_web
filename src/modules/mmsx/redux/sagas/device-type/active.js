import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeDeviceTypeFailed,
  activeDeviceTypeSuccess,
  MMSX_ACTIVE_DEVICE_TYPE_START,
} from '../../actions/device-type'

/**
 * Search user API
 * @returns {Promise}
 */
const activeDeviceTypeApi = (params) => {
  const uri = `v1/mms/device-type/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveDeviceType(action) {
  try {
    const response = yield call(activeDeviceTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeDeviceTypeSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeDeviceTypeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeDeviceTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveDeviceType() {
  yield takeLatest(MMSX_ACTIVE_DEVICE_TYPE_START, doActiveDeviceType)
}
