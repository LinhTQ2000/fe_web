import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getMaintenanceAttributeFailed,
  getMaintenanceAttributeSuccess,
  MMSX_GET_ATTRIBUTE_MAINTAIN_START,
} from '../../actions/common'
/**
 * Get
 * @returns {Promise}
 */
const getMaintenanceAttributeApi = () => {
  const uri = `v1/mms/maintenance-attributes`
  return api.get(uri)
}

/*Worker */
function* doGetMaintenanceAttribute(action) {
  try {
    const response = yield call(getMaintenanceAttributeApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(getMaintenanceAttributeSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMaintenanceAttributeFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

/*Watcher */
export default function* watchGetMaintenanceAttribute() {
  yield takeLatest(MMSX_GET_ATTRIBUTE_MAINTAIN_START, doGetMaintenanceAttribute)
}
