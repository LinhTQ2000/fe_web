import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeVendorFailed,
  activeVendorSuccess,
  MMSX_ACTIVE_VENDOR_START,
} from '../../actions/define-vendor'

/**
 * Search user API
 * @returns {Promise}
 */
const activeVendorApi = (params) => {
  const uri = `v1/mms/vendors/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveVendor(action) {
  try {
    const response = yield call(activeVendorApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeVendorSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeVendorFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeVendorFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveVendor() {
  yield takeLatest(MMSX_ACTIVE_VENDOR_START, doActiveVendor)
}
