import {
  GET_LIST_MAINTENANCE_TEAM_START,
  GET_LIST_MAINTENANCE_TEAM_SUCCESS,
  GET_LIST_MAINTENANCE_TEAM_ERROR,
  GET_DETAIL_MAINTENANCE_TEAM_START,
  GET_DETAIL_MAINTENANCE_TEAM_SUCCESS,
  GET_DETAIL_MAINTENANCE_TEAM_ERROR,
  DELETE_MAINTENANCE_TEAM_START,
  DELETE_MAINTENANCE_TEAM_SUCCESS,
  DELETE_MAINTENANCE_TEAM_ERROR,
  GET_ALL_USER_IT_DEPARTMENT_START,
  GET_ALL_USER_IT_DEPARTMENT_SUCCESS,
  GET_ALL_USER_IT_DEPARTMENT_FAIL,
  RESET_MAINTENANCE_TEAM,
  MMSX_ACTIVE_MAINTENANCE_TEAM_START,
  MMSX_ACTIVE_MAINTENANCE_TEAM_SUCCESS,
  MMSX_ACTIVE_MAINTENANCE_TEAM_FAILED,
  MMSX_IN_ACTIVE_MAINTENANCE_TEAM_START,
  MMSX_IN_ACTIVE_MAINTENANCE_TEAM_SUCCESS,
  MMSX_IN_ACTIVE_MAINTENANCE_TEAM_FAILED,
  MMSX_GET_MEMBER_MAINTENANCE_TEAM_START,
  MMSX_GET_MEMBER_MAINTENANCE_TEAM_FAILED,
  MMSX_GET_MEMBER_MAINTENANCE_TEAM_SUCCESS,
} from '~/modules/mmsx/redux/actions/maintenance-team'

const initialState = {
  isLoading: false,
  maintenanceTeams: [],
  maintenanceTeamDetail: {},
  meta: {},
  userItDepartmentList: [],
  memberList: [],
}

export default function maintenanceTeam(state = initialState, action) {
  switch (action.type) {
    case GET_DETAIL_MAINTENANCE_TEAM_START:
    case GET_LIST_MAINTENANCE_TEAM_START:
    case DELETE_MAINTENANCE_TEAM_START:
    case MMSX_ACTIVE_MAINTENANCE_TEAM_START:
    case MMSX_IN_ACTIVE_MAINTENANCE_TEAM_START:
    case MMSX_GET_MEMBER_MAINTENANCE_TEAM_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_LIST_MAINTENANCE_TEAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        maintenanceTeams: action?.payload?.items,
        meta: action?.payload?.meta,
      }
    case GET_DETAIL_MAINTENANCE_TEAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        maintenanceTeamDetail: action.payload,
      }
    case DELETE_MAINTENANCE_TEAM_SUCCESS:
    case MMSX_ACTIVE_MAINTENANCE_TEAM_SUCCESS:
    case MMSX_IN_ACTIVE_MAINTENANCE_TEAM_SUCCESS:
    case MMSX_ACTIVE_MAINTENANCE_TEAM_FAILED:
    case MMSX_IN_ACTIVE_MAINTENANCE_TEAM_FAILED:
    case MMSX_GET_MEMBER_MAINTENANCE_TEAM_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_LIST_MAINTENANCE_TEAM_ERROR:
    case GET_DETAIL_MAINTENANCE_TEAM_ERROR:
    case DELETE_MAINTENANCE_TEAM_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    case GET_ALL_USER_IT_DEPARTMENT_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ALL_USER_IT_DEPARTMENT_SUCCESS:
      return {
        ...state,
        userItDepartmentList: action.payload,
        isLoading: false,
      }
    case MMSX_GET_MEMBER_MAINTENANCE_TEAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        memberList: action.payload?.items,
      }
    case GET_ALL_USER_IT_DEPARTMENT_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    // case CREATE_MAINTENANCE_TEAM_START:
    // case UPDATE_MAINTENANCE_TEAM_START:
    // case CREATE_MAINTENANCE_TEAM_SUCCESS:
    // case UPDATE_MAINTENANCE_TEAM_SUCCESS:
    // case CREATE_MAINTENANCE_TEAM_ERROR:
    // case UPDATE_MAINTENANCE_TEAM_ERROR:
    case RESET_MAINTENANCE_TEAM:
      return {
        ...state,
        maintenanceTeamDetail: {},
      }
    default:
      return state
  }
}
