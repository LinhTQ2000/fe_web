import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createDeviceTypeFailed,
  createDeviceTypeSuccess,
  MMSX_CREATE_DEVICE_TYPE_START,
} from '../../actions/device-type'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createDeviceTypeApi = (body) => {
  const uri = `/v1/mms/device-type`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateDeviceType(action) {
  try {
    const response = yield call(createDeviceTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createDeviceTypeSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createDeviceTypeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createDeviceTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateDeviceType() {
  yield takeLatest(MMSX_CREATE_DEVICE_TYPE_START, doCreateDeviceType)
}
