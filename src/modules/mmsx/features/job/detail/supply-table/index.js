import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { JOB_TYPE_MAINTENANCE_MAP } from '~/modules/mmsx/constants'
import useJob from '~/modules/mmsx/redux/hooks/useJob'

function SupplyTable() {
  const { t } = useTranslation(['mmsx'])
  const {
    data: { jobDetail },
  } = useJob()
  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'supplyGroup',
      headerName: t('suppliesInventory.suppliesGroup'),
      width: 250,
      renderCell: (params) => {
        return params.row?.supplyGroup?.name
      },
    },
    {
      field: 'type',
      headerName: t('supplies.category.type'),
      width: 250,
      renderCell: (params) => {
        return params.row?.supplyType?.name
      },
    },
    {
      field: 'code',
      headerName: t('supplies.category.code'),
      width: 250,
    },
    {
      field: 'name',
      headerName: t('supplies.category.name'),
      width: 250,
    },
    {
      field: 'maintenanceType',
      headerName: t('job.detail.maintenanceType'),
      width: 250,
      renderCell: (params) => {
        return t(JOB_TYPE_MAINTENANCE_MAP[params.row?.maintenanceType])
      },
    },
    {
      field: 'quantity',
      headerName: t('job.detail.quantity'),
      width: 250,
    },
    {
      field: 'unit',
      headerName: t('general.placeholder.unit'),
      width: 250,
      renderCell: (params) => {
        return params.row?.unit?.name
      },
    },
  ]
  return (
    <DataTable
      columns={columns}
      rows={jobDetail?.supplies || []}
      hideFooter
      hideSetting
      striped={false}
    />
  )
}

export default SupplyTable
