import React from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { ASSET_INVENTORY_MAP } from '~/modules/mmsx/constants'

const ItemSettingTable = ({ items }) => {
  const { t } = useTranslation(['mmsx'])

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
      field: 'assetInventoryType',
      headerName: t('warehouseDefine.assetInventoryType'),
      width: 200,
      renderCell: (params) => {
        return t(ASSET_INVENTORY_MAP[params.row?.assetType])
      },
    },
    {
      field: 'name',
      headerName: t('warehouseDefine.asset'),
      width: 200,
    },
    {
      field: 'vendor',
      headerName: t('warehouseDefine.vendor'),
      width: 200,
      renderCell: (params) => params.row?.vendor?.name,
    },
    {
      field: 'minStockQuantity',
      headerName: t('warehouseDefine.minStockQuantity'),
      width: 200,
    },
    {
      field: 'maxStockQuantity',
      headerName: t('warehouseDefine.maxStockQuantity'),
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
          {t('warehouseDefine.tableTitle')}
        </Typography>
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default ItemSettingTable
