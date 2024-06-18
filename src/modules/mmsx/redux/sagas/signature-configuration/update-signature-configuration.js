import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateSignatureConfigurationFailed,
  updateSignatureConfigurationSuccess,
  UPDATE_SIGNATURE_CONFIGURATION_START,
} from '~/modules/mmsx/redux/actions/signature-configuration'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateSignatureConfigurationApi = (body) => {
  //@TODO update api
  const uri = `/v1/mms/setting/signature`
  return api.post(uri, body)
}

function* doUpdateSignatureConfiguration(action) {
  try {
    const response = yield call(
      updateSignatureConfigurationApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(updateSignatureConfigurationSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateSignatureConfigurationFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateSignatureConfigurationFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateSignatureConfiguration() {
  yield takeLatest(
    UPDATE_SIGNATURE_CONFIGURATION_START,
    doUpdateSignatureConfiguration,
  )
}
