import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createRepairRequestFailed,
  createRepairRequestSuccess,
  CREATE_REPAIR_REQUEST_START,
} from '../../actions/repair-request'

const createRepairRequestApi = (params) => {
  const url = `v1/mms/repair-requests`
  return api.post(url, params)
}

function* doCreateRepairRequest(action) {
  try {
    const response = yield call(createRepairRequestApi, action.payload)
    if (response.statusCode === 200) {
      yield put(createRepairRequestSuccess())

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createRepairRequestFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createRepairRequestFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateRepairRequest() {
  yield takeLatest(CREATE_REPAIR_REQUEST_START, doCreateRepairRequest)
}
