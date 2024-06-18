import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeDeviceGroupFailed,
  activeDeviceGroupSuccess,
  MMSX_ACTIVE_DEVICE_GROUP_START,
} from '../../actions/device-group'

/**
 * Search user API
 * @returns {Promise}
 */
const activeDeviceGroupApi = (params) => {
  const uri = `v1/mms/device-groups/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveDeviceGroup(action) {
  try {
    const response = yield call(activeDeviceGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeDeviceGroupSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeDeviceGroupFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeDeviceGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveDeviceGroup() {
  yield takeLatest(MMSX_ACTIVE_DEVICE_GROUP_START, doActiveDeviceGroup)
}
