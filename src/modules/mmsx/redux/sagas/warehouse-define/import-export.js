import { TYPE_EXPORT } from '~/common/constants'
import { api } from '~/services/api'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const exportWarehouseApi = (params) => {
  const uri = `v1/mms/export/${params.type}`
  return api.get(uri, params)
}
export const importWarehouseApi = (params) => {
  const uri = `v1/mms/import/${TYPE_EXPORT.WAREHOUSE}`
  const formData = new FormData()
  formData.append('files', params)
  formData.append('type', TYPE_EXPORT.WAREHOUSE)
  return api.postMultiplePart(uri, formData)
}

export default {
  exportWarehouseApi,
  importWarehouseApi,
}
