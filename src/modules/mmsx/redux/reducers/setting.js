import {
  MMSX_CREATE_SETTING_NOTI_JOB_FAIL,
  MMSX_CREATE_SETTING_NOTI_JOB_START,
  MMSX_CREATE_SETTING_NOTI_JOB_SUCCESS,
} from '../actions/setting'

const initialState = {
  isLoading: false,
}

export default function setting(state = initialState, action) {
  switch (action.type) {
    case MMSX_CREATE_SETTING_NOTI_JOB_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_CREATE_SETTING_NOTI_JOB_SUCCESS:
    case MMSX_CREATE_SETTING_NOTI_JOB_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
