import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateInfoDeviceStatusSuccess,
  updateInfoDeviceStatusFail,
  UPDATE_INFO_DEVICE_STATUS,
} from '~/modules/mmsx/redux/actions/device-status'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @returns {Promise}
 */
const updateInfoDataApi = (params) => {
  const uri = `v1/mms/device-status/${params?.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateInfoData(action) {
  try {
    const response = yield call(updateInfoDataApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateInfoDeviceStatusSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateInfoDeviceStatusFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateInfoData() {
  yield takeLatest(UPDATE_INFO_DEVICE_STATUS, doUpdateInfoData)
}
