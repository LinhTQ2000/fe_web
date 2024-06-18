import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'

export default function InfoTable({ items = [] }) {
  const { t } = useTranslation(['mmsx'])
  const column = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'name',
      headerName: t('warehouseExportManagement.form.table.deviceCategory'),
      width: 200,
      renderCell: (params) => params.row?.deviceGroup?.name,
    },
    {
      field: 'quantity',
      headerName: t('transferRequest.form.field.transferQuantity'),
      width: 200,
    },
    {
      field: 'remainQuantity',
      headerName: t('transferTicket.remainQuantity'),
      width: 200,
    },
  ]
  return (
    <DataTable
      title={t('transferTicket.infoTitle')}
      rows={items}
      columns={column}
      striped={false}
      hideSetting
      hideFooter
    />
  )
}
