import { api } from '~/services/api'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importDeviceStatusApi = (params) => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  const formData = new FormData()
  formData.append('file', params)
  return api.postMultiplePart(uri, formData)
}

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportDeviceStatusApi = (params) => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri, params)
}

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getDeviceStatusTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importDeviceStatusApi,
  exportDeviceStatusApi,
  getDeviceStatusTemplateApi,
}
