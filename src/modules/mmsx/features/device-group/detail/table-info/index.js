import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Checkbox from '~/components/Checkbox'
import DataTable from '~/components/DataTable'
import { SUPPLY_TYPE } from '~/modules/mmsx/constants'

function TableInfo(props) {
  const { items = [] } = props
  const { t } = useTranslation(['database'])

  const columns = [
    {
      field: 'name',
      headerName: t('deviceGroup.tableInfo.name'),
      width: 150,
    },
    {
      field: 'type',
      headerName: t('deviceGroup.tableInfo.type'),
      width: 150,
      renderCell: (param) => param.row?.supplyType?.name,
    },
    {
      field: 'vendor',
      headerName: t('deviceGroup.tableInfo.vendor'),
      width: 150,
      renderCell: (param) => param.row?.vendor?.name,
    },
    {
      field: 'quantity',
      headerName: t('deviceGroup.tableInfo.quantity'),
      width: 150,
    },
    {
      field: 'estimateUsedTime',
      headerName: t('deviceGroup.tableInfo.usageTime'),
      width: 150,
      renderCell: (params) => {
        const { estimateUsedTime } = params.row
        return estimateUsedTime
          ? `${estimateUsedTime} ${t('general:minutes')}`
          : null
      },
    },
    {
      field: 'isFix',
      headerName: t('deviceGroup.tableInfo.isFix'),
      width: 150,
      renderCell: (param) => {
        return param?.row?.type === SUPPLY_TYPE.ACCESSORY ? (
          <Checkbox defaultChecked={param?.row?.canFixable} disabled />
        ) : null
      },
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
        <Typography variant="h4">
          {t('deviceGroup.tableInfo.listTitle')}
        </Typography>
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default TableInfo
