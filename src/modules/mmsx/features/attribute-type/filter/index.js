import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchItemUnitsApi } from '~/modules/database/redux/sagas/item-unit-setting/search-item-units'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { convertFilterParams } from '~/utils'

const FilterForm = () => {
  const { t } = useTranslation('mmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('attributeType.table.code')}
          placeholder={t('attributeType.table.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
          }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('attributeType.table.name')}
          placeholder={t('attributeType.table.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="unitId"
          label={t('attributeType.table.unit')}
          placeholder={t('attributeType.table.unit')}
          asyncRequest={(s) =>
            searchItemUnitsApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: convertFilterParams({
                active: ACTIVE_STATUS.ACTIVE,
              }),
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="active"
          label={t('general:common.status')}
          placeholder={t('general:common.status')}
          options={ACTIVE_STATUS_OPTIONS}
          getOptionLabel={(opt) => t(opt?.text)}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
