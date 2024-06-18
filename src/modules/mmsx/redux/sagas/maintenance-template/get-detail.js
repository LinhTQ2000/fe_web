import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_GET_DETAIL_MAINTENANCE_TEMPLATE_START,
  getDetailMaintenanceTemplateFailed,
  getDetailMaintenanceTemplateSuccess,
} from '../../actions/maintenance-template'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getMaintenanceTemplateDetailsApi = (params) => {
  const uri = `/v1/mms/maintenance-templates/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMaintenanceTemplateDetails(action) {
  try {
    const response = yield call(
      getMaintenanceTemplateDetailsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getDetailMaintenanceTemplateSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getDetailMaintenanceTemplateFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailMaintenanceTemplateFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetMaintenanceTemplateDetails() {
  yield takeLatest(
    MMSX_GET_DETAIL_MAINTENANCE_TEMPLATE_START,
    doGetMaintenanceTemplateDetails,
  )
}
