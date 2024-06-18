import {
  CREATE_TEMPLATE_CHECKLIST_FAIL,
  CREATE_TEMPLATE_CHECKLIST_START,
  CREATE_TEMPLATE_CHECKLIST_SUCCESS,
  MMSX_ACTIVE_TEMPLATE_CHECKLIST_FAILED,
  MMSX_ACTIVE_TEMPLATE_CHECKLIST_START,
  MMSX_ACTIVE_TEMPLATE_CHECKLIST_SUCCESS,
  MMSX_IN_ACTIVE_TEMPLATE_CHECKLIST_FAILED,
  MMSX_IN_ACTIVE_TEMPLATE_CHECKLIST_START,
  MMSX_IN_ACTIVE_TEMPLATE_CHECKLIST_SUCCESS,
  GET_TEMPLATE_CHECKLIST_FAIL,
  GET_TEMPLATE_CHECKLIST_START,
  GET_TEMPLATE_CHECKLIST_SUCCESS,
  RESET_TEMPLATE_CHECKLIST,
  SEARCH_TEMPLATE_CHECKLIST_FAIL,
  SEARCH_TEMPLATE_CHECKLIST_START,
  SEARCH_TEMPLATE_CHECKLIST_SUCCESS,
  UPDATE_TEMPLATE_CHECKLIST_FAIL,
  UPDATE_TEMPLATE_CHECKLIST_START,
  UPDATE_TEMPLATE_CHECKLIST_SUCCESS,
} from '../actions/template-checklist'

const initialState = {
  templateChecklistList: [],
  templateChecklistDetail: {},
  isLoading: false,
  total: 0,
}

export default function templateCheckList(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TEMPLATE_CHECKLIST_START:
    case GET_TEMPLATE_CHECKLIST_START:
    case CREATE_TEMPLATE_CHECKLIST_START:
    case UPDATE_TEMPLATE_CHECKLIST_START:
    case MMSX_ACTIVE_TEMPLATE_CHECKLIST_START:
    case MMSX_IN_ACTIVE_TEMPLATE_CHECKLIST_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_TEMPLATE_CHECKLIST_SUCCESS:
      return {
        ...state,
        templateChecklistList: action?.payload?.items,
        total: action?.payload?.meta?.total,
        isLoading: false,
      }
    case GET_TEMPLATE_CHECKLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        templateChecklistDetail: action?.payload,
      }
    case SEARCH_TEMPLATE_CHECKLIST_FAIL:
    case GET_TEMPLATE_CHECKLIST_FAIL:
    case UPDATE_TEMPLATE_CHECKLIST_FAIL:
    case UPDATE_TEMPLATE_CHECKLIST_SUCCESS:
    case CREATE_TEMPLATE_CHECKLIST_SUCCESS:
    case CREATE_TEMPLATE_CHECKLIST_FAIL:
    case MMSX_ACTIVE_TEMPLATE_CHECKLIST_SUCCESS:
    case MMSX_ACTIVE_TEMPLATE_CHECKLIST_FAILED:
    case MMSX_IN_ACTIVE_TEMPLATE_CHECKLIST_SUCCESS:
    case MMSX_IN_ACTIVE_TEMPLATE_CHECKLIST_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_TEMPLATE_CHECKLIST:
      return {
        ...state,
        templateChecklistDetail: {},
      }
    default:
      return state
  }
}
