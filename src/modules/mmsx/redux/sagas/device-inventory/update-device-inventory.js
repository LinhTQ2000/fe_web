import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  UPDATE_DEVICE_INVENTORY,
  updateDeviceInventoryFail,
  updateDeviceInventorySuccess,
} from '~/modules/mmsx/redux/actions/device-inventory'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateDeviceInventoryApi = (params) => {
  const url = `v1/mms/update-inventory-ticket/${params.id}`
  return api.put(url, params)
}

function* doUpdateDeviceInventory(action) {
  try {
    const response = yield call(updateDeviceInventoryApi, action.payload)
    if (response.statusCode === 200) {
      yield put(updateDeviceInventorySuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateDeviceInventoryFail())
    }
  } catch (error) {
    yield put(updateDeviceInventoryFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchUpdateDeviceInventory() {
  yield takeLatest(UPDATE_DEVICE_INVENTORY, doUpdateDeviceInventory)
}
