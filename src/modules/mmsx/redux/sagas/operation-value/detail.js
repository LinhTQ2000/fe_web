import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_OPERATION_VALUE_DETAIL_START,
  getDetailOperationValueFail,
  getDetailOperationValueSuccess,
} from '../../actions/operation-value'

const getOperationValueDetail = (params) => {
  const url = `v1/mms/operation-value/${params?.factoryId}`
  return api.get(url, params)
}

function* dogetOperationValueDetail(action) {
  try {
    const response = yield call(getOperationValueDetail, action.payload)
    if (response.statusCode === 200) {
      yield put(getDetailOperationValueSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(getDetailOperationValueFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailOperationValueFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchgetOperationValueDetail() {
  yield takeLatest(MMSX_OPERATION_VALUE_DETAIL_START, dogetOperationValueDetail)
}
