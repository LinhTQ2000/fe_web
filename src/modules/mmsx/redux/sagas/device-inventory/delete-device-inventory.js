import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  DELETE_DEVICE_INVENTORY_START,
  deleteDeviceInventorySuccess,
  deleteDeviceInventoryFail,
} from '~/modules/mmsx/redux/actions/device-inventory'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteDeviceInventoryApi = (params) => {
  const url = `v1/mms/update-inventory-ticket/${params}`
  return api.delete(url)
}

function* doDeleteDeviceInventory(action) {
  try {
    const response = yield call(deleteDeviceInventoryApi, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteDeviceInventorySuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteDeviceInventoryFail())
    }
  } catch (error) {
    yield put(deleteDeviceInventoryFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteDeviceInventory() {
  yield takeLatest(DELETE_DEVICE_INVENTORY_START, doDeleteDeviceInventory)
}
