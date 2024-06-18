import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import deviceInventoryAction from '~/modules/mmsx/redux/actions/device-inventory'

function useDeviceInventory() {
  const data = useSelector((state) => get(state, 'mmsx.deviceInventory'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(deviceInventoryAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useDeviceInventory
