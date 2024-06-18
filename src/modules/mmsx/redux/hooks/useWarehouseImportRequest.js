import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseDefineActions from '~/modules/mmsx/redux/actions/warehouse-import-request'

function useWarehouseImportRequest() {
  const data = useSelector((state) => get(state, 'mmsx.warehouseImportRequest'))

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
export default useWarehouseImportRequest
