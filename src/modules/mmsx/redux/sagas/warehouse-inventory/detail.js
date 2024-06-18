import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getInventoryDetailFailed,
  getInventoryDetailSuccess,
  MMSX_GET_INVENTORY_DETAIL_START,
} from '../../actions/warehouse-inventory'

const getDetailInventory = (params) => {
  const url = `v1/mms/warehouses/inventories/${params?.id}/${params?.type}`
  return api.get(url)
}

function* doGetDetailInventory(action) {
  try {
    const response = yield call(getDetailInventory, action.payload)
    if (response.statusCode === 200) {
      yield put(getInventoryDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(getInventoryDetailFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getInventoryDetailFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetInventory() {
  yield takeLatest(MMSX_GET_INVENTORY_DETAIL_START, doGetDetailInventory)
}
