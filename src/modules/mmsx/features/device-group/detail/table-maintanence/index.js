import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { SUPPLY_TYPE_MAP } from '~/modules/mmsx/constants'

function TableMaintenance(props) {
  const { items } = props
  const { t } = useTranslation(['database'])

  const columns = [
    {
      field: 'name',
      headerName: t('deviceGroup.tableMaintenance.name'),
      width: 150,
      renderCell: (param) => {
        return param?.row?.name || items?.name
      },
    },
    {
      field: 'type',
      headerName: t('deviceGroup.tableMaintenance.type'),
      width: 150,
      renderCell: (param) => {
        return param.row.type
          ? t(SUPPLY_TYPE_MAP[param.row.type])
          : t('deviceGroup.tableMaintenance.device')
      },
    },
    {
      field: 'frequency',
      headerName: t('deviceGroup.tableMaintenance.frequency'),
      width: 150,
      renderCell: (param) => {
        return param?.row?.maintenanceFrequency
      },
    },
    {
      field: 'mtbf',
      headerName: t('deviceGroup.tableMaintenance.mtbf'),
      width: 150,
      headerTooltip: t('deviceGroup.tooltipHeader.mtbf'),
      renderCell: (param) => {
        return param?.row?.mtbf
      },
    },
    {
      field: 'mttr',
      headerName: t('deviceGroup.tableMaintenance.mttr'),
      width: 150,
      headerTooltip: t('deviceGroup.tooltipHeader.mttr'),
      renderCell: (param) => {
        return param?.row?.mttr
      },
    },
    {
      field: 'mtta',
      headerName: t('deviceGroup.tableMaintenance.mtta'),
      width: 150,
      headerTooltip: t('deviceGroup.tooltipHeader.mtta'),
      renderCell: (param) => {
        return param?.row?.mtta
      },
    },
    {
      field: 'mttf',
      headerName: t('deviceGroup.tableMaintenance.mttf'),
      width: 150,
      headerTooltip: t('deviceGroup.tooltipHeader.mttf'),
      renderCell: (param) => {
        return param?.row?.mttf
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
          {t('deviceGroup.tableMaintenance.listTitle')}
        </Typography>
      </Box>
      <DataTable
        rows={items.maintenanceIndex || []}
        columns={columns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default TableMaintenance
