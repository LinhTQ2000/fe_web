import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import supplyTypeActions from '~/modules/mmsx/redux/actions/supply-type'

function useSupplyTypes() {
  const data = useSelector((state) => get(state, 'mmsx.supplyType'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(supplyTypeActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useSupplyTypes
