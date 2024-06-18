import {
  MMSX_CREATE_WAREHOUSE_DEFINE_FAIL,
  MMSX_CREATE_WAREHOUSE_DEFINE_START,
  MMSX_CREATE_WAREHOUSE_DEFINE_SUCCESS,
  MMSX_GET_DETAIL_WAREHOUSE_DEFINE_FAIL,
  MMSX_GET_DETAIL_WAREHOUSE_DEFINE_START,
  MMSX_GET_DETAIL_WAREHOUSE_DEFINE_SUCCESS,
  MMSX_RESET_WAREHOUSE_DEFINE_STATE,
  MMSX_SEARCH_WAREHOUSE_DEFINE_FAIL,
  MMSX_SEARCH_WAREHOUSE_DEFINE_START,
  MMSX_SEARCH_WAREHOUSE_DEFINE_SUCCESS,
  MMSX_UPDATE_WAREHOUSE_DEFINE_FAIL,
  MMSX_UPDATE_WAREHOUSE_DEFINE_START,
  MMSX_UPDATE_WAREHOUSE_DEFINE_SUCCESS,
} from '../actions/warehouse-define'

const initialState = {
  warehouselList: [],
  warehouselDetail: {},
  total: null,
  isLoading: false,
}

export default function warehouseDefine(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_WAREHOUSE_DEFINE_START:
    case MMSX_GET_DETAIL_WAREHOUSE_DEFINE_START:
    case MMSX_CREATE_WAREHOUSE_DEFINE_START:
    case MMSX_UPDATE_WAREHOUSE_DEFINE_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_WAREHOUSE_DEFINE_SUCCESS:
      return {
        ...state,
        warehouselList: action?.payload?.list,
        total: action?.payload?.total,
        isLoading: false,
      }

    case MMSX_GET_DETAIL_WAREHOUSE_DEFINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        warehouselDetail: action?.payload,
      }
    case MMSX_GET_DETAIL_WAREHOUSE_DEFINE_FAIL:
    case MMSX_SEARCH_WAREHOUSE_DEFINE_FAIL:
    case MMSX_UPDATE_WAREHOUSE_DEFINE_FAIL:
    case MMSX_CREATE_WAREHOUSE_DEFINE_FAIL:
    case MMSX_UPDATE_WAREHOUSE_DEFINE_SUCCESS:
    case MMSX_CREATE_WAREHOUSE_DEFINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_RESET_WAREHOUSE_DEFINE_STATE:
      return {
        ...state,
        warehouselDetail: {},
      }
    default:
      return state
  }
}
