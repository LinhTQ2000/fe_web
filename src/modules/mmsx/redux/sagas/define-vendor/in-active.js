import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  inActiveVendorFailed,
  inActiveVendorSuccess,
  MMSX_IN_ACTIVE_VENDOR_START,
} from '../../actions/define-vendor'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveVendorApi = (params) => {
  const uri = `v1/mms/vendors/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveVendor(action) {
  try {
    const response = yield call(inActiveVendorApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(inActiveVendorSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveVendorFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveVendorFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveVendor() {
  yield takeLatest(MMSX_IN_ACTIVE_VENDOR_START, doInActiveVendor)
}
