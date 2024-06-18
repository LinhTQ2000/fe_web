import { api } from '~/services/api'

export const exportInventoryApi = (params) => {
  const uri = `v1/mms/export/${params.type}`
  return api.get(uri, params)
}
