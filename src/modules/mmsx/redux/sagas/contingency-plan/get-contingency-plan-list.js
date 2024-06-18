import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  GET_CONTINGENCY_PLAN_LIST_START,
  getContingencyPlanListSuccess,
  getContingencyPlanListFail,
} from '../../actions/contingency-plan'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

const getContingencyPlanList = (params) => {
  const url = `v1/mms/spare-part-plan`
  return api.get(url, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */

function* doGetContingencyPlanList(action) {
  try {
    const response = yield call(getContingencyPlanList, action?.payload)
    if (response.statusCode === 200) {
      yield put(getContingencyPlanListSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getContingencyPlanListFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetContingencyPlanList() {
  yield takeLatest(GET_CONTINGENCY_PLAN_LIST_START, doGetContingencyPlanList)
}
