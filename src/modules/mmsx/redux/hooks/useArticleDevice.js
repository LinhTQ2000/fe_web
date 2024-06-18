import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import articleDeviceAction from '../actions/article-device'

const useArticleDevice = () => {
  const data = useSelector((state) => get(state, 'mmsx.articleDevice'))
  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(articleDeviceAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useArticleDevice
