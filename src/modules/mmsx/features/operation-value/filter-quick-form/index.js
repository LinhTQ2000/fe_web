import { Box, Grid } from '@mui/material'
import { getYear } from 'date-fns'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import {
  OPERATION_VALUE_MONTH_OPTION,
  OPERATION_VALUE_QUARTER_OPTIONS,
  OPERATION_VALUE_TIME_OPTIONS,
  REPORT_TYPE,
} from '~/modules/database/constants'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { ACTIVE_STATUS } from '~/modules/mmsx/constants'
import { convertFilterParams } from '~/utils'

function QuickFilter({ defaultFilter, setQuickFilters, quickFilters }) {
  const { t } = useTranslation(['mmsx'])
  const onSubmit = (val) => {
    setQuickFilters(val)
  }
  return (
    <Formik initialValues={quickFilters} onSubmit={onSubmit} enableReinitialize>
      {({ resetForm, values, setFieldValue }) => {
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
                      label={t('deviceStatusReport.factory')}
                      placeholder={t('deviceStatusReport.factory')}
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
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      multiple
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      name="year"
                      views={['year']}
                      label={t('general:years')}
                      placeholder={t('general:years')}
                      disableFuture
                      removeCloseButton
                      onChange={() => {
                        setFieldValue('time', null)
                        setFieldValue('timeMonth', null)
                        setFieldValue('timeQuarter', null)
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="timeUnit"
                      label={t('operationValue.timeUnit')}
                      placeholder={t('operationValue.timeUnit')}
                      options={OPERATION_VALUE_TIME_OPTIONS}
                      getOptionLabel={(opt) => t(opt?.text)}
                      getOptionValue={(opt) => opt?.id}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    {!values?.timeUnit && (
                      <Field.DateRangePicker
                        name="time"
                        label={t('operationValue.timeRange')}
                        placeholder={t('operationValue.timeRange')}
                        minDate={
                          new Date(
                            getYear(new Date(values?.year) || new Date()),
                            0,
                            1,
                          )
                        }
                        maxDate={
                          new Date(
                            getYear(new Date(values?.year) || new Date()),
                            11,
                            31,
                          )
                        }
                      />
                    )}
                    {values?.timeUnit === REPORT_TYPE.MONTH && (
                      <Field.Autocomplete
                        name="timeMonth"
                        label={t('operationValue.timeRange')}
                        placeholder={t('operationValue.chooseMonth')}
                        options={OPERATION_VALUE_MONTH_OPTION}
                        getOptionLabel={(opt) => t(opt?.text)}
                        getOptionValue={(opt) => opt?.id}
                      />
                    )}
                    {values?.timeUnit === REPORT_TYPE.QUARTER && (
                      <Field.Autocomplete
                        name="timeQuarter"
                        label={t('operationValue.timeRange')}
                        placeholder={t('operationValue.chooseQuarter')}
                        options={OPERATION_VALUE_QUARTER_OPTIONS}
                        getOptionLabel={(opt) => t(opt?.text)}
                        getOptionValue={(opt) => opt?.id}
                      />
                    )}
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
