import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeMaintenanceAttributeSuccess,
  activeMaintenanceAttributeFailed,
  MMSX_ACTIVE_MAINTENANCE_ATTRIBUTE_START,
} from '../../actions/maintenance-attribute'

/**
 * Search user API
 * @returns {Promise}
 */
const activeMaintenanceAttributeApi = (params) => {
  const uri = `v1/mms/maintenance-attributes/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveMaintenanceAttribute(action) {
  try {
    const response = yield call(activeMaintenanceAttributeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeMaintenanceAttributeSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeMaintenanceAttributeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeMaintenanceAttributeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveMaintenanceAttribute() {
  yield takeLatest(
    MMSX_ACTIVE_MAINTENANCE_ATTRIBUTE_START,
    doActiveMaintenanceAttribute,
  )
}
