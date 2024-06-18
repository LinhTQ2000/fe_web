import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_OPERATION_VALUE_EDIT_START,
  updateOperationValueFail,
  updateOperationValueSuccess,
} from '../../actions/operation-value'
const updateOperationValueApi = (params) => {
  const url = `v1/mms/operation-value/${params.id}`
  return api.put(url, params)
}

function* doUpdateOperationValue(action) {
  try {
    const response = yield call(updateOperationValueApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(updateOperationValueSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateOperationValueFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateOperationValueFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateOperationValue() {
  yield takeLatest(MMSX_OPERATION_VALUE_EDIT_START, doUpdateOperationValue)
}
