import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  rejectDeviceAssignSuccess,
  rejectDeviceAssignFail,
  MMSX_REJECT_DEVICE_ASSIGN_START,
} from '../../actions/device-assign'

const rejectDeviceAssign = (params) => {
  const url = `v1/mms/device-assignments/${params.id}/rejected`
  return api.put(url, params)
}

function* doRejectDeviceAssign(action) {
  try {
    const response = yield call(rejectDeviceAssign, action?.payload)
    if (response.statusCode === 200) {
      yield put(rejectDeviceAssignSuccess(action.payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(rejectDeviceAssignFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(rejectDeviceAssignFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectDeviceAssign() {
  yield takeLatest(MMSX_REJECT_DEVICE_ASSIGN_START, doRejectDeviceAssign)
}
