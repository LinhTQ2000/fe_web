import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseExportManagementAction from '~/modules/mmsx/redux/actions/warehouse-export-management'

function useWarehouseExportManagement() {
  const data = useSelector((state) =>
    get(state, 'mmsx.warehouseExportManagement'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseExportManagementAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useWarehouseExportManagement
