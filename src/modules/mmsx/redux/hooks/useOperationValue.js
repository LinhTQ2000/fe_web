import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import operationValue from '~/modules/mmsx/redux/actions/operation-value'

function useOperationValue() {
  const data = useSelector((state) => get(state, 'mmsx.operationValue'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(operationValue, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useOperationValue
