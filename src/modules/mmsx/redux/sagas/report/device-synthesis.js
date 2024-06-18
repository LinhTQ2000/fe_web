import { call, put, takeLatest } from '@redux-saga/core/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_REPORT_DEVICE_SYNTHESIS_START,
  reportDeviceSynthesisFail,
  reportDeviceSynthesisSuccess,
} from '../../actions/report'

export const getDeviceSynthesisApi = (params) => {
  const url = `v1/mms/reports/device-synthesis`
  return api.get(url, params)
}

function* doGetDeviceSynthesis(action) {
  try {
    const response = yield call(getDeviceSynthesisApi, action.payload)
    if (response.statusCode === 200) {
      yield put(reportDeviceSynthesisSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(reportDeviceSynthesisFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(reportDeviceSynthesisFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetDeviceSynthesis() {
  yield takeLatest(MMSX_REPORT_DEVICE_SYNTHESIS_START, doGetDeviceSynthesis)
}
