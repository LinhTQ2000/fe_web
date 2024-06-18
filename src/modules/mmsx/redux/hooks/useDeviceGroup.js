import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import deviceGroupAction from '../actions/device-group'

const useDeviceGroup = () => {
  const data = useSelector((state) => get(state, 'mmsx.deviceGroup'))
  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(deviceGroupAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDeviceGroup
