import {
  MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_FAILED,
  MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_START,
  MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_SUCCESS,
  MMSX_GET_INVENTORY_DETAIL_FAILED,
  MMSX_GET_INVENTORY_DETAIL_START,
  MMSX_GET_INVENTORY_DETAIL_SUCCESS,
  MMSX_SEARCH_WAREHOUSE_INVENTORY_FAILED,
  MMSX_SEARCH_WAREHOUSE_INVENTORY_START,
  MMSX_SEARCH_WAREHOUSE_INVENTORY_SUCCESS,
} from '../actions/warehouse-inventory'

const initialState = {
  inventoryList: [],
  inventoryDeviceList: [],
  inventoryDetail: {},
  isLoading: false,
  total: null,
}

export default function warehouseInventory(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_WAREHOUSE_INVENTORY_START:
    case MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_START:
    case MMSX_GET_INVENTORY_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_WAREHOUSE_INVENTORY_SUCCESS:
      return {
        ...state,
        inventoryList: action?.payload?.list,
        total: action?.payload?.total,
        isLoading: false,
      }
    case MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_SUCCESS:
      return {
        ...state,
        inventoryDeviceList: action?.payload?.list,
        total: action?.payload?.total,
        isLoading: false,
      }
    case MMSX_GET_INVENTORY_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        inventoryDetail: action.payload,
      }
    case MMSX_SEARCH_WAREHOUSE_INVENTORY_FAILED:
    case MMSX_GET_INVENTORY_BY_WAREHOUSE_DEVICE_GROUP_FAILED:
    case MMSX_GET_INVENTORY_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
