import { Box, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import { ACTIVE_STATUS } from '~/modules/mmsx/constants'
import useWarehouseInventory from '~/modules/mmsx/redux/hooks/useWarehouseInventory'
import { searchDeviceListApi } from '~/modules/mmsx/redux/sagas/define-device/search-device-list'
import { searchVendorsApi } from '~/modules/mmsx/redux/sagas/define-vendor/search-vendors'
import { convertFilterParams } from '~/utils'

function QuickFilter({ setQuickFilters, defaultFilter }) {
  const { t } = useTranslation(['mmsx'])
  const {
    data: { inventoryDetail },
  } = useWarehouseInventory()
  const onSubmit = (val) => {
    setQuickFilters(val)
  }
  return (
    <Formik
      initialValues={defaultFilter}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ resetForm }) => (
        <Form>
          <Grid container justifyContent="center" sx={{ mb: 4 }}>
            <Grid item xl={11} xs={12}>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item lg={6} xs={12}>
                  <LabelValue
                    label={t('warehouseInventory.factory')}
                    value={inventoryDetail?.factory?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LabelValue
                    label={t('warehouseInventory.deviceGroup')}
                    value={inventoryDetail?.asset?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LabelValue
                    label={t('warehouseInventory.warehouse')}
                    value={inventoryDetail?.warehouse?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="deviceId"
                    label={t('warehouseInventory.serial')}
                    placeholder={t('warehouseInventory.serial')}
                    asyncRequest={(s) =>
                      searchDeviceListApi({
                        keyword: s,
                        limit: ASYNC_SEARCH_LIMIT,
                        filter: convertFilterParams({
                          active: ACTIVE_STATUS.ACTIVE,
                        }),
                      })
                    }
                    asyncRequestHelper={(res) => res?.data?.items}
                    getOptionLabel={(opt) => opt?.serial}
                    getOptionSubLabel={(opt) =>
                      `${opt?.identificationNo} - ${opt?.name}`
                    }
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.TextField
                    name="model"
                    label={t('warehouseInventory.model')}
                    placeholder={t('warehouseInventory.model')}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="vendorId"
                    label={t('warehouseInventory.vendor')}
                    placeholder={t('warehouseInventory.vendor')}
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
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      color="grayF4"
                      sx={{ mr: 1 }}
                      onClick={() => {
                        resetForm()
                        setQuickFilters(defaultFilter)
                      }}
                    >
                      {t('general:common.cancel')}
                    </Button>
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
