export const GET_CONTINGENCY_PLAN_LIST_START =
  'MMSX_GET_CONTINGENCY_PLAN_LIST_START'
export const GET_CONTINGENCY_PLAN_LIST_SUCCESS =
  'MMSX_GET_CONTINGENCY_PLAN_LIST_SUCCESS'
export const GET_CONTINGENCY_PLAN_LIST_FAIL =
  'MMSX_GET_CONTINGENCY_PLAN_LIST_FAIL'

export const GET_CONTINGENCY_PLAN_DETAIL_START =
  'MMSX_GET_CONTINGENCY_PLAN_DETAIL_START'
export const GET_CONTINGENCY_PLAN_DETAIL_SUCCESS =
  'MMSX_GET_CONTINGENCY_PLAN_DETAIL_SUCCESS'
export const GET_CONTINGENCY_PLAN_DETAIL_FAIL =
  'MMSX_GET_CONTINGENCY_PLAN_DETAIL_FAIL'

export const CONFIRM_CONTINGENCY_PLAN_START =
  'MMSX_CONFIRM_CONTINGENCY_PLAN_START'
export const CONFIRM_CONTINGENCY_PLAN_SUCCESS =
  'MMSX_CONFIRM_CONTINGENCY_PLAN_SUCCESS'
export const CONFIRM_CONTINGENCY_PLAN_FAIL =
  'MMSX_CONFIRM_CONTINGENCY_PLAN_FAIL'

export const REJECT_CONTINGENCY_PLAN_START =
  'MMSX_REJECT_CONTINGENCY_PLAN_START'
export const REJECT_CONTINGENCY_PLAN_SUCCESS =
  'MMSX_REJECT_CONTINGENCY_PLAN_SUCCESS'
export const REJECT_CONTINGENCY_PLAN_FAIL = 'MMSX_REJECT_CONTINGENCY_PLAN_FAIL'

export const CREATE_CONTINGENCY_PLAN = 'MMSX_CREATE_CONTINGENCY_PLAN'
export const CREATE_CONTINGENCY_PLAN_SUCCESS =
  'MMSX_CREATE_CONTINGENCY_PLAN_SUCCESS'
export const CREATE_CONTINGENCY_PLAN_FAIL = 'MMSX_CREATE_CONTINGENCY_PLAN_FAIL'

export const UPDATE_CONTINGENCY_PLAN = 'MMSX_UPDATE_CONTINGENCY_PLAN'
export const UPDATE_CONTINGENCY_PLAN_SUCCESS =
  'MMSX_UPDATE_CONTINGENCY_PLAN_SUCCESS'
export const UPDATE_CONTINGENCY_PLAN_FAIL = 'MMSX_UPDATE_CONTINGENCY_PLAN_FAIL'

export const DELETE_CONTINGENCY_PLAN_START =
  'MMSX_DELETE_CONTINGENCY_PLAN_START'
export const DELETE_CONTINGENCY_PLAN_SUCCESS =
  'MMSX_DELETE_CONTINGENCY_PLAN_SUCCESS'
export const DELETE_CONTINGENCY_PLAN_FAIL = 'MMSX_DELETE_CONTINGENCY_PLAN_FAIL'

export const RESET_STATE_CONTINGENCY_PLAN = 'MMSX_RESET_STATE_CONTINGENCY_PLAN'

export function getContingencyPlanList(payload, onSuccess, onError) {
  return {
    type: GET_CONTINGENCY_PLAN_LIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getContingencyPlanListSuccess(payload) {
  return {
    type: GET_CONTINGENCY_PLAN_LIST_SUCCESS,
    payload,
  }
}

export function getContingencyPlanListFail() {
  return {
    type: GET_CONTINGENCY_PLAN_LIST_FAIL,
  }
}

export function getContingencyPlanDetail(payload, onSuccess, onError) {
  return {
    type: GET_CONTINGENCY_PLAN_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getContingencyPlanDetailSuccess(payload) {
  return {
    type: GET_CONTINGENCY_PLAN_DETAIL_SUCCESS,
    payload,
  }
}

export function getContingencyPlanDetailFail() {
  return {
    type: GET_CONTINGENCY_PLAN_DETAIL_FAIL,
  }
}

export function confirmContingencyPlan(payload, onSuccess, onError) {
  return {
    type: CONFIRM_CONTINGENCY_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmContingencyPlanSuccess(payload) {
  return {
    type: CONFIRM_CONTINGENCY_PLAN_SUCCESS,
    payload,
  }
}

export function confirmContingencyPlanFail() {
  return {
    type: CONFIRM_CONTINGENCY_PLAN_FAIL,
  }
}
export function rejectContingencyPlan(payload, onSuccess, onError) {
  return {
    type: REJECT_CONTINGENCY_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectContingencyPlanSuccess(payload) {
  return {
    type: REJECT_CONTINGENCY_PLAN_SUCCESS,
    payload,
  }
}

export function rejectContingencyPlanFail() {
  return {
    type: REJECT_CONTINGENCY_PLAN_FAIL,
  }
}

export function createContingencyPlan(payload, onSuccess, onError) {
  return {
    type: CREATE_CONTINGENCY_PLAN,
    payload,
    onSuccess,
    onError,
  }
}

export function createContingencyPlanSuccess(payload) {
  return {
    type: CREATE_CONTINGENCY_PLAN_SUCCESS,
    payload,
  }
}

export function createContingencyPlanFail() {
  return {
    type: CREATE_CONTINGENCY_PLAN_FAIL,
  }
}

export function updateContingencyPlan(payload, onSuccess, onError) {
  return {
    type: UPDATE_CONTINGENCY_PLAN,
    payload,
    onSuccess,
    onError,
  }
}

export function updateContingencyPlanSuccess(payload) {
  return {
    type: UPDATE_CONTINGENCY_PLAN_SUCCESS,
    payload,
  }
}

export function updateContingencyPlanFail() {
  return {
    type: UPDATE_CONTINGENCY_PLAN_FAIL,
  }
}

export function deleteContingencyPlan(payload, onSuccess, onError) {
  return {
    type: DELETE_CONTINGENCY_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteContingencyPlanSuccess(payload) {
  return {
    type: DELETE_CONTINGENCY_PLAN_SUCCESS,
    payload,
  }
}

export function deleteContingencyPlanFail() {
  return {
    type: DELETE_CONTINGENCY_PLAN_FAIL,
  }
}

export function resetStateContingencyPlan() {
  return {
    type: RESET_STATE_CONTINGENCY_PLAN,
  }
}
export default {
  getContingencyPlanList,
  getContingencyPlanListSuccess,
  getContingencyPlanListFail,
  getContingencyPlanDetail,
  getContingencyPlanDetailSuccess,
  getContingencyPlanDetailFail,
  confirmContingencyPlan,
  confirmContingencyPlanSuccess,
  confirmContingencyPlanFail,
  rejectContingencyPlan,
  rejectContingencyPlanSuccess,
  rejectContingencyPlanFail,
  createContingencyPlan,
  createContingencyPlanSuccess,
  createContingencyPlanFail,
  updateContingencyPlan,
  updateContingencyPlanSuccess,
  updateContingencyPlanFail,
  deleteContingencyPlan,
  deleteContingencyPlanSuccess,
  deleteContingencyPlanFail,
  resetStateContingencyPlan,
}
