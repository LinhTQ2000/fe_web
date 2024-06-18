import {
  SEARCH_JOB_LIST_START,
  SEARCH_JOB_LIST_SUCCESS,
  SEARCH_JOB_LIST_FAIL,
  GET_JOB_LIST_START,
  GET_JOB_LIST_SUCCESS,
  GET_JOB_LIST_FAIL,
  GET_JOB_DETAIL_START,
  GET_JOB_DETAIL_SUCCESS,
  GET_JOB_DETAIL_FAIL,
  ASSIGN_JOB_SUCCESS,
  ASSIGN_JOB_FAIL,
  ASSIGN_JOB_START,
  RESET_JOB,
  DELETE_JOB_FAIL,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_START,
  GET_JOB_SUPPLIES_START,
  GET_JOB_SUPPLIES_SUCCESS,
  GET_JOB_SUPPLIES_FAIL,
  RESET_JOB_SUPPLIES,
  SEARCH_JOB_HISTORY_DEVICE_START,
  SEARCH_JOB_HISTORY_DEVICE_FAIL,
  SEARCH_JOB_HISTORY_DEVICE_SUCCESS,
  NOTE_JOB_DETAIL_SUCCESS,
  NOTE_JOB_DETAIL_FAIL,
  NOTE_JOB_DETAIL_START,
  APPROVED_JOB_START,
  APPROVED_JOB_SUCCESS,
  APPROVED_JOB_FAIL,
  REWORK_JOB_START,
  REWORK_JOB_SUCCESS,
  REWORK_JOB_FAIL,
  QUICK_ASSIGN_JOB_START,
  QUICK_ASSIGN_JOB_SUCCESS,
  QUICK_ASSIGN_JOB_FAIL,
  UPDATE_TIME_JOB_START,
  UPDATE_TIME_JOB_SUCCESS,
  UPDATE_TIME_JOB_FAIL,
  RESET_JOB_HISTORY_DEVICE,
} from '~/modules/mmsx/redux/actions/job'

const initialState = {
  isLoading: false,
  jobLists: [],
  jobDetail: {},
  meta: {},
  jobSupplies: [],
  jobHistoryDevice: [],
  total: null,
}

export default function job(state = initialState, action) {
  switch (action.type) {
    case SEARCH_JOB_LIST_START:
    case GET_JOB_LIST_START:
    case ASSIGN_JOB_START:
    case GET_JOB_DETAIL_START:
    case DELETE_JOB_START:
    case GET_JOB_SUPPLIES_START:
    case SEARCH_JOB_HISTORY_DEVICE_START:
    case NOTE_JOB_DETAIL_START:
    case APPROVED_JOB_START:
    case REWORK_JOB_START:
    case QUICK_ASSIGN_JOB_START:
    case UPDATE_TIME_JOB_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_JOB_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobLists: action?.payload?.items,
        meta: action?.payload?.meta,
      }
    case GET_JOB_LIST_FAIL:
    case ASSIGN_JOB_FAIL:
    case ASSIGN_JOB_SUCCESS:
    case SEARCH_JOB_LIST_FAIL:
    case GET_JOB_DETAIL_FAIL:
    case DELETE_JOB_FAIL:
    case DELETE_JOB_SUCCESS:
    case GET_JOB_SUPPLIES_FAIL:
    case SEARCH_JOB_HISTORY_DEVICE_FAIL:
    case NOTE_JOB_DETAIL_SUCCESS:
    case NOTE_JOB_DETAIL_FAIL:
    case APPROVED_JOB_SUCCESS:
    case APPROVED_JOB_FAIL:
    case REWORK_JOB_SUCCESS:
    case REWORK_JOB_FAIL:
    case QUICK_ASSIGN_JOB_SUCCESS:
    case QUICK_ASSIGN_JOB_FAIL:
    case UPDATE_TIME_JOB_SUCCESS:
    case UPDATE_TIME_JOB_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case SEARCH_JOB_HISTORY_DEVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobHistoryDevice: action?.payload?.items,
        total: action?.payload?.meta?.total,
      }
    case GET_JOB_DETAIL_SUCCESS:
      return {
        ...state,
        jobDetail: action?.payload,
        isLoading: false,
      }
    case SEARCH_JOB_LIST_SUCCESS:
      return {
        ...state,
        jobLists: action?.payload?.items,
        total: action?.payload?.meta?.total,
        isLoading: false,
      }
    case RESET_JOB:
      return {
        ...state,
        jobDetail: {},
      }
    case GET_JOB_SUPPLIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobSupplies: action.payload,
      }
    case RESET_JOB_SUPPLIES:
      return {
        ...state,
        jobSupplies: [],
      }
    case RESET_JOB_HISTORY_DEVICE:
      return {
        ...state,
        jobHistoryDevice: [],
      }
    default:
      return state
  }
}
