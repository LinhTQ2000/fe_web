import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteMaintenancePlanFail,
  deleteMaintenancePlanSuccess,
  MMSX_DELETE_MAINTENANCE_PLAN_START,
} from '../../actions/maintenance-plan'

/**
 * Search user API
 * @returns {Promise}
 */
const deleteMaintenancePlanApi = (id) => {
  const uri = `v1/mms/maintenance-plans/${id}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteMaintenancePlan(action) {
  try {
    const response = yield call(deleteMaintenancePlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteMaintenancePlanSuccess(action?.payload))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteMaintenancePlanFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(deleteMaintenancePlanFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteMaintenancePlan() {
  yield takeLatest(MMSX_DELETE_MAINTENANCE_PLAN_START, doDeleteMaintenancePlan)
}
