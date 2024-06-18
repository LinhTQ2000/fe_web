import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  inActiveMaintenanceTeamFail,
  inActiveMaintenanceTeamSuccess,
  MMSX_IN_ACTIVE_MAINTENANCE_TEAM_START,
} from '../../actions/maintenance-team'

/**
 * Search user API
 * @returns {Promise}
 */
const inActiveMaintenanceTeamApi = (params) => {
  const uri = `v1/mms/maintenance-teams/${params}/inactive`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doInActiveMaintenanceTeam(action) {
  try {
    const response = yield call(inActiveMaintenanceTeamApi, action?.payload)
    if (response?.payload?.statusCode === 200) {
      yield put(inActiveMaintenanceTeamSuccess())

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.payload?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.payload?.message, NOTIFICATION_TYPE.ERROR)
      yield put(inActiveMaintenanceTeamFail())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(inActiveMaintenanceTeamFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchInActiveMaintenanceTeam() {
  yield takeLatest(
    MMSX_IN_ACTIVE_MAINTENANCE_TEAM_START,
    doInActiveMaintenanceTeam,
  )
}
