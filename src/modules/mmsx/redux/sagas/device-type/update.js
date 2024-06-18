import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_UPDATE_DEVICE_TYPE_START,
  updateDeviceTypeFailed,
  updateDeviceTypeSuccess,
} from '../../actions/device-type'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateDeviceTypeApi = (body) => {
  const uri = `/v1/mms/device-type/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateDeviceType(action) {
  try {
    const response = yield call(updateDeviceTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateDeviceTypeSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateDeviceTypeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateDeviceTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateDeviceType() {
  yield takeLatest(MMSX_UPDATE_DEVICE_TYPE_START, doUpdateDeviceType)
}
