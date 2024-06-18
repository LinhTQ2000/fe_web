import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getJobSuppliesFail,
  getJobSuppliesSuccess,
  GET_JOB_SUPPLIES_START,
} from '../../actions/job'

const getJobSupplies = (params) => {
  let url = `v1/mms/jobs/${params?.id}/supplies/${params?.warehouseId}`
  return api.get(url)
}

function* doGetJobSupplies(action) {
  try {
    const response = yield call(getJobSupplies, action.payload)
    if (response.statusCode === 200) {
      yield put(getJobSuppliesSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      yield put(getJobSuppliesFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(getJobSuppliesFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetjobSupplies() {
  yield takeLatest(GET_JOB_SUPPLIES_START, doGetJobSupplies)
}
