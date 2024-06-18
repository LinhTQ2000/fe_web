import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import contingencyPlanAction from '~/modules/mmsx/redux/actions/contingency-plan'

function useContingencyPlan() {
  const data = useSelector((state) => get(state, 'mmsx.contingencyPlan'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(contingencyPlanAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useContingencyPlan
