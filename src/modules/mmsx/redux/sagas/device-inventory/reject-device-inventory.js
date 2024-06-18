import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  REJECT_DEVICE_INVENTORY_START,
  rejectDeviceInventorySuccess,
  rejectDeviceInventoryFail,
} from '~/modules/mmsx/redux/actions/device-inventory'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectDeviceInventoryApi = (params) => {
  const url = `v1/mms/update-inventory-ticket/${params}/reject`
  return api.put(url)
}

function* doRejectDeviceInventory(action) {
  try {
    const response = yield call(rejectDeviceInventoryApi, action.payload)
    if (response.statusCode === 200) {
      yield put(rejectDeviceInventorySuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectDeviceInventoryFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchRejectDeviceInventory() {
  yield takeLatest(REJECT_DEVICE_INVENTORY_START, doRejectDeviceInventory)
}
