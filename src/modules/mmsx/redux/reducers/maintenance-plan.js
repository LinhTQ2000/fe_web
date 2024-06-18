import {
  MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_FAIL,
  MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_START,
  MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_SUCCESS,
  MMSX_CREATE_MAINTENANCE_PLAN_FAIL,
  MMSX_CREATE_MAINTENANCE_PLAN_START,
  MMSX_CREATE_MAINTENANCE_PLAN_SUCCESS,
  MMSX_DELETE_MAINTENANCE_PLAN_FAIL,
  MMSX_DELETE_MAINTENANCE_PLAN_START,
  MMSX_DELETE_MAINTENANCE_PLAN_SUCCESS,
  MMSX_GET_MAINTENANCE_PLAN_FAIL,
  MMSX_GET_MAINTENANCE_PLAN_START,
  MMSX_GET_MAINTENANCE_PLAN_SUCCESS,
  MMSX_RESET_MAINTENANCE_PLAN_DETAIL,
  MMSX_SEARCH_MAINTENANCE_PLAN_FAIL,
  MMSX_SEARCH_MAINTENANCE_PLAN_START,
  MMSX_SEARCH_MAINTENANCE_PLAN_SUCCESS,
  MMSX_UPDATE_MAINTENANCE_PLAN_FAIL,
  MMSX_UPDATE_MAINTENANCE_PLAN_START,
  MMSX_UPDATE_MAINTENANCE_PLAN_SUCCESS,
} from '../actions/maintenance-plan'

const initialState = {
  isLoading: false,
  maintenancePlanList: [],
  maintenancePlanDetail: {},
  total: null,
}

export default function maintenancePlan(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_MAINTENANCE_PLAN_START:
    case MMSX_CREATE_MAINTENANCE_PLAN_START:
    case MMSX_UPDATE_MAINTENANCE_PLAN_START:
    case MMSX_DELETE_MAINTENANCE_PLAN_START:
    case MMSX_GET_MAINTENANCE_PLAN_START:
    case MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_MAINTENANCE_PLAN_FAIL:
    case MMSX_CREATE_MAINTENANCE_PLAN_SUCCESS:
    case MMSX_CREATE_MAINTENANCE_PLAN_FAIL:
    case MMSX_UPDATE_MAINTENANCE_PLAN_SUCCESS:
    case MMSX_UPDATE_MAINTENANCE_PLAN_FAIL:
    case MMSX_DELETE_MAINTENANCE_PLAN_SUCCESS:
    case MMSX_DELETE_MAINTENANCE_PLAN_FAIL:
    case MMSX_GET_MAINTENANCE_PLAN_FAIL:
    case MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_SUCCESS:
    case MMSX_CHANGE_STATUS_MAINTENANCE_PLAN_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_SEARCH_MAINTENANCE_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        maintenancePlanList: action.payload.list,
        total: action.payload.total,
      }
    case MMSX_GET_MAINTENANCE_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        maintenancePlanDetail: action.payload,
      }
    case MMSX_RESET_MAINTENANCE_PLAN_DETAIL:
      return {
        ...state,
        maintenancePlanDetail: {},
      }
    default:
      return state
  }
}
