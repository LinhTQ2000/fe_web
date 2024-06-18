import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  CONFIRM_TRANSFER_TICKET_START,
  confirmTransferTicketSuccess,
  confirmTransferTicketFail,
} from '~/modules/mmsx/redux/actions/transfer-ticket'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const confirmTransferTicketApi = (params) => {
  const url = `v1/mms/transfer-tickets/${params}/confirm`
  return api.put(url)
}

function* doComfirmTransferTicket(action) {
  try {
    const response = yield call(confirmTransferTicketApi, action.payload)
    if (response.statusCode === 200) {
      yield put(confirmTransferTicketSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmTransferTicketFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmTransferTicket() {
  yield takeLatest(CONFIRM_TRANSFER_TICKET_START, doComfirmTransferTicket)
}
