import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_SEARCH_DEVICE_GROUP_START,
  searchDeviceGroupFailed,
  searchDeviceGroupSuccess,
} from '../../actions/device-group'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchDeviceGroupApi = (params) => {
  const uri = `/v1/mms/device-groups/list`
  return api.get(uri, params)
}
/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchDeviceGroup(action) {
  try {
    const response = yield call(searchDeviceGroupApi, action?.payload)
    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchDeviceGroupSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(searchDeviceGroupFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchDeviceGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchDeviceGroup() {
  yield takeLatest(MMSX_SEARCH_DEVICE_GROUP_START, doSearchDeviceGroup)
}
