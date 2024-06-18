import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createTransferRequestFail,
  createTransferRequestSuccess,
  CREATE_TRANSFER_REQUEST,
} from '~/modules/mmsx/redux/actions/transfer-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const callApiCreateRequest = (params) => {
  const url = `v1/mms/transfer-requests`
  return api.post(url, params)
}

function* doCreateRequest(action) {
  try {
    const response = yield call(callApiCreateRequest, action.payload)
    if (response.statusCode === 200) {
      yield put(createTransferRequestSuccess())
      if (action.onSuccess) yield action.onSuccess(response.data)

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createTransferRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchCreateTransferRequest() {
  yield takeLatest(CREATE_TRANSFER_REQUEST, doCreateRequest)
}
