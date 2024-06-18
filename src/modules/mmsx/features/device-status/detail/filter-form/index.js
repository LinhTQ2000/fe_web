import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="date"
          label={t('deviceStatus.date')}
          placeholder={t('deviceStatus.date')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
