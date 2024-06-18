import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_GET_DETAIL_ARTICLE_DEVICE_START,
  getDetailArticleDeviceFailed,
  getDetailArticleDeviceSuccess,
} from '../../actions/article-device'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getArticleDeviceDetailsApi = (params) => {
  const uri = `/v1/mms/article-device-group/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetArticleDeviceDetails(action) {
  try {
    const response = yield call(getArticleDeviceDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailArticleDeviceSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getDetailArticleDeviceFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailArticleDeviceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetArticleDeviceDetails() {
  yield takeLatest(
    MMSX_GET_DETAIL_ARTICLE_DEVICE_START,
    doGetArticleDeviceDetails,
  )
}
