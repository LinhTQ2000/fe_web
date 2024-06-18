import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_SEARCH_WAREHOUSE_INVENTORY_START,
  searchWarehouseInventoryFailed,
  searchWarehouseInventorySuccess,
} from '../../actions/warehouse-inventory'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchWarehouseInventoryApi = (params) => {
  const uri = `/v1/mms/warehouses/inventories/${params.type}`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWarehouseInventory(action) {
  try {
    const response = yield call(searchWarehouseInventoryApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseInventorySuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(searchWarehouseInventoryFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchWarehouseInventoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchWarehouseInventory() {
  yield takeLatest(
    MMSX_SEARCH_WAREHOUSE_INVENTORY_START,
    doSearchWarehouseInventory,
  )
}
