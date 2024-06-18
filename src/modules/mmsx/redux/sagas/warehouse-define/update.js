import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_UPDATE_WAREHOUSE_DEFINE_START,
  updateWarehouseDefineFail,
  updateWarehouseDefineSuccess,
} from '../../actions/warehouse-define'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateWarehouseDefineApi = (body) => {
  const uri = `/v1/mms/warehouses/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateWarehouseDefine(action) {
  try {
    const response = yield call(updateWarehouseDefineApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateWarehouseDefineSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateWarehouseDefineFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateWarehouseDefineFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateWarehouseDefine() {
  yield takeLatest(MMSX_UPDATE_WAREHOUSE_DEFINE_START, doUpdateWarehouseDefine)
}
