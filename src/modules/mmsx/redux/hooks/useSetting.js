import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import settingAction from '~/modules/mmsx/redux/actions/setting'

function useSetting() {
  const data = useSelector((state) => get(state, 'mmsx.setting'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(settingAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useSetting
