import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import accreditationTemplateAction from '../actions/accreditation-template'

const useAccreditationTemplate = () => {
  const data = useSelector((state) => get(state, 'mmsx.accreditationTemplate'))
  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(accreditationTemplateAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useAccreditationTemplate
