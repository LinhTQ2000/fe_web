import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createMaintenancePlanFail,
  createMaintenancePlanSuccess,
  MMSX_CREATE_MAINTENANCE_PLAN_START,
} from '../../actions/maintenance-plan'
/**
 * Search user API
 * @returns {Promise}
 */
const createMaintenancePlanApi = (params) => {
  const uri = `v1/mms/maintenance-plans`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateMaintenancePlan(action) {
  try {
    const response = yield call(createMaintenancePlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createMaintenancePlanSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )
      yield put(createMaintenancePlanFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createMaintenancePlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateMaintenancePlan() {
  yield takeLatest(MMSX_CREATE_MAINTENANCE_PLAN_START, doCreateMaintenancePlan)
}
