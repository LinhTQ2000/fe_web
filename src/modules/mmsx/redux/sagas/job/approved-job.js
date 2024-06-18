import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  approvedJobFail,
  approvedJobSuccess,
  APPROVED_JOB_START,
} from '../../actions/job'

const approvedJob = (params) => {
  const url = `v1/mms/jobs/${params.id}/approve`
  return api.put(url, params)
}

function* doApproved(action) {
  try {
    const response = yield call(approvedJob, action.payload)
    if (response.statusCode === 200) {
      yield put(approvedJobSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(approvedJobFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(approvedJobFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchApprovedJob() {
  yield takeLatest(APPROVED_JOB_START, doApproved)
}
