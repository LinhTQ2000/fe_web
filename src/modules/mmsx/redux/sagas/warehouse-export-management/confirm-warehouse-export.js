import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  CONFIRM_WAREHOUSE_EXPORT_REQUEST_START,
  confirmWarehouseExportManagementSuccess,
  confirmWarehouseExportManagementFail,
} from '~/modules/mmsx/redux/actions/warehouse-export-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const confirmWarehouseExportManagementApi = (params) => {
  const url = `v1/mms/warehouse-export-request/${params}/confirm`
  return api.put(url)
}

function* doComfirmWarehouseExportManagement(action) {
  try {
    const response = yield call(
      confirmWarehouseExportManagementApi,
      action.payload,
    )
    if (response.statusCode === 200) {
      yield put(confirmWarehouseExportManagementSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmWarehouseExportManagementFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmWarehouseExportManagement() {
  yield takeLatest(
    CONFIRM_WAREHOUSE_EXPORT_REQUEST_START,
    doComfirmWarehouseExportManagement,
  )
}
