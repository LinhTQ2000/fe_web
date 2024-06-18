import { TYPE_EXPORT } from '~/common/constants'
import { api } from '~/services/api'

export const exportAccreditationTemplateApi = (params) => {
  const uri = `v1/mms/export/${params.type}`
  return api.get(uri, params)
}

export const importAccreditationTemplateApi = (params) => {
  const uri = `v1/mms/import/${TYPE_EXPORT.ACCREDITATION_TEMPLATE}`
  const formData = new FormData()
  formData.append('files', params)
  formData.append('type', TYPE_EXPORT.ACCREDITATION_TEMPLATE)
  return api.postMultiplePart(uri, formData)
}

export const getAccreditationTemplateTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}
