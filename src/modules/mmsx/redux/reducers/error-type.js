import {
  CREATE_ERROR_TYPE_FAILED,
  CREATE_ERROR_TYPE_START,
  CREATE_ERROR_TYPE_SUCCESS,
  DELETE_ERROR_TYPE_FAILED,
  DELETE_ERROR_TYPE_START,
  DELETE_ERROR_TYPE_SUCCESS,
  GET_ERROR_TYPE_DETAILS_FAILED,
  GET_ERROR_TYPE_DETAILS_START,
  GET_ERROR_TYPE_DETAILS_SUCCESS,
  SEARCH_ERROR_TYPE_FAILED,
  SEARCH_ERROR_TYPE_START,
  SEARCH_ERROR_TYPE_SUCCESS,
  UPDATE_ERROR_TYPE_FAILED,
  UPDATE_ERROR_TYPE_START,
  UPDATE_ERROR_TYPE_SUCCESS,
  RESET_ERROR_TYPE_DETAILS_STATE,
  MMSX_ACTIVE_ERROR_TYPE_START,
  MMSX_IN_ACTIVE_ERROR_TYPE_START,
  MMSX_ACTIVE_ERROR_TYPE_SUCCESS,
  MMSX_ACTIVE_ERROR_TYPE_FAILED,
  MMSX_IN_ACTIVE_ERROR_TYPE_SUCCESS,
  MMSX_IN_ACTIVE_ERROR_TYPE_FAILED,
} from '../actions/error-type'

const initialState = {
  isLoading: false,
  errorTypeList: [],
  errorTypeDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function errorType(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ERROR_TYPE_START:
    case CREATE_ERROR_TYPE_START:
    case UPDATE_ERROR_TYPE_START:
    case DELETE_ERROR_TYPE_START:
    case GET_ERROR_TYPE_DETAILS_START:
    case MMSX_ACTIVE_ERROR_TYPE_START:
    case MMSX_IN_ACTIVE_ERROR_TYPE_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ERROR_TYPE_SUCCESS:
      return {
        ...state,
        errorTypeList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_ERROR_TYPE_FAILED:
      return {
        ...state,
        isLoading: false,
        total: 0,
      }
    case CREATE_ERROR_TYPE_SUCCESS:
    case CREATE_ERROR_TYPE_FAILED:
    case UPDATE_ERROR_TYPE_SUCCESS:
    case UPDATE_ERROR_TYPE_FAILED:
    case DELETE_ERROR_TYPE_SUCCESS:
    case DELETE_ERROR_TYPE_FAILED:
    case MMSX_ACTIVE_ERROR_TYPE_SUCCESS:
    case MMSX_ACTIVE_ERROR_TYPE_FAILED:
    case MMSX_IN_ACTIVE_ERROR_TYPE_SUCCESS:
    case MMSX_IN_ACTIVE_ERROR_TYPE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_ERROR_TYPE_DETAILS_SUCCESS:
      return {
        ...state,
        errorTypeDetails: action.payload,
        isLoading: false,
      }
    case GET_ERROR_TYPE_DETAILS_FAILED:
      return {
        ...state,
        errorTypeDetails: {},
        isLoading: false,
      }
    case RESET_ERROR_TYPE_DETAILS_STATE:
      return {
        ...state,
        errorTypeDetails: {},
      }

    default:
      return state
  }
}
