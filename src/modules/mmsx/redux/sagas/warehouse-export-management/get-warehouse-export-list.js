import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getWarehouseExportManagementListFail,
  getWarehouseExportManagementListSuccess,
  GET_WAREHOUSE_EXPORT_REQUEST_LIST_START,
} from '~/modules/mmsx/redux/actions/warehouse-export-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

export const getWarehouseExportManagementListApi = (params) => {
  const url = `v1/mms/warehouse-export-request`
  return api.get(url, params)
}

function* doGetWarehouseExportManagementList(action) {
  try {
    const response = yield call(
      getWarehouseExportManagementListApi,
      action?.payload,
    )

    if (response.statusCode === 200) {
      yield put(getWarehouseExportManagementListSuccess(response?.data))

      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(getWarehouseExportManagementListFail())
    }
  } catch (error) {
    yield put(getWarehouseExportManagementListFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetWarehouseExportManagementList() {
  yield takeLatest(
    GET_WAREHOUSE_EXPORT_REQUEST_LIST_START,
    doGetWarehouseExportManagementList,
  )
}
