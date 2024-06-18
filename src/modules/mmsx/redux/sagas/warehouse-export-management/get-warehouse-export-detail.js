import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getWarehouseExportManagementDetailFail,
  getWarehouseExportManagementDetailSuccess,
  GET_WAREHOUSE_EXPORT_REQUEST_DETAIL_START,
} from '~/modules/mmsx/redux/actions/warehouse-export-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
export const getWarehouseExportManagementDetailApi = (params) => {
  const url = `v1/mms/warehouse-export-request/${params}`
  return api.get(url)
}

function* doGetWarehouseExportManagementDetail(action) {
  try {
    const response = yield call(
      getWarehouseExportManagementDetailApi,
      action.payload,
    )

    if (response.statusCode === 200) {
      yield put(getWarehouseExportManagementDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseExportManagementDetailFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetWarehouseExportManagementDetail() {
  yield takeLatest(
    GET_WAREHOUSE_EXPORT_REQUEST_DETAIL_START,
    doGetWarehouseExportManagementDetail,
  )
}
