import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getTransferRequestListFail,
  getTransferRequestListSuccess,
  GET_TRANSFER_REQUEST_LIST_START,
} from '~/modules/mmsx/redux/actions/transfer-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
export const getTransferRequestListApi = (params) => {
  const url = `v1/mms/transfer-requests`
  return api.get(url, params)
}

export const getTranferRequestForTransferTicket = (params) => {
  const url = `v1/mms/transfer-requests/list-for-transfer-ticket`
  return api.get(url, params)
}

function* doGetTransferRequestList(action) {
  try {
    const response = yield call(getTransferRequestListApi, action?.payload)

    if (response.statusCode === 200) {
      yield put(getTransferRequestListSuccess(response?.data))

      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(getTransferRequestListFail())
    }
  } catch (error) {
    yield put(getTransferRequestListFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetTransferRequestList() {
  yield takeLatest(GET_TRANSFER_REQUEST_LIST_START, doGetTransferRequestList)
}
