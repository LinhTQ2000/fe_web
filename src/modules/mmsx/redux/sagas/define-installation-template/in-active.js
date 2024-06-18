import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_IN_ACTIVE_TEMPLATE_INSTALL_START,
  inActiveTemplateInstallFailed,
  inActiveTemplateInstallSuccess,
} from '../../actions/define-installation-template'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveTemplateInstallApi = (params) => {
  const uri = `v1/mms/installation-templates/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveTemplateInstall(action) {
  try {
    const response = yield call(inActiveTemplateInstallApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(inActiveTemplateInstallSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveTemplateInstallFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveTemplateInstallFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveTemplateInstall() {
  yield takeLatest(
    MMSX_IN_ACTIVE_TEMPLATE_INSTALL_START,
    doInActiveTemplateInstall,
  )
}
