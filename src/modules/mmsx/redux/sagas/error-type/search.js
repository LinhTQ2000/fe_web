import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  searchErrorTypeFailed,
  searchErrorTypeSuccess,
  SEARCH_ERROR_TYPE_START,
} from '../../actions/error-type'

/**
 * Search errorType API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchErrorTypeApi = (params) => {
  const uri = `/v1/mms/error-types`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchErrorType(action) {
  try {
    const response = yield call(searchErrorTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.result,
        total: response.data.meta.total,
      }
      yield put(searchErrorTypeSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchErrorTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search errorTypes
 */
export default function* watchSearchErrorType() {
  yield takeLatest(SEARCH_ERROR_TYPE_START, doSearchErrorType)
}
