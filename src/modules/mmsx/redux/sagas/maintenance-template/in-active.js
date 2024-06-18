import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_IN_ACTIVE_MAINTENANCE_TEMPLATE_START,
  inActiveMaintenanceTemplateFailed,
  inActiveMaintenanceTemplateSuccess,
} from '../../actions/maintenance-template'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveMaintenanceTemplateApi = (params) => {
  const uri = `v1/mms/maintenance-templates/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveMaintenanceTemplate(action) {
  try {
    const response = yield call(inActiveMaintenanceTemplateApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(inActiveMaintenanceTemplateSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveMaintenanceTemplateFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveMaintenanceTemplateFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveMaintenanceTemplate() {
  yield takeLatest(
    MMSX_IN_ACTIVE_MAINTENANCE_TEMPLATE_START,
    doInActiveMaintenanceTemplate,
  )
}
