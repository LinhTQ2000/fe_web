import { Box, InputAdornment, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'

function TableMaintenance(props) {
  const { items = [], frequency, values } = props
  const { t } = useTranslation(['database'])

  const columns = [
    {
      field: 'name',
      headerName: t('deviceGroup.tableMaintenance.name'),
      width: 150,
    },
    {
      field: 'type',
      headerName: t('deviceGroup.tableMaintenance.type'),
      width: 150,
    },
    {
      field: 'frequency',
      headerName: t('deviceGroup.tableMaintenance.frequency'),
      width: 150,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`itemMaintane[${index}].frequency`}
            placeholder={t('deviceGroup.tableMaintenance.frequency')}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {t('deviceGroup.unit.minutes')}
                </InputAdornment>
              ),
            }}
          />
        )
      },
    },
    {
      field: 'mtbf',
      headerName: t('deviceGroup.tableMaintenance.mtbf'),
      width: 250,
      headerTooltip: t('deviceGroup.tooltipHeader.mtbf'),
      renderCell: (params, index) => {
        const { mtbf } = params.row
        const result = frequency && mtbf ? mtbf * frequency : 0
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Field.TextField
              name={`itemMaintane[${index}].mtbf`}
              placeholder={t('deviceGroup.tableMaintenance.mtbf')}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                    {t('deviceGroup.unit.minutes')}
                  </InputAdornment>
                ),
              }}
              allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
            />
            {values?.maintenanceProperty?.name && (
              <>
                <Typography sx={{ ml: 1 }}>{result}</Typography>
                <Typography sx={{ ml: 1 }}>
                  {values?.maintenanceProperty?.name}
                </Typography>
              </>
            )}
          </Box>
        )
      },
    },
    {
      field: 'mttr',
      headerName: t('deviceGroup.tableMaintenance.mttr'),
      width: 150,
      headerTooltip: t('deviceGroup.tooltipHeader.mttr'),
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`itemMaintane[${index}].mttr`}
            placeholder={t('deviceGroup.tableMaintenance.mttr')}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {t('deviceGroup.unit.minutes')}
                </InputAdornment>
              ),
            }}
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
          />
        )
      },
    },
    {
      field: 'mtta',
      headerName: t('deviceGroup.tableMaintenance.mtta'),
      width: 150,
      headerTooltip: t('deviceGroup.tooltipHeader.mtta'),
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`itemMaintane[${index}].mtta`}
            placeholder={t('deviceGroup.tableMaintenance.mtta')}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {t('deviceGroup.unit.minutes')}
                </InputAdornment>
              ),
            }}
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
          />
        )
      },
    },
    {
      field: 'mttf',
      headerName: t('deviceGroup.tableMaintenance.mttf'),
      width: 250,
      headerTooltip: t('deviceGroup.tooltipHeader.mttf'),
      renderCell: (params, index) => {
        const { mttf } = params.row
        const result = frequency && mttf ? mttf * frequency : 0
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Field.TextField
              name={`itemMaintane[${index}].mttf`}
              placeholder={t('deviceGroup.tableMaintenance.mttf')}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                    {t('deviceGroup.unit.minutes')}
                  </InputAdornment>
                ),
              }}
              allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
            />
            {values?.maintenanceProperty?.name && (
              <>
                <Typography sx={{ ml: 1 }}>{result}</Typography>
                <Typography sx={{ ml: 1 }}>
                  {values?.maintenanceProperty?.name}
                </Typography>
              </>
            )}
          </Box>
        )
      },
    },
  ]

  return (
    <DataTable
      rows={items}
      title={t('deviceGroup.tableMaintenance.listTitle')}
      columns={columns}
      total={items.length}
      striped={false}
      hideSetting
      hideFooter
    />
  )
}

export default TableMaintenance
