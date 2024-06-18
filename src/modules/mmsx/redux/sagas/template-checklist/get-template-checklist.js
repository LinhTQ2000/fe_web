import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getTemplateCheckListSuccess,
  getTemplateChecklistFail,
  GET_TEMPLATE_CHECKLIST_START,
} from '../../actions/template-checklist'

const getTemplateChecklistApi = (params) => {
  const url = `v1/mms/checklist-templates/${params}`
  return api.get(url)
}

function* doGetTemplateChecklist(action) {
  try {
    const response = yield call(getTemplateChecklistApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getTemplateCheckListSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getTemplateChecklistFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetTemplateChecklist() {
  yield takeLatest(GET_TEMPLATE_CHECKLIST_START, doGetTemplateChecklist)
}
