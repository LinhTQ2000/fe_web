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
  DEVICE_ACTIVE_STATUS_OPTIONS,
  DEVICE_STATUS_OPTIONS,
  SOURCE_MANAGE_OPTIONS,
} from '~/modules/mmsx/constants'
import { searchArticleDeviceApi } from '~/modules/mmsx/redux/sagas/article-device/search'
import { searchVendorsApi } from '~/modules/mmsx/redux/sagas/define-vendor/search-vendors'
import { searchDeviceGroupApi } from '~/modules/mmsx/redux/sagas/device-group/search'
import { searchDeviceNameApi } from '~/modules/mmsx/redux/sagas/device-name/search'
import { searchDeviceTypeApi } from '~/modules/mmsx/redux/sagas/device-type/search'

const FilterForm = () => {
  const { t } = useTranslation('mmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('deviceList.code')}
          placeholder={t('deviceList.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
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
        <Field.Autocomplete
          name="articleDeviceGroupId"
          label={t('deviceList.articleDevice')}
          placeholder={t('deviceList.articleDevice')}
          asyncRequest={(s) =>
            searchArticleDeviceApi({
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
          name="deviceGroupId"
          label={t('deviceList.deviceGroup')}
          placeholder={t('deviceList.deviceGroup')}
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
          name="deviceTypeId"
          label={t('deviceList.deviceType')}
          placeholder={t('deviceList.deviceType')}
          asyncRequest={(s) =>
            searchDeviceTypeApi({
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
          name="factoryIds"
          label={t('deviceList.factory')}
          placeholder={t('deviceList.factory')}
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
        <Field.Autocomplete
          name="vendorId"
          label={t('deviceList.vendor')}
          placeholder={t('deviceList.vendor')}
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
      <Grid item xs={12}>
        <Field.TextField
          name="serial"
          label={t('deviceList.serial')}
          placeholder={t('deviceList.serial')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="actualSerial"
          label={t('deviceList.actualSerial')}
          placeholder={t('deviceList.actualSerial')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
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
          name="manageBy"
          label={t('database:general.manageBy.title')}
          placeholder={t('database:general.manageBy.title')}
          options={SOURCE_MANAGE_OPTIONS}
          getOptionLabel={(opt) => t(opt?.text)}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('deviceList.deviceStatus')}
          placeholder={t('deviceList.deviceStatus')}
          options={DEVICE_STATUS_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="active"
          label={t('deviceList.activeStatus')}
          placeholder={t('deviceList.activeStatus')}
          options={DEVICE_ACTIVE_STATUS_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
