import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getWarehouseImportManagementDetailFail,
  getWarehouseImportManagementDetailSuccess,
  GET_WAREHOUSE_IMPORT_TICKET_DETAIL_START,
} from '~/modules/mmsx/redux/actions/warehouse-import-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const getWarehouseImportManagementDetailApi = (params) => {
  const url = `v1/mms/warehouse-import/${params}`
  return api.get(url)
}

function* doGetWarehouseImportManagementDetail(action) {
  try {
    const response = yield call(
      getWarehouseImportManagementDetailApi,
      action.payload,
    )

    if (response.statusCode === 200) {
      yield put(getWarehouseImportManagementDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseImportManagementDetailFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetWarehouseImportManagementDetail() {
  yield takeLatest(
    GET_WAREHOUSE_IMPORT_TICKET_DETAIL_START,
    doGetWarehouseImportManagementDetail,
  )
}
