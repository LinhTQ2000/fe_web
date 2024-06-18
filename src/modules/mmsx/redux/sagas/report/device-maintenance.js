import { call, put, takeLatest } from '@redux-saga/core/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_REPORT_DEVICE_MAINTENANCE_START,
  reportDeviceMaintenanceFail,
  reportDeviceMaintenanceSuccess,
} from '../../actions/report'

export const getDeviceMaintenanceApi = (params) => {
  const url = `v1/mms/reports/device-maintenance`
  return api.get(url, params)
}

function* doGetDeviceMaintenance(action) {
  try {
    const response = yield call(getDeviceMaintenanceApi, action.payload)
    if (response.statusCode === 200) {
      yield put(reportDeviceMaintenanceSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(reportDeviceMaintenanceFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(reportDeviceMaintenanceFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetDeviceMaintenance() {
  yield takeLatest(MMSX_REPORT_DEVICE_MAINTENANCE_START, doGetDeviceMaintenance)
}
