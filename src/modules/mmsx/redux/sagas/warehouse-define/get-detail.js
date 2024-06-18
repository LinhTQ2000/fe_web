import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getDetailWarehouseDefineFail,
  getDetailWarehouseDefineSuccess,
  MMSX_GET_DETAIL_WAREHOUSE_DEFINE_START,
} from '../../actions/warehouse-define'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehouseDefineDetailsApi = (params) => {
  const uri = `/v1/mms/warehouses/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseDefineDetails(action) {
  try {
    const response = yield call(getWarehouseDefineDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailWarehouseDefineSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getDetailWarehouseDefineFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailWarehouseDefineFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetWarehouseDefineDetails() {
  yield takeLatest(
    MMSX_GET_DETAIL_WAREHOUSE_DEFINE_START,
    doGetWarehouseDefineDetails,
  )
}
