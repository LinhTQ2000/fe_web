import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportDeviceStatusReportApi = (params) => {
  const uri = `v1/mms/reports/device-use-status-export`
  return api.get(uri, params)
}

export const exportDeviceStatusReportDetailApi = (params) => {
  const uri = `v1/mms/reports/device-use-status-detail-export/${params.id}`
  return api.get(uri, params)
}

export default {
  exportDeviceStatusReportApi,
  exportDeviceStatusReportDetailApi,
}
