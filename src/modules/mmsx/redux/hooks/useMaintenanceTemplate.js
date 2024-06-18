import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import maintenanceTemplateAction from '../actions/maintenance-template'

const useMaintenanceTemplate = () => {
  const data = useSelector((state) => get(state, 'mmsx.maintenanceTemplate'))
  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(maintenanceTemplateAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useMaintenanceTemplate
