import { TYPE_EXPORT } from '~/common/constants'
import { api } from '~/services/api'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const importAttributeTypeApi = (params) => {
  const uri = `v1/mms/import/${TYPE_EXPORT.ATTRIBUTE_TYPE}`
  const formData = new FormData()
  formData.append('files', params)
  formData.append('type', TYPE_EXPORT.ATTRIBUTE_TYPE)
  return api.postMultiplePart(uri, formData)
}

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportAttributeTypeApi = (params) => {
  const uri = `v1/mms/export/${params.type}`
  return api.get(uri, params)
}

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getAttributeTypeTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}

export default {
  importAttributeTypeApi,
  exportAttributeTypeApi,
  getAttributeTypeTemplateApi,
}
