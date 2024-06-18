import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_SEARCH_ARTICLE_DEVICE_START,
  searchArticleDeviceFailed,
  searchArticleDeviceSuccess,
} from '../../actions/article-device'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchArticleDeviceApi = (params) => {
  const uri = `/v1/mms/article-device-group`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchArticleDevice(action) {
  try {
    const response = yield call(searchArticleDeviceApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchArticleDeviceSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(searchArticleDeviceFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchArticleDeviceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchArticleDevice() {
  yield takeLatest(MMSX_SEARCH_ARTICLE_DEVICE_START, doSearchArticleDevice)
}
