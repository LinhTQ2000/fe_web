import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseDefineActions from '~/modules/mmsx/redux/actions/warehouse-export-ticket'

function useWarehouseExportTicket() {
  const data = useSelector((state) => get(state, 'mmsx.warehouseExportTicket'))

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
export default useWarehouseExportTicket
