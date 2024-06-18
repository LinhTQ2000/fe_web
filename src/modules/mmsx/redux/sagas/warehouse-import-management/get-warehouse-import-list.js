import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getWarehouseImportManagementListFail,
  getWarehouseImportManagementListSuccess,
  GET_WAREHOUSE_IMPORT_TICKET_LIST_START,
} from '~/modules/mmsx/redux/actions/warehouse-import-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const getWarehouseImportManagementListApi = (params) => {
  const url = `v1/mms/warehouse-import`
  return api.get(url, params)
}

function* doGetWarehouseImportManagementList(action) {
  try {
    const response = yield call(
      getWarehouseImportManagementListApi,
      action?.payload,
    )

    if (response.statusCode === 200) {
      yield put(getWarehouseImportManagementListSuccess(response?.data))

      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(getWarehouseImportManagementListFail())
    }
  } catch (error) {
    yield put(getWarehouseImportManagementListFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetWarehouseImportManagementList() {
  yield takeLatest(
    GET_WAREHOUSE_IMPORT_TICKET_LIST_START,
    doGetWarehouseImportManagementList,
  )
}
