import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  DELETE_WAREHOUSE_EXPORT_TICKET_START,
  deleteWarehouseExportTicketSuccess,
  deleteWarehouseExportTicketFail,
} from '~/modules/mmsx/redux/actions/warehouse-export-ticket'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const deleteWarehouseExportTicketApi = (params) => {
  const url = `v1/mms/warehouse-export/${params}`
  return api.delete(url)
}

function* doDeleteWarehouseExportTicket(action) {
  try {
    const response = yield call(deleteWarehouseExportTicketApi, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteWarehouseExportTicketSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteWarehouseExportTicketFail())
    }
  } catch (error) {
    yield put(deleteWarehouseExportTicketFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteWarehouseExportTicket() {
  yield takeLatest(
    DELETE_WAREHOUSE_EXPORT_TICKET_START,
    doDeleteWarehouseExportTicket,
  )
}
