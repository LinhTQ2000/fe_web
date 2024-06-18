import { TYPE_EXPORT } from '~/common/constants'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importVendorApi = (params) => {
  const uri = `v1/mms/import/${TYPE_EXPORT.VENDOR}`
  const formData = new FormData()
  formData.append('files', params)
  formData.append('type', TYPE_EXPORT.VENDOR)
  return api.postMultiplePart(uri, formData)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportVendorApi = (params) => {
  const uri = `v1/mms/export/${params.type}`
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getVendorTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importVendorApi,
  exportVendorApi,
  getVendorTemplateApi,
}
