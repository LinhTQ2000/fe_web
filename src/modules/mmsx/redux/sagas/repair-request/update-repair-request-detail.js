import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateRepairRequestDetailFailed,
  updateRepairRequestDetailSuccess,
  UPDATE_REPAIR_REQUEST_DETAIL_START,
} from '../../actions/repair-request'

const updateRepairRequestDetailApi = (params) => {
  const url = `v1/mms/repair-requests/${params?.id}`
  return api.put(url, params)
}

function* doUpdateRepairRequestDetail(action) {
  try {
    const response = yield call(updateRepairRequestDetailApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(updateRepairRequestDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateRepairRequestDetailFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateRepairRequestDetailFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateRepairRequestDetail() {
  yield takeLatest(
    UPDATE_REPAIR_REQUEST_DETAIL_START,
    doUpdateRepairRequestDetail,
  )
}
