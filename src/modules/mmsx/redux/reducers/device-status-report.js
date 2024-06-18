import {
  SEARCH_DEVICE_STATISTIC,
  SEARCH_DEVICE_STATISTIC_FAIL,
  SEARCH_DEVICE_STATISTIC_SUCCESS,
  SEARCH_DEVICE_STATUS_DETAIL_FAIL,
  SEARCH_DEVICE_STATUS_DETAIL,
  SEARCH_DEVICE_STATUS_DETAIL_SUCCESS,
  SEARCH_DEVICE_STATUS_REPORT_START,
  SEARCH_DEVICE_STATUS_REPORT_SUCCESS,
  SEARCH_DEVICE_STATUS_REPORT_FAIL,
} from '../actions/device-status-report'

const initialState = {
  isLoading: false,
  deviceStatus: [],
  total: null,
  deviceStatistic: [],
  metaStatistic: {},
  deviceStatusDetail: [],
  totalDetail: null,
}

export default function deviceStatusReport(state = initialState, action) {
  switch (action.type) {
    case SEARCH_DEVICE_STATUS_REPORT_START:
    case SEARCH_DEVICE_STATISTIC:
    case SEARCH_DEVICE_STATUS_DETAIL:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_DEVICE_STATUS_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceStatus: action?.payload?.items,
        total: action?.payload?.meta?.total,
      }
    case SEARCH_DEVICE_STATISTIC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceStatistic: action?.payload?.items,
        metaStatistic: action?.payload?.meta,
      }
    case SEARCH_DEVICE_STATUS_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceStatusDetail: action?.payload?.items,
        totalDetail: action?.payload?.meta?.total,
      }
    case SEARCH_DEVICE_STATUS_REPORT_FAIL:
    case SEARCH_DEVICE_STATISTIC_FAIL:
    case SEARCH_DEVICE_STATUS_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
