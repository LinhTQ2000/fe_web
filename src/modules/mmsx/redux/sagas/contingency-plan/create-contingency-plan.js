import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createContingencyPlanFail,
  createContingencyPlanSuccess,
  CREATE_CONTINGENCY_PLAN,
} from '~/modules/mmsx/redux/actions/contingency-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const callApiCreateContingencyPlan = (params) => {
  const url = `v1/mms/spare-part-plan`
  return api.post(url, params)
}

function* doCreateContingencyPlan(action) {
  try {
    const response = yield call(callApiCreateContingencyPlan, action.payload)
    if (response.statusCode === 200) {
      yield put(createContingencyPlanSuccess())
      if (action.onSuccess) yield action.onSuccess(response.data)

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createContingencyPlanFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchCreateContingencyPlan() {
  yield takeLatest(CREATE_CONTINGENCY_PLAN, doCreateContingencyPlan)
}
