import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_GET_DETAIL_OPERATION_INDEX_START,
  getDetailOperationIndexFailed,
  getDetailOperationIndexSuccess,
} from '../../actions/operation-index'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getOperationIndexDetailsApi = (params) => {
  const uri = `/v1/mms/operation-index/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetOperationIndexDetails(action) {
  try {
    const response = yield call(getOperationIndexDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailOperationIndexSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getDetailOperationIndexFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailOperationIndexFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetOperationIndexDetails() {
  yield takeLatest(
    MMSX_GET_DETAIL_OPERATION_INDEX_START,
    doGetOperationIndexDetails,
  )
}
