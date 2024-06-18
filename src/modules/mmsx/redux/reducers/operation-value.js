import {
  MMSX_OPERATION_VALUE_CREATE_FAIL,
  MMSX_OPERATION_VALUE_CREATE_START,
  MMSX_OPERATION_VALUE_CREATE_SUCCESS,
  MMSX_OPERATION_VALUE_DETAIL_FAIL,
  MMSX_OPERATION_VALUE_DETAIL_START,
  MMSX_OPERATION_VALUE_DETAIL_SUCCESS,
  MMSX_OPERATION_VALUE_EDIT_FAIL,
  MMSX_OPERATION_VALUE_EDIT_START,
  MMSX_OPERATION_VALUE_EDIT_SUCCESS,
  MMSX_OPERATION_VALUE_LIST_FAIL,
  MMSX_OPERATION_VALUE_LIST_START,
  MMSX_OPERATION_VALUE_LIST_SUCCESS,
  MMSX_RESET_OPERATION_VALUE_DETAIL,
} from '../actions/operation-value'

const initialState = {
  isLoading: false,
  operationList: [],
  operationDetail: {},
  total: null,
}
export default function operationValue(state = initialState, action) {
  switch (action.type) {
    case MMSX_OPERATION_VALUE_LIST_START:
    case MMSX_OPERATION_VALUE_CREATE_START:
    case MMSX_OPERATION_VALUE_DETAIL_START:
    case MMSX_OPERATION_VALUE_EDIT_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_OPERATION_VALUE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        operationList: action.payload.items,
        total: action.payload.meta.total,
      }
    case MMSX_OPERATION_VALUE_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        operationDetail: action.payload,
      }
    case MMSX_OPERATION_VALUE_LIST_FAIL:
    case MMSX_OPERATION_VALUE_CREATE_SUCCESS:
    case MMSX_OPERATION_VALUE_CREATE_FAIL:
    case MMSX_OPERATION_VALUE_EDIT_SUCCESS:
    case MMSX_OPERATION_VALUE_EDIT_FAIL:
    case MMSX_OPERATION_VALUE_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
      }

    case MMSX_RESET_OPERATION_VALUE_DETAIL:
      return {
        ...state,
        operationDetail: {},
      }
    default:
      return state
  }
}
