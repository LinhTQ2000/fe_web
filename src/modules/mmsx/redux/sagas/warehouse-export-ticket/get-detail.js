import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getDetailWarehouseExportTicketFail,
  getDetailWarehouseExportTicketSuccess,
  MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_START,
} from '../../actions/warehouse-export-ticket'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehouseExportTicketDetailsApi = (params) => {
  const uri = `/v1/mms/warehouse-export/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseExportTicketDetails(action) {
  try {
    const response = yield call(
      getWarehouseExportTicketDetailsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getDetailWarehouseExportTicketSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getDetailWarehouseExportTicketFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailWarehouseExportTicketFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetWarehouseExportTicketDetails() {
  yield takeLatest(
    MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_START,
    doGetWarehouseExportTicketDetails,
  )
}
