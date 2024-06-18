import {
  MMSX_SEARCH_SUPPLY_TYPE_FAIL,
  MMSX_SEARCH_SUPPLY_TYPE_START,
  MMSX_SEARCH_SUPPLY_TYPE_SUCCESS,
} from '../actions/supply-type'

const initialState = {
  supplyTypes: [],
  isLoading: false,
}

export default function supplyType(state = initialState, action) {
  switch (action.type) {
    case MMSX_SEARCH_SUPPLY_TYPE_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_SEARCH_SUPPLY_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        supplyTypes: action?.payload?.items,
      }
    case MMSX_SEARCH_SUPPLY_TYPE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
