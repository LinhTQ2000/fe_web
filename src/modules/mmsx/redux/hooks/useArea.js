import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import areaAction from '../actions/area'

const useArea = () => {
  const data = useSelector((state) => get(state, 'mmsx.areaDefine'))
  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(areaAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useArea
