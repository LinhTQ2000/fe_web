import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateErrorTypeFailed,
  updateErrorTypeSuccess,
  UPDATE_ERROR_TYPE_START,
} from '../../actions/error-type'

/**
 * Search error type API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateErrorTypeApi = (params) => {
  const uri = `/v1/mms/error-types/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateErrorType(action) {
  try {
    const response = yield call(updateErrorTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateErrorTypeSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateErrorTypeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateErrorTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search error types
 */
export default function* watchUpdateErrorType() {
  yield takeLatest(UPDATE_ERROR_TYPE_START, doUpdateErrorType)
}
