import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  DELETE_CONTINGENCY_PLAN_START,
  deleteContingencyPlanSuccess,
  deleteContingencyPlanFail,
} from '~/modules/mmsx/redux/actions/contingency-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const deleteContingencyPlanApi = (params) => {
  const url = `v1/mms/spare-part-plan/${params}`
  return api.delete(url)
}

function* doDeleteContingencyPlan(action) {
  try {
    const response = yield call(deleteContingencyPlanApi, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteContingencyPlanSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteContingencyPlanFail())
    }
  } catch (error) {
    yield put(deleteContingencyPlanFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteContingencyPlan() {
  yield takeLatest(DELETE_CONTINGENCY_PLAN_START, doDeleteContingencyPlan)
}
