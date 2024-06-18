import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  CONFIRM_SUPPLIES_INVENTORY_START,
  confirmSuppliesInventorySuccess,
  confirmSuppliesInventoryFail,
} from '~/modules/mmsx/redux/actions/supplies-inventory'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmSuppliesInventoryApi = (params) => {
  const url = `v1/mms/update-inventory-ticket/${params}/confirm`
  return api.put(url)
}

function* doComfirmSuppliesInventory(action) {
  try {
    const response = yield call(confirmSuppliesInventoryApi, action.payload)
    if (response.statusCode === 200) {
      yield put(confirmSuppliesInventorySuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmSuppliesInventoryFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmSuppliesInventory() {
  yield takeLatest(CONFIRM_SUPPLIES_INVENTORY_START, doComfirmSuppliesInventory)
}
