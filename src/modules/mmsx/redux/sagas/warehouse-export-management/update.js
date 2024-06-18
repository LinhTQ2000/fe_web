import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateWarehouseExportManagementFail,
  updateWarehouseExportManagementSuccess,
  UPDATE_WAREHOUSE_EXPORT_REQUEST,
} from '../../actions/warehouse-export-management'

const callApiUpdateRequest = (params) => {
  const url = `v1/mms/warehouse-export-request/${params?.id}`
  return api.put(url, params)
}

function* doUpdateWarehouseExportManagementRequest(action) {
  try {
    const response = yield call(callApiUpdateRequest, action.payload)
    if (response.statusCode === 200) {
      yield put(updateWarehouseExportManagementSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateWarehouseExportManagementFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchUpdateWarehouseExportManagementRequest() {
  yield takeLatest(
    UPDATE_WAREHOUSE_EXPORT_REQUEST,
    doUpdateWarehouseExportManagementRequest,
  )
}
