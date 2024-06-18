import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  CONFIRM_TRANSFER_REQUEST_START,
  confirmTransferRequestSuccess,
  confirmTransferRequestFail,
} from '~/modules/mmsx/redux/actions/transfer-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const confirmTransferRequestApi = (params) => {
  const url = `v1/mms/transfer-requests/${params}/confirm`
  return api.put(url)
}

function* doComfirmTransferRequest(action) {
  try {
    const response = yield call(confirmTransferRequestApi, action.payload)
    if (response.statusCode === 200) {
      yield put(confirmTransferRequestSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmTransferRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmTransferRequest() {
  yield takeLatest(CONFIRM_TRANSFER_REQUEST_START, doComfirmTransferRequest)
}
