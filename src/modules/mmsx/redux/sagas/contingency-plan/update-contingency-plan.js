import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  UPDATE_CONTINGENCY_PLAN,
  updateContingencyPlanFail,
  updateContingencyPlanSuccess,
} from '~/modules/mmsx/redux/actions/contingency-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

// update
const updateContingencyPlanApi = (params) => {
  const url = `v1/mms/spare-part-plan/${params.id}`
  return api.put(url, params)
}

function* doUpdateContingencyPlan(action) {
  try {
    const response = yield call(updateContingencyPlanApi, action.payload)
    if (response.statusCode === 200) {
      yield put(updateContingencyPlanSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateContingencyPlanFail())
    }
  } catch (error) {
    yield put(updateContingencyPlanFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchUpdateContingencyPlan() {
  yield takeLatest(UPDATE_CONTINGENCY_PLAN, doUpdateContingencyPlan)
}
