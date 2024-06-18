import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  confirmContingencyPlanSuccess,
  confirmContingencyPlanFail,
  CONFIRM_CONTINGENCY_PLAN_START,
} from '../../actions/contingency-plan'

const confirmApi = (params) => {
  const url = `v1/mms/spare-part-plan/${params}/confirm`
  return api.put(url)
}

function* doConfirm(action) {
  try {
    const response = yield call(confirmApi, action.payload)
    if (response.statusCode === 200) {
      yield put(confirmContingencyPlanSuccess())
      if (action.onSuccess) yield action.onSuccess()
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmContingencyPlanFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmContingencyPlan() {
  yield takeLatest(CONFIRM_CONTINGENCY_PLAN_START, doConfirm)
}
