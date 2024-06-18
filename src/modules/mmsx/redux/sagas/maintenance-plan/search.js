import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_SEARCH_MAINTENANCE_PLAN_START,
  searchMaintenancePlanFail,
  searchMaintenancePlanSuccess,
} from '../../actions/maintenance-plan'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
// v1/mms/maintenance-team/list
export const searchMaintenancePlanApi = (params) => {
  const uri = `v1/mms/maintenance-plans`
  return api.get(uri, params)
}

export const searchDeviceOfMaintenancePlanApi = (params) => {
  const url = `v1/mms/maintenance-plans/${params.id}/devices`
  return api.get(url, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMaintenancePlan(action) {
  try {
    const response = yield call(searchMaintenancePlanApi, action?.payload)
    const payload = {
      list: response?.data?.items,
      total: response?.data?.meta?.total,
    }

    if (response?.statusCode === 200) {
      yield put(searchMaintenancePlanSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(payload)
      }
    } else {
      yield put(searchMaintenancePlanFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchMaintenancePlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchMaintenancePlan() {
  yield takeLatest(MMSX_SEARCH_MAINTENANCE_PLAN_START, doGetMaintenancePlan)
}
