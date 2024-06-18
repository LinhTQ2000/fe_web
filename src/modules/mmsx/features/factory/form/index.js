import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
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
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import useDefineFactory from '~/modules/mmsx/redux/hooks/useDefineFactory'
import { searchRegionsApi } from '~/modules/mmsx/redux/sagas/region/search'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'
import qs from '~/utils/qs'

import { defineFactorySchema } from './schema'

const DefineFactoryForm = () => {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const { withSearch } = useQueryState()
  const {
    data: { factoryDetails, isLoading },
    actions,
  } = useDefineFactory()

  const MODE_MAP = {
    [ROUTE.DEFINE_FACTORY.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_FACTORY.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = {
    code: isUpdate ? factoryDetails?.code : '',
    name: factoryDetails?.name || '',
    codeOnWfx: factoryDetails?.codeOnWfx || '',
    description: factoryDetails?.description || '',
    location: factoryDetails?.location || '',
    phone: factoryDetails?.phone || '',
    region: factoryDetails?.region || null,
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.DEFINE_FACTORY.LIST.PATH),
        title: ROUTE.DEFINE_FACTORY.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_FACTORY.CREATE.PATH,
          title: ROUTE.DEFINE_FACTORY.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_FACTORY.EDIT.PATH,
          title: ROUTE.DEFINE_FACTORY.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  useEffect(() => {
    if (isUpdate) {
      const id = params?.id
      actions.getFactoryDetailsById(id)
    }
    if (cloneId) {
      actions.getFactoryDetailsById(cloneId)
    }
    return () => {
      actions.resetFactoryDetailsState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_FACTORY.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_FACTORY.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.DEFINE_FACTORY.LIST.PATH))
  }

  const onSubmit = (values) => {
    const id = Number(params?.id)
    const convertValues = {
      ...values,
      regionId: values?.region?.id,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createFactory(convertValues, (data) =>
        history.push(ROUTE.DEFINE_FACTORY.DETAIL.PATH.replace(':id', data?.id)),
      )
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateFactory({ ...convertValues, id: +id }, () =>
        history.push(ROUTE.DEFINE_FACTORY.DETAIL.PATH.replace(':id', id)),
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
            validationSchema={defineFactorySchema(t)}
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
                              value={factoryDetails?.active}
                            />
                          }
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          label={t('defineFactory.code')}
                          name="code"
                          placeholder={t('defineFactory.code')}
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
                      label={t('defineFactory.name')}
                      name="name"
                      placeholder={t('defineFactory.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      {...(isUpdate
                        ? {
                            disabled: factoryDetails?.manageBy,
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
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="region"
                      label={t('defineFactory.regionName')}
                      placeholder={t('defineFactory.regionName')}
                      asyncRequest={(s) =>
                        searchRegionsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            active: ACTIVE_STATUS.ACTIVE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="location"
                      label={t('defineFactory.location')}
                      placeholder={t('defineFactory.location')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="phone"
                      label={t('defineFactory.phone')}
                      placeholder={t('defineFactory.phone')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineFactory.description')}
                      placeholder={t('defineFactory.description')}
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

export default DefineFactoryForm
