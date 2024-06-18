import React, { useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useSignatureConfiguration from '~/modules/mmsx/redux/hooks/useSignatureConfiguration'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { SETTING_SIGNATURE_TYPE_OPTIONS } from '../../constants'
import { getSignatureConfigurationDetailsApi } from '../../redux/sagas/signature-configuration/get-signature-configuration-details'
import ItemsSettingTable from './items-setting-table'
import { formSchema } from './schema'

const breadcrumbs = [
  {
    title: ROUTE.SETTING.TITLE,
  },
  {
    route: ROUTE.SIGNATURE_CONFIGURATION.PATH,
    title: ROUTE.SIGNATURE_CONFIGURATION.TITLE,
  },
]

const SignatureConfiguration = () => {
  const { t } = useTranslation(['mmsx'])
  const [formType, setFormType] = useState(null)
  const [list, setList] = useState([])

  const {
    data: { isLoading },
    actions,
  } = useSignatureConfiguration()

  const initialValues = {
    formType: formType,
    items: list,
  }

  const handleChangeType = async (id, setFieldValue) => {
    setFormType(id)
    setFieldValue('items', [])
    if (id || id === 0) {
      const res = await getSignatureConfigurationDetailsApi(id)
      if (res?.statusCode === 200) {
        setFieldValue('items', res?.data?.details)
        setList(res?.data?.details)
      }
    }
  }

  const onSubmit = (values) => {
    const convertValues = {
      type: values?.formType,
      details: values.items,
    }
    actions.updateSignatureConfiguration(convertValues, () => {
      window.location.reload()
    })
  }

  const renderActionBar = (handleReset) => {
    return <ActionBar onCancel={handleReset} mode={MODAL_MODE.UPDATE} />
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.signatureConfiguration')}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => (
          <Form>
            <Typography variant="h4" mt={1} mb={1}>
              {t('signatureConfiguration.title')}
            </Typography>
            <Grid
              container
              sx={(theme) => ({
                justifyContent: 'center',
                bgcolor: 'grayF4.main',
                borderRadius: 1,
                my: 2,
                pt: 1,
                pb: 2,

                [theme.breakpoints.down('xl')]: {
                  px: 2,
                },
              })}
            >
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="formType"
                      label={t('signatureConfiguration.formType')}
                      placeholder={t('signatureConfiguration.formType')}
                      options={SETTING_SIGNATURE_TYPE_OPTIONS}
                      getOptionLabel={(opt) => t(opt?.text)}
                      getOptionValue={(opt) => opt?.id}
                      onChange={(val) => handleChangeType(val, setFieldValue)}
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <ItemsSettingTable
                    items={values?.items || []}
                    arrayHelpers={arrayHelpers}
                  />
                )}
              />
            </Box>

            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default SignatureConfiguration
