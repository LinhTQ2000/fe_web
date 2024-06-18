import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createTransferTicketFail,
  createTransferTicketSuccess,
  CREATE_TRANSFER_TICKET,
} from '~/modules/mmsx/redux/actions/transfer-ticket'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const callApiCreateTicket = (params) => {
  const url = `v1/mms/transfer-tickets`
  return api.post(url, params)
}

function* doCreateTicket(action) {
  try {
    const response = yield call(callApiCreateTicket, action.payload)
    if (response.statusCode === 200) {
      yield put(createTransferTicketSuccess())
      if (action.onSuccess) yield action.onSuccess(response.data)

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createTransferTicketFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchCreateTransferTicket() {
  yield takeLatest(CREATE_TRANSFER_TICKET, doCreateTicket)
}
