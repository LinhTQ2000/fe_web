import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getTransferTicketDetailFail,
  getTransferTicketDetailSuccess,
  GET_TRANSFER_TICKET_DETAIL_START,
} from '~/modules/mmsx/redux/actions/transfer-ticket'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

export const getTransferTicketDetailApi = (params) => {
  const url = `v1/mms/transfer-tickets/${params}`
  return api.get(url)
}

function* doGetTransferTicketDetail(action) {
  try {
    const response = yield call(getTransferTicketDetailApi, action.payload)

    if (response.statusCode === 200) {
      yield put(getTransferTicketDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getTransferTicketDetailFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetTransferTicketDetail() {
  yield takeLatest(GET_TRANSFER_TICKET_DETAIL_START, doGetTransferTicketDetail)
}
