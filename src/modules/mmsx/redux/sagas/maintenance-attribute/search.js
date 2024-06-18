import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_SEARCH_MAINTENANCE_ATTRIBUTE_START,
  searchMaintenanceAttributeFailed,
  searchMaintenanceAttributeSuccess,
} from '../../actions/maintenance-attribute'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchMaintenanceAttributeApi = (params) => {
  const uri = `/v1/mms/maintenance-attributes`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchMaintenanceAttribute(action) {
  try {
    const response = yield call(searchMaintenanceAttributeApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchMaintenanceAttributeSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(searchMaintenanceAttributeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchMaintenanceAttributeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchMaintenanceAttribute() {
  yield takeLatest(
    MMSX_SEARCH_MAINTENANCE_ATTRIBUTE_START,
    doSearchMaintenanceAttribute,
  )
}
