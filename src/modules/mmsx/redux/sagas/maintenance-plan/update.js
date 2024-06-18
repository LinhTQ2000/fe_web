import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_UPDATE_MAINTENANCE_PLAN_START,
  updateMaintenancePlanFail,
  updateMaintenancePlanSuccess,
} from '../../actions/maintenance-plan'

/**
 * Search user API
 * @returns {Promise}
 */
const updateMaintenancePlanApi = (params) => {
  const uri = `v1/mms/maintenance-plans/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateMaintenancePlan(action) {
  try {
    const response = yield call(updateMaintenancePlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateMaintenancePlanSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateMaintenancePlanFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateMaintenancePlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateMaintenancePlan() {
  yield takeLatest(MMSX_UPDATE_MAINTENANCE_PLAN_START, doUpdateMaintenancePlan)
}
