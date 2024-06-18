import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getDetailWarehouseImportRequestFail,
  getDetailWarehouseImportRequestSuccess,
  MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_START,
} from '../../actions/warehouse-import-request'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getWarehouseImportRequestDetailsApi = (params) => {
  const uri = `/v1/mms/warehouse-import-request/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseImportRequestDetails(action) {
  try {
    const response = yield call(
      getWarehouseImportRequestDetailsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getDetailWarehouseImportRequestSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getDetailWarehouseImportRequestFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailWarehouseImportRequestFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetWarehouseImportRequestDetails() {
  yield takeLatest(
    MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_START,
    doGetWarehouseImportRequestDetails,
  )
}
