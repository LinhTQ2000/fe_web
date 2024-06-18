import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseImportManagementAction from '~/modules/mmsx/redux/actions/warehouse-import-management'

function useWarehouseImportManagement() {
  const data = useSelector((state) =>
    get(state, 'mmsx.warehouseImportManagement'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseImportManagementAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useWarehouseImportManagement
