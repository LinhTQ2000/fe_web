import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  assignJobSuccess,
  assignJobFail,
  ASSIGN_JOB_START,
} from '~/modules/mmsx/redux/actions/job'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const assignJob = (params) => {
  const url = `v1/mms/jobs/${params.id}/assignments`
  return api.put(url, params)
}

function* doUpdate(action) {
  try {
    const response = yield call(assignJob, action.payload)
    if (response.statusCode === 200) {
      yield put(assignJobSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(assignJobFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(assignJobFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchAssignJob() {
  yield takeLatest(ASSIGN_JOB_START, doUpdate)
}
