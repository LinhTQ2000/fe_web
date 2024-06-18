import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createErrorTypeFailed,
  createErrorTypeSuccess,
  CREATE_ERROR_TYPE_START,
} from '../../actions/error-type'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createErrorTypeApi = (params) => {
  const uri = `/v1/mms/error-types`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateErrorType(action) {
  try {
    const response = yield call(createErrorTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createErrorTypeSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createErrorTypeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createErrorTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateErrorType() {
  yield takeLatest(CREATE_ERROR_TYPE_START, doCreateErrorType)
}
