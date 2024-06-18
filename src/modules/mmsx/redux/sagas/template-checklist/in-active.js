import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_IN_ACTIVE_TEMPLATE_CHECKLIST_START,
  inActiveTemplateChecklistFailed,
  inActiveTemplateChecklistSuccess,
} from '../../actions/template-checklist'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveTemplateChecklistApi = (params) => {
  const uri = `v1/mms/checklist-templates/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveTemplateChecklist(action) {
  try {
    const response = yield call(inActiveTemplateChecklistApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(inActiveTemplateChecklistSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveTemplateChecklistFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveTemplateChecklistFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveTemplateChecklist() {
  yield takeLatest(
    MMSX_IN_ACTIVE_TEMPLATE_CHECKLIST_START,
    doInActiveTemplateChecklist,
  )
}
