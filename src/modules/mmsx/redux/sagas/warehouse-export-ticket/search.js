import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_START,
  searchWarehouseExportTicketFail,
  searchWarehouseExportTicketSuccess,
} from '../../actions/warehouse-export-ticket'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchWarehouseExportTicketApi = (params) => {
  const uri = `/v1/mms/warehouse-export`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWarehouseExportTicket(action) {
  try {
    const response = yield call(searchWarehouseExportTicketApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseExportTicketSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(searchWarehouseExportTicketFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchWarehouseExportTicketFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchWarehouseExportTicket() {
  yield takeLatest(
    MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_START,
    doSearchWarehouseExportTicket,
  )
}
