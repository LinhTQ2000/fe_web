import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  DELETE_WAREHOUSE_IMPORT_REQUEST_START,
  deleteWarehouseImportRequestSuccess,
  deleteWarehouseImportRequestFail,
} from '~/modules/mmsx/redux/actions/warehouse-import-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const deleteWarehouseImportRequestApi = (params) => {
  const url = `v1/mms/warehouse-import-request/${params}`
  return api.delete(url)
}

function* doDeleteWarehouseImportRequest(action) {
  try {
    const response = yield call(deleteWarehouseImportRequestApi, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteWarehouseImportRequestSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteWarehouseImportRequestFail())
    }
  } catch (error) {
    yield put(deleteWarehouseImportRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteWarehouseImportRequest() {
  yield takeLatest(
    DELETE_WAREHOUSE_IMPORT_REQUEST_START,
    doDeleteWarehouseImportRequest,
  )
}
