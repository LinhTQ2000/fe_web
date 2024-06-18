import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_GET_DETAIL_AREA_START,
  getDetailAreaFailed,
  getDetailAreaSuccess,
} from '../../actions/area'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getAreaDetailsApi = (params) => {
  const uri = `/v1/mms/areas/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetAreaDetails(action) {
  try {
    const response = yield call(getAreaDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailAreaSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getDetailAreaFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getDetailAreaFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetAreaDetails() {
  yield takeLatest(MMSX_GET_DETAIL_AREA_START, doGetAreaDetails)
}
