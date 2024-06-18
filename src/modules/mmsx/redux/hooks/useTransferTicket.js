import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import transferTicketAction from '~/modules/mmsx/redux/actions/transfer-ticket'

function useTransferTicket() {
  const data = useSelector((state) => get(state, 'mmsx.transferTicket'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(transferTicketAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useTransferTicket
