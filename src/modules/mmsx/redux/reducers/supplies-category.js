import {
  GET_ALL_CONFRIM_SUPPLIES_CATEGORY_FAIL,
  GET_ALL_CONFRIM_SUPPLIES_CATEGORY_START,
  GET_ALL_CONFRIM_SUPPLIES_CATEGORY_SUCCESS,
  GET_SUPPLIES_CATEGORY_FAIL,
  GET_SUPPLIES_CATEGORY_START,
  GET_SUPPLIES_CATEGORY_SUCCESS,
  SEARCH_SUPPLIES_CATEGORY_FAIL,
  SEARCH_SUPPLIES_CATEGORY_START,
  SEARCH_SUPPLIES_CATEGORY_SUCCESS,
  RESET_SUPPLIES_CATEGORY,
  MMSX_ACTIVE_SUPPLIES_CATEGORY_START,
  MMSX_ACTIVE_SUPPLIES_CATEGORY_SUCCESS,
  MMSX_ACTIVE_SUPPLIES_CATEGORY_FAILED,
  MMSX_IN_ACTIVE_SUPPLIES_CATEGORY_START,
  MMSX_IN_ACTIVE_SUPPLIES_CATEGORY_SUCCESS,
  MMSX_IN_ACTIVE_SUPPLIES_CATEGORY_FAILED,
} from '~/modules/mmsx/redux/actions/supplies-category'

const initialState = {
  suppliesCategoryList: [],
  suppliesCategoryDetail: {},
  confirmSuppliesCategory: [],
  total: null,
  isLoading: false,
}

export default function suppliesCategory(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SUPPLIES_CATEGORY_START:
    case MMSX_ACTIVE_SUPPLIES_CATEGORY_START:
    case MMSX_IN_ACTIVE_SUPPLIES_CATEGORY_START:
    case GET_ALL_CONFRIM_SUPPLIES_CATEGORY_START:
    case GET_SUPPLIES_CATEGORY_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_SUPPLIES_CATEGORY_SUCCESS:
      return {
        ...state,
        suppliesCategoryList: action?.payload?.items,
        total: action?.payload?.meta?.total,
        isLoading: false,
      }
    case SEARCH_SUPPLIES_CATEGORY_FAIL:
      return {
        ...state,
        suppliesCategoryList: [],
        isLoading: false,
      }
    case GET_SUPPLIES_CATEGORY_SUCCESS: {
      return {
        ...state,
        suppliesCategoryDetail: action?.payload,
        isLoading: false,
      }
    }
    case GET_SUPPLIES_CATEGORY_FAIL:
    case MMSX_ACTIVE_SUPPLIES_CATEGORY_SUCCESS:
    case MMSX_ACTIVE_SUPPLIES_CATEGORY_FAILED:
    case MMSX_IN_ACTIVE_SUPPLIES_CATEGORY_SUCCESS:
    case MMSX_IN_ACTIVE_SUPPLIES_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_ALL_CONFRIM_SUPPLIES_CATEGORY_SUCCESS:
      return {
        ...state,
        confirmSuppliesCategory: action?.payload,
        isLoading: false,
      }
    case GET_ALL_CONFRIM_SUPPLIES_CATEGORY_FAIL:
      return {
        ...state,
        confirmSuppliesCategory: [],
        isLoading: false,
      }
    case RESET_SUPPLIES_CATEGORY:
      return {
        ...state,
        suppliesCategoryDetail: {},
      }
    default:
      return state
  }
}
