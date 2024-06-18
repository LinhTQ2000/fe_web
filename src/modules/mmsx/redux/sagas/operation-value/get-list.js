import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_OPERATION_VALUE_LIST_START,
  getListOperationValueFail,
  getListOperationValueSuccess,
} from '../../actions/operation-value'

export const getListOperationValue = (params) => {
  const url = `v1/mms/operation-value`
  return api.get(url, params)
}

function* dogetListOperationValue(action) {
  try {
    const response = yield call(getListOperationValue, action?.payload)

    if (response.statusCode === 200) {
      yield put(getListOperationValueSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getListOperationValueFail())
    if (action.onError) {
      yield action.onError
    }
  }
}

export default function* watchgetListOperationValue() {
  yield takeLatest(MMSX_OPERATION_VALUE_LIST_START, dogetListOperationValue)
}
