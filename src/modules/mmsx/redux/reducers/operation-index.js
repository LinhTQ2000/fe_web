import {
  MMSX_ACTIVE_OPERATION_INDEX_FAILED,
  MMSX_ACTIVE_OPERATION_INDEX_START,
  MMSX_ACTIVE_OPERATION_INDEX_SUCCESS,
  MMSX_CREATE_OPERATION_INDEX_FAILED,
  MMSX_CREATE_OPERATION_INDEX_START,
  MMSX_CREATE_OPERATION_INDEX_SUCCESS,
  MMSX_GET_DETAIL_OPERATION_INDEX_FAILED,
  MMSX_GET_DETAIL_OPERATION_INDEX_START,
  MMSX_GET_DETAIL_OPERATION_INDEX_SUCCESS,
  MMSX_IN_ACTIVE_OPERATION_INDEX_FAILED,
  MMSX_IN_ACTIVE_OPERATION_INDEX_START,
  MMSX_IN_ACTIVE_OPERATION_INDEX_SUCCESS,
  MMSX_RESET_OPERATION_INDEX_LIST_STATE,
  MMSX_RESET_OPERATION_INDEX_STATE,
  MMSX_SEARCH_OPERATION_INDEX_FAILED,
  MMSX_SEARCH_OPERATION_INDEX_START,
  MMSX_SEARCH_OPERATION_INDEX_SUCCESS,
  MMSX_UPDATE_OPERATION_INDEX_FAILED,
  MMSX_UPDATE_OPERATION_INDEX_START,
  MMSX_UPDATE_OPERATION_INDEX_SUCCESS,
} from '../actions/operation-index'

const initialState = {
  isLoading: false,
  list: [],
  detail: {},
  total: null,
}

export default function operationIndex(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_OPERATION_INDEX_START:
    case MMSX_GET_DETAIL_OPERATION_INDEX_START:
    case MMSX_ACTIVE_OPERATION_INDEX_START:
    case MMSX_IN_ACTIVE_OPERATION_INDEX_START:
    case MMSX_CREATE_OPERATION_INDEX_START:
    case MMSX_UPDATE_OPERATION_INDEX_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_OPERATION_INDEX_FAILED:
    case MMSX_GET_DETAIL_OPERATION_INDEX_FAILED:
    case MMSX_ACTIVE_OPERATION_INDEX_SUCCESS:
    case MMSX_ACTIVE_OPERATION_INDEX_FAILED:
    case MMSX_IN_ACTIVE_OPERATION_INDEX_SUCCESS:
    case MMSX_IN_ACTIVE_OPERATION_INDEX_FAILED:
    case MMSX_CREATE_OPERATION_INDEX_SUCCESS:
    case MMSX_CREATE_OPERATION_INDEX_FAILED:
    case MMSX_UPDATE_OPERATION_INDEX_SUCCESS:
    case MMSX_UPDATE_OPERATION_INDEX_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_SEARCH_OPERATION_INDEX_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case MMSX_GET_DETAIL_OPERATION_INDEX_SUCCESS:
      return {
        ...state,
        detail: action.payload,
        isLoading: false,
      }
    case MMSX_RESET_OPERATION_INDEX_STATE:
      return {
        ...state,
        detail: {},
      }
    case MMSX_RESET_OPERATION_INDEX_LIST_STATE:
      return {
        ...state,
        list: [],
        detail: {},
      }
    default:
      return state
  }
}
