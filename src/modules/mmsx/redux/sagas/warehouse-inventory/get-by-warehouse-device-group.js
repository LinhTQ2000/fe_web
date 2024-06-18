import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getInventoryByWarehouseDeviceGroupFailed,
  getInventoryByWarehouseDeviceGroupSuccess,
  MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_START,
} from '../../actions/warehouse-inventory'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getInventoryByWarehouseDeviceGroupApi = (params) => {
  const uri = `/v1/mms/warehouses/inventories/warehouses/${params?.warehouseId}/device-group/${params?.deviceGroupId}`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetInventoryWarehouseDeviceGroup(action) {
  try {
    const response = yield call(
      getInventoryByWarehouseDeviceGroupApi,
      action?.payload,
    )
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(getInventoryByWarehouseDeviceGroupSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(getInventoryByWarehouseDeviceGroupFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getInventoryByWarehouseDeviceGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetInventoryWarehouseDeviceGroup() {
  yield takeLatest(
    MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_START,
    doGetInventoryWarehouseDeviceGroup,
  )
}
