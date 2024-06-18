import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  DELETE_WAREHOUSE_EXPORT_REQUEST_START,
  deleteWarehouseExportManagementSuccess,
  deleteWarehouseExportManagementFail,
} from '~/modules/mmsx/redux/actions/warehouse-export-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const deleteWarehouseExportManagementApi = (params) => {
  const url = `v1/mms/warehouse-export-request/${params}`
  return api.delete(url)
}

function* doDeleteWarehouseExportManagement(action) {
  try {
    const response = yield call(
      deleteWarehouseExportManagementApi,
      action.payload,
    )
    if (response.statusCode === 200) {
      yield put(deleteWarehouseExportManagementSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteWarehouseExportManagementFail())
    }
  } catch (error) {
    yield put(deleteWarehouseExportManagementFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteWarehouseExportManagement() {
  yield takeLatest(
    DELETE_WAREHOUSE_EXPORT_REQUEST_START,
    doDeleteWarehouseExportManagement,
  )
}
