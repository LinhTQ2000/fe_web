import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateTimeJobFail,
  updateTimeJobSuccess,
  UPDATE_TIME_JOB_START,
} from '../../actions/job'

const updateTimeApi = (params) => {
  const url = `v1/mms/jobs/${params.id}/update-time`
  return api.put(url, params)
}

function* doUpdate(action) {
  try {
    const response = yield call(updateTimeApi, action.payload)
    if (response.statusCode === 200) {
      yield put(updateTimeJobSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateTimeJobFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateTimeJobFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateTimeJob() {
  yield takeLatest(UPDATE_TIME_JOB_START, doUpdate)
}
