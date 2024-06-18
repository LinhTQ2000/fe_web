import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createWarehouseExportManagementFail,
  createWarehouseExportManagementSuccess,
  CREATE_WAREHOUSE_EXPORT_REQUEST,
} from '~/modules/mmsx/redux/actions/warehouse-export-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const callApiCreateRequest = (params) => {
  const url = `v1/mms/warehouse-export-request`
  return api.post(url, params)
}

function* doCreateWarehouseExportManagementRequest(action) {
  try {
    const response = yield call(callApiCreateRequest, action.payload)
    if (response.statusCode === 200) {
      yield put(createWarehouseExportManagementSuccess())
      if (action.onSuccess) yield action.onSuccess(response.data)

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createWarehouseExportManagementFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchCreateWarehouseExportManagementRequest() {
  yield takeLatest(
    CREATE_WAREHOUSE_EXPORT_REQUEST,
    doCreateWarehouseExportManagementRequest,
  )
}
