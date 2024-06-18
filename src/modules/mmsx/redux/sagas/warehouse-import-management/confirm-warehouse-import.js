import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  CONFIRM_WAREHOUSE_IMPORT_TICKET_START,
  confirmWarehouseImportManagementSuccess,
  confirmWarehouseImportManagementFail,
} from '~/modules/mmsx/redux/actions/warehouse-import-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmWarehouseImportManagementApi = (params) => {
  const url = `v1/mms/warehouse-import/${params}/confirm`
  return api.put(url)
}

function* doComfirmWarehouseImportManagement(action) {
  try {
    const response = yield call(
      confirmWarehouseImportManagementApi,
      action.payload,
    )
    if (response.statusCode === 200) {
      yield put(confirmWarehouseImportManagementSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmWarehouseImportManagementFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmWarehouseImportManagement() {
  yield takeLatest(
    CONFIRM_WAREHOUSE_IMPORT_TICKET_START,
    doComfirmWarehouseImportManagement,
  )
}
