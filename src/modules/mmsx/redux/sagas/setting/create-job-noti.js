import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createSettingNotiJobFail,
  createSettingNotiJobSuccess,
  MMSX_CREATE_SETTING_NOTI_JOB_START,
} from '../../actions/setting'

const createSettingNotiJobApi = (params) => {
  const url = `v1/mms/setting/job`
  return api.post(url, params)
}

export const getSettingNotiJob = (params) => {
  const url = `v1/mms/setting/job/${params}`
  return api.get(url)
}

function* doCreateSettingNotiJob(action) {
  try {
    const response = yield call(createSettingNotiJobApi, action.payload)
    if (response.statusCode === 200) {
      yield put(createSettingNotiJobSuccess())

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createSettingNotiJobFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createSettingNotiJobFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateSettingNotiJob() {
  yield takeLatest(MMSX_CREATE_SETTING_NOTI_JOB_START, doCreateSettingNotiJob)
}
