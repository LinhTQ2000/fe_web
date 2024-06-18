import { api } from '~/services/api'

export const printQRDevice = (params) => {
  const url = `/v1/mms/devices/generate-qr-code`
  return api.post(url, params)
}
