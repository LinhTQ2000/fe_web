import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getTransferTicketListFail,
  getTransferTicketListSuccess,
  GET_TRANSFER_TICKET_LIST_START,
} from '~/modules/mmsx/redux/actions/transfer-ticket'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

export const getTransferTicketListApi = (params) => {
  const url = `v1/mms/transfer-tickets`
  return api.get(url, params)
}

function* doGetTransferTicketList(action) {
  try {
    const response = yield call(getTransferTicketListApi, action?.payload)

    if (response.statusCode === 200) {
      yield put(getTransferTicketListSuccess(response?.data))

      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(getTransferTicketListFail())
    }
  } catch (error) {
    yield put(getTransferTicketListFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetTransferTicketList() {
  yield takeLatest(GET_TRANSFER_TICKET_LIST_START, doGetTransferTicketList)
}
