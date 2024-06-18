import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  rejectContingencyPlanSuccess,
  rejectContingencyPlanFail,
  REJECT_CONTINGENCY_PLAN_START,
} from '../../actions/contingency-plan'
const rejectContingencyPlanApi = (params) => {
  const url = `v1/mms/spare-part-plan/${params}/reject`
  return api.put(url, params)
}

function* doReject(action) {
  try {
    const response = yield call(rejectContingencyPlanApi, action.payload)
    if (response.statusCode === 200) {
      yield put(rejectContingencyPlanSuccess())
      if (action.onSuccess) yield action.onSuccess()
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectContingencyPlanFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchRejectContingencyPlan() {
  yield takeLatest(REJECT_CONTINGENCY_PLAN_START, doReject)
}
