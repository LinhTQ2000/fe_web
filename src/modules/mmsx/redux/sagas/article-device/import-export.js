import { TYPE_EXPORT } from '~/common/constants'
import { api } from '~/services/api'

export const exportArticleDeviceApi = (params) => {
  const uri = `v1/mms/export/${params.type}`
  return api.get(uri, params)
}

export const importArticleDeviceApi = (params) => {
  const uri = `v1/mms/import/${TYPE_EXPORT.ARTICLE_DEVICE_GROUP}`
  const formData = new FormData()
  formData.append('files', params)
  formData.append('type', TYPE_EXPORT.ARTICLE_DEVICE_GROUP)
  return api.postMultiplePart(uri, formData)
}

export const getArticleDeviceTemplateApi = () => {
  const uri = `____ENTER_IMPORT_EXPORT_URL_HERE____`
  return api.get(uri)
}
