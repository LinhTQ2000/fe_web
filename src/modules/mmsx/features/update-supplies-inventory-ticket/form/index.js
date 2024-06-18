import React, { useEffect, useMemo } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FieldArray, Form, Formik } from 'formik'
import { map } from 'lodash'
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
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import {
  ASSET_MAINTENANCE_TYPE,
  UPDATE_INVENTORY_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import useSuppliesInventory from '~/modules/mmsx/redux/hooks/useSuppliesInventory'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemSettingTable from './item-setting-table'
import { validateSchema } from './schema'

const SuppliesInventoryForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { withSearch } = useQueryState()

  const DEFAULT_ITEMS = [
    {
      id: new Date().getDate(),
      supplyGroup: null,
      supplyType: null,
      supply: null,
      updatedQuantity: null,
      warehouse: null,
    },
  ]

  const { id } = useParams()
  const {
    data: { suppliesInventoryDetail, isLoading },
    actions,
  } = useSuppliesInventory()

  const MODE_MAP = {
    [ROUTE.SUPPLIES_INVENTORY.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.SUPPLIES_INVENTORY.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.SUPPLIES_INVENTORY.LIST.PATH))
  }
  const initialValues = useMemo(
    () => ({
      name: suppliesInventoryDetail?.name || '',
      code: suppliesInventoryDetail?.code || '',
      description: suppliesInventoryDetail?.description || '',
      factory: suppliesInventoryDetail?.factory || null,
      items:
        suppliesInventoryDetail?.supplyDetails?.map((s) => {
          return {
            ...s,
            supply: {
              ...s,
              assetId: s?.id,
              assetName: s?.name,
              stockQuantity: s?.oldQuantity,
            },
            updatedQuantity: s?.quantity,
            warehouse: s?.warehouse,
          }
        }) || DEFAULT_ITEMS,
    }),
    [suppliesInventoryDetail],
  )

  useEffect(() => {
    if (isUpdate) {
      actions.getSuppliesInventoryDetail(id)
    }
    return () => {
      actions.resetStateSuppliesInventory()
    }
  }, [mode])

  const handleSubmit = (values) => {
    const params = {
      name: values?.name,
      code: values?.code,
      description: values?.description,
      type: ASSET_MAINTENANCE_TYPE.SUPPLY,
      factoryId: values?.factory?.id,
      warehouseIds: map(values?.warehouse, 'id'),
      supplyDetails: values?.items?.map((item) => ({
        supplyId: item?.supply?.assetId || item?.supply?.id,
        quantity: item?.updatedQuantity,
        warehouseId: item?.warehouse?.id,
        supplyGroupId: item?.supplyGroup?.id,
        supplyTypeId: item?.supplyType?.id,
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createSuppliesInventory(params, (data) =>
        history.push(
          ROUTE.SUPPLIES_INVENTORY.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    } else {
      actions.updateSuppliesInventory({ ...params, id }, () =>
        history.push(ROUTE.SUPPLIES_INVENTORY.DETAIL.PATH.replace(':id', id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.WAREHOUSE.TITLE,
      },
      {
        route: withSearch(ROUTE.SUPPLIES_INVENTORY.LIST.PATH),
        title: ROUTE.SUPPLIES_INVENTORY.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.SUPPLIES_INVENTORY.CREATE.PATH,
          title: ROUTE.SUPPLIES_INVENTORY.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.SUPPLIES_INVENTORY.EDIT.PATH,
          title: ROUTE.SUPPLIES_INVENTORY.EDIT.TITLE,
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
        return ROUTE.SUPPLIES_INVENTORY.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.SUPPLIES_INVENTORY.EDIT.TITLE
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
        {({ handleReset, values, setFieldValue }) => {
          return (
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
                      <>
                        <Grid item xs={12}>
                          <LabelValue
                            label={
                              <Typography>
                                {t('suppliesInventory.status')}
                              </Typography>
                            }
                            value={
                              <Status
                                options={UPDATE_INVENTORY_STATUS_OPTIONS}
                                value={suppliesInventoryDetail?.status}
                              />
                            }
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            name="code"
                            label={t('suppliesInventory.requestCode')}
                            placeholder={t('suppliesInventory.requestCode')}
                            inputProps={{
                              maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                            }}
                            allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="name"
                        label={t('suppliesInventory.requestName')}
                        placeholder={t('suppliesInventory.requestName')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="factory"
                        label={t('suppliesInventory.factory')}
                        placeholder={t('suppliesInventory.factory')}
                        asyncRequest={(s) =>
                          searchFactoriesApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        onChange={() => {
                          setFieldValue('items', DEFAULT_ITEMS)
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <Field.TextField
                        name="description"
                        label={t('suppliesInventory.description')}
                        placeholder={t('suppliesInventory.description')}
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
              <Box mt={3}>
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => (
                    <ItemSettingTable
                      items={values?.items || []}
                      setFieldValue={setFieldValue}
                      mode={mode}
                      values={values}
                      arrayHelpers={arrayHelpers}
                    />
                  )}
                />
              </Box>
              {renderActionBar(handleReset)}
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default SuppliesInventoryForm
