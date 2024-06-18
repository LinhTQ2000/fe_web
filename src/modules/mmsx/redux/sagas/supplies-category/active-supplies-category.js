import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeSuppliesCategoryFailed,
  activeSuppliesCategorySuccess,
  MMSX_ACTIVE_SUPPLIES_CATEGORY_START,
} from '../../actions/supplies-category'

/**
 * Search user API
 * @returns {Promise}
 */
const activeSupplyCategoryApi = (params) => {
  const uri = `v1/mms/supply-groups/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveSuppliesCategory(action) {
  try {
    const response = yield call(activeSupplyCategoryApi, action?.payload)

    if (response?.payload?.statusCode === 200) {
      yield put(activeSuppliesCategorySuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.payload?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.payload?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeSuppliesCategoryFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeSuppliesCategoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveSupplyCategory() {
  yield takeLatest(
    MMSX_ACTIVE_SUPPLIES_CATEGORY_START,
    doActiveSuppliesCategory,
  )
}
