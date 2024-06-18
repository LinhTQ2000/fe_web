import { useEffect, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

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
import QuickCreateUnit from '~/modules/database/features/item-unit-setting/item-unit-form/quick-create'
import { searchItemUnitsApi } from '~/modules/database/redux/sagas/item-unit-setting/search-item-units'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import useAttributeType from '~/modules/mmsx/redux/hooks/useAttributeType'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import { validateSchema } from './schema'

function AttributeTypeForm() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const { withSearch } = useQueryState()

  const [openQuickCreateUnit, setOpenQuickCreateUnit] = useState(false)

  const {
    data: { attributeTypeDetail, isLoading },
    actions,
  } = useAttributeType()

  const MODE_MAP = {
    [ROUTE.ATTRIBUTE_TYPE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ATTRIBUTE_TYPE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = {
    code: attributeTypeDetail?.code || '',
    name: attributeTypeDetail?.name || '',
    unit: attributeTypeDetail?.unit || '',
    description: attributeTypeDetail?.description || '',
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getAttributeType(id)
    }
    return () => actions.resetStateAttrbuteType()
  }, [id])

  const handleSubmit = (val) => {
    if (isUpdate) {
      actions.updateAttributeType({ ...val, unitId: val.unit?.id, id }, () =>
        history.push(ROUTE.ATTRIBUTE_TYPE.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createAttributeType({ ...val, unitId: val.unit?.id }, (data) =>
        history.push(ROUTE.ATTRIBUTE_TYPE.DETAIL.PATH.replace(':id', data?.id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        route: withSearch(ROUTE.ATTRIBUTE_TYPE.LIST.PATH),
        title: ROUTE.ATTRIBUTE_TYPE.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.ATTRIBUTE_TYPE.CREATE.PATH,
          title: ROUTE.ATTRIBUTE_TYPE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.ATTRIBUTE_TYPE.EDIT.PATH,
          title: ROUTE.ATTRIBUTE_TYPE.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.ATTRIBUTE_TYPE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ATTRIBUTE_TYPE.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.ATTRIBUTE_TYPE.LIST.PATH))
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
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, setFieldValue }) => (
          <Form>
            <HotKeys
              handlers={{
                onBack: backToList,
                onReset: handleReset,
              }}
            />
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {isUpdate && (
                    <>
                      {' '}
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
                              value={attributeTypeDetail?.active}
                            />
                          }
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          label={t('attributeType.form.code')}
                          name="code"
                          placeholder={t('attributeType.form.code')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                          }}
                          disabled
                          required
                          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        />
                      </Grid>
                    </>
                  )}

                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('attributeType.form.name')}
                      name="name"
                      placeholder={t('attributeType.form.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="unit"
                      label={t('attributeType.form.unit')}
                      placeholder={t('attributeType.form.unit')}
                      asyncRequest={(s) =>
                        searchItemUnitsApi({
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
                      quickCreate={() => setOpenQuickCreateUnit(true)}
                      asyncRequestDeps={openQuickCreateUnit}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('attributeType.form.description')}
                      placeholder={t('attributeType.form.description')}
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
            {renderActionBar(handleReset)}
            <QuickCreateUnit
              open={openQuickCreateUnit}
              onClose={() => setOpenQuickCreateUnit(false)}
              onSuccess={(res) => {
                setFieldValue('unit', res)
              }}
            />
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default AttributeTypeForm
