import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_REPORT_MAINTENANCE_PLAN_START,
  reportMaintenancePlanFail,
  reportMaintenancePlanSuccess,
} from '../../actions/report'

export const reportMaintenancePlanApi = (params) => {
  const url = `v1/mms/reports/maintenance-plan`
  return api.get(url, params)
}

export const reportMaintenancePlanExportApi = (params) => {
  const url = `v1/mms/reports/maintenance-plan-export`
  return api.get(url, params)
}

function* doReportMaintenancePlan(action) {
  try {
    const response = yield call(reportMaintenancePlanApi, action?.payload)

    if (response.statusCode === 200) {
      yield put(reportMaintenancePlanSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(reportMaintenancePlanFail())
      if (action.onError) {
        yield action.onError
      }
    }
  } catch (error) {
    yield put(reportMaintenancePlanFail())
    if (action.onError) {
      yield action.onError
    }
  }
}

export default function* watchReportMaintenancePlan() {
  yield takeLatest(MMSX_REPORT_MAINTENANCE_PLAN_START, doReportMaintenancePlan)
}
