import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createWarehouseImportRequestFail,
  createWarehouseImportRequestSuccess,
  MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_START,
} from '../../actions/warehouse-import-request'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createWarehouseImportRequestApi = (body) => {
  const uri = `/v1/mms/warehouse-import-request`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateWarehouseImportRequest(action) {
  try {
    const response = yield call(
      createWarehouseImportRequestApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(createWarehouseImportRequestSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createWarehouseImportRequestFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createWarehouseImportRequestFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateWarehouseImportRequest() {
  yield takeLatest(
    MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_START,
    doCreateWarehouseImportRequest,
  )
}
