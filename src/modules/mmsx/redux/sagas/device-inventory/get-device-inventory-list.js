import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDeviceInventoryListFail,
  getDeviceInventoryListSuccess,
  GET_DEVICE_INVENTORY_LIST_START,
} from '~/modules/mmsx/redux/actions/device-inventory'
import { api } from '~/services/api'

export const getDeviceInventoryListApi = (params) => {
  const url = `v1/mms/update-inventory-ticket`
  return api.get(url, params)
}

function* doGetDeviceInventoryList(action) {
  try {
    const response = yield call(getDeviceInventoryListApi, action?.payload)

    if (response.statusCode === 200) {
      yield put(getDeviceInventoryListSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDeviceInventoryListFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetDeviceInventoryList() {
  yield takeLatest(GET_DEVICE_INVENTORY_LIST_START, doGetDeviceInventoryList)
}
