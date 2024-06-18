import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TABLE_VIEW_LIMIT } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { ERROR_TYPE_PRIORITY_MAP } from '~/modules/database/constants'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'

export default function ErrorInfo(props) {
  const { deviceId, mode } = props
  const { t } = useTranslation(['mmsx'])

  const isCreate = mode === MODAL_MODE.CREATE

  const {
    data: { frequentError },
    actions,
  } = useDefineDevice()

  useEffect(() => {
    if (deviceId) {
      const params = {
        limit: TABLE_VIEW_LIMIT,
        id: deviceId,
      }
      actions.getDeviceFrequentError(params)
    }
  }, [deviceId])

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'name',
      headerName: t('deviceList.errorName'),
      width: 150,
    },
    {
      field: 'supplyType',
      headerName: t('deviceList.errorLevel'),
      width: 150,
      renderCell: (params) => t(ERROR_TYPE_PRIORITY_MAP[params.row?.priority]),
    },
    {
      field: 'countError',
      headerName: t('deviceList.errorBout'),
      width: 150,
    },
  ]
  return (
    <DataTable
      rows={isCreate ? [] : frequentError}
      columns={columns}
      striped={false}
      hideSetting
      hideFooter
    />
  )
}
