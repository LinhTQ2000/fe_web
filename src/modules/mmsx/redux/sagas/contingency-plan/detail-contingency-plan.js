import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  GET_CONTINGENCY_PLAN_DETAIL_START,
  getContingencyPlanDetailSuccess,
  getContingencyPlanDetailFail,
} from '../../actions/contingency-plan'
const getContingencyPlanList = (id) => {
  const url = `v1/mms/spare-part-plan/${id}`
  return api.get(url)
}

function* doGetContingencyPlanDetail(action) {
  try {
    const response = yield call(getContingencyPlanList, action?.payload)
    if (response.statusCode === 200) {
      yield put(getContingencyPlanDetailSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getContingencyPlanDetailFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetContingencyPlanDetail() {
  yield takeLatest(
    GET_CONTINGENCY_PLAN_DETAIL_START,
    doGetContingencyPlanDetail,
  )
}
