import React, { useEffect, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
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
import useDefineInstallationTemplate from '~/modules/mmsx/redux/hooks/useDefineInstallationTemplate'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemSettingTable from './item-setting-table'
import { validateSchema } from './schema'
const DEFAULT_ITEM = [
  {
    id: new Date().getTime(),
    title: '',
    description: '',
    isRequire: true,
  },
]
const DefineInstallationTemplateForm = () => {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const [maxNumberOfFile, setMaxNumberOfFile] = useState(MAX_NUMBER_OF_FILE)

  const {
    data: { installDetail, isLoading },
    actions,
  } = useDefineInstallationTemplate()
  const MODE_MAP = {
    [ROUTE.INSTALLATION_TEMPLATE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.INSTALLATION_TEMPLATE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.INSTALLATION_TEMPLATE.LIST.PATH))
  }

  const initialValues = {
    code: installDetail?.code || '',
    name: installDetail?.name || '',
    description: installDetail?.description || '',
    items:
      installDetail?.details?.map((item) => ({
        ...(isUpdate ? { id: item?.id } : {}),
        title: item?.title,
        description: item?.description,
        isRequire: item?.obligatory === OBLIGATORY_ENUM.YES,
      })) || DEFAULT_ITEM,
    files: installDetail?.fileUrls || [],
  }
  useEffect(() => {
    if (isUpdate) {
      actions.getDetailTemplateInstall(id)
    }
    return () => {
      actions.resetTempalteInstall()
    }
  }, [id])

  const handleSubmit = (values) => {
    const fileUrls = values?.files?.filter((file) => file?.fileUrl)
    const files = values?.files?.filter((file) => !file?.fileUrl)
    const params = {
      code: values?.code?.trim(),
      name: values?.name?.trim(),
      description: values?.description?.trim(),
      details: values?.items?.map((data) => ({
        ...(isUpdate ? { id: data?.id } : {}),
        title: data?.title?.trim(),
        description: data?.description?.trim(),
        obligatory: data?.isRequire ? OBLIGATORY_ENUM.YES : OBLIGATORY_ENUM.NO,
      })),
      fileUrls: fileUrls,
      files: files,
    }
    if (isUpdate) {
      params.id = id
      actions.updateTemplateInstall(params, () =>
        history.push(
          ROUTE.INSTALLATION_TEMPLATE.DETAIL.PATH.replace(':id', id),
        ),
      )
    } else {
      delete params.fileUrls
      actions.createTemplateInstall(params, (data) =>
        history.push(
          ROUTE.INSTALLATION_TEMPLATE.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.INSTALLATION_TEMPLATE.LIST.PATH),
        title: ROUTE.INSTALLATION_TEMPLATE.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.INSTALLATION_TEMPLATE.CREATE.PATH,
          title: ROUTE.INSTALLATION_TEMPLATE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.INSTALLATION_TEMPLATE.EDIT.PATH,
          title: ROUTE.INSTALLATION_TEMPLATE.EDIT.TITLE,
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
        return ROUTE.INSTALLATION_TEMPLATE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.INSTALLATION_TEMPLATE.EDIT.TITLE
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
                              value={installDetail?.active}
                            />
                          }
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('templateInstall.form.field.code')}
                          name="code"
                          placeholder={t('templateInstall.form.field.code')}
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
                      label={t('templateInstall.form.field.name')}
                      name="name"
                      placeholder={t('templateInstall.form.field.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
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
                      label={t('templateInstall.form.field.description')}
                      placeholder={t('templateInstall.form.field.description')}
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
                  <ItemSettingTable
                    arrayHelpers={arrayHelpers}
                    items={values?.items || []}
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

export default DefineInstallationTemplateForm
