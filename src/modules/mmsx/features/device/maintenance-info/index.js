import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { ASSET_MAINTENANCE_TYPE_MAP } from '~/modules/mmsx/constants'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'
import { convertUtcDateToLocalTz } from '~/utils'

export default function MaintenanceInfo(props) {
  const { mode } = props
  const { t } = useTranslation(['mmsx'])

  const isCreate = mode === MODAL_MODE.CREATE

  const {
    data: { maintenanceInfo },
  } = useDefineDevice()

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
      headerName: t('deviceList.supplyName'),
      width: 150,
      renderCell: (params) => params.row?.asset?.name,
    },
    {
      field: 'supplyType',
      headerName: t('deviceList.supplyType'),
      width: 150,
      renderCell: (params) =>
        t(ASSET_MAINTENANCE_TYPE_MAP[params.row?.asset?.type]),
    },
    {
      field: 'maintenanceDate',
      headerName: t('deviceList.maintenanceDate'),
      width: 150,
      renderCell: (params) => convertUtcDateToLocalTz(params.row?.planDate),
    },
    {
      field: 'mtbfDate',
      headerName: t('deviceList.mtbfDate'),
      width: 150,
      renderCell: (params) =>
        convertUtcDateToLocalTz(params.row?.planDateByMtbf),
    },
    {
      field: 'mttfDate',
      headerName: t('deviceList.mttfDate'),
      width: 150,
      renderCell: (params) =>
        convertUtcDateToLocalTz(params.row?.planDateByMttf),
    },
    {
      field: 'mttr',
      headerName: t('deviceList.form.mttr'),
      width: 150,
      renderCell: (params) => `${params.row?.mttr} ${t('general:minutes')}`,
    },
    {
      field: 'mtta',
      headerName: t('deviceList.form.mtta'),
      width: 150,
      renderCell: (params) => `${params.row?.mtta} ${t('general:minutes')}`,
    },
  ]
  return (
    <DataTable
      rows={isCreate ? [] : maintenanceInfo}
      columns={columns}
      striped={false}
      hideSetting
      hideFooter
    />
  )
}
