import { TYPE_EXPORT } from '~/common/constants'
import { api } from '~/services/api'

export const exportDeviceTypeApi = (params) => {
  const uri = `v1/mms/export/${params.type}`
  return api.get(uri, params)
}

export const importDeviceTypeApi = (params) => {
  const uri = `v1/mms/import/${TYPE_EXPORT.DEVICE_TYPE}`
  const formData = new FormData()
  formData.append('files', params)
  formData.append('type', TYPE_EXPORT.DEVICE_TYPE)
  return api.postMultiplePart(uri, formData)
}

export const getDeviceTypeTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}
