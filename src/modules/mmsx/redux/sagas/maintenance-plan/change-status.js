import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  changeStatusMaintenancePlanFail,
  changeStatusMaintenancePlanSuccess,
  MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_START,
} from '../../actions/maintenance-plan'

/**
 * Search user API
 * @returns {Promise}
 */
const changeStatusMaintenancePlanApi = (params) => {
  const uri = `v1/mms/maintenance-plans/${params?.id}/${params?.action}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doChangeStatusMaintenancePlan(action) {
  try {
    const response = yield call(changeStatusMaintenancePlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(changeStatusMaintenancePlanSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(changeStatusMaintenancePlanFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(changeStatusMaintenancePlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchChangeStatusMaintenancePlan() {
  yield takeLatest(
    MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_START,
    doChangeStatusMaintenancePlan,
  )
}
