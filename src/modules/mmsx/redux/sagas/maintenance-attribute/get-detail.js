import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_GET_DETAIL_MAINTENANCE_ATTRIBUTE_START,
  getDetailMaintenanceAttributeFailed,
  getDetailMaintenanceAttributeSuccess,
} from '../../actions/maintenance-attribute'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getMaintenanceAttributeDetailsApi = (params) => {
  const uri = `/v1/mms/maintenance-attributes/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMaintenanceAttributeDetails(action) {
  try {
    const response = yield call(
      getMaintenanceAttributeDetailsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getDetailMaintenanceAttributeSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getDetailMaintenanceAttributeFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailMaintenanceAttributeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetMaintenanceAttributeDetails() {
  yield takeLatest(
    MMSX_GET_DETAIL_MAINTENANCE_ATTRIBUTE_START,
    doGetMaintenanceAttributeDetails,
  )
}
