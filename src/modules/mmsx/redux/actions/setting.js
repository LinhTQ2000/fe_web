export const MMSX_CREATE_SETTING_NOTI_JOB_START =
  'MMSX_CREATE_SETTING_NOTI_JOB_START'
export const MMSX_CREATE_SETTING_NOTI_JOB_SUCCESS =
  'MMSX_CREATE_SETTING_NOTI_JOB_SUCCESS'
export const MMSX_CREATE_SETTING_NOTI_JOB_FAIL =
  'MMSX_CREATE_SETTING_NOTI_JOB_FAIL'

export function createSettingNotiJob(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_SETTING_NOTI_JOB_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createSettingNotiJobSuccess(payload) {
  return {
    type: MMSX_CREATE_SETTING_NOTI_JOB_SUCCESS,
    payload,
  }
}

export function createSettingNotiJobFail() {
  return {
    type: MMSX_CREATE_SETTING_NOTI_JOB_FAIL,
  }
}

export default {
  createSettingNotiJob,
  createSettingNotiJobSuccess,
  createSettingNotiJobFail,
}
