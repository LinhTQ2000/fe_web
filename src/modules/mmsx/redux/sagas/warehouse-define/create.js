import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createWarehouseDefineFail,
  createWarehouseDefineSuccess,
  MMSX_CREATE_WAREHOUSE_DEFINE_START,
} from '../../actions/warehouse-define'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createWarehouseDefineApi = (body) => {
  const uri = `/v1/mms/warehouses`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateWarehouseDefine(action) {
  try {
    const response = yield call(createWarehouseDefineApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createWarehouseDefineSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createWarehouseDefineFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createWarehouseDefineFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateWarehouseDefine() {
  yield takeLatest(MMSX_CREATE_WAREHOUSE_DEFINE_START, doCreateWarehouseDefine)
}
