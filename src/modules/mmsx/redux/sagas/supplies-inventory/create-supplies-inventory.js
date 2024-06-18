import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createSuppliesInventoryFail,
  createSuppliesInventorySuccess,
  CREATE_SUPPLIES_INVENTORY,
} from '~/modules/mmsx/redux/actions/supplies-inventory'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createSuppliesInventoryApi = (params) => {
  const url = `v1/mms/update-inventory-ticket`
  return api.post(url, params)
}

function* doCreateSuppliesInventory(action) {
  try {
    const response = yield call(createSuppliesInventoryApi, action.payload)
    if (response.statusCode === 200) {
      yield put(createSuppliesInventorySuccess())
      if (action.onSuccess) yield action.onSuccess(response.data)

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createSuppliesInventoryFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchCreateSuppliesInventory() {
  yield takeLatest(CREATE_SUPPLIES_INVENTORY, doCreateSuppliesInventory)
}
