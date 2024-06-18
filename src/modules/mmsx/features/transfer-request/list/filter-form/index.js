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
import {
  DEVICE_REQUEST_STATUS_OPTIONS,
  TRANSFER_REQUEST_TYPE_OPTIONS,
} from '~/modules/mmsx/constants'
import { searchRequestDeviceApi } from '~/modules/mmsx/redux/sagas/request-device/search-request-device'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('transferRequest.table.code')}
          placeholder={t('transferRequest.table.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('transferRequest.table.name')}
          placeholder={t('transferRequest.table.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="deviceRequestId"
          label={t('transferRequest.table.grantRequest')}
          placeholder={t('transferRequest.table.grantRequest')}
          asyncRequest={(s) =>
            searchRequestDeviceApi({
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
          name="type"
          label={t('transferRequest.table.type')}
          placeholder={t('transferRequest.table.type')}
          options={TRANSFER_REQUEST_TYPE_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="factoryIds"
          label={t('transferRequest.table.receivedFactory')}
          placeholder={t('transferRequest.table.receivedFactory')}
          asyncRequest={(s) =>
            searchFactoriesApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          multiple
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="estimatedTransferDate"
          label={t('transferRequest.table.expectedTransferDay')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('suppliesCategory.form.status')}
          placeholder={t('suppliesCategory.form.status')}
          options={DEVICE_REQUEST_STATUS_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
