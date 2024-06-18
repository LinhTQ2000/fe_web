import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_IN_ACTIVE_ARTICLE_DEVICE_START,
  inActiveArticleDeviceFailed,
  inActiveArticleDeviceSuccess,
} from '../../actions/article-device'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveArticleDeviceApi = (params) => {
  const uri = `v1/mms/article-device-group/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveArticleDevice(action) {
  try {
    const response = yield call(inActiveArticleDeviceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(inActiveArticleDeviceSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveArticleDeviceFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveArticleDeviceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveArticleDevice() {
  yield takeLatest(MMSX_IN_ACTIVE_ARTICLE_DEVICE_START, doInActiveArticleDevice)
}
