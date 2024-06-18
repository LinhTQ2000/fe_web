import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  activeAttributeTypeFail,
  activeAttributeTypeSuccess,
  MMSX_ACTIVE_ATTRIBUTE_TYPE_START,
} from '../../actions/attribute-type'

/**
 * Search user API
 * @returns {Promise}
 */
const activeAttributeTypeApi = (params) => {
  const uri = `v1/mms/attribute-type/${params}/active`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doActiveAttributeType(action) {
  try {
    const response = yield call(activeAttributeTypeApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(activeAttributeTypeSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(activeAttributeTypeFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(activeAttributeTypeFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchActiveAttributeType() {
  yield takeLatest(MMSX_ACTIVE_ATTRIBUTE_TYPE_START, doActiveAttributeType)
}
