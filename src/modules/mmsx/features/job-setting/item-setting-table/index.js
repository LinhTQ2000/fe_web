import { InputAdornment } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import {
  SETTING_JOB_PERIOD_ENUM,
  SETTING_JOB_PERIOD_MAP,
} from '~/modules/mmsx/constants'

export default function ItemsSettingTable({ items = [] }) {
  const { t } = useTranslation(['mmsx'])
  const columns = [
    {
      field: 'id',
      headerName: t('#'),
      width: 50,
      align: 'center',
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'period',
      headerName: t('jobConfiguration.period'),
      width: 200,
      renderCell: (params) => {
        return t(SETTING_JOB_PERIOD_MAP[params.row.period])
      },
    },
    {
      field: 'isNotification',
      headerName: t('jobConfiguration.notification'),
      width: 200,
      renderCell: (params, index) => {
        return (
          <Field.Checkbox
            name={`items[${index}].isNotification`}
            sx={{ pointerEvents: 'none' }}
          />
        )
      },
    },
    {
      field: 'isWarning',
      headerName: t('jobConfiguration.warning'),
      width: 200,
      renderCell: (params, index) => {
        return (
          <Field.Checkbox
            name={`items[${index}].isWarning`}
            sx={{ pointerEvents: 'none' }}
          />
        )
      },
    },
    {
      field: 'isJob',
      headerName: t('jobConfiguration.job'),
      width: 200,
      renderCell: (params, index) => {
        return (
          <Field.Checkbox
            name={`items[${index}].isJob`}
            sx={{ pointerEvents: 'none' }}
          />
        )
      },
    },
    {
      field: 'beforeDate',
      headerName: t('jobConfiguration.beforeDate'),
      width: 200,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].beforeDate`}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
            disabled={params.row.period === SETTING_JOB_PERIOD_ENUM.ONE_DAY}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {t('general:days')}
                </InputAdornment>
              ),
            }}
          />
        )
      },
    },
  ]
  return (
    <DataTable
      rows={items}
      columns={columns}
      striped={false}
      hideSetting
      hideFooter
    />
  )
}
