import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  noteJobDetailFail,
  noteJobDetailSuccess,
  NOTE_JOB_DETAIL_START,
} from '../../actions/job'

const noteJobDetailApi = (params) => {
  const url = `v1/mms/jobs/${params.id}/reason`
  return api.put(url, params)
}

function* doNoteJobDetail(action) {
  try {
    const response = yield call(noteJobDetailApi, action.payload)
    if (response.statusCode === 200) {
      yield put(noteJobDetailSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(noteJobDetailFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(noteJobDetailFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchNoteJobDetail() {
  yield takeLatest(NOTE_JOB_DETAIL_START, doNoteJobDetail)
}
