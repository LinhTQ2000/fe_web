import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getMemberMaintananceTeamFailed,
  getMemberMaintananceTeamSuccess,
  MMSX_GET_MEMBER_MAINTENANCE_TEAM_START,
} from '../../actions/maintenance-team'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
// v1/mms/maintenance-team/list
export const getMemberMaintenanceTeamApi = (params) => {
  const uri = `v1/mms/maintenance-teams/${params?.deviceId}/assignments`
  return api.get(uri, params)
}

export const getResponsibleUserApi = (params) => {
  const uri = `v1/mms/maintenance-teams/responsible-user`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMemberMaintenanceTeams(action) {
  try {
    const response = yield call(getMemberMaintenanceTeamApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getMemberMaintananceTeamSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getMemberMaintananceTeamFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getMemberMaintananceTeamFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetMemberMaintenanceTeams() {
  yield takeLatest(
    MMSX_GET_MEMBER_MAINTENANCE_TEAM_START,
    doGetMemberMaintenanceTeams,
  )
}
