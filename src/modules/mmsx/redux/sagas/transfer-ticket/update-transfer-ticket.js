import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  UPDATE_TRANSFER_TICKET,
  updateTransferTicketFail,
  updateTransferTicketSuccess,
} from '~/modules/mmsx/redux/actions/transfer-ticket'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

// update
const callApiUpdateTicket = (params) => {
  const url = `v1/mms/transfer-tickets/${params.id}`
  return api.put(url, params)
}

function* doUpdateTicket(action) {
  try {
    const response = yield call(callApiUpdateTicket, action.payload)
    if (response.statusCode === 200) {
      yield put(updateTransferTicketSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateTransferTicketFail())
    }
  } catch (error) {
    yield put(updateTransferTicketFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchUpdateTransferTicket() {
  yield takeLatest(UPDATE_TRANSFER_TICKET, doUpdateTicket)
}
