import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_IN_ACTIVE_ERROR_TYPE_START,
  inActiveErrorTypeFailed,
  inActiveErrorTypeSuccess,
} from '../../actions/error-type'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveErrorTypeApi = (params) => {
  const uri = `v1/mms/error-types/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveErrorType(action) {
  try {
    const response = yield call(inActiveErrorTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(inActiveErrorTypeSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveErrorTypeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveErrorTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveErrorType() {
  yield takeLatest(MMSX_IN_ACTIVE_ERROR_TYPE_START, doInActiveErrorType)
}
