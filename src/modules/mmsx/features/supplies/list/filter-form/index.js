import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { searchVendorsApi } from '~/modules/mmsx/redux/sagas/define-vendor/search-vendors'
import { searchSupplyGroupApi } from '~/modules/mmsx/redux/sagas/supplies-category/search-supplies-category'
import { SearchSupplyTypeApi } from '~/modules/mmsx/redux/sagas/supply-type/search-supply-type'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('supplies.category.code')}
          placeholder={t('supplies.category.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('supplies.category.name')}
          placeholder={t('supplies.category.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="nameOther"
          label={t('supplies.form.field.nameOther')}
          placeholder={t('supplies.form.field.nameOther')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="supplyGroupId"
          label={t('supplies.category.suppliesCategory')}
          placeholder={t('supplies.category.suppliesCategory')}
          asyncRequest={(s) =>
            searchSupplyGroupApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="supplyTypeId"
          label={t('supplies.category.type')}
          placeholder={t('supplies.category.type')}
          asyncRequest={(s) =>
            SearchSupplyTypeApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="vendorId"
          label={t('supplies.category.vendor')}
          placeholder={t('supplies.category.vendor')}
          asyncRequest={(s) =>
            searchVendorsApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.result}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <Field.DateRangePicker
          name="updatedAt"
          label={t('common.updatedAt')}
          placeholder={t('common.updatedAt')}
        />
      </Grid> */}
      <Grid item xs={12}>
        <Field.Autocomplete
          name="active"
          label={t('deviceCategory.form.status')}
          placeholder={t('deviceCategory.form.status')}
          options={ACTIVE_STATUS_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
