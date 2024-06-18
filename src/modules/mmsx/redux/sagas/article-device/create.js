import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createArticleDeviceFailed,
  createArticleDeviceSuccess,
  MMSX_CREATE_ARTICLE_DEVICE_START,
} from '../../actions/article-device'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createArticleDeviceApi = (body) => {
  const uri = `/v1/mms/article-device-group`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateArticleDevice(action) {
  try {
    const response = yield call(createArticleDeviceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createArticleDeviceSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createArticleDeviceFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createArticleDeviceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateArticleDevice() {
  yield takeLatest(MMSX_CREATE_ARTICLE_DEVICE_START, doCreateArticleDevice)
}
