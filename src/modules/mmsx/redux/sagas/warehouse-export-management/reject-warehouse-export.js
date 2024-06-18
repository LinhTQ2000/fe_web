import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  REJECT_WAREHOUSE_EXPORT_REQUEST_START,
  rejectWarehouseExportManagementSuccess,
  rejectWarehouseExportManagementFail,
} from '~/modules/mmsx/redux/actions/warehouse-export-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const rejectWarehouseExportManagementApi = (params) => {
  const url = `v1/mms/warehouse-export-request/${params}/reject`
  return api.put(url)
}

function* doRejectWarehouseExportManagement(action) {
  try {
    const response = yield call(
      rejectWarehouseExportManagementApi,
      action.payload,
    )
    if (response.statusCode === 200) {
      yield put(rejectWarehouseExportManagementSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectWarehouseExportManagementFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchRejectWarehouseExportManagement() {
  yield takeLatest(
    REJECT_WAREHOUSE_EXPORT_REQUEST_START,
    doRejectWarehouseExportManagement,
  )
}
