import { call, put, takeLatest } from '@redux-saga/core/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  searchDeviceStatusSuccess,
  searchDeviceStatusFail,
  SEARCH_DEVICE_STATUS_REPORT_START,
} from '../../actions/device-status-report'

export const getDeviceApi = (params) => {
  const url = `v1/mms/reports/device-status`
  return api.get(url, params)
}

function* doGetDeviceStatus(action) {
  try {
    const response = yield call(getDeviceApi, action.payload)
    if (response.statusCode === 200) {
      yield put(searchDeviceStatusSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(searchDeviceStatusFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(searchDeviceStatusFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetDeviceStatus() {
  yield takeLatest(SEARCH_DEVICE_STATUS_REPORT_START, doGetDeviceStatus)
}
