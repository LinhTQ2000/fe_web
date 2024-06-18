import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import maintenanceAttributeAction from '../actions/maintenance-attribute'

const useMaintenanceAttribute = () => {
  const data = useSelector((state) => get(state, 'mmsx.maintenanceAttribute'))
  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(maintenanceAttributeAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useMaintenanceAttribute
