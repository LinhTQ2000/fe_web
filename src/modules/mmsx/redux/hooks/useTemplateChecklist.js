import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import templateChecklistAction from '../actions/template-checklist'

const useTemplateChecklist = () => {
  const data = useSelector((state) => get(state, 'mmsx.templateCheckList'))
  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(templateChecklistAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useTemplateChecklist
