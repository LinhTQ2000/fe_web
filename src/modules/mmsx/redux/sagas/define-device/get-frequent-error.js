import { call, put, takeLatest } from '@redux-saga/core/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getDeviceFrequentErrorFail,
  getDeviceFrequentErrorSuccess,
  MMSX_GET_DEVICE_FREQUENT_ERROR_START,
} from '../../actions/define-device'

export const getDeviceFrequentError = (params) => {
  const url = `v1/mms/error-types/${params.id}/frequent-error`
  return api.get(url, params)
}

function* doGetDeviceFrequentError(action) {
  try {
    const response = yield call(getDeviceFrequentError, action.payload)
    if (response.statusCode === 200) {
      yield put(getDeviceFrequentErrorSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(getDeviceFrequentErrorFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(getDeviceFrequentErrorFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetDeviceFrequentError() {
  yield takeLatest(
    MMSX_GET_DEVICE_FREQUENT_ERROR_START,
    doGetDeviceFrequentError,
  )
}
