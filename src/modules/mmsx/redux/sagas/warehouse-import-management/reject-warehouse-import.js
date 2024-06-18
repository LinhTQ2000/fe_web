import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  REJECT_WAREHOUSE_IMPORT_TICKET_START,
  rejectWarehouseImportManagementSuccess,
  rejectWarehouseImportManagementFail,
} from '~/modules/mmsx/redux/actions/warehouse-import-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectWarehouseImportManagementApi = (params) => {
  const url = `v1/mms/warehouse-import/${params}/reject`
  return api.put(url)
}

function* doRejectWarehouseImportManagement(action) {
  try {
    const response = yield call(
      rejectWarehouseImportManagementApi,
      action.payload,
    )
    if (response.statusCode === 200) {
      yield put(rejectWarehouseImportManagementSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectWarehouseImportManagementFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchRejectWarehouseImportManagement() {
  yield takeLatest(
    REJECT_WAREHOUSE_IMPORT_TICKET_START,
    doRejectWarehouseImportManagement,
  )
}
