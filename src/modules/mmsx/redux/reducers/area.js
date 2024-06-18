import {
  MMSX_ACTIVE_AREA_FAILED,
  MMSX_ACTIVE_AREA_START,
  MMSX_ACTIVE_AREA_SUCCESS,
  MMSX_CREATE_AREA_FAILED,
  MMSX_CREATE_AREA_START,
  MMSX_CREATE_AREA_SUCCESS,
  MMSX_GET_DETAIL_AREA_FAILED,
  MMSX_GET_DETAIL_AREA_START,
  MMSX_GET_DETAIL_AREA_SUCCESS,
  MMSX_IN_ACTIVE_AREA_FAILED,
  MMSX_IN_ACTIVE_AREA_START,
  MMSX_IN_ACTIVE_AREA_SUCCESS,
  MMSX_RESET_AREA_STATE,
  MMSX_SEARCH_AREA_FAILED,
  MMSX_SEARCH_AREA_START,
  MMSX_SEARCH_AREA_SUCCESS,
  MMSX_UPDATE_AREA_FAILED,
  MMSX_UPDATE_AREA_START,
  MMSX_UPDATE_AREA_SUCCESS,
} from '../actions/area'

const initialState = {
  isLoading: false,
  areaList: [],
  areaDetails: {},
  total: null,
}

export default function areaDefine(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_AREA_START:
    case MMSX_GET_DETAIL_AREA_START:
    case MMSX_ACTIVE_AREA_START:
    case MMSX_IN_ACTIVE_AREA_START:
    case MMSX_CREATE_AREA_START:
    case MMSX_UPDATE_AREA_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_AREA_FAILED:
    case MMSX_GET_DETAIL_AREA_FAILED:
    case MMSX_ACTIVE_AREA_SUCCESS:
    case MMSX_ACTIVE_AREA_FAILED:
    case MMSX_IN_ACTIVE_AREA_SUCCESS:
    case MMSX_IN_ACTIVE_AREA_FAILED:
    case MMSX_CREATE_AREA_SUCCESS:
    case MMSX_CREATE_AREA_FAILED:
    case MMSX_UPDATE_AREA_SUCCESS:
    case MMSX_UPDATE_AREA_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_SEARCH_AREA_SUCCESS:
      return {
        ...state,
        areaList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case MMSX_GET_DETAIL_AREA_SUCCESS:
      return {
        ...state,
        areaDetails: action.payload,
        isLoading: false,
      }
    case MMSX_RESET_AREA_STATE:
      return {
        ...state,
        areaDetails: {},
      }
    default:
      return state
  }
}
