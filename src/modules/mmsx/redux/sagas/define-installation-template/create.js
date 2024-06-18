import { isEmpty } from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createTemplateInstallFail,
  createTemplateInstallSuccess,
  CREATE_TEMPLATE_INSTALL_START,
} from '../../actions/define-installation-template'

const getApiUrl = (params) => {
  const { files } = params
  const url = `v1/mms/installation-templates`
  const formData = new FormData()
  formData.append('data', JSON.stringify(params))
  if (!isEmpty(files)) {
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }
  }
  return api.postMultiplePart(url, formData)
}

function* doCreateTemplateInstall(action) {
  try {
    const response = yield call(getApiUrl, action.payload)
    if (response.statusCode === 200) {
      yield put(createTemplateInstallSuccess())
      if (action.onSuccess) yield action.onSuccess(response.data)

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createTemplateInstallFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchCreateTemplateInstall() {
  yield takeLatest(CREATE_TEMPLATE_INSTALL_START, doCreateTemplateInstall)
}
