import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_START,
  updateWarehouseImportRequestFail,
  updateWarehouseImportRequestSuccess,
} from '../../actions/warehouse-import-request'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateWarehouseImportRequestApi = (body) => {
  const uri = `/v1/mms/warehouse-import-request/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateWarehouseImportRequest(action) {
  try {
    const response = yield call(
      updateWarehouseImportRequestApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(updateWarehouseImportRequestSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateWarehouseImportRequestFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateWarehouseImportRequestFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateWarehouseImportRequest() {
  yield takeLatest(
    MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_START,
    doUpdateWarehouseImportRequest,
  )
}
