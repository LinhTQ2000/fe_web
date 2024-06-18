import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  UPDATE_SUPPLIES_INVENTORY,
  updateSuppliesInventoryFail,
  updateSuppliesInventorySuccess,
} from '~/modules/mmsx/redux/actions/supplies-inventory'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateSuppliesInventoryApi = (params) => {
  const url = `v1/mms/update-inventory-ticket/${params.id}`
  return api.put(url, params)
}

function* doUpdateSuppliesInventory(action) {
  try {
    const response = yield call(updateSuppliesInventoryApi, action.payload)
    if (response.statusCode === 200) {
      yield put(updateSuppliesInventorySuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateSuppliesInventoryFail())
    }
  } catch (error) {
    yield put(updateSuppliesInventoryFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchUpdateSuppliesInventory() {
  yield takeLatest(UPDATE_SUPPLIES_INVENTORY, doUpdateSuppliesInventory)
}
