import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'

function ItemSettingTable(props) {
  const { items = [] } = props
  const { t } = useTranslation(['mmsx'])

  const { page, pageSize, sort, setPage, setPageSize, setSort } =
    useQueryState()

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
      field: 'code',
      headerName: t('repairRequest.form.field.supplyCode'),
      width: 200,
    },
    {
      field: 'name',
      headerName: t('repairRequest.form.field.supplyName'),
      width: 200,
    },
    {
      field: 'quantity',
      headerName: t('repairRequest.form.field.quantity'),
      width: 200,
    },
  ]

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" mt={1} mb={1}>
          {t('repairRequest.form.table')}
        </Typography>
      </Box>
      <DataTable
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        sort={sort}
        rows={items}
        columns={columns}
        striped={false}
        hideSetting
      />
    </>
  )
}

export default ItemSettingTable
