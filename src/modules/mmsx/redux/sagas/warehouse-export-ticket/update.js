import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_START,
  updateWarehouseExportTicketFail,
  updateWarehouseExportTicketSuccess,
} from '../../actions/warehouse-export-ticket'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateWarehouseExportTicketApi = (body) => {
  const uri = `/v1/mms/warehouse-export/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateWarehouseExportTicket(action) {
  try {
    const response = yield call(updateWarehouseExportTicketApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateWarehouseExportTicketSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateWarehouseExportTicketFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateWarehouseExportTicketFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateWarehouseExportTicket() {
  yield takeLatest(
    MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_START,
    doUpdateWarehouseExportTicket,
  )
}
