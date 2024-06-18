import { isEmpty } from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_UPDATE_ACCREDITATION_TEMPLATE_START,
  updateAccreditationTemplateFailed,
  updateAccreditationTemplateSuccess,
} from '../../actions/accreditation-template'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateAccreditationTemplateApi = (params) => {
  const { files, fileUrls } = params
  const uri = `/v1/mms/accreditation-templates/${params.id}`
  const formData = new FormData()
  formData.append('data', JSON.stringify(params))
  if (!isEmpty(files)) {
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }
  }
  if (!isEmpty(fileUrls)) {
    formData.append('fileUrls', JSON.stringify(fileUrls))
  }
  return api.putMultiplePart(uri, formData)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateAccreditationTemplate(action) {
  try {
    const response = yield call(updateAccreditationTemplateApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateAccreditationTemplateSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateAccreditationTemplateFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateAccreditationTemplateFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateAccreditationTemplate() {
  yield takeLatest(
    MMSX_UPDATE_ACCREDITATION_TEMPLATE_START,
    doUpdateAccreditationTemplate,
  )
}
