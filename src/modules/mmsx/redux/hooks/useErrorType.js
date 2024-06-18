import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import errorTypeActions from '../actions/error-type'

const useErrorType = () => {
  const data = useSelector((state) => get(state, 'mmsx.errorType'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(errorTypeActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useErrorType
