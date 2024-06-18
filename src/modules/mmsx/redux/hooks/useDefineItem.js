import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineItemActions from '~/modules/mmsx/redux/actions/define-item'

const useDefineItem = () => {
  const data = useSelector((state) => get(state, 'mmsx.defineItem'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineItemActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineItem
