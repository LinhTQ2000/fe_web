import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import maintenancePlanAction from '~/modules/mmsx/redux/actions/maintenance-plan'

function useMaintenancePlan() {
  const data = useSelector((state) => get(state, 'mmsx.maintenancePlan'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(maintenancePlanAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useMaintenancePlan
