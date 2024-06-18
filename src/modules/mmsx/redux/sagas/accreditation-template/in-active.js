import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_IN_ACTIVE_ACCREDITATION_TEMPLATE_START,
  inActiveAccreditationTemplateFailed,
  inActiveAccreditationTemplateSuccess,
} from '../../actions/accreditation-template'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveAccreditationTemplateApi = (params) => {
  const uri = `v1/mms/accreditation-templates/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveAccreditationTemplate(action) {
  try {
    const response = yield call(
      inActiveAccreditationTemplateApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(inActiveAccreditationTemplateSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveAccreditationTemplateFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveAccreditationTemplateFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveAccreditationTemplate() {
  yield takeLatest(
    MMSX_IN_ACTIVE_ACCREDITATION_TEMPLATE_START,
    doInActiveAccreditationTemplate,
  )
}