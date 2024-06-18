import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_UPDATE_ARTICLE_DEVICE_START,
  updateArticleDeviceFailed,
  updateArticleDeviceSuccess,
} from '../../actions/article-device'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateArticleDeviceApi = (body) => {
  const uri = `/v1/mms/article-device-group/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateArticleDevice(action) {
  try {
    const response = yield call(updateArticleDeviceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateArticleDeviceSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateArticleDeviceFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateArticleDeviceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateArticleDevice() {
  yield takeLatest(MMSX_UPDATE_ARTICLE_DEVICE_START, doUpdateArticleDevice)
}
