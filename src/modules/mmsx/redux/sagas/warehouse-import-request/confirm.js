import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  CONFIRM_WAREHOUSE_IMPORT_REQUEST_START,
  confirmWarehouseImportRequestSuccess,
  confirmWarehouseImportRequestFail,
} from '~/modules/mmsx/redux/actions/warehouse-import-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmWarehouseImportRequestApi = (params) => {
  const url = `v1/mms/warehouse-import-request/${params}/confirm`
  return api.put(url)
}

function* doComfirmWarehouseImportRequest(action) {
  try {
    const response = yield call(
      confirmWarehouseImportRequestApi,
      action.payload,
    )
    if (response.statusCode === 200) {
      yield put(confirmWarehouseImportRequestSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmWarehouseImportRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmWarehouseImportRequest() {
  yield takeLatest(
    CONFIRM_WAREHOUSE_IMPORT_REQUEST_START,
    doComfirmWarehouseImportRequest,
  )
}
