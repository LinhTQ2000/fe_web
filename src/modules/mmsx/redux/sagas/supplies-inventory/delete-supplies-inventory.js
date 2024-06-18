import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  DELETE_SUPPLIES_INVENTORY_START,
  deleteSuppliesInventorySuccess,
  deleteSuppliesInventoryFail,
} from '~/modules/mmsx/redux/actions/supplies-inventory'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteSuppliesInventoryApi = (params) => {
  const url = `v1/mms/update-inventory-ticket/${params}`
  return api.delete(url)
}

function* doDeleteSuppliesInventory(action) {
  try {
    const response = yield call(deleteSuppliesInventoryApi, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteSuppliesInventorySuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteSuppliesInventoryFail())
    }
  } catch (error) {
    yield put(deleteSuppliesInventoryFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteSuppliesInventory() {
  yield takeLatest(DELETE_SUPPLIES_INVENTORY_START, doDeleteSuppliesInventory)
}
