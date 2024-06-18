import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createWarehouseExportTicketFail,
  createWarehouseExportTicketSuccess,
  MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_START,
} from '../../actions/warehouse-export-ticket'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createWarehouseExportTicketApi = (body) => {
  const uri = `/v1/mms/warehouse-export`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateWarehouseExportTicket(action) {
  try {
    const response = yield call(createWarehouseExportTicketApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createWarehouseExportTicketSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createWarehouseExportTicketFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createWarehouseExportTicketFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateWarehouseExportTicket() {
  yield takeLatest(
    MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_START,
    doCreateWarehouseExportTicket,
  )
}
