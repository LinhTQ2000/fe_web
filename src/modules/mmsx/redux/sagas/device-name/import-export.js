import { TYPE_EXPORT } from '~/common/constants'
import { api } from '~/services/api'

export const exportDeviceNameApi = (params) => {
  const uri = `v1/mms/export/${params.type}`
  return api.get(uri, params)
}

export const importDeviceNameApi = (params) => {
  const uri = `v1/mms/import/${TYPE_EXPORT.DEVICE_NAME}`
  const formData = new FormData()
  formData.append('files', params)
  formData.append('type', TYPE_EXPORT.DEVICE_NAME)
  return api.postMultiplePart(uri, formData)
}

export const getDeviceNameTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}
