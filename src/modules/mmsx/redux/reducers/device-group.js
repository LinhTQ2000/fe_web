import {
  MMSX_ACTIVE_DEVICE_GROUP_FAILED,
  MMSX_ACTIVE_DEVICE_GROUP_START,
  MMSX_ACTIVE_DEVICE_GROUP_SUCCESS,
  MMSX_CREATE_DEVICE_GROUP_FAILED,
  MMSX_CREATE_DEVICE_GROUP_START,
  MMSX_CREATE_DEVICE_GROUP_SUCCESS,
  MMSX_GET_DETAIL_DEVICE_GROUP_FAILED,
  MMSX_GET_DETAIL_DEVICE_GROUP_START,
  MMSX_GET_DETAIL_DEVICE_GROUP_SUCCESS,
  MMSX_IN_ACTIVE_DEVICE_GROUP_FAILED,
  MMSX_IN_ACTIVE_DEVICE_GROUP_START,
  MMSX_IN_ACTIVE_DEVICE_GROUP_SUCCESS,
  MMSX_RESET_DEVICE_GROUP_STATE,
  MMSX_SEARCH_DEVICE_GROUP_FAILED,
  MMSX_SEARCH_DEVICE_GROUP_START,
  MMSX_SEARCH_DEVICE_GROUP_SUCCESS,
  MMSX_UPDATE_DEVICE_GROUP_FAILED,
  MMSX_UPDATE_DEVICE_GROUP_START,
  MMSX_UPDATE_DEVICE_GROUP_SUCCESS,
} from '../actions/device-group'

const initialState = {
  isLoading: false,
  deviceGroupList: [],
  deviceGroupDetails: {},
  total: null,
}

export default function deviceGroup(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_DEVICE_GROUP_START:
    case MMSX_GET_DETAIL_DEVICE_GROUP_START:
    case MMSX_ACTIVE_DEVICE_GROUP_START:
    case MMSX_IN_ACTIVE_DEVICE_GROUP_START:
    case MMSX_CREATE_DEVICE_GROUP_START:
    case MMSX_UPDATE_DEVICE_GROUP_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_DEVICE_GROUP_FAILED:
    case MMSX_GET_DETAIL_DEVICE_GROUP_FAILED:
    case MMSX_ACTIVE_DEVICE_GROUP_SUCCESS:
    case MMSX_ACTIVE_DEVICE_GROUP_FAILED:
    case MMSX_IN_ACTIVE_DEVICE_GROUP_SUCCESS:
    case MMSX_IN_ACTIVE_DEVICE_GROUP_FAILED:
    case MMSX_CREATE_DEVICE_GROUP_SUCCESS:
    case MMSX_CREATE_DEVICE_GROUP_FAILED:
    case MMSX_UPDATE_DEVICE_GROUP_SUCCESS:
    case MMSX_UPDATE_DEVICE_GROUP_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_SEARCH_DEVICE_GROUP_SUCCESS:
      return {
        ...state,
        deviceGroupList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case MMSX_GET_DETAIL_DEVICE_GROUP_SUCCESS:
      return {
        ...state,
        deviceGroupDetails: action.payload,
        isLoading: false,
      }
    case MMSX_RESET_DEVICE_GROUP_STATE:
      return {
        ...state,
        deviceGroupDetails: {},
      }
    default:
      return state
  }
}
