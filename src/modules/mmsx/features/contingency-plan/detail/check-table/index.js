import React from 'react'

import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { convertWithCommas } from '~/utils'

function CheckTable({ checkItems }) {
  const { t } = useTranslation(['mmsx'])

  const columns = [
    {
      field: 'id',
      headerName: '',
      width: 80,
      renderCell: (_, index) => {
        return (
          <Typography variant="h4" sx={{ fontStyle: 'italic' }}>
            {`(${index + 1})`}
          </Typography>
        )
      },
    },
    {
      field: 'name',
      headerName: '',
      width: 200,
      renderCell: (params) => {
        return (
          <Typography
            variant="h4"
            sx={{ textTransform: 'uppercase', fontStyle: 'italic' }}
          >
            {t(`contingencyPlan.form.checkTable.${params?.row?.name}`)}
          </Typography>
        )
      },
    },
    {
      field: 'value',
      headerName: '',
      width: 200,
      renderCell: (params) =>
        convertWithCommas(params?.row[params.row.name] || 0),
    },
  ]

  return (
    <>
      <DataTable
        title={t('contingencyPlan.form.censorshipCheck')}
        rows={checkItems || []}
        columns={columns}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default CheckTable
