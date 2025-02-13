import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createAreaFailed,
  createAreaSuccess,
  MMSX_CREATE_AREA_START,
} from '../../actions/area'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createAreaApi = (body) => {
  const uri = `/v1/mms/areas`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateArea(action) {
  try {
    const response = yield call(createAreaApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createAreaSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createAreaFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createAreaFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateArea() {
  yield takeLatest(MMSX_CREATE_AREA_START, doCreateArea)
}
