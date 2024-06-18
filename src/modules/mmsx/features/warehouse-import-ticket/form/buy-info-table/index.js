import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'

export default function BuyInfoTable({ items = [] }) {
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
    },
    {
      field: 'quantity',
      headerName: t('warehouseImportRequest.quantityImport'),
      width: 200,
    },
    {
      field: 'remainQuantity',
      headerName: t('warehouseImportManagement.remainQuantity'),
      width: 200,
    },
  ]
  return (
    <DataTable
      title={t('warehouseImportRequest.deviceTitleBuy')}
      rows={items}
      columns={column}
      striped={false}
      hideSetting
      hideFooter
    />
  )
}
