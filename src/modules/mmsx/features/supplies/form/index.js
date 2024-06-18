import React, { useEffect } from 'react'

import { Grid, InputAdornment, Typography } from '@mui/material'
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
import { searchItemUnitsApi } from '~/modules/database/redux/sagas/item-unit-setting/search-item-units'
import {
  ACTIVE_STATUS,
  ACTIVE_STATUS_OPTIONS,
  SUPPLY_TYPE,
} from '~/modules/mmsx/constants'
import useDefineSupplies from '~/modules/mmsx/redux/hooks/useDefineSupplies'
import { searchVendorsApi } from '~/modules/mmsx/redux/sagas/define-vendor/search-vendors'
import { searchSupplyGroupApi } from '~/modules/mmsx/redux/sagas/supplies-category/search-supplies-category'
import { SearchSupplyTypeApi } from '~/modules/mmsx/redux/sagas/supply-type/search-supply-type'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import { validateSchema } from './schema'

const DefineSuppliesForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const {
    data: { suppliesDetail, isLoading },
    actions,
  } = useDefineSupplies()

  const MODE_MAP = {
    [ROUTE.DEFINE_SUPPLIES.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_SUPPLIES.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.DEFINE_SUPPLIES.LIST.PATH))
  }

  const initialValues = {
    // code: suppliesDetail?.code,
    name: suppliesDetail?.name || '',
    supplyGroup: suppliesDetail?.supplyGroup || null,
    type: +suppliesDetail?.type || SUPPLY_TYPE.SUPPLY,
    vendor: suppliesDetail?.vendor || null,
    price: suppliesDetail?.price || null,
    itemUnit: suppliesDetail?.unit || null,
    supplyType: suppliesDetail?.supplyType || null,
    description: suppliesDetail?.description || '',
    nameOther: suppliesDetail?.nameOther || '',
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getSupplies(id)
    }
    return () => {
      actions.resetSupplies()
    }
  }, [id])

  const handleSubmit = (val) => {
    const params = {
      ...val,
      type: +val?.supplyType?.type,
      supplyTypeId: val?.supplyType?.id,
      unitId: val?.itemUnit?.id,
      supplyGroupId: val?.supplyGroup?.id,
      vendorId: val?.vendor?.id,
    }
    if (isUpdate) {
      actions.updateSupplies({ ...params, id }, () =>
        history.push(ROUTE.DEFINE_SUPPLIES.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createSupplies(params, (data) =>
        history.push(
          ROUTE.DEFINE_SUPPLIES.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'deviceManagement',
      },
      {
        route: withSearch(ROUTE.DEFINE_SUPPLIES.LIST.PATH),
        title: ROUTE.DEFINE_SUPPLIES.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_SUPPLIES.CREATE.PATH,
          title: ROUTE.DEFINE_SUPPLIES.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_SUPPLIES.EDIT.PATH,
          title: ROUTE.DEFINE_SUPPLIES.EDIT.TITLE,
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
        return ROUTE.DEFINE_SUPPLIES.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_SUPPLIES.EDIT.TITLE
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
        {({ handleReset }) => (
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
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LabelValue
                        label={
                          <Typography>
                            {t('deviceCategory.form.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={suppliesDetail?.active}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="supplyGroup"
                      label={t('supplies.form.field.suppliesCategoryName')}
                      placeholder={t(
                        'supplies.form.field.suppliesCategoryName',
                      )}
                      asyncRequest={(s) =>
                        searchSupplyGroupApi({
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
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('supplies.form.field.name')}
                      name="name"
                      placeholder={t('supplies.form.field.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('supplies.form.field.nameOther')}
                      name="nameOther"
                      placeholder={t('supplies.form.field.nameOther')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="supplyType"
                      label={t('supplies.form.field.type')}
                      placeholder={t('supplies.form.field.type')}
                      asyncRequest={(s) =>
                        SearchSupplyTypeApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="vendor"
                      label={t('supplies.category.supplier')}
                      placeholder={t('supplies.category.supplier')}
                      asyncRequest={(s) =>
                        searchVendorsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            active: ACTIVE_STATUS.ACTIVE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.result}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="itemUnit"
                      label={t('supplies.form.field.unit')}
                      placeholder={t('supplies.form.field.unit')}
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
                      required
                    />
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('supplies.form.field.price')}
                      name="price"
                      placeholder={t('supplies.form.field.price')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {`${t('common.suffix.denominations')}`}
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      numberProps={{
                        decimalScale: 3,
                        thousandSeparator: true,
                      }}
                      type="number"
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('supplies.form.field.description')}
                      placeholder={t('supplies.form.field.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                {renderActionBar(handleReset)}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default DefineSuppliesForm
