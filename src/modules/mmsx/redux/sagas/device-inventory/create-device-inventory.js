import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createDeviceInventoryFail,
  createDeviceInventorySuccess,
  CREATE_DEVICE_INVENTORY,
} from '~/modules/mmsx/redux/actions/device-inventory'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createDeviceInventoryApi = (params) => {
  const url = `v1/mms/update-inventory-ticket`
  return api.post(url, params)
}

function* doCreateDeviceInventory(action) {
  try {
    const response = yield call(createDeviceInventoryApi, action.payload)
    if (response.statusCode === 200) {
      yield put(createDeviceInventorySuccess())
      if (action.onSuccess) yield action.onSuccess(response.data)

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createDeviceInventoryFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchCreateDeviceInventory() {
  yield takeLatest(CREATE_DEVICE_INVENTORY, doCreateDeviceInventory)
}
