import {
  MMSX_ACTIVE_DEVICE_TYPE_FAILED,
  MMSX_ACTIVE_DEVICE_TYPE_START,
  MMSX_ACTIVE_DEVICE_TYPE_SUCCESS,
  MMSX_CREATE_DEVICE_TYPE_FAILED,
  MMSX_CREATE_DEVICE_TYPE_START,
  MMSX_CREATE_DEVICE_TYPE_SUCCESS,
  MMSX_GET_DETAIL_DEVICE_TYPE_FAILED,
  MMSX_GET_DETAIL_DEVICE_TYPE_START,
  MMSX_GET_DETAIL_DEVICE_TYPE_SUCCESS,
  MMSX_IN_ACTIVE_DEVICE_TYPE_FAILED,
  MMSX_IN_ACTIVE_DEVICE_TYPE_START,
  MMSX_IN_ACTIVE_DEVICE_TYPE_SUCCESS,
  MMSX_RESET_DEVICE_TYPE_STATE,
  MMSX_SEARCH_DEVICE_TYPE_FAILED,
  MMSX_SEARCH_DEVICE_TYPE_START,
  MMSX_SEARCH_DEVICE_TYPE_SUCCESS,
  MMSX_UPDATE_DEVICE_TYPE_FAILED,
  MMSX_UPDATE_DEVICE_TYPE_START,
  MMSX_UPDATE_DEVICE_TYPE_SUCCESS,
} from '../actions/device-type'

const initialState = {
  isLoading: false,
  deviceTypeList: [],
  deviceTypeDetails: {},
  total: null,
}

export default function deviceType(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_DEVICE_TYPE_START:
    case MMSX_GET_DETAIL_DEVICE_TYPE_START:
    case MMSX_ACTIVE_DEVICE_TYPE_START:
    case MMSX_IN_ACTIVE_DEVICE_TYPE_START:
    case MMSX_CREATE_DEVICE_TYPE_START:
    case MMSX_UPDATE_DEVICE_TYPE_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_DEVICE_TYPE_FAILED:
    case MMSX_GET_DETAIL_DEVICE_TYPE_FAILED:
    case MMSX_ACTIVE_DEVICE_TYPE_SUCCESS:
    case MMSX_ACTIVE_DEVICE_TYPE_FAILED:
    case MMSX_IN_ACTIVE_DEVICE_TYPE_SUCCESS:
    case MMSX_IN_ACTIVE_DEVICE_TYPE_FAILED:
    case MMSX_CREATE_DEVICE_TYPE_SUCCESS:
    case MMSX_CREATE_DEVICE_TYPE_FAILED:
    case MMSX_UPDATE_DEVICE_TYPE_SUCCESS:
    case MMSX_UPDATE_DEVICE_TYPE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_SEARCH_DEVICE_TYPE_SUCCESS:
      return {
        ...state,
        deviceTypeList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case MMSX_GET_DETAIL_DEVICE_TYPE_SUCCESS:
      return {
        ...state,
        deviceTypeDetails: action.payload,
        isLoading: false,
      }
    case MMSX_RESET_DEVICE_TYPE_STATE:
      return {
        ...state,
        deviceTypeDetails: {},
      }
    default:
      return state
  }
}
