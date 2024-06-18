import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getRepairRequestDetailFailed,
  getRepairRequestDetailSuccess,
  GET_REPAIR_REQUEST_DETAIL_START,
} from '../../actions/repair-request'

const getRepairRequestDetailApi = (params) => {
  const url = `v1/mms/repair-requests/${params}`
  return api.get(url)
}

function* doGetRepairRequestDetail(action) {
  try {
    const response = yield call(getRepairRequestDetailApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getRepairRequestDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getRepairRequestDetailFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetRepairRequestDetail() {
  yield takeLatest(GET_REPAIR_REQUEST_DETAIL_START, doGetRepairRequestDetail)
}
