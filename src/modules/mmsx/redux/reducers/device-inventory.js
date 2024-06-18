import {
  CONFIRM_DEVICE_INVENTORY_FAIL,
  CONFIRM_DEVICE_INVENTORY_START,
  CONFIRM_DEVICE_INVENTORY_SUCCESS,
  GET_DEVICE_INVENTORY_DETAIL_FAIL,
  GET_DEVICE_INVENTORY_DETAIL_START,
  GET_DEVICE_INVENTORY_DETAIL_SUCCESS,
  GET_DEVICE_INVENTORY_LIST_FAIL,
  GET_DEVICE_INVENTORY_LIST_START,
  GET_DEVICE_INVENTORY_LIST_SUCCESS,
  REJECT_DEVICE_INVENTORY_FAIL,
  REJECT_DEVICE_INVENTORY_START,
  REJECT_DEVICE_INVENTORY_SUCCESS,
  CREATE_DEVICE_INVENTORY,
  CREATE_DEVICE_INVENTORY_SUCCESS,
  CREATE_DEVICE_INVENTORY_FAIL,
  UPDATE_DEVICE_INVENTORY,
  UPDATE_DEVICE_INVENTORY_FAIL,
  UPDATE_DEVICE_INVENTORY_SUCCESS,
  DELETE_DEVICE_INVENTORY_START,
  DELETE_DEVICE_INVENTORY_FAIL,
  DELETE_DEVICE_INVENTORY_SUCCESS,
  RESET_STATE_DEVICE_INVENTORY,
} from '../actions/device-inventory'

const initialState = {
  deviceInventoryList: [],
  deviceInventoryDetail: {},
  isLoading: false,
  total: null,
}

export default function deviceInventory(state = initialState, action) {
  switch (action.type) {
    case GET_DEVICE_INVENTORY_LIST_START:
    case CONFIRM_DEVICE_INVENTORY_START:
    case REJECT_DEVICE_INVENTORY_START:
    case GET_DEVICE_INVENTORY_DETAIL_START:
    case CREATE_DEVICE_INVENTORY:
    case UPDATE_DEVICE_INVENTORY:
    case DELETE_DEVICE_INVENTORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_DEVICE_INVENTORY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceInventoryList: action.payload.items,
        total: action?.payload?.meta?.total,
      }
    case GET_DEVICE_INVENTORY_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceInventoryDetail: action.payload,
      }
    case GET_DEVICE_INVENTORY_LIST_FAIL:
    case GET_DEVICE_INVENTORY_DETAIL_FAIL:
    case CONFIRM_DEVICE_INVENTORY_SUCCESS:
    case CONFIRM_DEVICE_INVENTORY_FAIL:
    case REJECT_DEVICE_INVENTORY_SUCCESS:
    case REJECT_DEVICE_INVENTORY_FAIL:
    case CREATE_DEVICE_INVENTORY_SUCCESS:
    case CREATE_DEVICE_INVENTORY_FAIL:
    case UPDATE_DEVICE_INVENTORY_FAIL:
    case UPDATE_DEVICE_INVENTORY_SUCCESS:
    case DELETE_DEVICE_INVENTORY_SUCCESS:
    case DELETE_DEVICE_INVENTORY_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_STATE_DEVICE_INVENTORY:
      return {
        ...state,
        deviceInventoryDetail: {},
      }
    default:
      return state
  }
}
