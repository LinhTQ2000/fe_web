import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  CONFIRM_WAREHOUSE_EXPORT_TICKET_START,
  confirmWarehouseExportTicketSuccess,
  confirmWarehouseExportTicketFail,
} from '~/modules/mmsx/redux/actions/warehouse-export-ticket'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmWarehouseExportTicketApi = (params) => {
  const url = `v1/mms/warehouse-export/${params}/confirm`
  return api.put(url)
}

function* doComfirmWarehouseExportTicket(action) {
  try {
    const response = yield call(confirmWarehouseExportTicketApi, action.payload)
    if (response.statusCode === 200) {
      yield put(confirmWarehouseExportTicketSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmWarehouseExportTicketFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmWarehouseExportTicket() {
  yield takeLatest(
    CONFIRM_WAREHOUSE_EXPORT_TICKET_START,
    doComfirmWarehouseExportTicket,
  )
}
