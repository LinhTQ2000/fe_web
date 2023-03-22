import { DASHBOARD_CHART_OPTION } from '~/modules/mmsx/constants'
import storage from '~/utils/storage'

const usePageSetting = () => {
  const storageKey = 'PAGE_SETTING_DASHBOARD'

  const getPageSetting = () =>
    storage.getSessionItem(storageKey) ||
    DASHBOARD_CHART_OPTION.map((chart) => chart.id)

  const setPageSetting = (newSetting = []) =>
    storage.setSessionItem(storageKey, newSetting)

  return { getPageSetting, setPageSetting }
}

export default usePageSetting
