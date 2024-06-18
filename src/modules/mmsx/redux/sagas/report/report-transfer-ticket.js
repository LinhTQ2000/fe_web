import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_TRANSFER_TICKET_REPORT_START,
  reportTransferTicketFail,
  reportTransferTicketSuccess,
} from '../../actions/report'

export const reportTransferTicketApi = (params) => {
  const url = `v1/mms/reports/transfer-ticket`
  return api.get(url, params)
}

function* doReportTransferTicket(action) {
  try {
    const response = yield call(reportTransferTicketApi, action?.payload)

    if (response.statusCode === 200) {
      yield put(reportTransferTicketSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(reportTransferTicketFail())
      if (action.onError) {
        yield action.onError
      }
    }
  } catch (error) {
    yield put(reportTransferTicketFail())
    if (action.onError) {
      yield action.onError
    }
  }
}

export default function* watchReportTransferTicket() {
  yield takeLatest(MMSX_TRANSFER_TICKET_REPORT_START, doReportTransferTicket)
}
