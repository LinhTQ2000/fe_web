export const MMSX_SEARCH_SUPPLY_TYPE_START = 'MMSX_SEARCH_SUPPLY_TYPE_START'
export const MMSX_SEARCH_SUPPLY_TYPE_SUCCESS = 'MMSX_SEARCH_SUPPLY_TYPE_SUCCESS'
export const MMSX_SEARCH_SUPPLY_TYPE_FAIL = 'MMSX_SEARCH_SUPPLY_TYPE_FAIL'

export function searchSupplyType(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_SUPPLY_TYPE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchSupplyTypeSuccess(payload) {
  return {
    type: MMSX_SEARCH_SUPPLY_TYPE_SUCCESS,
    payload,
  }
}

export function searchSupplyTypeFail() {
  return {
    type: MMSX_SEARCH_SUPPLY_TYPE_FAIL,
  }
}


export default {
  searchSupplyType,
  searchSupplyTypeSuccess,
  searchSupplyTypeFail,
}
