import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeMaintenanceTemplateFailed,
  activeMaintenanceTemplateSuccess,
  MMSX_ACTIVE_MAINTENANCE_TEMPLATE_START,
} from '../../actions/maintenance-template'

/**
 * Search user API
 * @returns {Promise}
 */
const activeMaintenanceTemplateApi = (params) => {
  const uri = `v1/mms/maintenance-templates/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveMaintenanceTemplate(action) {
  try {
    const response = yield call(activeMaintenanceTemplateApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeMaintenanceTemplateSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeMaintenanceTemplateFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeMaintenanceTemplateFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveMaintenanceTemplate() {
  yield takeLatest(
    MMSX_ACTIVE_MAINTENANCE_TEMPLATE_START,
    doActiveMaintenanceTemplate,
  )
}
