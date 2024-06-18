import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  reworkJobFail,
  reworkJobSuccess,
  REWORK_JOB_START,
} from '../../actions/job'

const reworkJob = (params) => {
  const url = `v1/mms/jobs/${params}/rework`
  return api.put(url)
}

function* doRework(action) {
  try {
    const response = yield call(reworkJob, action.payload)
    if (response.statusCode === 200) {
      yield put(reworkJobSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(reworkJobFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(reworkJobFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchReworkJob() {
  yield takeLatest(REWORK_JOB_START, doRework)
}
