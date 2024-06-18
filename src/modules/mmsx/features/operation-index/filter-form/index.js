import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { convertFilterParams } from '~/utils'

const FilterForm = () => {
  const { t } = useTranslation(['database'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('operationIndex.code')}
          placeholder={t('operationIndex.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('operationIndex.name')}
          placeholder={t('operationIndex.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="factoryIds"
          label={t('operationIndex.factory')}
          placeholder={t('operationIndex.factory')}
          asyncRequest={(s) =>
            searchFactoriesApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: convertFilterParams({
                active: ACTIVE_STATUS.ACTIVE,
              }),
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
          getOptionLabel={(opt) => opt?.name}
          getOptionSubLabel={(opt) => opt?.code}
          multiple
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="active"
          label={t('general:common.status')}
          placeholder={t('general:common.status')}
          options={ACTIVE_STATUS_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
