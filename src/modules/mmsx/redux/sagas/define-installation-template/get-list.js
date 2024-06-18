import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getListTemplateInstallSuccess,
  getListTemplateInstallFail,
  GET_LIST_TEMPLATE_INSTALL_START,
} from '../../actions/define-installation-template'
export const searchInstallationTemplateApi = (params) => {
  const url = `v1/mms/installation-templates`
  return api.get(url, params)
}

function* doSearchTemplateInstall(action) {
  try {
    const response = yield call(searchInstallationTemplateApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getListTemplateInstallSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getListTemplateInstallFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchSearchTemplateInstall() {
  yield takeLatest(GET_LIST_TEMPLATE_INSTALL_START, doSearchTemplateInstall)
}
