import React, { useEffect } from 'react'

import { Grid, Paper, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import useSuppliesCategory from '~/modules/mmsx/redux/hooks/useSuppliesCategory'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { validateSchema } from './schema'

const SuppliesCategoryForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const {
    data: { suppliesCategoryDetail, isLoading },
    actions,
  } = useSuppliesCategory()

  const MODE_MAP = {
    [ROUTE.SUPPLIES_CATEGORY.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.SUPPLIES_CATEGORY.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.SUPPLIES_CATEGORY.LIST.PATH))
  }

  const initialValues = {
    code: suppliesCategoryDetail?.code || '',
    name: suppliesCategoryDetail?.name || '',
    description: suppliesCategoryDetail?.description || '',
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getDetailSuppliesCategory(id)
    }
    return () => {
      if (isUpdate) actions.resetSuppliesCategory()
    }
  }, [id])

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      type: +values?.type,
    }
    if (!isUpdate) {
      actions.createSuppliesCategory(convertValues, (data) =>
        history.push(
          ROUTE.SUPPLIES_CATEGORY.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    } else {
      actions.updateSuppliesCategory({ ...convertValues, id }, () =>
        history.push(ROUTE.SUPPLIES_CATEGORY.DETAIL.PATH.replace(':id', id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.SUPPLIES_CATEGORY.LIST.PATH),
        title: ROUTE.SUPPLIES_CATEGORY.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.SUPPLIES_CATEGORY.CREATE.PATH,
          title: ROUTE.SUPPLIES_CATEGORY.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.SUPPLIES_CATEGORY.EDIT.PATH,
          title: ROUTE.SUPPLIES_CATEGORY.EDIT.TITLE,
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
        return ROUTE.SUPPLIES_CATEGORY.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.SUPPLIES_CATEGORY.EDIT.TITLE
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
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={validateSchema(t)}
              onSubmit={handleSubmit}
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
                    columnSpacing={{ xl: 8, xs: 4 }}
                    rowSpacing={4 / 3}
                  >
                    {isUpdate && (
                      <Grid item xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('general:common.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={ACTIVE_STATUS_OPTIONS}
                              value={suppliesCategoryDetail?.active}
                            />
                          }
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="code"
                        label={t('suppliesCategory.code')}
                        placeholder={t('suppliesCategory.code')}
                        disabled
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="name"
                        label={t('suppliesCategory.name')}
                        placeholder={t('suppliesCategory.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('suppliesCategory.description')}
                        placeholder={t('suppliesCategory.description')}
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
      </Paper>
    </Page>
  )
}

export default SuppliesCategoryForm
