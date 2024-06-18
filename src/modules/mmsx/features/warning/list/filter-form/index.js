import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { WARNING_TYPE } from '~/modules/mmsx/constants'
import { searchDeviceNameApi } from '~/modules/mmsx/redux/sagas/device-name/search'
// import { WARNING_STATUS_LIST } from '~/modules/mmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('warningList.table.code')}
          placeholder={t('warningList.table.code')}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('warningList.table.name')}
          placeholder={t('warningList.table.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="type"
          label={t('warningList.table.type')}
          placeholder={t('warningList.table.type')}
          options={WARNING_TYPE}
          getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
          getOptionValue={(opt) => opt?.value?.toString()}
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
          name="deviceSerial"
          label={t('warningList.table.serial')}
          placeholder={t('warningList.table.serial')}
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
      {/* <Grid item xs={12}>
        <Field.Autocomplete
          name="areaId"
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
        />
      </Grid> */}
    </Grid>
  )
}

export default FilterForm
