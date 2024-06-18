import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeAccreditationTemplateFailed,
  activeAccreditationTemplateSuccess,
  MMSX_ACTIVE_ACCREDITATION_TEMPLATE_START,
} from '../../actions/accreditation-template'

/**
 * Search user API
 * @returns {Promise}
 */
const activeAccreditationTemplateApi = (params) => {
  const uri = `v1/mms/accreditation-templates/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveAccreditationTemplate(action) {
  try {
    const response = yield call(activeAccreditationTemplateApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeAccreditationTemplateSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeAccreditationTemplateFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeAccreditationTemplateFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveAccreditationTemplate() {
  yield takeLatest(
    MMSX_ACTIVE_ACCREDITATION_TEMPLATE_START,
    doActiveAccreditationTemplate,
  )
}
