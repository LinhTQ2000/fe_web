import { TYPE_EXPORT } from '~/common/constants'
import { api } from '~/services/api'

export const exportMaintenanceAttributeApi = (params) => {
  const uri = `v1/mms/export/${params.type}`
  return api.get(uri, params)
}

export const importMaintenanceAttributeApi = (params) => {
  const uri = `v1/mms/import/${TYPE_EXPORT.MAINTENANCE_ATTRIBUTE}`
  const formData = new FormData()
  formData.append('files', params)
  formData.append('type', TYPE_EXPORT.MAINTENANCE_ATTRIBUTE)
  return api.postMultiplePart(uri, formData)
}

export const getMaintenanceAttributeTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}
