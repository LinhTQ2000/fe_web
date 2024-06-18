import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_IN_ACTIVE_AREA_START,
  inActiveAreaFailed,
  inActiveAreaSuccess,
} from '../../actions/area'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveAreaApi = (params) => {
  const uri = `v1/mms/areas/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveArea(action) {
  try {
    const response = yield call(inActiveAreaApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(inActiveAreaSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveAreaFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveAreaFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveArea() {
  yield takeLatest(MMSX_IN_ACTIVE_AREA_START, doInActiveArea)
}
