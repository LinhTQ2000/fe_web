import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getDeviceInventoryDetailFail,
  getDeviceInventoryDetailSuccess,
  GET_DEVICE_INVENTORY_DETAIL_START,
} from '~/modules/mmsx/redux/actions/device-inventory'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

export const getDeviceInventoryDetailApi = (params) => {
  const url = `v1/mms/update-inventory-ticket/${params}`
  return api.get(url)
}

function* doGetDeviceInventoryDetail(action) {
  try {
    const response = yield call(getDeviceInventoryDetailApi, action.payload)

    if (response.statusCode === 200) {
      yield put(getDeviceInventoryDetailSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDeviceInventoryDetailFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetDeviceInventoryDetail() {
  yield takeLatest(
    GET_DEVICE_INVENTORY_DETAIL_START,
    doGetDeviceInventoryDetail,
  )
}
