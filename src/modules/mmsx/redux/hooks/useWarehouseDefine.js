import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseDefineActions from '~/modules/mmsx/redux/actions/warehouse-define'

function useWarehouseDefine() {
  const data = useSelector((state) => get(state, 'mmsx.warehouseDefine'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseDefineActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useWarehouseDefine
