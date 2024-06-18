import {
  GET_DETAIL_DEVICE_STATUS,
  GET_DETAIL_DEVICE_STATUS_FAIL,
  GET_DETAIL_DEVICE_STATUS_SUCCESS,
  GET_LIST_DEVICE_STATUS,
  GET_LIST_DEVICE_STATUS_FAIL,
  GET_LIST_DEVICE_STATUS_SUCCESS,
  UPDATE_DEVICE_STATUS,
  UPDATE_DEVICE_STATUS_FAIL,
  UPDATE_DEVICE_STATUS_SUCCESS,
  CREATE_INFO_DEVICE_STATUS,
  CREATE_INFO_DEVICE_STATUS_FAIL,
  CREATE_INFO_DEVICE_STATUS_SUCCESS,
  UPDATE_INFO_DEVICE_STATUS,
  UPDATE_INFO_DEVICE_STATUS_FAIL,
  UPDATE_INFO_DEVICE_STATUS_SUCCESS,
  GET_CREATE_INFO_FORM_DATA,
  GET_CREATE_INFO_FORM_DATA_FAIL,
  GET_CREATE_INFO_FORM_DATA_SUCCESS,
  RESET_DEVICE_STATUS,
  GET_DETAIL_OF_DEVICE_STATUS,
  GET_DETAIL_OF_DEVICE_STATUS_FAIL,
  GET_DETAIL_OF_DEVICE_STATUS_SUCCESS,
  RESET_DETAIL_OF_DEVICE_STATUS,
} from '~/modules/mmsx/redux/actions/device-status'

const initialState = {
  isLoading: false,
  deviceStatusList: [],
  detailList: [],
  total: null,
  totalDetail: null,
  detailMeta: {},
  deviceStatusDetail: null,
  dateExport: '',
  infoData: {},
  detailOfStatus: {},
}

export default function deviceStatus(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_DEVICE_STATUS:
    case GET_DETAIL_DEVICE_STATUS:
    case UPDATE_DEVICE_STATUS:
    case CREATE_INFO_DEVICE_STATUS:
    case UPDATE_INFO_DEVICE_STATUS:
    case GET_CREATE_INFO_FORM_DATA:
    case GET_DETAIL_OF_DEVICE_STATUS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CREATE_INFO_FORM_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        infoData: action?.payload,
      }
    case GET_LIST_DEVICE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceStatusList: action?.payload?.items,
        dateExport: action?.payload?.dateExport,
        total: action?.payload?.meta?.total,
      }
    case GET_DETAIL_DEVICE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // deviceStatusDetail: action?.payload?.device,
        totalDetail: action?.payload?.total,
        detailList: action?.payload?.detailList,
      }
    case GET_LIST_DEVICE_STATUS_FAIL:
    case GET_DETAIL_DEVICE_STATUS_FAIL:
    case UPDATE_DEVICE_STATUS_FAIL:
    case UPDATE_DEVICE_STATUS_SUCCESS:
    case CREATE_INFO_DEVICE_STATUS_SUCCESS:
    case CREATE_INFO_DEVICE_STATUS_FAIL:
    case UPDATE_INFO_DEVICE_STATUS_SUCCESS:
    case UPDATE_INFO_DEVICE_STATUS_FAIL:
    case GET_CREATE_INFO_FORM_DATA_FAIL:
    case GET_DETAIL_OF_DEVICE_STATUS_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_DETAIL_OF_DEVICE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detailOfStatus: action.payload,
      }
    case RESET_DETAIL_OF_DEVICE_STATUS:
      return {
        ...state,
        detailOfStatus: {},
      }
    case RESET_DEVICE_STATUS:
      return {
        ...state,
        deviceStatusDetail: {},
      }
    default:
      return state
  }
}
