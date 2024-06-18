import { call, put, takeLatest } from '@redux-saga/core/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  investmentDeviceReportFail,
  investmentDeviceReportSuccess,
  MMSX_INVESTMENT_DEVICE_REPORT_START,
} from '../../actions/report'

export const getInvestmentDeviceReportApi = (params) => {
  const url = `v1/mms/reports/new-investment-device`
  return api.get(url, params)
}

export const exportInvestDeviceReportApi = (params) => {
  const url = `v1/mms/reports/${params.type}`
  return api.get(url, params)
}

function* doGetInvestmentDeviceReport(action) {
  try {
    const response = yield call(getInvestmentDeviceReportApi, action.payload)
    if (response.statusCode === 200) {
      yield put(investmentDeviceReportSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(investmentDeviceReportFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(investmentDeviceReportFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetInvestmentDeviceReport() {
  yield takeLatest(
    MMSX_INVESTMENT_DEVICE_REPORT_START,
    doGetInvestmentDeviceReport,
  )
}
