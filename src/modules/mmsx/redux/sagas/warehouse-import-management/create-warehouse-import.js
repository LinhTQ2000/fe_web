import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createWarehouseImportManagementFail,
  createWarehouseImportManagementSuccess,
  CREATE_WAREHOUSE_IMPORT_TICKET,
} from '~/modules/mmsx/redux/actions/warehouse-import-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const callApiCreateRequest = (params) => {
  const url = `v1/mms/warehouse-import`
  return api.post(url, params)
}

function* doCreateWarehouseImportManagementRequest(action) {
  try {
    const response = yield call(callApiCreateRequest, action.payload)
    if (response.statusCode === 200) {
      yield put(createWarehouseImportManagementSuccess())
      if (action.onSuccess) yield action.onSuccess(response.data)

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createWarehouseImportManagementFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchCreateWarehouseImportManagementRequest() {
  yield takeLatest(
    CREATE_WAREHOUSE_IMPORT_TICKET,
    doCreateWarehouseImportManagementRequest,
  )
}
