import {
  CONFIRM_CONTINGENCY_PLAN_FAIL,
  CONFIRM_CONTINGENCY_PLAN_START,
  CONFIRM_CONTINGENCY_PLAN_SUCCESS,
  GET_CONTINGENCY_PLAN_DETAIL_FAIL,
  GET_CONTINGENCY_PLAN_DETAIL_START,
  GET_CONTINGENCY_PLAN_DETAIL_SUCCESS,
  GET_CONTINGENCY_PLAN_LIST_FAIL,
  GET_CONTINGENCY_PLAN_LIST_START,
  GET_CONTINGENCY_PLAN_LIST_SUCCESS,
  REJECT_CONTINGENCY_PLAN_FAIL,
  REJECT_CONTINGENCY_PLAN_START,
  REJECT_CONTINGENCY_PLAN_SUCCESS,
  CREATE_CONTINGENCY_PLAN,
  CREATE_CONTINGENCY_PLAN_SUCCESS,
  CREATE_CONTINGENCY_PLAN_FAIL,
  UPDATE_CONTINGENCY_PLAN,
  UPDATE_CONTINGENCY_PLAN_FAIL,
  UPDATE_CONTINGENCY_PLAN_SUCCESS,
  DELETE_CONTINGENCY_PLAN_START,
  DELETE_CONTINGENCY_PLAN_FAIL,
  DELETE_CONTINGENCY_PLAN_SUCCESS,
  RESET_STATE_CONTINGENCY_PLAN,
} from '../actions/contingency-plan'

const initialState = {
  contingencyPlanList: [],
  contingencyPlanDetail: {},
  isLoading: false,
  total: null,
}

export default function contingencyPlan(state = initialState, action) {
  switch (action.type) {
    case GET_CONTINGENCY_PLAN_LIST_START:
    case CONFIRM_CONTINGENCY_PLAN_START:
    case REJECT_CONTINGENCY_PLAN_START:
    case GET_CONTINGENCY_PLAN_DETAIL_START:
    case CREATE_CONTINGENCY_PLAN:
    case UPDATE_CONTINGENCY_PLAN:
    case DELETE_CONTINGENCY_PLAN_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CONTINGENCY_PLAN_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contingencyPlanList: action.payload.items,
        total: action?.payload?.meta?.total,
      }
    case GET_CONTINGENCY_PLAN_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contingencyPlanDetail: action.payload,
      }
    case GET_CONTINGENCY_PLAN_LIST_FAIL:
    case GET_CONTINGENCY_PLAN_DETAIL_FAIL:
    case CONFIRM_CONTINGENCY_PLAN_SUCCESS:
    case CONFIRM_CONTINGENCY_PLAN_FAIL:
    case REJECT_CONTINGENCY_PLAN_SUCCESS:
    case REJECT_CONTINGENCY_PLAN_FAIL:
    case CREATE_CONTINGENCY_PLAN_SUCCESS:
    case CREATE_CONTINGENCY_PLAN_FAIL:
    case UPDATE_CONTINGENCY_PLAN_FAIL:
    case UPDATE_CONTINGENCY_PLAN_SUCCESS:
    case DELETE_CONTINGENCY_PLAN_SUCCESS:
    case DELETE_CONTINGENCY_PLAN_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_STATE_CONTINGENCY_PLAN:
      return {
        ...state,
        contingencyPlanDetail: {},
      }
    default:
      return state
  }
}
