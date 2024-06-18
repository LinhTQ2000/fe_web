import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getSuppliesInventoryListFail,
  getSuppliesInventoryListSuccess,
  GET_SUPPLIES_INVENTORY_LIST_START,
} from '~/modules/mmsx/redux/actions/supplies-inventory'
import { api } from '~/services/api'

export const getSuppliesInventoryListApi = (params) => {
  const url = `v1/mms/update-inventory-ticket`
  return api.get(url, params)
}

function* doGetSuppliesInventoryList(action) {
  try {
    const response = yield call(getSuppliesInventoryListApi, action?.payload)

    if (response.statusCode === 200) {
      yield put(getSuppliesInventoryListSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getSuppliesInventoryListFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetSuppliesInventoryList() {
  yield takeLatest(
    GET_SUPPLIES_INVENTORY_LIST_START,
    doGetSuppliesInventoryList,
  )
}
