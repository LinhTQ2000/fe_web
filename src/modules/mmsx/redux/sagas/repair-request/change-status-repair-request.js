import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  changeStatusRepairRequestFailed,
  changeStatusRepairRequestSuccess,
  CHANGE_STATUS_REPAIR_REQUEST_START,
} from '../../actions/repair-request'

const changeStatusRepairRequestApi = (params) => {
  const url = `v1/mms/repair-requests/${params?.id}/${params?.action}`
  return api.put(url, params)
}

function* doChangeStatusRepairRequest(action) {
  try {
    const response = yield call(changeStatusRepairRequestApi, action.payload)
    if (response.statusCode === 200) {
      yield put(changeStatusRepairRequestSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(changeStatusRepairRequestFailed())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(changeStatusRepairRequestFailed())
    if (action.onError) yield action.onError()
  }
}

export default function* watchChangeStatusRepairRequest() {
  yield takeLatest(
    CHANGE_STATUS_REPAIR_REQUEST_START,
    doChangeStatusRepairRequest,
  )
}
