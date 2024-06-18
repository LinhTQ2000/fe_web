import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { DEVICE_STATUS_ENUM_OPTIONS } from '~/modules/mmsx/constants'
import { searchDeviceGroupApi } from '~/modules/mmsx/redux/sagas/device-group/search'
import { searchDeviceNameApi } from '~/modules/mmsx/redux/sagas/device-name/search'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="serial"
          label={t('deviceStatus.serial')}
          placeholder={t('deviceStatus.serial')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="deviceNameId"
          label={t('deviceStatus.deviceName')}
          placeholder={t('deviceStatus.deviceName')}
          asyncRequest={(s) =>
            searchDeviceNameApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="identificationNo"
          label={t('deviceList.identificationNo')}
          placeholder={t('deviceList.identificationNo')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="deviceGroupId"
          label={t('deviceStatus.deviceGroup')}
          placeholder={t('deviceStatus.deviceGroup')}
          asyncRequest={(s) =>
            searchDeviceGroupApi({
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
          name="deviceStatus"
          label={t('deviceStatus.status.title')}
          placeholder={t('deviceStatus.status.title')}
          options={DEVICE_STATUS_ENUM_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
