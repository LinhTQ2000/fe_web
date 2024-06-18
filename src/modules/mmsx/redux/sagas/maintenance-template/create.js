import { isEmpty } from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createMaintenanceTemplateFailed,
  createMaintenanceTemplateSuccess,
  MMSX_CREATE_MAINTENANCE_TEMPLATE_START,
} from '../../actions/maintenance-template'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createMaintenanceTemplateApi = (params) => {
  const { files } = params
  const uri = `/v1/mms/maintenance-templates`
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
function* doCreateMaintenanceTemplate(action) {
  try {
    const response = yield call(createMaintenanceTemplateApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createMaintenanceTemplateSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )
      yield put(createMaintenanceTemplateFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createMaintenanceTemplateFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateMaintenanceTemplate() {
  yield takeLatest(
    MMSX_CREATE_MAINTENANCE_TEMPLATE_START,
    doCreateMaintenanceTemplate,
  )
}
