import {
  CONFIRM_WAREHOUSE_EXPORT_TICKET_FAIL,
  CONFIRM_WAREHOUSE_EXPORT_TICKET_START,
  CONFIRM_WAREHOUSE_EXPORT_TICKET_SUCCESS,
  DELETE_WAREHOUSE_EXPORT_TICKET_FAIL,
  DELETE_WAREHOUSE_EXPORT_TICKET_START,
  DELETE_WAREHOUSE_EXPORT_TICKET_SUCCESS,
  MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_FAIL,
  MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_START,
  MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_SUCCESS,
  MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_FAIL,
  MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_START,
  MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_SUCCESS,
  MMSX_RESET_WAREHOUSE_EXPORT_TICKET_STATE,
  MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_FAIL,
  MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_START,
  MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_SUCCESS,
  MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_FAIL,
  MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_START,
  MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_SUCCESS,
  REJECT_WAREHOUSE_EXPORT_TICKET_FAIL,
  REJECT_WAREHOUSE_EXPORT_TICKET_START,
  REJECT_WAREHOUSE_EXPORT_TICKET_SUCCESS,
} from '../actions/warehouse-export-ticket'

const initialState = {
  list: [],
  detail: {},
  total: null,
  isLoading: false,
}

export default function warehouseExportTicket(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_START:
    case MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_START:
    case MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_START:
    case MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_START:
    case CONFIRM_WAREHOUSE_EXPORT_TICKET_START:
    case REJECT_WAREHOUSE_EXPORT_TICKET_START:
    case DELETE_WAREHOUSE_EXPORT_TICKET_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_SUCCESS:
      return {
        ...state,
        list: action?.payload?.list,
        total: action?.payload?.total,
        isLoading: false,
      }

    case MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detail: action?.payload,
      }
    case MMSX_GET_DETAIL_WAREHOUSE_EXPORT_TICKET_FAIL:
    case MMSX_SEARCH_WAREHOUSE_EXPORT_TICKET_FAIL:
    case MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_FAIL:
    case MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_FAIL:
    case MMSX_UPDATE_WAREHOUSE_EXPORT_TICKET_SUCCESS:
    case MMSX_CREATE_WAREHOUSE_EXPORT_TICKET_SUCCESS:
    case CONFIRM_WAREHOUSE_EXPORT_TICKET_SUCCESS:
    case CONFIRM_WAREHOUSE_EXPORT_TICKET_FAIL:
    case REJECT_WAREHOUSE_EXPORT_TICKET_SUCCESS:
    case REJECT_WAREHOUSE_EXPORT_TICKET_FAIL:
    case DELETE_WAREHOUSE_EXPORT_TICKET_SUCCESS:
    case DELETE_WAREHOUSE_EXPORT_TICKET_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_RESET_WAREHOUSE_EXPORT_TICKET_STATE:
      return {
        ...state,
        detail: {},
      }
    default:
      return state
  }
}