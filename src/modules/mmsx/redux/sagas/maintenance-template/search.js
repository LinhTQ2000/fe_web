import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_SEARCH_MAINTENANCE_TEMPLATE_START,
  searchMaintenanceTemplateFailed,
  searchMaintenanceTemplateSuccess,
} from '../../actions/maintenance-template'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchMaintenanceTemplateApi = (params) => {
  const uri = `/v1/mms/maintenance-templates`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchMaintenanceTemplate(action) {
  try {
    const response = yield call(searchMaintenanceTemplateApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchMaintenanceTemplateSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(searchMaintenanceTemplateFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchMaintenanceTemplateFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchMaintenanceTemplate() {
  yield takeLatest(
    MMSX_SEARCH_MAINTENANCE_TEMPLATE_START,
    doSearchMaintenanceTemplate,
  )
}
