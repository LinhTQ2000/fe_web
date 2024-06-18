import { call, put, takeLatest } from '@redux-saga/core/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  searchDeviceStatusDetailFail,
  searchDeviceStatusDetailSuccess,
  SEARCH_DEVICE_STATUS_DETAIL,
} from '../../actions/device-status-report'

export const getDeviceStatusDetailApi = (params) => {
  const url = `v1/mms/reports/device-status-detail/${params?.factoryId}`
  return api.get(url, params)
}

function* doGetDeviceStatusDetail(action) {
  try {
    const response = yield call(getDeviceStatusDetailApi, action.payload)
    if (response.statusCode === 200) {
      yield put(searchDeviceStatusDetailSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(searchDeviceStatusDetailFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(searchDeviceStatusDetailFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetDeviceStatusDetail() {
  yield takeLatest(SEARCH_DEVICE_STATUS_DETAIL, doGetDeviceStatusDetail)
}
