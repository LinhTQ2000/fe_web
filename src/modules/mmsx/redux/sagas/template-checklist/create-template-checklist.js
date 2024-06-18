import { isEmpty } from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createTemplateChecklistFail,
  createTemplateChecklistSuccess,
  CREATE_TEMPLATE_CHECKLIST_START,
} from '../../actions/template-checklist'

const createTemplateChecklist = (params) => {
  const { files } = params
  const url = `v1/mms/checklist-templates`
  const formData = new FormData()
  formData.append('data', JSON.stringify(params))
  if (!isEmpty(files)) {
    for (let i = 0; i < files.length; i++) {
      formData.append(`files`, files[i])
    }
  }
  return api.postMultiplePart(url, formData)
}

function* doCreateTemplateChecklist(action) {
  try {
    const response = yield call(createTemplateChecklist, action.payload)
    if (response.statusCode === 200) {
      yield put(createTemplateChecklistSuccess())
      if (action.onSuccess) yield action.onSuccess(response.data)

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createTemplateChecklistFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(createTemplateChecklistFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchCreateTemplateChecklist() {
  yield takeLatest(CREATE_TEMPLATE_CHECKLIST_START, doCreateTemplateChecklist)
}
