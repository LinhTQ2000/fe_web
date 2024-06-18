import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getDetailMaintenancePlanFail,
  getDetailMaintenancePlanSuccess,
  MMSX_GET_MAINTENANCE_PLAN_START,
} from '../../actions/maintenance-plan'

/**
 * Search user API
 * @returns {Promise}
 */
const getDetailMaintenancePlanApi = (id) => {
  const uri = `v1/mms/maintenance-plans/${id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetailMaintenancePlan(action) {
  try {
    const response = yield call(getDetailMaintenancePlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailMaintenancePlanSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      yield put(getDetailMaintenancePlanFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailMaintenancePlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDetailMaintenancePlan() {
  yield takeLatest(MMSX_GET_MAINTENANCE_PLAN_START, doGetDetailMaintenancePlan)
}
