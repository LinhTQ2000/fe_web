import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  REJECT_TRANSFER_TICKET_START,
  rejectTransferTicketSuccess,
  rejectTransferTicketFail,
} from '~/modules/mmsx/redux/actions/transfer-ticket'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const rejectTransferTicketApi = (params) => {
  const url = `v1/mms/transfer-tickets/${params}/reject`
  return api.put(url)
}

function* doRejectTransferTicket(action) {
  try {
    const response = yield call(rejectTransferTicketApi, action.payload)
    if (response.statusCode === 200) {
      yield put(rejectTransferTicketSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectTransferTicketFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchRejectTransferTicket() {
  yield takeLatest(REJECT_TRANSFER_TICKET_START, doRejectTransferTicket)
}
