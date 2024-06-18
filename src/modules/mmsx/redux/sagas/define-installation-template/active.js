import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeTemplateInstallFailed,
  activeTemplateInstallSuccess,
  MMSX_ACTIVE_TEMPLATE_INSTALL_START,
} from '../../actions/define-installation-template'

/**
 * Search user API
 * @returns {Promise}
 */
const activeTemplateInstallApi = (params) => {
  const uri = `v1/mms/installation-templates/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveTemplateInstall(action) {
  try {
    const response = yield call(activeTemplateInstallApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeTemplateInstallSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeTemplateInstallFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeTemplateInstallFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveTemplateInstall() {
  yield takeLatest(MMSX_ACTIVE_TEMPLATE_INSTALL_START, doActiveTemplateInstall)
}
