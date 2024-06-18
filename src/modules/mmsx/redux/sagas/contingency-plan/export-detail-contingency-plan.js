import { api } from '~/services/api'

export const exportContingencyPlanApi = (params) => {
  const url = `v1/mms/spare-part-plan/${params}/export`
  return api.get(url)
}
