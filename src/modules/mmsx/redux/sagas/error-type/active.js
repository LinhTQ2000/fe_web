import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeErrorTypeFailed,
  activeErrorTypeSuccess,
  MMSX_ACTIVE_ERROR_TYPE_START,
} from '../../actions/error-type'

/**
 * Search user API
 * @returns {Promise}
 */
const activeErrorTypeApi = (params) => {
  const uri = `v1/mms/error-types/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveErrorType(action) {
  try {
    const response = yield call(activeErrorTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeErrorTypeSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeErrorTypeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeErrorTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveErrorType() {
  yield takeLatest(MMSX_ACTIVE_ERROR_TYPE_START, doActiveErrorType)
}
