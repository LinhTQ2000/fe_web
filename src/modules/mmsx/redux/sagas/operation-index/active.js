import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeOperationIndexFailed,
  activeOperationIndexSuccess,
  MMSX_ACTIVE_OPERATION_INDEX_START,
} from '../../actions/operation-index'

/**
 * Search user API
 * @returns {Promise}
 */
const activeOperationIndexApi = (params) => {
  const uri = `v1/mms/operation-index/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveOperationIndex(action) {
  try {
    const response = yield call(activeOperationIndexApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeOperationIndexSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeOperationIndexFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeOperationIndexFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveOperationIndex() {
  yield takeLatest(MMSX_ACTIVE_OPERATION_INDEX_START, doActiveOperationIndex)
}
