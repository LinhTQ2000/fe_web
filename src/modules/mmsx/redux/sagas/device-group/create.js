import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createDeviceGroupFailed,
  createDeviceGroupSuccess,
  MMSX_CREATE_DEVICE_GROUP_START,
} from '../../actions/device-group'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createDeviceGroupApi = (body) => {
  const uri = `/v1/mms/device-groups`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateDeviceGroup(action) {
  try {
    const response = yield call(createDeviceGroupApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createDeviceGroupSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createDeviceGroupFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createDeviceGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateDeviceGroup() {
  yield takeLatest(MMSX_CREATE_DEVICE_GROUP_START, doCreateDeviceGroup)
}
