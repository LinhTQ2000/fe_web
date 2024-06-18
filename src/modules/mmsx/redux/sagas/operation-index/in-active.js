import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_IN_ACTIVE_OPERATION_INDEX_START,
  inActiveOperationIndexFailed,
  inActiveOperationIndexSuccess,
} from '../../actions/operation-index'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveOperationIndexApi = (params) => {
  const uri = `v1/mms/operation-index/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveOperationIndex(action) {
  try {
    const response = yield call(inActiveOperationIndexApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(inActiveOperationIndexSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveOperationIndexFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveOperationIndexFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveOperationIndex() {
  yield takeLatest(
    MMSX_IN_ACTIVE_OPERATION_INDEX_START,
    doInActiveOperationIndex,
  )
}
