import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  inActiveSuppliesCategoryFailed,
  inActiveSuppliesCategorySuccess,
  MMSX_IN_ACTIVE_SUPPLIES_CATEGORY_START,
} from '../../actions/supplies-category'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveSupplyCategoryApi = (params) => {
  const uri = `v1/mms/supply-groups/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveSuppliesCategory(action) {
  try {
    const response = yield call(inActiveSupplyCategoryApi, action?.payload)

    if (response?.payload?.statusCode === 200) {
      yield put(inActiveSuppliesCategorySuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.payload?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.payload?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveSuppliesCategoryFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveSuppliesCategoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveSupplyCategory() {
  yield takeLatest(
    MMSX_IN_ACTIVE_SUPPLIES_CATEGORY_START,
    doInActiveSuppliesCategory,
  )
}
