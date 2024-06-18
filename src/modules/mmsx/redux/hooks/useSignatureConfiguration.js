import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import signatureConfigurationActions from '~/modules/mmsx/redux/actions/signature-configuration'

const useSignatureConfiguration = () => {
  const data = useSelector((state) => get(state, 'mmsx.signatureConfiguration'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(signatureConfigurationActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useSignatureConfiguration
