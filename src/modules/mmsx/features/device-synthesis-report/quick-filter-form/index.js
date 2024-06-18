import { Box, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import {
  ASSET_TYPE_OPTIONS,
  DEVICE_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { searchArticleDeviceApi } from '~/modules/mmsx/redux/sagas/article-device/search'
import { searchVendorsApi } from '~/modules/mmsx/redux/sagas/define-vendor/search-vendors'
import { searchDeviceGroupApi } from '~/modules/mmsx/redux/sagas/device-group/search'
import { searchDeviceTypeApi } from '~/modules/mmsx/redux/sagas/device-type/search'

function QuickFilter({ defaultFilter, setQuickFilters }) {
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
      {({ handleReset }) => {
        return (
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
                      name="factoryIds"
                      label={t('deviceSynthesisReport.factory')}
                      placeholder={t('deviceSynthesisReport.factory')}
                      asyncRequest={(s) =>
                        searchFactoriesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      multiple
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="articleDeviceGroupId"
                      label={t('deviceSynthesisReport.articleDevice')}
                      placeholder={t('deviceSynthesisReport.articleDevice')}
                      asyncRequest={(s) =>
                        searchArticleDeviceApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="deviceGroup"
                      label={t('deviceSynthesisReport.deviceGroup')}
                      placeholder={t('deviceSynthesisReport.deviceGroup')}
                      asyncRequest={(s) =>
                        searchDeviceGroupApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="deviceType"
                      label={t('deviceSynthesisReport.deviceType')}
                      placeholder={t('deviceSynthesisReport.deviceType')}
                      asyncRequest={(s) =>
                        searchDeviceTypeApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('deviceSynthesisReport.name')}
                      placeholder={t('deviceSynthesisReport.name')}
                    />
                  </Grid>
                  {/* <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="serial"
                      label={t('deviceSynthesisReport.serial')}
                      placeholder={t('deviceSynthesisReport.serial')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="model"
                      label={t('deviceSynthesisReport.model')}
                      placeholder={t('deviceSynthesisReport.model')}
                    />
                  </Grid> */}
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="assetType"
                      label={t('deviceSynthesisReport.assetType')}
                      placeholder={t('deviceSynthesisReport.assetType')}
                      options={ASSET_TYPE_OPTIONS}
                      getOptionLabel={(opt) => t(opt?.text)}
                      getOptionValue={(opt) => opt?.id}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="vendor"
                      label={t('deviceSynthesisReport.vendor')}
                      placeholder={t('deviceSynthesisReport.vendor')}
                      asyncRequest={(s) =>
                        searchVendorsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.result}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="status"
                      label={t('deviceSynthesisReport.useStatus')}
                      placeholder={t('deviceSynthesisReport.useStatus')}
                      options={DEVICE_STATUS_OPTIONS}
                      getOptionLabel={(opt) => t(opt?.text)}
                      getOptionValue={(opt) => opt?.id}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="createdAt"
                      label={t('deviceSynthesisReport.createdAt')}
                      placeholder={t('deviceSynthesisReport.createdAt')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        color="grayF4"
                        sx={{ mr: 1 }}
                        onClick={() => {
                          setQuickFilters(defaultFilter)
                          handleReset()
                        }}
                      >
                        {t('general:common.cancel')}
                      </Button>
                      <Button type="submit">
                        {t('general:common.search')}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default QuickFilter
