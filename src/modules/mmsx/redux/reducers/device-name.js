import {
  MMSX_ACTIVE_DEVICE_NAME_FAILED,
  MMSX_ACTIVE_DEVICE_NAME_START,
  MMSX_ACTIVE_DEVICE_NAME_SUCCESS,
  MMSX_CREATE_DEVICE_NAME_FAILED,
  MMSX_CREATE_DEVICE_NAME_START,
  MMSX_CREATE_DEVICE_NAME_SUCCESS,
  MMSX_GET_DETAIL_DEVICE_NAME_FAILED,
  MMSX_GET_DETAIL_DEVICE_NAME_START,
  MMSX_GET_DETAIL_DEVICE_NAME_SUCCESS,
  MMSX_IN_ACTIVE_DEVICE_NAME_FAILED,
  MMSX_IN_ACTIVE_DEVICE_NAME_START,
  MMSX_IN_ACTIVE_DEVICE_NAME_SUCCESS,
  MMSX_RESET_DEVICE_NAME_STATE,
  MMSX_SEARCH_DEVICE_NAME_FAILED,
  MMSX_SEARCH_DEVICE_NAME_START,
  MMSX_SEARCH_DEVICE_NAME_SUCCESS,
  MMSX_UPDATE_DEVICE_NAME_FAILED,
  MMSX_UPDATE_DEVICE_NAME_START,
  MMSX_UPDATE_DEVICE_NAME_SUCCESS,
} from '../actions/device-name'

const initialState = {
  isLoading: false,
  deviceNameList: [],
  deviceNameDetail: {},
  total: null,
}

export default function deviceType(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_DEVICE_NAME_START:
    case MMSX_GET_DETAIL_DEVICE_NAME_START:
    case MMSX_ACTIVE_DEVICE_NAME_START:
    case MMSX_IN_ACTIVE_DEVICE_NAME_START:
    case MMSX_CREATE_DEVICE_NAME_START:
    case MMSX_UPDATE_DEVICE_NAME_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_DEVICE_NAME_FAILED:
    case MMSX_GET_DETAIL_DEVICE_NAME_FAILED:
    case MMSX_ACTIVE_DEVICE_NAME_SUCCESS:
    case MMSX_ACTIVE_DEVICE_NAME_FAILED:
    case MMSX_IN_ACTIVE_DEVICE_NAME_SUCCESS:
    case MMSX_IN_ACTIVE_DEVICE_NAME_FAILED:
    case MMSX_CREATE_DEVICE_NAME_SUCCESS:
    case MMSX_CREATE_DEVICE_NAME_FAILED:
    case MMSX_UPDATE_DEVICE_NAME_SUCCESS:
    case MMSX_UPDATE_DEVICE_NAME_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_SEARCH_DEVICE_NAME_SUCCESS:
      return {
        ...state,
        deviceNameList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case MMSX_GET_DETAIL_DEVICE_NAME_SUCCESS:
      return {
        ...state,
        deviceNameDetail: action.payload,
        isLoading: false,
      }
    case MMSX_RESET_DEVICE_NAME_STATE:
      return {
        ...state,
        deviceNameDetail: {},
      }
    default:
      return state
  }
}
