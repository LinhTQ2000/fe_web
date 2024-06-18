import { Box, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { searchSupplyGroupApi } from '~/modules/mmsx/redux/sagas/supplies-category/search-supplies-category'
import { SearchSupplyTypeApi } from '~/modules/mmsx/redux/sagas/supply-type/search-supply-type'
import { searchWarehouseDefineApi } from '~/modules/mmsx/redux/sagas/warehouse-define/search'

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
      {() => (
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
                    name="warehouseId"
                    label={t('warehouseInventory.supplyInventory.warehouse')}
                    placeholder={t(
                      'warehouseInventory.supplyInventory.warehouse',
                    )}
                    asyncRequest={(s) =>
                      searchWarehouseDefineApi({
                        keyword: s,
                        limit: ASYNC_SEARCH_LIMIT,
                      })
                    }
                    asyncRequestHelper={(res) => res?.data?.items}
                    getOptionLabel={(option) => option?.name}
                    getOptionSubLabel={(option) => option?.code}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="supplyGroupId"
                    label={t('warehouseInventory.supplyInventory.supplyGroup')}
                    placeholder={t(
                      'warehouseInventory.supplyInventory.supplyGroup',
                    )}
                    asyncRequest={(s) =>
                      searchSupplyGroupApi({
                        keyword: s,
                        limit: ASYNC_SEARCH_LIMIT,
                      })
                    }
                    asyncRequestHelper={(res) => res?.data?.items}
                    getOptionLabel={(option) => option?.name}
                    getOptionSubLabel={(option) => option?.code}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="supplyTypeId"
                    label={t('warehouseInventory.supplyInventory.type')}
                    placeholder={t('warehouseInventory.supplyInventory.type')}
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
                <Grid item lg={6} xs={12}>
                  <Field.TextField
                    name="assetCode"
                    label={t('warehouseInventory.supplyInventory.code')}
                    placeholder={t('warehouseInventory.supplyInventory.code')}
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
