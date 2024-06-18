import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  REJECT_WAREHOUSE_EXPORT_TICKET_START,
  rejectWarehouseExportTicketSuccess,
  rejectWarehouseExportTicketFail,
} from '~/modules/mmsx/redux/actions/warehouse-export-ticket'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const rejectWarehouseExportTicketApi = (params) => {
  const url = `v1/mms/warehouse-export/${params}/reject`
  return api.put(url)
}

function* doRejectWarehouseExportTicket(action) {
  try {
    const response = yield call(rejectWarehouseExportTicketApi, action.payload)
    if (response.statusCode === 200) {
      yield put(rejectWarehouseExportTicketSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectWarehouseExportTicketFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchRejectWarehouseExportTicket() {
  yield takeLatest(
    REJECT_WAREHOUSE_EXPORT_TICKET_START,
    doRejectWarehouseExportTicket,
  )
}
