import {
  CONFIRM_WAREHOUSE_IMPORT_REQUEST_FAIL,
  CONFIRM_WAREHOUSE_IMPORT_REQUEST_START,
  CONFIRM_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
  DELETE_WAREHOUSE_IMPORT_REQUEST_FAIL,
  DELETE_WAREHOUSE_IMPORT_REQUEST_START,
  DELETE_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
  MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_FAIL,
  MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_START,
  MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
  MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_FAIL,
  MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_START,
  MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
  MMSX_RESET_WAREHOUSE_IMPORT_REQUEST_STATE,
  MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_FAIL,
  MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_START,
  MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
  MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_FAIL,
  MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_START,
  MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
  REJECT_WAREHOUSE_IMPORT_REQUEST_FAIL,
  REJECT_WAREHOUSE_IMPORT_REQUEST_START,
  REJECT_WAREHOUSE_IMPORT_REQUEST_SUCCESS,
} from '../actions/warehouse-import-request'

const initialState = {
  list: [],
  detail: {},
  total: null,
  isLoading: false,
}

export default function warehouseImportRequest(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_START:
    case MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_START:
    case MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_START:
    case MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_START:
    case CONFIRM_WAREHOUSE_IMPORT_REQUEST_START:
    case REJECT_WAREHOUSE_IMPORT_REQUEST_START:
    case DELETE_WAREHOUSE_IMPORT_REQUEST_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_SUCCESS:
      return {
        ...state,
        list: action?.payload?.list,
        total: action?.payload?.total,
        isLoading: false,
      }

    case MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detail: action?.payload,
      }
    case MMSX_GET_DETAIL_WAREHOUSE_IMPORT_REQUEST_FAIL:
    case MMSX_SEARCH_WAREHOUSE_IMPORT_REQUEST_FAIL:
    case MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_FAIL:
    case MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_FAIL:
    case MMSX_UPDATE_WAREHOUSE_IMPORT_REQUEST_SUCCESS:
    case MMSX_CREATE_WAREHOUSE_IMPORT_REQUEST_SUCCESS:
    case CONFIRM_WAREHOUSE_IMPORT_REQUEST_SUCCESS:
    case CONFIRM_WAREHOUSE_IMPORT_REQUEST_FAIL:
    case REJECT_WAREHOUSE_IMPORT_REQUEST_SUCCESS:
    case REJECT_WAREHOUSE_IMPORT_REQUEST_FAIL:
    case DELETE_WAREHOUSE_IMPORT_REQUEST_SUCCESS:
    case DELETE_WAREHOUSE_IMPORT_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_RESET_WAREHOUSE_IMPORT_REQUEST_STATE:
      return {
        ...state,
        detail: {},
      }
    default:
      return state
  }
}