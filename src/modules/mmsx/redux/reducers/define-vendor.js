import {
  CREATE_VENDOR_FAILED,
  CREATE_VENDOR_START,
  CREATE_VENDOR_SUCCESS,
  DELETE_VENDOR_FAILED,
  DELETE_VENDOR_START,
  DELETE_VENDOR_SUCCESS,
  GET_VENDOR_DETAILS_FAILED,
  GET_VENDOR_DETAILS_START,
  GET_VENDOR_DETAILS_SUCCESS,
  SEARCH_VENDORS_FAILED,
  SEARCH_VENDORS_START,
  SEARCH_VENDORS_SUCCESS,
  UPDATE_VENDOR_FAILED,
  UPDATE_VENDOR_START,
  UPDATE_VENDOR_SUCCESS,
  IMPORT_VENDOR_START,
  IMPORT_VENDOR_SUCCESS,
  IMPORT_VENDOR_FAILED,
  RESET_DETAIL_VENDOR_STATE,
  MMSX_ACTIVE_VENDOR_START,
  MMSX_IN_ACTIVE_VENDOR_START,
  MMSX_ACTIVE_VENDOR_SUCCESS,
  MMSX_ACTIVE_VENDOR_FAILED,
  MMSX_IN_ACTIVE_VENDOR_SUCCESS,
  MMSX_IN_ACTIVE_VENDOR_FAILED,
} from '../actions/define-vendor'

const initialState = {
  isLoading: false,
  vendorsList: [],
  vendorDetails: {},
  total: null,
  importLog: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineVendor(state = initialState, action) {
  switch (action.type) {
    case SEARCH_VENDORS_START:
    case CREATE_VENDOR_START:
    case UPDATE_VENDOR_START:
    case DELETE_VENDOR_START:
    case IMPORT_VENDOR_START:
    case GET_VENDOR_DETAILS_START:
    case MMSX_ACTIVE_VENDOR_START:
    case MMSX_IN_ACTIVE_VENDOR_START:
      return {
        ...state,
        isLoading: true,
      }

    case SEARCH_VENDORS_SUCCESS:
      return {
        ...state,
        vendorsList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_VENDORS_FAILED:
      return {
        ...state,
        vendorsList: [],
        isLoading: false,
        total: 0,
      }

    case CREATE_VENDOR_SUCCESS:
    case CREATE_VENDOR_FAILED:
    case UPDATE_VENDOR_SUCCESS:
    case UPDATE_VENDOR_FAILED:
    case DELETE_VENDOR_SUCCESS:
    case DELETE_VENDOR_FAILED:
    case MMSX_ACTIVE_VENDOR_SUCCESS:
    case MMSX_ACTIVE_VENDOR_FAILED:
    case MMSX_IN_ACTIVE_VENDOR_SUCCESS:
    case MMSX_IN_ACTIVE_VENDOR_FAILED:
      return {
        ...state,
        isLoading: false,
      }

    case GET_VENDOR_DETAILS_SUCCESS:
      return {
        ...state,
        vendorDetails: action.payload,
        isLoading: false,
      }
    case GET_VENDOR_DETAILS_FAILED:
      return {
        ...state,
        vendorDetails: {},
        isLoading: false,
      }
    case IMPORT_VENDOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        importLog: action.payload,
      }
    case IMPORT_VENDOR_FAILED:
      return {
        ...state,
        isLoading: false,
        importLog: {},
      }
    case RESET_DETAIL_VENDOR_STATE:
      return {
        ...state,
        vendorDetails: {},
      }
    default:
      return state
  }
}
