import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  DELETE_TRANSFER_REQUEST_START,
  deleteTransferRequestSuccess,
  deleteTransferRequestFail,
} from '~/modules/mmsx/redux/actions/transfer-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const deleteTransferRequestApi = (params) => {
  const url = `v1/mms/transfer-requests/${params}`
  return api.delete(url)
}

function* doDeleteTransferRequest(action) {
  try {
    const response = yield call(deleteTransferRequestApi, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteTransferRequestSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteTransferRequestFail())
    }
  } catch (error) {
    yield put(deleteTransferRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteTransferRequest() {
  yield takeLatest(DELETE_TRANSFER_REQUEST_START, doDeleteTransferRequest)
}
