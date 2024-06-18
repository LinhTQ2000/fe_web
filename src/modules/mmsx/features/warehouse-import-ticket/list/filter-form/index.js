import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import { Field } from '~/components/Formik'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import {
  ACTIVE_STATUS,
  WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS,
  WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS_DEVICE,
  WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS_SUPPLY,
  WAREHOUSE_IMPORT_TICKET_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { searchWarehouseImportRequestApi } from '~/modules/mmsx/redux/sagas/warehouse-import-request/search'
import { convertFilterParams } from '~/utils'

const FilterForm = () => {
  const { t } = useTranslation(['mmsx'])
  const { canAccess } = useApp()

  const getOptionType = () => {
    if (
      canAccess(FUNCTION_CODE.DEVICE_WAREHOUSE_IMPORT_REQUEST) &&
      !canAccess(FUNCTION_CODE.SUPPLY_WAREHOUSE_IMPORT_REQUEST)
    ) {
      return WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS_DEVICE
    } else if (
      canAccess(FUNCTION_CODE.SUPPLY_WAREHOUSE_IMPORT_REQUEST) &&
      !canAccess(FUNCTION_CODE.DEVICE_WAREHOUSE_IMPORT_REQUEST)
    ) {
      return WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS_SUPPLY
    } else {
      return WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS
    }
  }
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('warehouseExportTicket.code')}
          placeholder={t('warehouseExportTicket.code')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('warehouseExportTicket.name')}
          placeholder={t('warehouseExportTicket.name')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseImportRequestId"
          label={t('warehouseExportManagement.code')}
          placeholder={t('warehouseExportManagement.code')}
          asyncRequest={(s) =>
            searchWarehouseImportRequestApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
          getOptionSubLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="requestType"
          label={t('warehouseExportManagement.form.field.requestType')}
          placeholder={t('warehouseExportManagement.form.field.requestType')}
          options={getOptionType()}
          getOptionLabel={(opt) => t(opt?.text)}
          getOptionValue={(opt) => opt?.id}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="fromFactoryIds"
          label={t('warehouseExportManagement.fromFactory')}
          placeholder={t('warehouseExportManagement.fromFactory')}
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
          getOptionLabel={(opt) => opt?.name}
          getOptionSubLabel={(opt) => opt?.code}
          multiple
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="toFactoryIds"
          label={t('warehouseExportManagement.toFactory')}
          placeholder={t('warehouseExportManagement.toFactory')}
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
          getOptionLabel={(opt) => opt?.name}
          getOptionSubLabel={(opt) => opt?.code}
          multiple
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('general:common.status')}
          placeholder={t('general:common.status')}
          options={WAREHOUSE_IMPORT_TICKET_STATUS_OPTIONS}
          getOptionLabel={(opt) => t(opt?.text)}
          getOptionValue={(opt) => opt?.id}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="importDate"
          label={t('warehouseImportManagement.importDate')}
          placeholder={t('warehouseImportManagement.importDate')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
