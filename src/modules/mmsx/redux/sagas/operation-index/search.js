import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_SEARCH_OPERATION_INDEX_START,
  searchOperationIndexFailed,
  searchOperationIndexSuccess,
} from '../../actions/operation-index'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchOperationIndexApi = (params) => {
  const uri = `/v1/mms/operation-index`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchOperationIndex(action) {
  try {
    const response = yield call(searchOperationIndexApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchOperationIndexSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(searchOperationIndexFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchOperationIndexFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchOperationIndex() {
  yield takeLatest(MMSX_SEARCH_OPERATION_INDEX_START, doSearchOperationIndex)
}
