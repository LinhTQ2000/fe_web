import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getSuppliesInventoryDetailFail,
  getSuppliesInventoryDetailSuccess,
  GET_SUPPLIES_INVENTORY_DETAIL_START,
} from '~/modules/mmsx/redux/actions/supplies-inventory'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

export const getSuppliesInventoryDetailApi = (params) => {
  const url = `v1/mms/update-inventory-ticket/${params}`
  return api.get(url)
}

function* doGetSuppliesInventoryDetail(action) {
  try {
    const response = yield call(getSuppliesInventoryDetailApi, action.payload)

    if (response.statusCode === 200) {
      yield put(getSuppliesInventoryDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getSuppliesInventoryDetailFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetSuppliesInventoryDetail() {
  yield takeLatest(
    GET_SUPPLIES_INVENTORY_DETAIL_START,
    doGetSuppliesInventoryDetail,
  )
}
