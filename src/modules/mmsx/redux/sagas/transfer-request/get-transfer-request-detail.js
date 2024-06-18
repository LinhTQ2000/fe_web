import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getTransferRequestDetailFail,
  getTransferRequestDetailSuccess,
  GET_TRANSFER_REQUEST_DETAIL_START,
} from '~/modules/mmsx/redux/actions/transfer-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

export const getTransferRequestDetailApi = (params) => {
  const url = `v1/mms/transfer-requests/${params}`
  return api.get(url)
}

function* doGetTransferRequestDetail(action) {
  try {
    const response = yield call(getTransferRequestDetailApi, action.payload)

    if (response.statusCode === 200) {
      yield put(getTransferRequestDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getTransferRequestDetailFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetTransferRequestDetail() {
  yield takeLatest(
    GET_TRANSFER_REQUEST_DETAIL_START,
    doGetTransferRequestDetail,
  )
}
