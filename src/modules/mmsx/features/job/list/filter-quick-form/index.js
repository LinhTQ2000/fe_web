import React from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import {
  JOB_STATUS_LIST,
  JOB_TYPE_OPTIONS,
  OVERDUE_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { getResponsibleUserApi } from '~/modules/mmsx/redux/sagas/maintenance-team/get-member'

const JobQuickFilter = ({ setQuickFilters, defaultFilter, quickFilters }) => {
  const { t } = useTranslation(['mmsx'])
  const onSubmit = (values) => {
    setQuickFilters(values)
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
                      name="type"
                      label={t('job.workType')}
                      placeholder={t('job.workType')}
                      options={JOB_TYPE_OPTIONS}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => t(opt?.text)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="status"
                      label={t('job.status')}
                      placeholder={t('job.status')}
                      options={JOB_STATUS_LIST}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id}
                      multiple
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="executionDatePlan"
                      label={t('job.planDay')}
                      placeholder={t('job.planDay')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="assignId"
                      label={t('job.performer')}
                      placeholder={t('job.performer')}
                      asyncRequest={(s) =>
                        getResponsibleUserApi({
                          keyword: s,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data}
                      getOptionLabel={(opt) => opt?.username}
                      getOptionSubLabel={(opt) => opt?.fullName}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="isOverdue"
                      label={t('job.isOverdue')}
                      placeholder={t('job.isOverdue')}
                      options={OVERDUE_STATUS_OPTIONS}
                      getOptionLabel={(opt) => t(opt?.text)}
                      getOptionValue={(opt) => opt?.id}
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

export default JobQuickFilter
