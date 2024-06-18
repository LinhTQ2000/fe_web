import { Box, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { searchDeviceGroupApi } from '~/modules/mmsx/redux/sagas/device-group/search'
import { searchWarehouseDefineApi } from '~/modules/mmsx/redux/sagas/warehouse-define/search'
import { convertFilterParams } from '~/utils'

function QuickFilter({ setQuickFilters, defaultFilter }) {
  const { t } = useTranslation(['mmsx'])
  const onSubmit = (val) => {
    setQuickFilters(val)
  }
  return (
    <Formik
      initialValues={defaultFilter}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Grid container justifyContent="center" sx={{ mb: 4 }}>
            <Grid item xl={11} xs={12}>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="factoryId"
                    label={t('warehouseInventory.deviceInventory.factory')}
                    placeholder={t(
                      'warehouseInventory.deviceInventory.factory',
                    )}
                    asyncRequest={(s) =>
                      searchFactoriesApi({
                        keyword: s,
                        limit: ASYNC_SEARCH_LIMIT,
                      })
                    }
                    asyncRequestHelper={(res) => res?.data?.items}
                    getOptionLabel={(option) => option?.name}
                    getOptionSubLabel={(option) => option?.code}
                    onChange={() => {
                      setFieldValue('deviceWarehouseId', null)
                    }}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="deviceWarehouseId"
                    label={t('warehouseInventory.deviceInventory.warehouse')}
                    placeholder={t(
                      'warehouseInventory.deviceInventory.warehouse',
                    )}
                    asyncRequest={(s) =>
                      searchWarehouseDefineApi({
                        keyword: s,
                        limit: ASYNC_SEARCH_LIMIT,
                        filter: convertFilterParams({
                          factoryId: values?.factoryId?.id,
                        }),
                      })
                    }
                    asyncRequestDeps={values?.factoryId}
                    asyncRequestHelper={(res) => res?.data?.items}
                    getOptionLabel={(option) => option?.name}
                    getOptionSubLabel={(option) => option?.code}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="assetId"
                    label={t('warehouseInventory.deviceInventory.deviceGroup')}
                    placeholder={t(
                      'warehouseInventory.deviceInventory.deviceGroup',
                    )}
                    asyncRequest={(s) =>
                      searchDeviceGroupApi({
                        keyword: s,
                        limit: ASYNC_SEARCH_LIMIT,
                      })
                    }
                    asyncRequestHelper={(res) => res?.data?.items}
                    getOptionLabel={(option) => option?.name}
                    getOptionSubLabel={(option) => option?.code}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="submit">{t('general:common.search')}</Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
export default QuickFilter
