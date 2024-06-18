import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  DELETE_WAREHOUSE_IMPORT_TICKET_START,
  deleteWarehouseImportManagementSuccess,
  deleteWarehouseImportManagementFail,
} from '~/modules/mmsx/redux/actions/warehouse-import-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteWarehouseImportManagementApi = (params) => {
  const url = `v1/mms/warehouse-import/${params}`
  return api.delete(url)
}

function* doDeleteWarehouseImportManagement(action) {
  try {
    const response = yield call(
      deleteWarehouseImportManagementApi,
      action.payload,
    )
    if (response.statusCode === 200) {
      yield put(deleteWarehouseImportManagementSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteWarehouseImportManagementFail())
    }
  } catch (error) {
    yield put(deleteWarehouseImportManagementFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteWarehouseImportManagement() {
  yield takeLatest(
    DELETE_WAREHOUSE_IMPORT_TICKET_START,
    doDeleteWarehouseImportManagement,
  )
}
