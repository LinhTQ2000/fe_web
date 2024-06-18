import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_IN_ACTIVE_DEVICE_GROUP_START,
  inActiveDeviceGroupFailed,
  inActiveDeviceGroupSuccess,
} from '../../actions/device-group'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveDeviceGroupApi = (params) => {
  const uri = `v1/mms/device-groups/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveDeviceGroup(action) {
  try {
    const response = yield call(inActiveDeviceGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(inActiveDeviceGroupSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveDeviceGroupFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveDeviceGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveDeviceGroup() {
  yield takeLatest(MMSX_IN_ACTIVE_DEVICE_GROUP_START, doInActiveDeviceGroup)
}
