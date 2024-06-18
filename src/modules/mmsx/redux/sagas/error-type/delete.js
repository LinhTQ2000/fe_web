import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteErrorTypeFailed,
  deleteErrorTypeSuccess,
  DELETE_ERROR_TYPE_START,
} from '../../actions/error-type'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteErrorTypeApi = (params) => {
  const uri = `/v1/mms/error-types/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteErrorType(action) {
  try {
    const response = yield call(deleteErrorTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteErrorTypeSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteErrorTypeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(deleteErrorTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteErrorType() {
  yield takeLatest(DELETE_ERROR_TYPE_START, doDeleteErrorType)
}
