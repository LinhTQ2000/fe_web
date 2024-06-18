import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import deviceNameAction from '../actions/device-name'

const useDeviceName = () => {
  const data = useSelector((state) => get(state, 'mmsx.deviceName'))
  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(deviceNameAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDeviceName
