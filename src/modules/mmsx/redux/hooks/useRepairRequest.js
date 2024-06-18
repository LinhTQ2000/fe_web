import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import repairRequestActions from '~/modules/mmsx/redux/actions/repair-request'

function useRepairRequest() {
  const data = useSelector((state) => get(state, 'mmsx.repairRequest'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(repairRequestActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useRepairRequest
