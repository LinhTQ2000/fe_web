import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_IN_ACTIVE_MAINTENANCE_ATTRIBUTE_START,
  inActiveMaintenanceAttributeFailed,
  inActiveMaintenanceAttributeSuccess,
} from '../../actions/maintenance-attribute'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveMaintenanceAttributeApi = (params) => {
  const uri = `v1/mms/maintenance-attributes/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveMaintenanceAttribute(action) {
  try {
    const response = yield call(
      inActiveMaintenanceAttributeApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(inActiveMaintenanceAttributeSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveMaintenanceAttributeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveMaintenanceAttributeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveMaintenanceAttribute() {
  yield takeLatest(
    MMSX_IN_ACTIVE_MAINTENANCE_ATTRIBUTE_START,
    doInActiveMaintenanceAttribute,
  )
}
