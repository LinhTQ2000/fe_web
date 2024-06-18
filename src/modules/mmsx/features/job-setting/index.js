import { useState } from 'react'

import { Box, FormControlLabel, Grid, Radio, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { isEmpty, isNil } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Page from '~/components/Page'
import { ROUTE } from '~/modules/mmsx/routes/config'

import {
  AUTO_GENERATE_JOB_ON_SUNDAY,
  JOB_TYPE_NOTI_OPTIONS,
  SETTING_JOB_PERIOD_ENUM,
} from '../../constants'
import useSetting from '../../redux/hooks/useSetting'
import { getSettingNotiJob } from '../../redux/sagas/setting/create-job-noti'
import ItemsSettingTable from './item-setting-table'
import { formSchema } from './schema'
const breadcrumbs = [
  {
    title: ROUTE.SETTING.TITLE,
  },
  {
    route: ROUTE.NOTIFICATION_SETTING.PATH,
    title: ROUTE.NOTIFICATION_SETTING.TITLE,
  },
]
function jobConfiguration() {
  const { t } = useTranslation(['mmsx'])
  const DEFAULT_ITEMS = [
    {
      period: SETTING_JOB_PERIOD_ENUM.ONE_DAY,
      isNotification: true,
      isWarning: false,
      isJob: true,
      beforeDate: 1,
    },
    {
      period: SETTING_JOB_PERIOD_ENUM.LESS_THAN_THREE_MONTH,
      isNotification: true,
      isWarning: false,
      isJob: true,
      beforeDate: null,
    },
    {
      period: SETTING_JOB_PERIOD_ENUM.MORE_THAN_THREE_MONTH,
      isNotification: true,
      isWarning: true,
      isJob: false,
      beforeDate: null,
    },
  ]
  const [type, setType] = useState(null)
  const [list, setList] = useState(DEFAULT_ITEMS)
  const [description, setDescription] = useState('')
  const [autoGenerateOnSunday, setAutoGenerateOnSunday] = useState(
    AUTO_GENERATE_JOB_ON_SUNDAY.YES,
  )

  const {
    data: { isLoading },
    actions,
  } = useSetting()

  const initialValues = {
    type: type,
    description: description,
    items: list,
    autoGenerateOnSunday: autoGenerateOnSunday,
  }

  const handleChangeType = async (id, setFieldValue) => {
    setFieldValue('items', DEFAULT_ITEMS)
    setType(id)
    if (!isNil(id)) {
      const res = await getSettingNotiJob(id)
      if (res?.statusCode === 200) {
        setAutoGenerateOnSunday(
          !isNil(res?.data?.autoGenerateOnSunday)
            ? res?.data?.autoGenerateOnSunday
            : AUTO_GENERATE_JOB_ON_SUNDAY.YES,
        )
        if (!isEmpty(res?.data?.details)) {
          setFieldValue('items', res?.data?.details)
          setList(res?.data?.details)
          setDescription(res?.data?.description)
        }
      }
    }
  }

  const onSubmit = (val) => {
    const params = {
      ...val,
      details: val?.items?.map((item) => ({
        period: item?.period,
        beforeDate: item?.beforeDate,
      })),
      autoGenerateOnSunday: +val?.autoGenerateOnSunday,
    }
    actions.createSettingNotiJob(params)
  }

  const renderActionBar = (handleReset) => (
    <ActionBar onCancel={handleReset} mode={MODAL_MODE.UPDATE} />
  )

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.jobConfiguration')}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, handleReset, setFieldValue }) => (
          <Form>
            <HotKeys
              handlers={{
                onReset: handleReset,
              }}
            />
            <Typography variant="h4" mt={1} mb={1}>
              {t('jobConfiguration.title')}
            </Typography>
            <Grid item xl={11} xs={12}>
              <Grid
                container
                columnSpacing={{ xl: 8, xs: 4 }}
                rowSpacing={4 / 3}
              >
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="type"
                    label={t('jobConfiguration.type')}
                    placeholder={t('jobConfiguration.type')}
                    options={JOB_TYPE_NOTI_OPTIONS}
                    getOptionLabel={(opt) => t(opt?.text)}
                    getOptionValue={(opt) => opt?.id}
                    onChange={(val) => handleChangeType(val, setFieldValue)}
                    required
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.TextField
                    name="description"
                    label={t('jobConfiguration.description')}
                    placeholder={t('jobConfiguration.description')}
                    inputProps={{
                      maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, mb: 3 }}>
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
            <Grid item xs={12} lg={6}>
              <Typography>{t('jobConfiguration.jobSunday')}</Typography>
              <Field.RadioGroup name="autoGenerateOnSunday">
                <Box>
                  <FormControlLabel
                    value={AUTO_GENERATE_JOB_ON_SUNDAY.YES}
                    control={<Radio />}
                    label={t('general:common.yes')}
                  />
                  <FormControlLabel
                    value={AUTO_GENERATE_JOB_ON_SUNDAY.NO}
                    control={<Radio />}
                    label={t('general:common.no')}
                    sx={{ ml: 2 }}
                  />
                </Box>
              </Field.RadioGroup>
            </Grid>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}
export default jobConfiguration
