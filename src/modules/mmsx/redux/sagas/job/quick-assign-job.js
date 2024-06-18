import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  quickAssignJobFail,
  quickAssignJobSuccess,
  QUICK_ASSIGN_JOB_START,
} from '../../actions/job'

const quickAssignJob = (params) => {
  const url = `v1/mms/jobs/quick-assign`
  return api.put(url, params)
}

function* doUpdate(action) {
  try {
    const response = yield call(quickAssignJob, action.payload)
    if (response.statusCode === 200) {
      yield put(quickAssignJobSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(quickAssignJobFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(quickAssignJobFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchQuickAssignJob() {
  yield takeLatest(QUICK_ASSIGN_JOB_START, doUpdate)
}
