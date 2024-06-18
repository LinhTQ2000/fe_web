import {
  CHANGE_STATUS_REPAIR_REQUEST_FAILED,
  CHANGE_STATUS_REPAIR_REQUEST_START,
  CHANGE_STATUS_REPAIR_REQUEST_SUCCESS,
  SEARCH_REPAIR_REQUEST_FAILED,
  SEARCH_REPAIR_REQUEST_START,
  SEARCH_REPAIR_REQUEST_SUCCESS,
  DELETE_REPAIR_REQUEST_FAILED,
  DELETE_REPAIR_REQUEST_START,
  DELETE_REPAIR_REQUEST_SUCCESS,
  CREATE_REPAIR_REQUEST_START,
  CREATE_REPAIR_REQUEST_SUCCESS,
  CREATE_REPAIR_REQUEST_FAILED,
  UPDATE_REPAIR_REQUEST_DETAIL_START,
  UPDATE_REPAIR_REQUEST_DETAIL_SUCCESS,
  UPDATE_REPAIR_REQUEST_DETAIL_FAILED,
  GET_REPAIR_REQUEST_DETAIL_START,
  GET_REPAIR_REQUEST_DETAIL_SUCCESS,
  GET_REPAIR_REQUEST_DETAIL_FAILED,
  RESET_STATE_REPAIR_REQUEST_DETAIL,
} from '../actions/repair-request'

const initialState = {
  repairRequestList: [],
  total: null,
  isLoading: false,
  repairRequestDetail: {},
}

export default function repairRequest(state = initialState, action) {
  switch (action?.type) {
    // -------------------------------------------
    case SEARCH_REPAIR_REQUEST_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_REPAIR_REQUEST_SUCCESS:
      return {
        ...state,
        repairRequestList: action?.payload?.items,
        total: action?.payload?.meta?.total,
        isLoading: false,
      }
    case SEARCH_REPAIR_REQUEST_FAILED:
      return {
        ...state,
        repairRequestList: [],
        isLoading: true,
      }
    case CHANGE_STATUS_REPAIR_REQUEST_START:
    case DELETE_REPAIR_REQUEST_START:
      return {
        ...state,
      }
    case CHANGE_STATUS_REPAIR_REQUEST_SUCCESS:
    case DELETE_REPAIR_REQUEST_SUCCESS:
      return {
        ...state,
      }
    case CHANGE_STATUS_REPAIR_REQUEST_FAILED:
    case DELETE_REPAIR_REQUEST_FAILED:
      return {
        ...state,
      }
    //---------------------------------------------
    /**REQUEST */
    case CREATE_REPAIR_REQUEST_START:
    case UPDATE_REPAIR_REQUEST_DETAIL_START:
      return {
        ...state,
      }
    case CREATE_REPAIR_REQUEST_SUCCESS:
    case UPDATE_REPAIR_REQUEST_DETAIL_SUCCESS:
      return {
        ...state,
      }
    case CREATE_REPAIR_REQUEST_FAILED:
    case UPDATE_REPAIR_REQUEST_DETAIL_FAILED:
      return {
        ...state,
      }
    case GET_REPAIR_REQUEST_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_REPAIR_REQUEST_DETAIL_SUCCESS:
      return {
        ...state,
        repairRequestDetail: action?.payload,
        isLoading: false,
      }
    case GET_REPAIR_REQUEST_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_STATE_REPAIR_REQUEST_DETAIL:
      return {
        ...state,
        repairRequestDetail: {},
      }
    default:
      return state
  }
}
