import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  REJECT_TRANSFER_REQUEST_START,
  rejectTransferRequestSuccess,
  rejectTransferRequestFail,
} from '~/modules/mmsx/redux/actions/transfer-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const rejectTransferRequestApi = (params) => {
  const url = `v1/mms/transfer-requests/${params}/reject`
  return api.put(url)
}

function* doRejectTransferRequest(action) {
  try {
    const response = yield call(rejectTransferRequestApi, action.payload)
    if (response.statusCode === 200) {
      yield put(rejectTransferRequestSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectTransferRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchRejectTransferRequest() {
  yield takeLatest(REJECT_TRANSFER_REQUEST_START, doRejectTransferRequest)
}
