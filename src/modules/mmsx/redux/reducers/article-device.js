import {
  MMSX_ACTIVE_ARTICLE_DEVICE_FAILED,
  MMSX_ACTIVE_ARTICLE_DEVICE_START,
  MMSX_ACTIVE_ARTICLE_DEVICE_SUCCESS,
  MMSX_CREATE_ARTICLE_DEVICE_FAILED,
  MMSX_CREATE_ARTICLE_DEVICE_START,
  MMSX_CREATE_ARTICLE_DEVICE_SUCCESS,
  MMSX_GET_DETAIL_ARTICLE_DEVICE_FAILED,
  MMSX_GET_DETAIL_ARTICLE_DEVICE_START,
  MMSX_GET_DETAIL_ARTICLE_DEVICE_SUCCESS,
  MMSX_IN_ACTIVE_ARTICLE_DEVICE_FAILED,
  MMSX_IN_ACTIVE_ARTICLE_DEVICE_START,
  MMSX_IN_ACTIVE_ARTICLE_DEVICE_SUCCESS,
  MMSX_RESET_ARTICLE_DEVICE_STATE,
  MMSX_SEARCH_ARTICLE_DEVICE_FAILED,
  MMSX_SEARCH_ARTICLE_DEVICE_START,
  MMSX_SEARCH_ARTICLE_DEVICE_SUCCESS,
  MMSX_UPDATE_ARTICLE_DEVICE_FAILED,
  MMSX_UPDATE_ARTICLE_DEVICE_START,
  MMSX_UPDATE_ARTICLE_DEVICE_SUCCESS,
} from '../actions/article-device'

const initialState = {
  isLoading: false,
  articleDeviceList: [],
  articleDeviceDetails: {},
  total: null,
}

export default function articleDevice(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_ARTICLE_DEVICE_START:
    case MMSX_GET_DETAIL_ARTICLE_DEVICE_START:
    case MMSX_ACTIVE_ARTICLE_DEVICE_START:
    case MMSX_IN_ACTIVE_ARTICLE_DEVICE_START:
    case MMSX_CREATE_ARTICLE_DEVICE_START:
    case MMSX_UPDATE_ARTICLE_DEVICE_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_ARTICLE_DEVICE_FAILED:
    case MMSX_GET_DETAIL_ARTICLE_DEVICE_FAILED:
    case MMSX_ACTIVE_ARTICLE_DEVICE_SUCCESS:
    case MMSX_ACTIVE_ARTICLE_DEVICE_FAILED:
    case MMSX_IN_ACTIVE_ARTICLE_DEVICE_SUCCESS:
    case MMSX_IN_ACTIVE_ARTICLE_DEVICE_FAILED:
    case MMSX_CREATE_ARTICLE_DEVICE_SUCCESS:
    case MMSX_CREATE_ARTICLE_DEVICE_FAILED:
    case MMSX_UPDATE_ARTICLE_DEVICE_SUCCESS:
    case MMSX_UPDATE_ARTICLE_DEVICE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_SEARCH_ARTICLE_DEVICE_SUCCESS:
      return {
        ...state,
        articleDeviceList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case MMSX_GET_DETAIL_ARTICLE_DEVICE_SUCCESS:
      return {
        ...state,
        articleDeviceDetails: action.payload,
        isLoading: false,
      }
    case MMSX_RESET_ARTICLE_DEVICE_STATE:
      return {
        ...state,
        articleDeviceDetails: {},
      }
    default:
      return state
  }
}
