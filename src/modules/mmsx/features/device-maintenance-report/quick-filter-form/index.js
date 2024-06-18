import { Box, FormControlLabel, Grid, Radio, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'

function QuickFilter({
  defaultFilter,
  setQuickFilters,
  setTypeReport,
  quickFilters,
}) {
  const { t } = useTranslation(['mmsx'])
  const onSubmit = (val) => {
    setQuickFilters(val)
  }
  return (
    <Formik initialValues={quickFilters} onSubmit={onSubmit} enableReinitialize>
      {({ resetForm }) => {
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
                      label={t('deviceMaintenanceReport.factory')}
                      placeholder={t('deviceMaintenanceReport.factory')}
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
                  <Grid item xs={12} lg={6}>
                    <LabelValue
                      label={
                        <Typography sx={{ mt: '9px' }}>
                          {t('deviceMaintenanceReport.typeReport')}
                        </Typography>
                      }
                    >
                      <Field.RadioGroup
                        name="typeReport"
                        onChange={(val) => setTypeReport(+val)}
                      >
                        <FormControlLabel
                          value={0}
                          control={<Radio />}
                          label={t('general:months')}
                        />
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label={t('general:quarters')}
                        />
                      </Field.RadioGroup>
                    </LabelValue>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      name="year"
                      views={['year']}
                      label={t('general:years')}
                      placeholder={t('general:years')}
                      removeCloseButton
                      maxDate={new Date()}
                    />
                  </Grid>
                  {/* <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="type"
                      label={t('deviceMaintenanceReport.type')}
                      placeholder={t('deviceMaintenanceReport.type')}
                      options={REPORT_JOB_TYPE_OPTIONS}
                      getOptionLabel={(opt) => t(opt.text)}
                      getOptionValue={(opt) => opt.id}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        color="grayF4"
                        sx={{ mr: 1 }}
                        onClick={() => {
                          resetForm()
                          setTypeReport(0)
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
