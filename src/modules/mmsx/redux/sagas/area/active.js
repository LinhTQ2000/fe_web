import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeAreaFailed,
  activeAreaSuccess,
  MMSX_ACTIVE_AREA_START,
} from '../../actions/area'

/**
 * Search user API
 * @returns {Promise}
 */
const activeAreaApi = (params) => {
  const uri = `v1/mms/areas/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveArea(action) {
  try {
    const response = yield call(activeAreaApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeAreaSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeAreaFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeAreaFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveArea() {
  yield takeLatest(MMSX_ACTIVE_AREA_START, doActiveArea)
}
