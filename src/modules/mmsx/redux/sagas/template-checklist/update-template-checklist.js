import { isEmpty } from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateTemplateChecklistSuccess,
  updateTemplateChecklistFail,
  UPDATE_TEMPLATE_CHECKLIST_START,
} from '../../actions/template-checklist'

const updateTemplateChecklistApi = (params) => {
  const { files, fileUrls } = params
  const url = `v1/mms/checklist-templates/${params.id}`
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
  return api.putMultiplePart(url, formData)
}

function* doUpdateTemplateChecklist(action) {
  try {
    const response = yield call(updateTemplateChecklistApi, action.payload)
    if (response.statusCode === 200) {
      yield put(updateTemplateChecklistSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateTemplateChecklistFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchUpdateTemplateChecklist() {
  yield takeLatest(UPDATE_TEMPLATE_CHECKLIST_START, doUpdateTemplateChecklist)
}
