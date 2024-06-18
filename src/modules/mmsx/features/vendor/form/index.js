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
import useDefineVendor from '~/modules/mmsx/redux/hooks/useDefineVendor'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { validateSchema } from './schema'

function DefineVendorForm() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const { withSearch } = useQueryState()
  const {
    data: { isLoading, vendorDetails },
    actions,
  } = useDefineVendor()

  const MODE_MAP = {
    [ROUTE.DEFINE_VENDOR.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_VENDOR.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = {
    code: vendorDetails?.code || '',
    name: vendorDetails?.name || '',
    address: vendorDetails?.address || '',
    email: vendorDetails?.email || '',
    fax: vendorDetails?.fax || '',
    contactUser: vendorDetails?.contactUser || '',
    phone: vendorDetails?.phone || '',
    description: vendorDetails?.description || '',
    taxCode: vendorDetails?.taxCode || '',
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getVendorDetailsById(id)
    }
    return () => actions.resetDetailVendorState()
  }, [id])

  const onSubmit = (val) => {
    if (isUpdate) {
      actions.updateVendor({ ...val, id }, () =>
        history.push(ROUTE.DEFINE_VENDOR.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createVendor(val, (data) =>
        history.push(ROUTE.DEFINE_VENDOR.DETAIL.PATH.replace(':id', data?.id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.DEFINE_VENDOR.LIST.PATH),
        title: ROUTE.DEFINE_VENDOR.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_VENDOR.CREATE.PATH,
          title: ROUTE.DEFINE_VENDOR.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_VENDOR.EDIT.PATH,
          title: ROUTE.DEFINE_VENDOR.EDIT.TITLE,
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
        return ROUTE.DEFINE_VENDOR.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_VENDOR.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.DEFINE_VENDOR.LIST.PATH))
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
                              value={vendorDetails?.active}
                            />
                          }
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          label={t('defineVendor.code')}
                          name="code"
                          placeholder={t('defineVendor.code')}
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
                      label={t('defineVendor.name')}
                      name="name"
                      placeholder={t('defineVendor.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineVendor.address')}
                      name="address"
                      placeholder={t('defineVendor.address')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineVendor.email')}
                      name="email"
                      placeholder={t('defineVendor.email')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineVendor.fax')}
                      name="fax"
                      placeholder={t('defineVendor.fax')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineVendor.taxNo')}
                      name="taxCode"
                      placeholder={t('defineVendor.taxNo')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.TAX.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineVendor.contactUser')}
                      name="contactUser"
                      placeholder={t('defineVendor.contactUser')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineVendor.phone')}
                      name="phone"
                      placeholder={t('defineVendor.phone')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineVendor.description')}
                      placeholder={t('defineVendor.description')}
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

export default DefineVendorForm
