import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_SEARCH_SUPPLY_TYPE_START,
  searchSupplyTypeFail,
  searchSupplyTypeSuccess,
} from '../../actions/supply-type'

const { call, put, takeLatest } = require('redux-saga/effects')

export const SearchSupplyTypeApi = (params) => {
  const url = `v1/mms/supply-types`
  return api.get(url, params)
}

function* doSearchSupplyTypes(action) {
  try {
    const response = yield call(SearchSupplyTypeApi, action.payload)
    if (response.statusCode === 200) {
      yield put(searchSupplyTypeSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchSupplyTypeFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchSearchSupplyType() {
  yield takeLatest(MMSX_SEARCH_SUPPLY_TYPE_START, doSearchSupplyTypes)
}
