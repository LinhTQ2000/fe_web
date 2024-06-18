import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_IN_ACTIVE_DEVICE_TYPE_START,
  inActiveDeviceTypeFailed,
  inActiveDeviceTypeSuccess,
} from '../../actions/device-type'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveDeviceTypeApi = (params) => {
  const uri = `v1/mms/device-type/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveDeviceType(action) {
  try {
    const response = yield call(inActiveDeviceTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(inActiveDeviceTypeSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveDeviceTypeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveDeviceTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveDeviceType() {
  yield takeLatest(MMSX_IN_ACTIVE_DEVICE_TYPE_START, doInActiveDeviceType)
}
