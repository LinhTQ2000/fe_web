import { call, put, takeLatest } from '@redux-saga/core/effects'

import { api } from '~/services/api'

import {
  getDeviceMaintenanceInfoFail,
  getDeviceMaintenanceInfoSuccess,
  MMSX_GET_DEVICE_MAINTENANCE_INFO_START,
} from '../../actions/define-device'

export const getDeviceMaintenanceInfo = (params) => {
  const url = `v1/mms/devices/${params.id}/maintenance-info`
  return api.get(url, params)
}

function* doGetDeviceMaintenanceInfo(action) {
  try {
    const response = yield call(getDeviceMaintenanceInfo, action.payload)
    if (response.statusCode === 200) {
      yield put(getDeviceMaintenanceInfoSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      yield put(getDeviceMaintenanceInfoFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(getDeviceMaintenanceInfoFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetDeviceMaintenanceInfo() {
  yield takeLatest(
    MMSX_GET_DEVICE_MAINTENANCE_INFO_START,
    doGetDeviceMaintenanceInfo,
  )
}
