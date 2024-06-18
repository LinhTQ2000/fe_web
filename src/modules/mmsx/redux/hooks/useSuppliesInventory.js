import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import suppliesInventoryAction from '~/modules/mmsx/redux/actions/supplies-inventory'

function useSuppliesInventory() {
  const data = useSelector((state) => get(state, 'mmsx.suppliesInventory'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(suppliesInventoryAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useSuppliesInventory
