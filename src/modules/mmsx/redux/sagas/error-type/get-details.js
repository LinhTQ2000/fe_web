import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getErrorTypeDetailsByIdFailed,
  getErrorTypeDetailsByIdSuccess,
  GET_ERROR_TYPE_DETAILS_START,
} from '../../actions/error-type'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getErrorTypeDetailsApi = (params) => {
  const uri = `/v1/mms/error-types/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetErrorTypeDetails(action) {
  try {
    const response = yield call(getErrorTypeDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getErrorTypeDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getErrorTypeDetailsByIdFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getErrorTypeDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetErrorTypeDetails() {
  yield takeLatest(GET_ERROR_TYPE_DETAILS_START, doGetErrorTypeDetails)
}
