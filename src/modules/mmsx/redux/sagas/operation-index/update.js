import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_UPDATE_OPERATION_INDEX_START,
  updateOperationIndexFailed,
  updateOperationIndexSuccess,
} from '../../actions/operation-index'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateOperationIndexApi = (body) => {
  const uri = `/v1/mms/operation-index/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateOperationIndex(action) {
  try {
    const response = yield call(updateOperationIndexApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateOperationIndexSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateOperationIndexFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateOperationIndexFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateOperationIndex() {
  yield takeLatest(MMSX_UPDATE_OPERATION_INDEX_START, doUpdateOperationIndex)
}
