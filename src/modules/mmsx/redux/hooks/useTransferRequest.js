import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import transferRequestAction from '~/modules/mmsx/redux/actions/transfer-request'

function useTransferRequest() {
  const data = useSelector((state) => get(state, 'mmsx.transferRequest'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(transferRequestAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useTransferRequest
