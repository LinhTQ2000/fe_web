import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateJobStatusSuccess,
  updateJobStatusFaild,
  UPDATE_STATUS_JOB_START,
} from '~/modules/mmsx/redux/actions/job'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateJobStatus = (params) => {
  const url = `v1/mms/jobs/${params.id}/${params.action}`
  return api.put(url, params)
}

function* doUpdateJobStatus(action) {
  try {
    const response = yield call(updateJobStatus, action.payload)
    if (response.statusCode === 200) {
      yield put(updateJobStatusSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateJobStatusFaild())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateJobStatusFaild())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateJobStatus() {
  yield takeLatest(UPDATE_STATUS_JOB_START, doUpdateJobStatus)
}
