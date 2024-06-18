import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeTemplateChecklistFailed,
  activeTemplateChecklistSuccess,
  MMSX_ACTIVE_TEMPLATE_CHECKLIST_START,
} from '../../actions/template-checklist'

/**
 * Search user API
 * @returns {Promise}
 */
const activeTemplateChecklistApi = (params) => {
  const uri = `v1/mms/checklist-templates/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveTemplateChecklist(action) {
  try {
    const response = yield call(activeTemplateChecklistApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeTemplateChecklistSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeTemplateChecklistFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeTemplateChecklistFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveTemplateChecklist() {
  yield takeLatest(
    MMSX_ACTIVE_TEMPLATE_CHECKLIST_START,
    doActiveTemplateChecklist,
  )
}
