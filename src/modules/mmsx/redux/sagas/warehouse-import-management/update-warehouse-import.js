import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  UPDATE_WAREHOUSE_IMPORT_TICKET,
  updateWarehouseImportManagementFail,
  updateWarehouseImportManagementSuccess,
} from '~/modules/mmsx/redux/actions/warehouse-import-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const callApiUpdateWarehouseImportManagement = (params) => {
  const url = `v1/mms/warehouse-import/${params.id}`
  return api.put(url, params)
}

function* doUpdateWarehouseImportManagement(action) {
  try {
    const response = yield call(
      callApiUpdateWarehouseImportManagement,
      action.payload,
    )
    if (response.statusCode === 200) {
      yield put(updateWarehouseImportManagementSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateWarehouseImportManagementFail())
    }
  } catch (error) {
    yield put(updateWarehouseImportManagementFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchUpdateWarehouseImportManagement() {
  yield takeLatest(
    UPDATE_WAREHOUSE_IMPORT_TICKET,
    doUpdateWarehouseImportManagement,
  )
}
