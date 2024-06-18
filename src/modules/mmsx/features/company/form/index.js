import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { isEmpty, pick } from 'lodash'
import { useTranslation } from 'react-i18next'
import {
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'

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
import useDefineCompany from '~/modules/database/redux/hooks/useDefineCompany'
import { ROUTE } from '~/modules/database/routes/config'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import qs from '~/utils/qs'

import { defineCompanySchema } from './schema'

function DefineCompanyForm() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const { withSearch } = useQueryState()
  const {
    data: { companyDetails, isLoading },
    actions,
  } = useDefineCompany()
  const MODE_MAP = {
    [ROUTE.DEFINE_COMPANY.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_COMPANY.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = isEmpty(companyDetails)
    ? {
        code: '',
        name: '',
        address: '',
        phone: '',
        taxNo: '',
        email: '',
        fax: '',
        description: '',
      }
    : pick(isUpdate ? companyDetails : { ...companyDetails, code: '' }, [
        'code',
        'name',
        'description',
        'address',
        'phone',
        'taxNo',
        'fax',
        'email',
      ])

  const getBreadcrumb = () => {
    const breadcrumbs = [
      // {
      //   title: 'database',
      // },
      {
        route: withSearch(ROUTE.DEFINE_COMPANY.LIST.PATH),
        title: ROUTE.DEFINE_COMPANY.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_COMPANY.CREATE.PATH,
          title: ROUTE.DEFINE_COMPANY.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_COMPANY.EDIT.PATH,
          title: ROUTE.DEFINE_COMPANY.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      const id = params?.id
      actions.getCompanyDetailsById(id)
    }
    if (cloneId) {
      actions.getCompanyDetailsById(cloneId)
    }
    return () => {
      actions.resetCompanyDetailsState()
    }
  }, [params?.id, cloneId])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_COMPANY.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_COMPANY.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.DEFINE_COMPANY.LIST.PATH))
  }

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createCompany(values, (data) =>
        history.push(ROUTE.DEFINE_COMPANY.DETAIL.PATH.replace(':id', data?.id)),
      )
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const paramUpdate = {
        ...values,
        id,
      }
      actions.updateCompany(paramUpdate, () =>
        history.push(ROUTE.DEFINE_COMPANY.DETAIL.PATH.replace(':id', id)),
      )
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
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={defineCompanySchema(t)}
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
                              value={companyDetails?.active}
                            />
                          }
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          label={t('defineCompany.code')}
                          name="code"
                          placeholder={t('defineCompany.code')}
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
                      name="taxNo"
                      label={t('defineCompany.tax')}
                      placeholder={t('defineCompany.tax')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.TAX.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineCompany.name')}
                      name="name"
                      placeholder={t('defineCompany.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="email"
                      label={t('defineCompany.email')}
                      placeholder={t('defineCompany.email')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineCompany.address')}
                      name="address"
                      placeholder={t('defineCompany.address')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="fax"
                      label={t('defineCompany.fax')}
                      placeholder={t('defineCompany.fax')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.FAX.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="phone"
                      label={t('defineCompany.phone')}
                      placeholder={t('defineCompany.phone')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineCompany.description')}
                      placeholder={t('defineCompany.description')}
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

export default DefineCompanyForm
