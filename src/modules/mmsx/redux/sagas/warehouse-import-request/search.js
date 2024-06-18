import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_START,
  searchWarehouseImportRequestFail,
  searchWarehouseImportRequestSuccess,
} from '../../actions/warehouse-import-request'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchWarehouseImportRequestApi = (params) => {
  const uri = `/v1/mms/warehouse-import-request`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWarehouseImportRequest(action) {
  try {
    const response = yield call(
      searchWarehouseImportRequestApi,
      action?.payload,
    )
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseImportRequestSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(searchWarehouseImportRequestFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchWarehouseImportRequestFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchWarehouseImportRequest() {
  yield takeLatest(
    MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_START,
    doSearchWarehouseImportRequest,
  )
}
