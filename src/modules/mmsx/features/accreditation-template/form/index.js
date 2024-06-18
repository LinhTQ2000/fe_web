import { useEffect, useMemo } from 'react'

import { Box, Grid, InputAdornment, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  IMG_FILE_TYPE,
  MAX_NUMBER_OF_FILE,
  MODAL_MODE,
  OFFICE_FILE_TYPE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import FileUploadButton from '~/components/FileUploadButton'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  OBLIGATORY_ENUM,
  ACTIVE_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import useAccreditationTemplate from '~/modules/mmsx/redux/hooks/useAccreditationTemplate'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { validateSchema } from './schema'

function AccreditationTemplateForm() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const {
    data: { accreditationTemplateDetails, isLoading },
    actions,
  } = useAccreditationTemplate()
  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    title: '',
    description: '',
    obligatory: true,
  }

  const MODE_MAP = {
    [ROUTE.ACCREDITATION_TEMPLATE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ACCREDITATION_TEMPLATE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: accreditationTemplateDetails?.code || '',
      name: accreditationTemplateDetails?.name || '',
      periodic: accreditationTemplateDetails?.periodic || null,
      description: accreditationTemplateDetails?.description || '',
      items: accreditationTemplateDetails?.details?.map((detail) => ({
        id: detail?.id,
        title: detail?.title,
        description: detail?.description,
        obligatory: detail.obligatory === OBLIGATORY_ENUM.YES,
      })) || [DEFAULT_ITEM],
      files: accreditationTemplateDetails?.fileUrls || [],
    }),
    [accreditationTemplateDetails],
  )

  const handleSubmit = (val) => {
    const fileUrls = val?.files?.filter((file) => file?.fileUrl)
    const files = val?.files?.filter((file) => !file?.fileUrl)
    const params = {
      ...val,
      details: val?.items.map((item) => ({
        ...(isUpdate ? { id: item?.id } : {}),
        title: item?.title,
        description: item?.description,
        obligatory: item?.obligatory ? OBLIGATORY_ENUM.YES : OBLIGATORY_ENUM.NO,
      })),
      fileUrls: fileUrls,
      files: files,
    }
    if (isUpdate) {
      actions.updateAccreditationTemplate({ ...params, id }, () =>
        history.push(
          ROUTE.ACCREDITATION_TEMPLATE.DETAIL.PATH.replace(':id', id),
        ),
      )
    } else {
      delete params.fileUrls
      actions.createAccreditationTemplate(params, (data) =>
        history.push(
          ROUTE.ACCREDITATION_TEMPLATE.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    }
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getDetailAccreditationTemplate(id)
    }
    return () => {
      if (isUpdate) actions.resetAccreditationTemplateState()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.ACCREDITATION_TEMPLATE.LIST.PATH))
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.ACCREDITATION_TEMPLATE.LIST.PATH),
        title: ROUTE.ACCREDITATION_TEMPLATE.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.ACCREDITATION_TEMPLATE.CREATE.PATH,
          title: ROUTE.ACCREDITATION_TEMPLATE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.ACCREDITATION_TEMPLATE.EDIT.PATH,
          title: ROUTE.ACCREDITATION_TEMPLATE.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.ACCREDITATION_TEMPLATE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ACCREDITATION_TEMPLATE.EDIT.TITLE
      default:
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => (
          <Form>
            <HotKeys
              handlers={{
                onBack: backToList,
                onReset: handleReset,
              }}
            />
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  {isUpdate && (
                    <>
                      <Grid item xs={12}>
                        <LabelValue
                          label={
                            <Typography>
                              {t('general:common.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={ACTIVE_STATUS_OPTIONS}
                              value={accreditationTemplateDetails?.active}
                            />
                          }
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('accreditationTemplate.code')}
                          name="code"
                          placeholder={t('accreditationTemplate.code')}
                          disabled
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                          }}
                          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        />
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('accreditationTemplate.name')}
                      name="name"
                      placeholder={t('accreditationTemplate.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('accreditationTemplate.periodic')}
                      name="periodic"
                      placeholder={t('accreditationTemplate.periodic')}
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {t('general:days')}
                          </InputAdornment>
                        ),
                      }}
                      type="number"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <LabelValue
                      label={
                        <Typography mt={1}>
                          {t('general:fileUpload.title')}
                        </Typography>
                      }
                      value={
                        <FileUploadButton
                          accept={[...IMG_FILE_TYPE, ...OFFICE_FILE_TYPE]
                            .map((i) => i?.MIME_TYPE)
                            .join(', ')}
                          value={values?.files}
                          onChange={(files) => {
                            setFieldValue('files', files)
                          }}
                          maxNumberOfFiles={MAX_NUMBER_OF_FILE}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('accreditationTemplate.description')}
                      placeholder={t('accreditationTemplate.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
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
                    mode={mode}
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

export default AccreditationTemplateForm
