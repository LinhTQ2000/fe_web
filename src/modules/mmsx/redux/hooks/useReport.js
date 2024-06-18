import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import requestDeviceActions from '~/modules/mmsx/redux/actions/report'

function useReport() {
  const data = useSelector((state) => get(state, 'mmsx.report'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(requestDeviceActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useReport
