import { isEmpty } from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createAccreditationTemplateFailed,
  createAccreditationTemplateSuccess,
  MMSX_CREATE_ACCREDITATION_TEMPLATE_START,
} from '../../actions/accreditation-template'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createAccreditationTemplateApi = (params) => {
  const { files } = params
  const uri = `/v1/mms/accreditation-templates`
  const formData = new FormData()
  formData.append('data', JSON.stringify(params))
  if (!isEmpty(files)) {
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }
  }
  return api.postMultiplePart(uri, formData)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateAccreditationTemplate(action) {
  try {
    const response = yield call(createAccreditationTemplateApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createAccreditationTemplateSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createAccreditationTemplateFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createAccreditationTemplateFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateAccreditationTemplate() {
  yield takeLatest(
    MMSX_CREATE_ACCREDITATION_TEMPLATE_START,
    doCreateAccreditationTemplate,
  )
}
