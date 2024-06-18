import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  CONFIRM_DEVICE_INVENTORY_START,
  confirmDeviceInventorySuccess,
  confirmDeviceInventoryFail,
} from '~/modules/mmsx/redux/actions/device-inventory'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmDeviceInventoryApi = (params) => {
  const url = `v1/mms/update-inventory-ticket/${params}/confirm`
  return api.put(url)
}

function* doComfirmDeviceInventory(action) {
  try {
    const response = yield call(confirmDeviceInventoryApi, action.payload)
    if (response.statusCode === 200) {
      yield put(confirmDeviceInventorySuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmDeviceInventoryFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmDeviceInventory() {
  yield takeLatest(CONFIRM_DEVICE_INVENTORY_START, doComfirmDeviceInventory)
}
