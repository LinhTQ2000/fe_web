import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteSuppliesCategorySuccess,
  deleteSuppliesCategoryFail,
  DELETE_SUPPLIES_CATEGORY_START,
} from '~/modules/mmsx/redux/actions/supplies-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteSuppliesCategory = (params) => {
  const url = `v1/mms/supply-groups/${params}`
  return api.delete(url)
}

function* doDeleteSuppliesCategory(action) {
  try {
    const response = yield call(deleteSuppliesCategory, action?.payload)

    if (response.statusCode === 200) {
      yield put(deleteSuppliesCategorySuccess())
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteSuppliesCategoryFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}
export default function* watchDeleteSuppliesCategory() {
  yield takeLatest(DELETE_SUPPLIES_CATEGORY_START, doDeleteSuppliesCategory)
}
