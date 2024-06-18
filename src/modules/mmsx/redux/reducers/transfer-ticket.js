import {
  CONFIRM_TRANSFER_TICKET_FAIL,
  CONFIRM_TRANSFER_TICKET_START,
  CONFIRM_TRANSFER_TICKET_SUCCESS,
  GET_TRANSFER_TICKET_DETAIL_FAIL,
  GET_TRANSFER_TICKET_DETAIL_START,
  GET_TRANSFER_TICKET_DETAIL_SUCCESS,
  GET_TRANSFER_TICKET_LIST_FAIL,
  GET_TRANSFER_TICKET_LIST_START,
  GET_TRANSFER_TICKET_LIST_SUCCESS,
  REJECT_TRANSFER_TICKET_FAIL,
  REJECT_TRANSFER_TICKET_START,
  REJECT_TRANSFER_TICKET_SUCCESS,
  CREATE_TRANSFER_TICKET,
  CREATE_TRANSFER_TICKET_SUCCESS,
  CREATE_TRANSFER_TICKET_FAIL,
  UPDATE_TRANSFER_TICKET,
  UPDATE_TRANSFER_TICKET_FAIL,
  UPDATE_TRANSFER_TICKET_SUCCESS,
  DELETE_TRANSFER_TICKET_START,
  DELETE_TRANSFER_TICKET_FAIL,
  DELETE_TRANSFER_TICKET_SUCCESS,
  RESET_STATE_TRANSFER_TICKET,
} from '../actions/transfer-ticket'

const initialState = {
  transferTicketList: [],
  transferTicketDetail: {},
  isLoading: false,
  jobList: [],
  total: null,
}

export default function transferTicket(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSFER_TICKET_LIST_START:
    case CONFIRM_TRANSFER_TICKET_START:
    case REJECT_TRANSFER_TICKET_START:
    case GET_TRANSFER_TICKET_DETAIL_START:
    case CREATE_TRANSFER_TICKET:
    case UPDATE_TRANSFER_TICKET:
    case DELETE_TRANSFER_TICKET_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_TRANSFER_TICKET_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transferTicketList: action.payload.items,
        total: action?.payload?.meta?.total,
      }
    case GET_TRANSFER_TICKET_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transferTicketDetail: action.payload,
      }
    case GET_TRANSFER_TICKET_LIST_FAIL:
    case GET_TRANSFER_TICKET_DETAIL_FAIL:
    case CONFIRM_TRANSFER_TICKET_SUCCESS:
    case CONFIRM_TRANSFER_TICKET_FAIL:
    case REJECT_TRANSFER_TICKET_SUCCESS:
    case REJECT_TRANSFER_TICKET_FAIL:
    case CREATE_TRANSFER_TICKET_SUCCESS:
    case CREATE_TRANSFER_TICKET_FAIL:
    case UPDATE_TRANSFER_TICKET_FAIL:
    case UPDATE_TRANSFER_TICKET_SUCCESS:
    case DELETE_TRANSFER_TICKET_SUCCESS:
    case DELETE_TRANSFER_TICKET_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_STATE_TRANSFER_TICKET:
      return {
        ...state,
        transferTicketDetail: {},
      }
    default:
      return state
  }
}
