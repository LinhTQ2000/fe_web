import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  inActiveAttributeTypeFail,
  inActiveAttributeTypeSuccess,
  MMSX_IN_ACTIVE_ATTRIBUTE_TYPE_START,
} from '../../actions/attribute-type'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveAttributeTypeApi = (params) => {
  const uri = `v1/mms/attribute-type/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveAttributeType(action) {
  try {
    const response = yield call(inActiveAttributeTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(inActiveAttributeTypeSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveAttributeTypeFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveAttributeTypeFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveAttributeType() {
  yield takeLatest(MMSX_IN_ACTIVE_ATTRIBUTE_TYPE_START, doInActiveAttributeType)
}
