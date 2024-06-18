import { api } from "~/services/api"

export const getSuppliesByMaintenancePlan = (params) => {
  const url = `v1/mms/maintenance-plans/${params.id}/supplies`
  return api.get(url)
}
