import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createOperationIndexFailed,
  createOperationIndexSuccess,
  MMSX_CREATE_OPERATION_INDEX_START,
} from '../../actions/operation-index'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createOperationIndexApi = (body) => {
  const uri = `/v1/mms/operation-index`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateOperationIndex(action) {
  try {
    const response = yield call(createOperationIndexApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createOperationIndexSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createOperationIndexFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createOperationIndexFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateOperationIndex() {
  yield takeLatest(MMSX_CREATE_OPERATION_INDEX_START, doCreateOperationIndex)
}
