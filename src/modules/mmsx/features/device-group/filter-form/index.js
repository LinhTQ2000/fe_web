import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  ACTIVE_STATUS_OPTIONS,
  SOURCE_MANAGE_OPTIONS,
} from '~/modules/mmsx/constants'
import { searchArticleDeviceApi } from '~/modules/mmsx/redux/sagas/article-device/search'
import { searchDeviceTypeApi } from '~/modules/mmsx/redux/sagas/device-type/search'

const FilterForm = () => {
  const { t } = useTranslation(['database'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('deviceGroup.code')}
          placeholder={t('deviceGroup.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('deviceGroup.name')}
          placeholder={t('deviceGroup.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="articleDeviceGroupId"
          label={t('deviceGroup.deviceCategory')}
          placeholder={t('deviceGroup.deviceCategory')}
          asyncRequest={(s) =>
            searchArticleDeviceApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(option) => option.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="deviceTypeId"
          label={t('deviceGroup.deviceType')}
          placeholder={t('deviceGroup.deviceType')}
          asyncRequest={(s) =>
            searchDeviceTypeApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(option) => option.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="manageBy"
          label={t('general.manageBy.title')}
          placeholder={t('general.manageBy.title')}
          options={SOURCE_MANAGE_OPTIONS}
          getOptionLabel={(opt) => t(opt?.text)}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="codeOnWfx"
          label={t('deviceName.codeOnWfx')}
          placeholder={t('deviceName.codeOnWfx')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="active"
          label={t('general:common.status')}
          placeholder={t('general:common.status')}
          options={ACTIVE_STATUS_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
