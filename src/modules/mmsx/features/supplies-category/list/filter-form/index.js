import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('suppliesCategory.code')}
          placeholder={t('suppliesCategory.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('suppliesCategory.name')}
          placeholder={t('suppliesCategory.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="active"
          label={t('suppliesCategory.form.status')}
          placeholder={t('suppliesCategory.form.status')}
          options={ACTIVE_STATUS_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm