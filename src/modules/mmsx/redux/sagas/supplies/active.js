import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeSuppliesFailed,
  activeSuppliesSuccess,
  MMSX_ACTIVE_SUPPLIES_START,
} from '../../actions/define-supplies'

/**
 * Search user API
 * @returns {Promise}
 */
const activeSupplyApi = (params) => {
  const uri = `v1/mms/supplies/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveSupplies(action) {
  try {
    const response = yield call(activeSupplyApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeSuppliesSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeSuppliesFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeSuppliesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveSupply() {
  yield takeLatest(MMSX_ACTIVE_SUPPLIES_START, doActiveSupplies)
}
