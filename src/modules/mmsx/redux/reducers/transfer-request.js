import {
  CONFIRM_TRANSFER_REQUEST_FAIL,
  CONFIRM_TRANSFER_REQUEST_START,
  CONFIRM_TRANSFER_REQUEST_SUCCESS,
  GET_TRANSFER_REQUEST_DETAIL_FAIL,
  GET_TRANSFER_REQUEST_DETAIL_START,
  GET_TRANSFER_REQUEST_DETAIL_SUCCESS,
  GET_TRANSFER_REQUEST_LIST_FAIL,
  GET_TRANSFER_REQUEST_LIST_START,
  GET_TRANSFER_REQUEST_LIST_SUCCESS,
  REJECT_TRANSFER_REQUEST_FAIL,
  REJECT_TRANSFER_REQUEST_START,
  REJECT_TRANSFER_REQUEST_SUCCESS,
  CREATE_TRANSFER_REQUEST,
  CREATE_TRANSFER_REQUEST_SUCCESS,
  CREATE_TRANSFER_REQUEST_FAIL,
  UPDATE_TRANSFER_REQUEST,
  UPDATE_TRANSFER_REQUEST_FAIL,
  UPDATE_TRANSFER_REQUEST_SUCCESS,
  DELETE_TRANSFER_REQUEST_START,
  DELETE_TRANSFER_REQUEST_FAIL,
  DELETE_TRANSFER_REQUEST_SUCCESS,
  RESET_STATE_TRANSFER_REQUEST,
} from '../actions/transfer-request'

const initialState = {
  transferRequestList: [],
  transferRequestDetail: {},
  isLoading: false,
  jobList: [],
  total: null,
}

export default function transferRequest(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSFER_REQUEST_LIST_START:
    case CONFIRM_TRANSFER_REQUEST_START:
    case REJECT_TRANSFER_REQUEST_START:
    case GET_TRANSFER_REQUEST_DETAIL_START:
    case CREATE_TRANSFER_REQUEST:
    case UPDATE_TRANSFER_REQUEST:
    case DELETE_TRANSFER_REQUEST_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_TRANSFER_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transferRequestList: action.payload.items,
        total: action?.payload?.meta?.total,
      }
    case GET_TRANSFER_REQUEST_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transferRequestDetail: action.payload,
      }
    case GET_TRANSFER_REQUEST_LIST_FAIL:
    case GET_TRANSFER_REQUEST_DETAIL_FAIL:
    case CONFIRM_TRANSFER_REQUEST_SUCCESS:
    case CONFIRM_TRANSFER_REQUEST_FAIL:
    case REJECT_TRANSFER_REQUEST_SUCCESS:
    case REJECT_TRANSFER_REQUEST_FAIL:
    case CREATE_TRANSFER_REQUEST_SUCCESS:
    case CREATE_TRANSFER_REQUEST_FAIL:
    case UPDATE_TRANSFER_REQUEST_FAIL:
    case UPDATE_TRANSFER_REQUEST_SUCCESS:
    case DELETE_TRANSFER_REQUEST_SUCCESS:
    case DELETE_TRANSFER_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_STATE_TRANSFER_REQUEST:
      return {
        ...state,
        transferRequestDetail: {},
      }
    default:
      return state
  }
}
