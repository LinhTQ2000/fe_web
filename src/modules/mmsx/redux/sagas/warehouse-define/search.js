import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_SEARCH_WAREHOUSE_DEFINE_START,
  searchWarehouseDefineFail,
  searchWarehouseDefineSuccess,
} from '../../actions/warehouse-define'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchWarehouseDefineApi = (params) => {
  const uri = `/v1/mms/warehouses`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWarehouseDefine(action) {
  try {
    const response = yield call(searchWarehouseDefineApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseDefineSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(searchWarehouseDefineFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchWarehouseDefineFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchWarehouseDefine() {
  yield takeLatest(MMSX_SEARCH_WAREHOUSE_DEFINE_START, doSearchWarehouseDefine)
}
