export const SEARCH_DEVICE_STATUS_REPORT_START =
  'MMSX_SEARCH_DEVICE_STATUS_REPORT_START'
export const SEARCH_DEVICE_STATUS_REPORT_SUCCESS =
  'MMSX_SEARCH_DEVICE_STATUS_REPORT_SUCCESS'
export const SEARCH_DEVICE_STATUS_REPORT_FAIL =
  'MMSX_SEARCH_DEVICE_STATUS_REPORT_FAIL'

export const SEARCH_DEVICE_STATUS_DETAIL = 'MMSX_SEARCH_DEVICE_STATUS_DETAIL'
export const SEARCH_DEVICE_STATUS_DETAIL_SUCCESS =
  'MMSX_SEARCH_DEVICE_STATUS_DETAIL_SUCCESS'
export const SEARCH_DEVICE_STATUS_DETAIL_FAIL =
  'MMSX_SEARCH_DEVICE_STATUS_DETAIL_FAIL'

export const SEARCH_DEVICE_STATISTIC = 'MMSX_SEARCH_DEVICE_STATISTIC'
export const SEARCH_DEVICE_STATISTIC_SUCCESS =
  'MMSX_SEARCH_DEVICE_STATISTIC_SUCCESS'
export const SEARCH_DEVICE_STATISTIC_FAIL = 'MMSX_SEARCH_DEVICE_STATISTIC_FAIL'

export function searchDeviceStatus(payload, onSuccess, onError) {
  return {
    type: SEARCH_DEVICE_STATUS_REPORT_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchDeviceStatusSuccess(payload) {
  return {
    type: SEARCH_DEVICE_STATUS_REPORT_SUCCESS,
    payload: payload,
  }
}

export function searchDeviceStatusFail() {
  return {
    type: SEARCH_DEVICE_STATUS_REPORT_FAIL,
  }
}

export function searchDeviceStatusDetail(payload, onSuccess, onError) {
  return {
    type: SEARCH_DEVICE_STATUS_DETAIL,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchDeviceStatusDetailSuccess(payload) {
  return {
    type: SEARCH_DEVICE_STATUS_DETAIL_SUCCESS,
    payload: payload,
  }
}

export function searchDeviceStatusDetailFail() {
  return {
    type: SEARCH_DEVICE_STATUS_DETAIL_FAIL,
  }
}

export function searchDeviceStatistic(payload, onSuccess, onError) {
  return {
    type: SEARCH_DEVICE_STATISTIC,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchDeviceStatisticSuccess(payload) {
  return {
    type: SEARCH_DEVICE_STATISTIC_SUCCESS,
    payload: payload,
  }
}

export function searchDeviceStatisticFail() {
  return {
    type: SEARCH_DEVICE_STATISTIC_FAIL,
  }
}
export default {
  searchDeviceStatus,
  searchDeviceStatusSuccess,
  searchDeviceStatusFail,
  searchDeviceStatistic,
  searchDeviceStatisticSuccess,
  searchDeviceStatisticFail,
  searchDeviceStatusDetail,
  searchDeviceStatusDetailSuccess,
  searchDeviceStatusDetailFail,
}
