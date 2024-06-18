import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeArticleDeviceFailed,
  activeArticleDeviceSuccess,
  MMSX_ACTIVE_ARTICLE_DEVICE_START,
} from '../../actions/article-device'

/**
 * Search user API
 * @returns {Promise}
 */
const activeArticleDeviceApi = (params) => {
  const uri = `v1/mms/article-device-group/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveArticleDevice(action) {
  try {
    const response = yield call(activeArticleDeviceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeArticleDeviceSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeArticleDeviceFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeArticleDeviceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveArticleDevice() {
  yield takeLatest(MMSX_ACTIVE_ARTICLE_DEVICE_START, doActiveArticleDevice)
}
