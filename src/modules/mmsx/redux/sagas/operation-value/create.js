import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_OPERATION_VALUE_CREATE_START,
  createOperationValueFail,
  createOperationValueSuccess,
} from '../../actions/operation-value'
const createOperationValueApi = (params) => {
  const url = `v1/mms/operation-value`
  return api.post(url, params)
}

function* doCreateOperationValue(action) {
  try {
    const response = yield call(createOperationValueApi, action.payload)
    if (response.statusCode === 200) {
      yield put(createOperationValueSuccess())

      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response.message)
    }
  } catch (error) {
    yield put(createOperationValueFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateOperationValue() {
  yield takeLatest(MMSX_OPERATION_VALUE_CREATE_START, doCreateOperationValue)
}
