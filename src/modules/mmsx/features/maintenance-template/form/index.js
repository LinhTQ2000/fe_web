import { useEffect, useMemo } from 'react'

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
  MAINTENANCE_JOB_TYPE,
  MAINTENANCE_PERIOD_UNIT,
  OBLIGATORY_ENUM,
  ACTIVE_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import useMaintenanceTemplate from '~/modules/mmsx/redux/hooks/useMaintenanceTemplate'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemSettingTable from './item-setting-table'
import { validateSchema } from './schema'

function MaintenanceTemplateForm() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const {
    data: { maintenanceTemplateDetails, isLoading },
    actions,
  } = useMaintenanceTemplate()

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    title: '',
    type: MAINTENANCE_JOB_TYPE.CHECK,
    description: '',
    checklistTemplate: null,
    periodTime: null,
    obligatory: true,
  }

  const MODE_MAP = {
    [ROUTE.MAINTENANCE_TEMPLATE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.MAINTENANCE_TEMPLATE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: maintenanceTemplateDetails?.code || '',
      name: maintenanceTemplateDetails?.name || '',
      description: maintenanceTemplateDetails?.description || '',
      items: maintenanceTemplateDetails?.details?.map((item) => ({
        id: item?.id,
        title: item?.title,
        type: item?.type,
        description: item?.description,
        periodTime: item?.periodTime,
        timeUnit: item?.timeUnit,
        checklistTemplate: item?.checklistTemplate,
        obligatory: item?.obligatory === OBLIGATORY_ENUM.YES,
      })) || [DEFAULT_ITEM],
      files: maintenanceTemplateDetails?.fileUrls || [],
    }),
    [maintenanceTemplateDetails],
  )

  const handleSubmit = (val) => {
    const fileUrls = val?.files?.filter((file) => file?.fileUrl)
    const files = val?.files?.filter((file) => !file?.fileUrl)
    const params = {
      ...val,
      details: val?.items?.map((item) => ({
        ...(isUpdate ? { id: item?.id } : {}),
        title: item?.title,
        type: item?.type,
        description: item?.description,
        checklistTemplateId: item?.checklistTemplate?.id,
        periodTime: item?.periodTime,
        timeUnit: MAINTENANCE_PERIOD_UNIT.DAY,
        obligatory: item?.obligatory ? OBLIGATORY_ENUM.YES : OBLIGATORY_ENUM.NO,
      })),
      fileUrls: fileUrls,
      files: files,
    }
    delete params.items
    if (isUpdate) {
      actions.updateMaintenanceTemplate({ ...params, id }, () =>
        history.push(ROUTE.MAINTENANCE_TEMPLATE.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      delete params.fileUrls
      actions.createMaintenanceTemplate(params, (data) =>
        history.push(
          ROUTE.MAINTENANCE_TEMPLATE.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    }
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getDetailMaintenanceTemplate(id)
    }
    return () => actions.resetMaintenanceTemplateState()
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.MAINTENANCE_TEMPLATE.LIST.PATH))
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.MAINTENANCE_TEMPLATE.LIST.PATH),
        title: ROUTE.MAINTENANCE_TEMPLATE.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.MAINTENANCE_TEMPLATE.CREATE.PATH,
          title: ROUTE.MAINTENANCE_TEMPLATE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.MAINTENANCE_TEMPLATE.EDIT.PATH,
          title: ROUTE.MAINTENANCE_TEMPLATE.EDIT.TITLE,
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
        return ROUTE.MAINTENANCE_TEMPLATE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.MAINTENANCE_TEMPLATE.EDIT.TITLE
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
                              value={maintenanceTemplateDetails?.active}
                            />
                          }
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('maintenanceTemplate.code')}
                          name="code"
                          placeholder={t('maintenanceTemplate.code')}
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
                      label={t('maintenanceTemplate.name')}
                      name="name"
                      placeholder={t('maintenanceTemplate.name')}
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
                      label={t('maintenanceTemplate.description')}
                      placeholder={t('maintenanceTemplate.description')}
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
                    items={
                      values?.items.map((item, index) => ({
                        ...item,
                        idx: index,
                      })) || []
                    }
                    arrayHelpers={arrayHelpers}
                    setFieldValue={setFieldValue}
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

export default MaintenanceTemplateForm
