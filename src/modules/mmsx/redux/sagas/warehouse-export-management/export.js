import { api } from '~/services/api'

export const exportWarehouseImport = (params) => {
  const url = `v1/mms/warehouse-import/${params}/export`
  return api.get(url)
}

export const exportWarehouseExport = (params) => {
  const url = `v1/mms/warehouse-export/${params}/export`
  return api.get(url)
}
