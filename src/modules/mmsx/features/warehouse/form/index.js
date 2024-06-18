import { useEffect, useMemo } from 'react'

import { Box, Grid } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
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
import Page from '~/components/Page'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { ACTIVE_STATUS } from '~/modules/mmsx/constants'
import useWarehouseDefine from '~/modules/mmsx/redux/hooks/useWarehouseDefine'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from './item-setting-table'
import { validateSchema } from './schema'

function WarehouseDefineForm() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const { withSearch } = useQueryState()

  const {
    data: { warehouselDetail, isLoading },
    actions,
  } = useWarehouseDefine()

  const MODE_MAP = {
    [ROUTE.WAREHOUSE_DEFINE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_DEFINE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    assetInventoryType: null,
    asset: null,
    minStockQuantity: null,
    maxStockQuantity: null,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: warehouselDetail?.code || '',
      name: warehouselDetail?.name || '',
      codeOnWfx: warehouselDetail?.codeOnWfx || '',
      description: warehouselDetail?.description || '',
      factory: warehouselDetail?.factory || '',
      items: warehouselDetail?.inventories?.map((item, index) => ({
        id: index,
        assetInventoryType: item?.assetType,
        asset: { ...item, id: item?.assetId },
        minStockQuantity: +item?.minStockQuantity,
        maxStockQuantity: +item?.maxStockQuantity,
      })) || [DEFAULT_ITEM],
    }),
    [warehouselDetail],
  )

  const onSubmit = (val) => {
    const params = {
      ...val,
      factoryId: val?.factory?.id,
      inventories: val?.items?.map((item) => ({
        assetType: item?.assetInventoryType,
        assetId: item?.asset?.id,
        minStockQuantity: +item?.minStockQuantity,
        maxStockQuantity: +item?.maxStockQuantity,
      })),
    }
    if (isUpdate) {
      actions.updateWarehouseDefine({ ...params, id }, () =>
        history.push(ROUTE.WAREHOUSE_DEFINE.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createWarehouseDefine(params, (data) =>
        history.push(
          ROUTE.WAREHOUSE_DEFINE.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    }
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getDetailWarehouseDefine(id)
    }
    return () => actions.resetState()
  }, [id])

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.WAREHOUSE.TITLE,
      },
      {
        route: withSearch(ROUTE.WAREHOUSE_DEFINE.LIST.PATH),
        title: ROUTE.WAREHOUSE_DEFINE.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.WAREHOUSE_DEFINE.CREATE.PATH,
          title: ROUTE.WAREHOUSE_DEFINE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.WAREHOUSE_DEFINE.EDIT.PATH,
          title: ROUTE.WAREHOUSE_DEFINE.EDIT.TITLE,
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
        return ROUTE.WAREHOUSE_DEFINE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_DEFINE.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.WAREHOUSE_DEFINE.LIST.PATH))
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
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => (
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
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('warehouseDefine.code')}
                        name="code"
                        placeholder={t('warehouseDefine.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        disabled
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('warehouseDefine.name')}
                      name="name"
                      placeholder={t('warehouseDefine.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      {...(isUpdate
                        ? {
                            disabled: warehouselDetail?.manageBy,
                          }
                        : {})}
                      required
                    />
                  </Grid>
                  {isUpdate && (
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('general.codeOnWfx')}
                        name="codeOnWfx"
                        placeholder={t('general.codeOnWfx')}
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
                      name="factory"
                      label={t('warehouseDefine.factory')}
                      placeholder={t('warehouseDefine.factory')}
                      asyncRequest={(s) =>
                        searchFactoriesApi({
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
                      disabled={isUpdate && warehouselDetail?.manageBy}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('warehouseDefine.description')}
                      placeholder={t('warehouseDefine.description')}
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
            <Box sx={{ mt: 3 }}>
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <ItemSettingTable
                    items={values?.items || []}
                    arrayHelpers={arrayHelpers}
                    setFieldValue={setFieldValue}
                  />
                )}
              />
            </Box>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default WarehouseDefineForm
