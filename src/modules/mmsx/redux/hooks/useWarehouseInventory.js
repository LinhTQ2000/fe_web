import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseInventoryActions from '~/modules/mmsx/redux/actions/warehouse-inventory'

function useWarehouseInventory() {
  const data = useSelector((state) => get(state, 'mmsx.warehouseInventory'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseInventoryActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useWarehouseInventory
