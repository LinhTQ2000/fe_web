import {
  CHANGE_STATUS_REQUEST_DEVICE_FAILED,
  CHANGE_STATUS_REQUEST_DEVICE_START,
  CHANGE_STATUS_REQUEST_DEVICE_SUCCESS,
  SEARCH_REQUEST_DEVICE_FAILED,
  SEARCH_REQUEST_DEVICE_START,
  SEARCH_REQUEST_DEVICE_SUCCESS,
  DELETE_REQUEST_DEVICE_FAILED,
  DELETE_REQUEST_DEVICE_START,
  DELETE_REQUEST_DEVICE_SUCCESS,
  CREATE_REQUEST_DEVICE_START,
  CREATE_REQUEST_DEVICE_SUCCESS,
  CREATE_REQUEST_DEVICE_FAILED,
  UPDATE_REQUEST_DEVICE_DETAIL_START,
  UPDATE_REQUEST_DEVICE_DETAIL_SUCCESS,
  UPDATE_REQUEST_DEVICE_DETAIL_FAILED,
  GET_REQUEST_DEVICE_DETAIL_START,
  GET_REQUEST_DEVICE_DETAIL_SUCCESS,
  GET_REQUEST_DEVICE_DETAIL_FAILED,
  RESET_STATE_REQUEST_DEVICE_DETAIL,
  CREATE_REQUEST_DEVICE_RETURN_START,
} from '../actions/request-device'

const initialState = {
  requestDeviceList: [],
  total: null,
  isLoading: false,
  requestDeviceDetail: {},
}

export default function requestDevice(state = initialState, action) {
  switch (action?.type) {
    // -------------------------------------------
    case SEARCH_REQUEST_DEVICE_START:
    case CREATE_REQUEST_DEVICE_RETURN_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_REQUEST_DEVICE_SUCCESS:
      return {
        ...state,
        requestDeviceList: action?.payload?.items,
        total: action?.payload?.meta?.total,
        isLoading: false,
      }
    case SEARCH_REQUEST_DEVICE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CHANGE_STATUS_REQUEST_DEVICE_START:
    case DELETE_REQUEST_DEVICE_START:
      return {
        ...state,
        isLoading: true,
      }
    case CHANGE_STATUS_REQUEST_DEVICE_SUCCESS:
    case DELETE_REQUEST_DEVICE_SUCCESS:
    case CHANGE_STATUS_REQUEST_DEVICE_FAILED:
    case DELETE_REQUEST_DEVICE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    //---------------------------------------------
    /**REQUEST */
    case CREATE_REQUEST_DEVICE_START:
    case UPDATE_REQUEST_DEVICE_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      }
    case CREATE_REQUEST_DEVICE_SUCCESS:
    case UPDATE_REQUEST_DEVICE_DETAIL_SUCCESS:
    case CREATE_REQUEST_DEVICE_FAILED:
    case UPDATE_REQUEST_DEVICE_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_REQUEST_DEVICE_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_REQUEST_DEVICE_DETAIL_SUCCESS:
      return {
        ...state,
        requestDeviceDetail: action?.payload,
        isLoading: false,
      }
    case GET_REQUEST_DEVICE_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    /**RETURN */
    case RESET_STATE_REQUEST_DEVICE_DETAIL:
      return {
        ...state,
        requestDeviceDetail: {},
      }
    default:
      return state
  }
}
