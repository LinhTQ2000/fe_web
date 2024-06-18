import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  REJECT_WAREHOUSE_IMPORT_REQUEST_START,
  rejectWarehouseImportRequestSuccess,
  rejectWarehouseImportRequestFail,
} from '~/modules/mmsx/redux/actions/warehouse-import-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const rejectWarehouseImportRequestApi = (params) => {
  const url = `v1/mms/warehouse-import-request/${params}/reject`
  return api.put(url)
}

function* doRejectWarehouseImportRequest(action) {
  try {
    const response = yield call(rejectWarehouseImportRequestApi, action.payload)
    if (response.statusCode === 200) {
      yield put(rejectWarehouseImportRequestSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectWarehouseImportRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchRejectWarehouseImportRequest() {
  yield takeLatest(
    REJECT_WAREHOUSE_IMPORT_REQUEST_START,
    doRejectWarehouseImportRequest,
  )
}
