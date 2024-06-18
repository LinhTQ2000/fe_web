import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createMaintenanceAttributeFailed,
  createMaintenanceAttributeSuccess,
  MMSX_CREATE_MAINTENANCE_ATTRIBUTE_START,
} from '../../actions/maintenance-attribute'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createMaintenanceAttributeApi = (body) => {
  const uri = `/v1/mms/maintenance-attributes`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateMaintenanceAttribute(action) {
  try {
    const response = yield call(createMaintenanceAttributeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createMaintenanceAttributeSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createMaintenanceAttributeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createMaintenanceAttributeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateMaintenanceAttribute() {
  yield takeLatest(
    MMSX_CREATE_MAINTENANCE_ATTRIBUTE_START,
    doCreateMaintenanceAttribute,
  )
}
