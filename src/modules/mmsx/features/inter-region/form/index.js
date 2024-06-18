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
import useInterRegion from '~/modules/mmsx/redux/hooks/useInterRegion'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { validateSchema } from './schema'

function InterRegionForm() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const { withSearch } = useQueryState()
  const {
    data: { interRegionDetail, isLoading },
    actions,
  } = useInterRegion()
  const MODE_MAP = {
    [ROUTE.INTER_REGION.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.INTER_REGION.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  useEffect(() => {
    if (isUpdate) {
      actions.getDetailInterRegion(id)
    }
    return () => actions.resetInterRegionState()
  }, [id])

  const initialValues = {
    code: interRegionDetail?.code || '',
    name: interRegionDetail?.name || '',
    description: interRegionDetail?.description || '',
  }

  const onSubmit = (val) => {
    if (isUpdate) {
      actions.updateInterRegion({ ...val, id }, () =>
        history.push(ROUTE.INTER_REGION.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createInterRegion(val, (data) =>
        history.push(ROUTE.INTER_REGION.DETAIL.PATH.replace(':id', data?.id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.INTER_REGION.LIST.PATH),
        title: ROUTE.INTER_REGION.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.INTER_REGION.CREATE.PATH,
          title: ROUTE.INTER_REGION.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.INTER_REGION.EDIT.PATH,
          title: ROUTE.INTER_REGION.EDIT.TITLE,
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
        return ROUTE.INTER_REGION.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.INTER_REGION.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.INTER_REGION.LIST.PATH))
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
                              value={interRegionDetail?.active}
                            />
                          }
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          label={t('interRegion.code')}
                          name="code"
                          placeholder={t('interRegion.code')}
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
                      label={t('interRegion.name')}
                      name="name"
                      placeholder={t('interRegion.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      disabled={interRegionDetail?.manageBy && isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('interRegion.description')}
                      placeholder={t('interRegion.description')}
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

export default InterRegionForm
