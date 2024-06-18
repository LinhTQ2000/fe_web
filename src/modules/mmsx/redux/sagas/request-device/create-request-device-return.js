import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createRequestDeviceFailed,
  createRequestDeviceSuccess,
  CREATE_REQUEST_DEVICE_RETURN_START,
} from '../../actions/request-device'

const createRequestDeviceApi = (params) => {
  const url = `v1/mms/device-requests/return`
  return api.post(url, params)
}

function* doCreateRequestDevice(action) {
  try {
    const response = yield call(createRequestDeviceApi, action.payload)
    if (response.statusCode === 200) {
      yield put(createRequestDeviceSuccess())

      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createRequestDeviceFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createRequestDeviceFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateRequestDeviceReturn() {
  yield takeLatest(CREATE_REQUEST_DEVICE_RETURN_START, doCreateRequestDevice)
}
