import {
  MMSX_GET_SUMMARY,
  MMSX_GET_SUMMARY_SUCCESS,
  MMSX_GET_SUMMARY_FAIL,
  MMSX_GET_PROGRESS_JOB,
  MMSX_GET_PROGRESS_JOB_FAIL,
  MMSX_GET_PROGRESS_JOB_SUCCESS,
  MMSX_GET_DEVICE_STATUS,
  MMSX_GET_DEVICE_STATUS_FAIL,
  MMSX_GET_DEVICE_STATUS_SUCCESS,
  MMSX_GET_DEVICE_ERROR,
  MMSX_GET_DEVICE_ERROR_FAIL,
  MMSX_GET_DEVICE_ERROR_SUCCESS,
  MMSX_GET_HISTORY_JOB,
  MMSX_GET_HISTORY_JOB_FAIL,
  MMSX_GET_HISTORY_JOB_SUCCESS,
  MMSX_GET_MTT_STATS,
  MMSX_GET_MTT_STATS_FAIL,
  MMSX_GET_MTT_STATS_SUCCESS,
  MMSX_GET_DEVICE_USING_STATUS,
  MMSX_GET_DEVICE_USING_STATUS_FAIL,
  MMSX_GET_DEVICE_USING_STATUS_SUCCESS,
  MMSX_GET_DEVICE_STATUS_USE_BY_AREA_START,
  MMSX_GET_DEVICE_STATUS_USE_BY_AREA_FAIL,
  MMSX_GET_DEVICE_STATUS_USE_BY_AREA_SUCCESS,
  MMSX_RESET_DEVICE_STATUS_USE_BY_AREA,
  MMSX_GET_JOB_SUMMARY,
  MMSX_GET_TRANSFER_SUMMARY,
  MMSX_GET_JOB_SUMMARY_FAIL,
  MMSX_GET_TRANSFER_SUMMARY_FAIL,
  MMSX_GET_JOB_SUMMARY_SUCCESS,
  MMSX_GET_TRANSFER_SUMMARY_SUCCESS,
} from '../actions/dashboard'

const initState = {
  summary: {},
  jobSummary: {},
  transferSummary: {},
  isLoadingJobStatus: false,
  isLoadingRequestStatus: false,
  isLoadingDeviceError: false,
  isLoadingDeviceStatus: false,
  isLoadingArea: false,
  maintainanceJobStatus: [],
  deviceStatus: {},
  deviceError: [],
  requestStatus: [],
  mttStatus: [],
  deviceUsingStatus: {},
  deviceUseByArea: [],
}

/**
 * @param {{ type: any; payload: { items: any; meta: { total: any; }; }; }} action
 */
export default function dashboard(state = initState, action) {
  switch (action.type) {
    case MMSX_GET_SUMMARY:
    case MMSX_GET_MTT_STATS:
    case MMSX_GET_DEVICE_USING_STATUS:
    case MMSX_GET_JOB_SUMMARY:
    case MMSX_GET_TRANSFER_SUMMARY:
      return {
        ...state,
      }
    case MMSX_GET_DEVICE_STATUS_USE_BY_AREA_START:
      return {
        ...state,
        isLoadingArea: true,
      }
    case MMSX_GET_DEVICE_STATUS:
      return {
        ...state,
        isLoadingDeviceStatus: true,
      }
    case MMSX_GET_DEVICE_ERROR:
      return {
        ...state,
        isLoadingDeviceError: true,
      }
    case MMSX_GET_PROGRESS_JOB:
      return {
        ...state,
        isLoadingJobStatus: true,
      }
    case MMSX_GET_HISTORY_JOB:
      return {
        ...state,
        isLoadingRequestStatus: true,
      }
    case MMSX_GET_MTT_STATS_SUCCESS:
      return {
        ...state,
        mttStatus: action.payload,
      }
    case MMSX_GET_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.payload,
      }
    case MMSX_GET_JOB_SUMMARY_SUCCESS:
      return {
        ...state,
        jobSummary: action.payload,
      }
    case MMSX_GET_TRANSFER_SUMMARY_SUCCESS:
      return {
        ...state,
        transferSummary: action.payload,
      }
    case MMSX_GET_PROGRESS_JOB_SUCCESS:
      return {
        ...state,
        maintainanceJobStatus: action.payload,
        isLoadingJobStatus: false,
      }
    case MMSX_GET_DEVICE_STATUS_SUCCESS:
      return {
        ...state,
        deviceStatus: action.payload,
        isLoadingDeviceStatus: false,
      }
    case MMSX_GET_DEVICE_ERROR_SUCCESS:
      return {
        ...state,
        deviceError: action.payload,
        isLoadingDeviceError: false,
      }
    case MMSX_GET_HISTORY_JOB_SUCCESS:
      return {
        ...state,
        requestStatus: action.payload,
        isLoadingRequestStatus: false,
      }
    case MMSX_GET_DEVICE_USING_STATUS_SUCCESS:
      return {
        ...state,
        deviceUsingStatus: action.payload,
      }
    case MMSX_RESET_DEVICE_STATUS_USE_BY_AREA:
      return {
        ...state,
        deviceUseByArea: [],
      }
    case MMSX_GET_DEVICE_USING_STATUS_FAIL:
    case MMSX_GET_SUMMARY_FAIL:
    case MMSX_GET_MTT_STATS_FAIL:
    case MMSX_GET_JOB_SUMMARY_FAIL:
    case MMSX_GET_TRANSFER_SUMMARY_FAIL:
      return {
        ...state,
      }
    case MMSX_GET_DEVICE_STATUS_USE_BY_AREA_FAIL:
      return {
        ...state,
        isLoadingArea: false,
      }
    case MMSX_GET_DEVICE_STATUS_FAIL:
      return {
        ...state,
        isLoadingDeviceStatus: false,
      }
    case MMSX_GET_DEVICE_ERROR_FAIL:
      return {
        ...state,
        isLoadingDeviceError: false,
      }
    case MMSX_GET_PROGRESS_JOB_FAIL:
      return {
        ...state,
        isLoadingJobStatus: false,
      }
    case MMSX_GET_HISTORY_JOB_FAIL:
      return {
        ...state,
        isLoadingRequestStatus: false,
      }
    case MMSX_GET_DEVICE_STATUS_USE_BY_AREA_SUCCESS:
      return {
        ...state,
        isLoadingArea: false,
        deviceUseByArea: action.payload,
      }
    default:
      return state
  }
}
