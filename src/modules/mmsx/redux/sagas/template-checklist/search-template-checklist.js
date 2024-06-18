import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  searchTemplateChecklistFail,
  searchTemplateChecklistSuccess,
  SEARCH_TEMPLATE_CHECKLIST_START,
} from '../../actions/template-checklist'

export const searchTemplateListApi = (params) => {
  const url = `v1/mms/checklist-templates`
  return api.get(url, params)
}

function* doSearchTemplateChecklist(action) {
  try {
    const response = yield call(searchTemplateListApi, action.payload)
    if (response.statusCode === 200) {
      yield put(searchTemplateChecklistSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchTemplateChecklistFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchSearchTemplateChecklist() {
  yield takeLatest(SEARCH_TEMPLATE_CHECKLIST_START, doSearchTemplateChecklist)
}
