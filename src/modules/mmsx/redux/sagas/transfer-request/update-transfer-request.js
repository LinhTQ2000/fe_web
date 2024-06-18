import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  UPDATE_TRANSFER_REQUEST,
  updateTransferRequestFail,
  updateTransferRequestSuccess,
} from '~/modules/mmsx/redux/actions/transfer-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

// update
const callApiUpdateRequest = (params) => {
  const url = `v1/mms/transfer-requests/${params.id}`
  return api.put(url, params)
}

function* doUpdateRequest(action) {
  try {
    const response = yield call(callApiUpdateRequest, action.payload)
    if (response.statusCode === 200) {
      yield put(updateTransferRequestSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateTransferRequestFail())
    }
  } catch (error) {
    yield put(updateTransferRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchUpdateTransferRequest() {
  yield takeLatest(UPDATE_TRANSFER_REQUEST, doUpdateRequest)
}
