import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  searchRepairRequestFailed,
  searchRepairRequestSuccess,
  SEARCH_REPAIR_REQUEST_START,
} from '../../actions/repair-request'

const searchRepairRequest = (params) => {
  const url = `v1/mms/repair-requests`
  return api.get(url, params)
}

function* doSearchRepairRequest(action) {
  try {
    const response = yield call(searchRepairRequest, action?.payload)

    if (response.statusCode === 200) {
      yield put(searchRepairRequestSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchRepairRequestFailed())
    if (action.onError) {
      yield action.onError
    }
  }
}

export default function* watchSearchRepairRequest() {
  yield takeLatest(SEARCH_REPAIR_REQUEST_START, doSearchRepairRequest)
}
