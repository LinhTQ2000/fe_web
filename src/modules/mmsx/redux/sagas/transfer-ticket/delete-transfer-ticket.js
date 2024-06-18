import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  DELETE_TRANSFER_TICKET_START,
  deleteTransferTicketSuccess,
  deleteTransferTicketFail,
} from '~/modules/mmsx/redux/actions/transfer-ticket'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const deleteTransferTicketApi = (params) => {
  const url = `v1/mms/transfer-tickets/${params}`
  return api.delete(url)
}

function* doDeleteTransferTicket(action) {
  try {
    const response = yield call(deleteTransferTicketApi, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteTransferTicketSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteTransferTicketFail())
    }
  } catch (error) {
    yield put(deleteTransferTicketFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteTransferTicket() {
  yield takeLatest(DELETE_TRANSFER_TICKET_START, doDeleteTransferTicket)
}
