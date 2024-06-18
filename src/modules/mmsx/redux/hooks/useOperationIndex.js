import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import operationIndexAction from '../actions/operation-index'

const useOperationIndex = () => {
  const data = useSelector((state) => get(state, 'mmsx.operationIndex'))
  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(operationIndexAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useOperationIndex
