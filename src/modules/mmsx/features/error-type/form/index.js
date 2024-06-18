import { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ERROR_TYPE_PRIORITY_OPTION,
  ACTIVE_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import useErrorType from '~/modules/mmsx/redux/hooks/useErrorType'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { errorTypeSchema } from './schema'

function ErrorTypeForm() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const {
    data: { errorTypeDetails, isLoading },
    actions,
  } = useErrorType()

  const MODE_MAP = {
    [ROUTE.ERROR_TYPE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ERROR_TYPE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  useEffect(() => {
    if (isUpdate) {
      actions.getErrorTypeDetailsById(id)
    }
    return () => actions.resetErrorTypeDetailsState()
  }, [id])

  const initialValues = {
    code: errorTypeDetails?.code || '',
    name: errorTypeDetails?.name || '',
    priority: isUpdate ? errorTypeDetails?.priority : null,
    description: errorTypeDetails?.description || '',
  }

  const onSubmit = (val) => {
    if (isUpdate) {
      actions.updateErrorType({ ...val, id }, () =>
        history.push(ROUTE.ERROR_TYPE.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createErrorType(val, (data) =>
        history.push(ROUTE.ERROR_TYPE.DETAIL.PATH.replace(':id', data?.id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.ERROR_TYPE.LIST.PATH),
        title: ROUTE.ERROR_TYPE.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.ERROR_TYPE.CREATE.PATH,
          title: ROUTE.ERROR_TYPE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.ERROR_TYPE.EDIT.PATH,
          title: ROUTE.ERROR_TYPE.EDIT.TITLE,
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
        return ROUTE.ERROR_TYPE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ERROR_TYPE.EDIT.TITLE
      default:
        break
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
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.ERROR_TYPE.LIST.PATH))
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={errorTypeSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset }) => (
              <Form>
                <HotKeys
                  handlers={{
                    onBack: backToList,
                    onReset: handleReset,
                  }}
                />
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
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
                              value={errorTypeDetails?.active}
                            />
                          }
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          label={t('errorType.code')}
                          name="code"
                          placeholder={t('errorType.code')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                          }}
                          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                          disabled
                        />
                      </Grid>
                    </>
                  )}

                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('errorType.name')}
                      name="name"
                      placeholder={t('errorType.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      label={t('errorType.priority')}
                      name="priority"
                      placeholder={t('errorType.priority')}
                      options={ERROR_TYPE_PRIORITY_OPTION}
                      getOptionLabel={(opt) => t(opt?.text)}
                      getOptionValue={(opt) => opt?.id}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('errorType.description')}
                      placeholder={t('errorType.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default ErrorTypeForm
