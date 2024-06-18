import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  REJECT_SUPPLIES_INVENTORY_START,
  rejectSuppliesInventorySuccess,
  rejectSuppliesInventoryFail,
} from '~/modules/mmsx/redux/actions/supplies-inventory'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectSuppliesInventoryApi = (params) => {
  const url = `v1/mms/update-inventory-ticket/${params}/reject`
  return api.put(url)
}

function* doRejectSuppliesInventory(action) {
  try {
    const response = yield call(rejectSuppliesInventoryApi, action.payload)
    if (response.statusCode === 200) {
      yield put(rejectSuppliesInventorySuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectSuppliesInventoryFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchRejectSuppliesInventory() {
  yield takeLatest(REJECT_SUPPLIES_INVENTORY_START, doRejectSuppliesInventory)
}
