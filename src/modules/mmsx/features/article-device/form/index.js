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
import { ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import useArticleDevice from '~/modules/mmsx/redux/hooks/useArticleDevice'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { validateSchema } from './schema'

function ArticleDeviceForm() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const { withSearch } = useQueryState()

  const {
    data: { articleDeviceDetails, isLoading },
    actions,
  } = useArticleDevice()

  const MODE_MAP = {
    [ROUTE.ARTICLE_DEVICE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ARTICLE_DEVICE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = {
    code: articleDeviceDetails?.code || '',
    name: articleDeviceDetails?.name || '',
    codeOnWfx: articleDeviceDetails?.codeOnWfx || '',
    description: articleDeviceDetails?.description || '',
  }

  const onSubmit = (val) => {
    if (isUpdate) {
      actions.updateArticleDevice({ ...val, id }, () =>
        history.push(ROUTE.ARTICLE_DEVICE.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createArticleDevice(val, (data) =>
        history.push(ROUTE.ARTICLE_DEVICE.DETAIL.PATH.replace(':id', data?.id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.ARTICLE_DEVICE.LIST.PATH),
        title: ROUTE.ARTICLE_DEVICE.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.ARTICLE_DEVICE.CREATE.PATH,
          title: ROUTE.ARTICLE_DEVICE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.ARTICLE_DEVICE.EDIT.PATH,
          title: ROUTE.ARTICLE_DEVICE.EDIT.TITLE,
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
        return ROUTE.ARTICLE_DEVICE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ARTICLE_DEVICE.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.ARTICLE_DEVICE.LIST.PATH))
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

  useEffect(() => {
    if (isUpdate) {
      actions.getDetailArticleDevice(id)
    }
    return () => actions.resetArticleDeviceState()
  }, [id])

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema(t)}
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
                    <Grid item xs={12}>
                      <LabelValue
                        label={
                          <Typography>{t('general:common.status')}</Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={articleDeviceDetails?.active}
                          />
                        }
                      />
                    </Grid>
                  )}
                  {isUpdate && (
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('articleDevice.code')}
                        name="code"
                        placeholder={t('articleDevice.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        disabled={isUpdate}
                        required
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('articleDevice.name')}
                      name="name"
                      placeholder={t('articleDevice.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      {...(isUpdate
                        ? {
                            disabled: articleDeviceDetails?.manageBy,
                          }
                        : {})}
                      required
                    />
                  </Grid>
                  {isUpdate && (
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('deviceName.codeOnWfx')}
                        name="codeOnWfx"
                        placeholder={t('deviceName.codeOnWfx')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                        }}
                        disabled
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('articleDevice.description')}
                      placeholder={t('articleDevice.description')}
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

export default ArticleDeviceForm
