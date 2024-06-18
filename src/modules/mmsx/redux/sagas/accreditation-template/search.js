import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_SEARCH_ACCREDITATION_TEMPLATE_START,
  searchAccreditationTemplateFailed,
  searchAccreditationTemplateSuccess,
} from '../../actions/accreditation-template'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchAccreditationTemplateApi = (params) => {
  const uri = `/v1/mms/accreditation-templates`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchAccreditationTemplate(action) {
  try {
    const response = yield call(searchAccreditationTemplateApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchAccreditationTemplateSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(searchAccreditationTemplateFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchAccreditationTemplateFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchAccreditationTemplate() {
  yield takeLatest(
    MMSX_SEARCH_ACCREDITATION_TEMPLATE_START,
    doSearchAccreditationTemplate,
  )
}
