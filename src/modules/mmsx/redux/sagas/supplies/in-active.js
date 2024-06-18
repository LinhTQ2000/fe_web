import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  inActiveSuppliesFailed,
  inActiveSuppliesSuccess,
  MMSX_IN_ACTIVE_SUPPLIES_START,
} from '../../actions/define-supplies'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveSupplyApi = (params) => {
  const uri = `v1/mms/supplies/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveSupplies(action) {
  try {
    const response = yield call(inActiveSupplyApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(inActiveSuppliesSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveSuppliesFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveSuppliesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveSupply() {
  yield takeLatest(MMSX_IN_ACTIVE_SUPPLIES_START, doInActiveSupplies)
}
