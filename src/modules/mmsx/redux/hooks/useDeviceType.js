import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import deviceTypeAction from '../actions/device-type'

const useDeviceType = () => {
  const data = useSelector((state) => get(state, 'mmsx.deviceType'))
  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(deviceTypeAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDeviceType
