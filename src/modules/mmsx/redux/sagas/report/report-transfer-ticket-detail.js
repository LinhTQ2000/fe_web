import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_TRANSFER_TICKET_REPORT_DETAIL_START,
  reportTransferTicketDetailFail,
  reportTransferTicketDetailSuccess,
} from '../../actions/report'

export const reportTransferTicketDetailApi = (params) => {
  const url = `v1/mms/reports/detail-transfer-ticket`
  return api.get(url, params)
}

function* doReportTransferTicketDetail(action) {
  try {
    const response = yield call(reportTransferTicketDetailApi, action?.payload)

    if (response.statusCode === 200) {
      yield put(reportTransferTicketDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(reportTransferTicketDetailFail())
      if (action.onError) {
        yield action.onError
      }
    }
  } catch (error) {
    yield put(reportTransferTicketDetailFail())
    if (action.onError) {
      yield action.onError
    }
  }
}

export default function* watchReportTransferTicketDetail() {
  yield takeLatest(
    MMSX_TRANSFER_TICKET_REPORT_DETAIL_START,
    doReportTransferTicketDetail,
  )
}
