import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  confirmDeviceAssignSuccess,
  confirmDeviceAssignFail,
  MMSX_CONFIRM_DEVICE_ASSIGN_START,
} from '../../actions/device-assign'

const confirmDeviceAssign = (params) => {
  const url = `v1/mms/device-assignments/${params.id}/confirmed`
  return api.put(url, params)
}

function* doConfirmDeviceAssign(action) {
  try {
    const response = yield call(confirmDeviceAssign, action?.payload)
    if (response.statusCode === 200) {
      yield put(confirmDeviceAssignSuccess(action.payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(confirmDeviceAssignFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(confirmDeviceAssignFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmDeviceAssign() {
  yield takeLatest(MMSX_CONFIRM_DEVICE_ASSIGN_START, doConfirmDeviceAssign)
}
