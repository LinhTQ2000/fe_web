import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_UPDATE_MAINTENANCE_ATTRIBUTE_START,
  updateMaintenanceAttributeFailed,
  updateMaintenanceAttributeSuccess,
} from '../../actions/maintenance-attribute'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateMaintenanceAttributeApi = (body) => {
  const uri = `/v1/mms/maintenance-attributes/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateMaintenanceAttribute(action) {
  try {
    const response = yield call(updateMaintenanceAttributeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateMaintenanceAttributeSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateMaintenanceAttributeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateMaintenanceAttributeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateMaintenanceAttribute() {
  yield takeLatest(
    MMSX_UPDATE_MAINTENANCE_ATTRIBUTE_START,
    doUpdateMaintenanceAttribute,
  )
}
