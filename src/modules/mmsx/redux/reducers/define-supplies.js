import {
  GET_SUPPLIES_FAIL,
  GET_SUPPLIES_START,
  GET_SUPPLIES_SUCCESS,
  SEARCH_SUPPLIES_FAIL,
  SEARCH_SUPPLIES_START,
  SEARCH_SUPPLIES_SUCCESS,
  RESET_STATE_SUPPLIES,
  CREATE_SUPPLIES_START,
  UPDATE_SUPPLIES_START,
  MMSX_ACTIVE_SUPPLIES_START,
  MMSX_IN_ACTIVE_SUPPLIES_START,
  CREATE_SUPPLIES_SUCCESS,
  CREATE_SUPPLIES_FAIL,
  UPDATE_SUPPLIES_SUCCESS,
  UPDATE_SUPPLIES_FAIL,
  MMSX_ACTIVE_SUPPLIES_SUCCESS,
  MMSX_ACTIVE_SUPPLIES_FAILED,
  MMSX_IN_ACTIVE_SUPPLIES_SUCCESS,
  MMSX_IN_ACTIVE_SUPPLIES_FAILED,
} from '../actions/define-supplies'

const initialState = {
  suppliesList: [],
  suppliesDetail: {},
  total: null,
  isLoading: false,
}

export default function supplies(state = initialState, action) {
  switch (action?.type) {
    case SEARCH_SUPPLIES_START:
    case CREATE_SUPPLIES_START:
    case UPDATE_SUPPLIES_START:
    case MMSX_ACTIVE_SUPPLIES_START:
    case MMSX_IN_ACTIVE_SUPPLIES_START:
    case GET_SUPPLIES_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_SUPPLIES_SUCCESS:
      return {
        ...state,
        suppliesList: action?.payload?.items,
        total: action?.payload?.meta?.total,
        isLoading: false,
      }
    case SEARCH_SUPPLIES_FAIL:
    case GET_SUPPLIES_FAIL:
    case CREATE_SUPPLIES_SUCCESS:
    case CREATE_SUPPLIES_FAIL:
    case UPDATE_SUPPLIES_SUCCESS:
    case UPDATE_SUPPLIES_FAIL:
    case MMSX_ACTIVE_SUPPLIES_SUCCESS:
    case MMSX_ACTIVE_SUPPLIES_FAILED:
    case MMSX_IN_ACTIVE_SUPPLIES_SUCCESS:
    case MMSX_IN_ACTIVE_SUPPLIES_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_SUPPLIES_SUCCESS:
      return {
        ...state,
        suppliesDetail: action?.payload,
        isLoading: false,
      }
    case RESET_STATE_SUPPLIES:
      return {
        ...state,
        suppliesDetail: {},
      }
    default:
      return state
  }
}
