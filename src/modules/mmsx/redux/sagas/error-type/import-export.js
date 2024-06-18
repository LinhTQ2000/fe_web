import { TYPE_EXPORT } from '~/common/constants'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importErrorTypeApi = (params) => {
  const uri = `v1/mms/import/${TYPE_EXPORT.ERROR_TYPE}`
  const formData = new FormData()
  formData.append('files', params)
  formData.append('type', TYPE_EXPORT.ERROR_TYPE)
  return api.postMultiplePart(uri, formData)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportErrorTypeApi = (params) => {
  const uri = `v1/mms/export/${params.type}`
  return api.get(uri, params)
}

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getErrorTypeTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importErrorTypeApi,
  exportErrorTypeApi,
  getErrorTypeTemplateApi,
}
