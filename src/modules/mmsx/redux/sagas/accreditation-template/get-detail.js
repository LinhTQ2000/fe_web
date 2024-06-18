import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_GET_DETAIL_ACCREDITATION_TEMPLATE_START,
  getDetailAccreditationTemplateFailed,
  getDetailAccreditationTemplateSuccess,
} from '../../actions/accreditation-template'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getAccreditationTemplateDetailsApi = (params) => {
  const uri = `/v1/mms/accreditation-templates/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetAccreditationTemplateDetails(action) {
  try {
    const response = yield call(
      getAccreditationTemplateDetailsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getDetailAccreditationTemplateSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getDetailAccreditationTemplateFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailAccreditationTemplateFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetAccreditationTemplateDetails() {
  yield takeLatest(
    MMSX_GET_DETAIL_ACCREDITATION_TEMPLATE_START,
    doGetAccreditationTemplateDetails,
  )
}
