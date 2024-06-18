import React, { useEffect, useState } from 'react'

import { Box, Grid, Paper, Typography } from '@mui/material'
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
import useTemplateChecklist from '~/modules/mmsx/redux/hooks/useTemplateChecklist'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { validateSchema } from './schema'

const DEFAULT_ITEM = {
  id: new Date().getTime(),
  title: '',
  descriptionDetail: '',
  obligatory: true,
}

const TemplateChecklistForm = () => {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const [maxNumberOfFile, setMaxNumberOfFile] = useState(MAX_NUMBER_OF_FILE)

  const {
    data: { templateChecklistDetail, isLoading },
    actions,
  } = useTemplateChecklist()

  const MODE_MAP = {
    [ROUTE.TEMPLATE_CHECKLIST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.TEMPLATE_CHECKLIST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.TEMPLATE_CHECKLIST.LIST.PATH))
  }

  const initialValues = {
    code: templateChecklistDetail?.code || '',
    name: templateChecklistDetail?.name || '',
    description: templateChecklistDetail?.description || '',
    items: templateChecklistDetail?.details?.map((detail) => ({
      id: detail?.id,
      title: detail.title,
      descriptionDetail: detail.description,
      obligatory: detail.obligatory === OBLIGATORY_ENUM.YES,
    })) || [{ ...DEFAULT_ITEM }],
    files: templateChecklistDetail?.fileUrls || [],
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getTemplateCheckList(id)
    }
    return () => {
      if (isUpdate) actions.resetTemplateChecklist()
    }
  }, [id])

  const handleSubmit = (values) => {
    const fileUrls = values?.files?.filter((file) => file?.fileUrl)
    const files = values?.files?.filter((file) => !file?.fileUrl)
    const convertValues = {
      ...values,
      id,
      details: values.items.map((item) => ({
        ...(isUpdate ? { id: item?.id } : {}),
        title: item.title,
        description: item.descriptionDetail,
        obligatory:
          item.obligatory === true ? OBLIGATORY_ENUM.YES : OBLIGATORY_ENUM.NO,
      })),
      fileUrls: fileUrls,
      files: files,
    }

    if (mode === MODAL_MODE.CREATE) {
      delete convertValues.fileUrls
      actions.createTemplateChecklist(convertValues, (data) =>
        history.push(
          ROUTE.TEMPLATE_CHECKLIST.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateTemplateChecklist(convertValues, () =>
        history.push(ROUTE.TEMPLATE_CHECKLIST.DETAIL.PATH.replace(':id', id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.TEMPLATE_CHECKLIST.LIST.PATH),
        title: ROUTE.TEMPLATE_CHECKLIST.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.TEMPLATE_CHECKLIST.CREATE.PATH,
          title: ROUTE.TEMPLATE_CHECKLIST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.TEMPLATE_CHECKLIST.EDIT.PATH,
          title: ROUTE.TEMPLATE_CHECKLIST.EDIT.TITLE,
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
        return ROUTE.TEMPLATE_CHECKLIST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.TEMPLATE_CHECKLIST.EDIT.TITLE
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
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema(t, maxNumberOfFile)}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ handleReset, values, setFieldValue }) => (
            <Form>
              <HotKeys
                handlers={{
                  onReset: handleReset,
                  onBack: backToList,
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
                                value={templateChecklistDetail?.active}
                              />
                            }
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('templateChecklist.form.code')}
                            name="code"
                            placeholder={t('templateChecklist.form.code')}
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
                        label={t('templateChecklist.form.name')}
                        name="name"
                        placeholder={t('templateChecklist.form.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                        }}
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
                            onChange={(files, max) => {
                              setFieldValue('files', files)
                              setMaxNumberOfFile(max)
                            }}
                            maxNumberOfFiles={MAX_NUMBER_OF_FILE}
                          />
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('templateChecklist.form.description')}
                        placeholder={t('templateChecklist.form.description')}
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
      </Paper>
    </Page>
  )
}

export default TemplateChecklistForm
