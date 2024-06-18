import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchUsersApi } from '~/modules/configuration/redux/sagas/user-management/search-users'
import {
  REPAIR_REQUEST_PRIORITY_OPTIONS,
  REPAIR_REQUEST_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { searchAreaApi } from '~/modules/mmsx/redux/sagas/area/search'
import { searchDeviceNameApi } from '~/modules/mmsx/redux/sagas/device-name/search'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('repairRequest.table.code')}
          placeholder={t('repairRequest.table.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('repairRequest.table.name')}
          placeholder={t('repairRequest.table.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="deviceIdentificationNo"
          label={t('deviceList.identificationNo')}
          placeholder={t('deviceList.identificationNo')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="deviceSerial"
          label={t('repairRequest.table.serial')}
          placeholder={t('repairRequest.table.serial')}
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
        <Field.Autocomplete
          name="requestedBy"
          label={t('repairRequest.table.user')}
          placeholder={t('repairRequest.table.user')}
          asyncRequest={(s) =>
            searchUsersApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.username}
          getOptionSubLabel={(opt) => opt?.fullName}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="priority"
          label={t('repairRequest.table.priority')}
          placeholder={t('repairRequest.table.priority')}
          options={REPAIR_REQUEST_PRIORITY_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="areaIds"
          label={t('repairRequest.table.area')}
          placeholder={t('repairRequest.table.area')}
          asyncRequest={(s) =>
            searchAreaApi({
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
          name="status"
          label={t('general:common.status')}
          placeholder={t('general:common.status')}
          options={REPAIR_REQUEST_STATUS_OPTIONS}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
