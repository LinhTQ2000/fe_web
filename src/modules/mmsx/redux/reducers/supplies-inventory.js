import {
  CONFIRM_SUPPLIES_INVENTORY_FAIL,
  CONFIRM_SUPPLIES_INVENTORY_START,
  CONFIRM_SUPPLIES_INVENTORY_SUCCESS,
  GET_SUPPLIES_INVENTORY_DETAIL_FAIL,
  GET_SUPPLIES_INVENTORY_DETAIL_START,
  GET_SUPPLIES_INVENTORY_DETAIL_SUCCESS,
  GET_SUPPLIES_INVENTORY_LIST_FAIL,
  GET_SUPPLIES_INVENTORY_LIST_START,
  GET_SUPPLIES_INVENTORY_LIST_SUCCESS,
  REJECT_SUPPLIES_INVENTORY_FAIL,
  REJECT_SUPPLIES_INVENTORY_START,
  REJECT_SUPPLIES_INVENTORY_SUCCESS,
  CREATE_SUPPLIES_INVENTORY,
  CREATE_SUPPLIES_INVENTORY_SUCCESS,
  CREATE_SUPPLIES_INVENTORY_FAIL,
  UPDATE_SUPPLIES_INVENTORY,
  UPDATE_SUPPLIES_INVENTORY_FAIL,
  UPDATE_SUPPLIES_INVENTORY_SUCCESS,
  DELETE_SUPPLIES_INVENTORY_START,
  DELETE_SUPPLIES_INVENTORY_FAIL,
  DELETE_SUPPLIES_INVENTORY_SUCCESS,
  RESET_STATE_SUPPLIES_INVENTORY,
} from '../actions/supplies-inventory'

const initialState = {
  suppliesInventoryList: [],
  suppliesInventoryDetail: {},
  isLoading: false,
  total: null,
}

export default function suppliesInventory(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPLIES_INVENTORY_LIST_START:
    case CONFIRM_SUPPLIES_INVENTORY_START:
    case REJECT_SUPPLIES_INVENTORY_START:
    case GET_SUPPLIES_INVENTORY_DETAIL_START:
    case CREATE_SUPPLIES_INVENTORY:
    case UPDATE_SUPPLIES_INVENTORY:
    case DELETE_SUPPLIES_INVENTORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_SUPPLIES_INVENTORY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        suppliesInventoryList: action.payload.items,
        total: action?.payload?.meta?.total,
      }
    case GET_SUPPLIES_INVENTORY_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        suppliesInventoryDetail: action.payload,
      }
    case GET_SUPPLIES_INVENTORY_LIST_FAIL:
    case GET_SUPPLIES_INVENTORY_DETAIL_FAIL:
    case CONFIRM_SUPPLIES_INVENTORY_SUCCESS:
    case CONFIRM_SUPPLIES_INVENTORY_FAIL:
    case REJECT_SUPPLIES_INVENTORY_SUCCESS:
    case REJECT_SUPPLIES_INVENTORY_FAIL:
    case CREATE_SUPPLIES_INVENTORY_SUCCESS:
    case CREATE_SUPPLIES_INVENTORY_FAIL:
    case UPDATE_SUPPLIES_INVENTORY_FAIL:
    case UPDATE_SUPPLIES_INVENTORY_SUCCESS:
    case DELETE_SUPPLIES_INVENTORY_SUCCESS:
    case DELETE_SUPPLIES_INVENTORY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_STATE_SUPPLIES_INVENTORY:
      return {
        ...state,
        suppliesInventoryDetail: {},
      }
    default:
      return state
  }
}
