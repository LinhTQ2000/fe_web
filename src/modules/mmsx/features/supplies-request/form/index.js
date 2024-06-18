import React, { useEffect, useMemo } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FieldArray, Form, Formik } from 'formik'
import { first } from 'lodash'
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
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import {
  JOB_STATUS,
  JOB_TYPE,
  SUPPLY_REQUEST_STATUS_OPTIONS,
  SUPPLY_REQUEST_TYPE_ENUM,
} from '~/modules/mmsx/constants'
import useSuppliesRequest from '~/modules/mmsx/redux/hooks/useSuppliesRequest'
import { searchJobApi } from '~/modules/mmsx/redux/sagas/job/search-job'
import { searchWarehouseDefineApi } from '~/modules/mmsx/redux/sagas/warehouse-define/search'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from '../form/itemSetting-table'
import { validateSchema } from './schema'
const DEFAULT_ITEM = [
  {
    id: new Date().getTime(),
    supplyGroup: null,
    supply: null,
    quantity: null,
    stockQuantity: 0,
    availableStockQuantity: 0,
    minStockQuantity: 0,
  },
]
const SuppliesRequestForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const {
    data: { suppliesRequestDetail, isLoading },
    actions,
  } = useSuppliesRequest()

  const {
    data: { userInfo },
  } = useUserInfo()

  const MODE_MAP = {
    [ROUTE.SUPPLIES_REQUEST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.SUPPLIES_REQUEST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.SUPPLIES_REQUEST.LIST.PATH))
  }

  const initialValues = useMemo(
    () => ({
      code: suppliesRequestDetail?.code || '',
      name: suppliesRequestDetail?.name || '',
      warehouse: suppliesRequestDetail?.warehouse || null,
      jobCode: first(suppliesRequestDetail?.jobs) || null,
      description: suppliesRequestDetail?.description || '',
      items:
        suppliesRequestDetail?.supplies?.map((item) => ({
          supply: item,
          supplyGroup: item?.supplyGroup,
          quantity: item?.quantity,
          stockQuantity: item?.stockQuantity,
          availableStockQuantity: item?.availableStockQuantity,
          minStockQuantity: item?.minStockQuantity,
          buyQuantity:
            +item?.quantity - +item?.availableStockQuantity > 0
              ? +item?.quantity - +item?.availableStockQuantity
              : 0,
        })) || DEFAULT_ITEM,
    }),
    [suppliesRequestDetail],
  )

  useEffect(() => {
    if (isUpdate) {
      actions.getSuppliesRequestDetail(id)
    }
    return () => {
      if (isUpdate) {
        actions.resetStateSuppliesRequest()
      }
    }
  }, [id])

  const handleSubmit = (val) => {
    const params = {
      name: val?.name,
      warehouseId: val?.warehouse?.id,
      factoryId: val?.warehouse?.factory?.id,
      type: SUPPLY_REQUEST_TYPE_ENUM.PROVIDE,
      jobIds: val?.jobCode ? [val?.jobCode?.id] : null,
      description: val?.description,
      supplies: val?.items?.map((item) => ({
        supplyId: item?.supply?.id,
        quantity: +item?.quantity,
      })),
    }
    if (isUpdate) {
      actions.updateSuppliesRequest({ ...params, id }, () =>
        history.push(ROUTE.SUPPLIES_REQUEST.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createSuppliesRequest(params, (data) =>
        history.push(
          ROUTE.SUPPLIES_REQUEST.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.DEVICE_MANAGEMENT.TITLE,
      },
      {
        route: withSearch(ROUTE.SUPPLIES_REQUEST.LIST.PATH),
        title: ROUTE.SUPPLIES_REQUEST.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.SUPPLIES_REQUEST.CREATE.PATH,
          title: ROUTE.SUPPLIES_REQUEST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.SUPPLIES_REQUEST.EDIT.PATH,
          title: ROUTE.SUPPLIES_REQUEST.EDIT.TITLE,
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
        return ROUTE.SUPPLIES_REQUEST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.SUPPLIES_REQUEST.EDIT.TITLE
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
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  {isUpdate && (
                    <>
                      <Grid item xs={12}>
                        <LabelValue
                          label={
                            <Typography>
                              {t('suppliesCategory.form.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={SUPPLY_REQUEST_STATUS_OPTIONS}
                              value={suppliesRequestDetail?.status}
                            />
                          }
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('suppliesRequest.table.code')}
                          name="code"
                          placeholder={t('suppliesRequest.table.code')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          }}
                          allow={TEXTFIELD_ALLOW.EXCEPT_SPECIALS}
                          disabled
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('suppliesRequest.table.name')}
                      name="name"
                      placeholder={t('suppliesRequest.table.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="warehouse"
                      label={t('suppliesRequest.form.field.warehouse')}
                      placeholder={t('suppliesRequest.form.field.warehouse')}
                      asyncRequest={(s) =>
                        searchWarehouseDefineApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            factoryId: userInfo?.factoryId || null,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      onChange={() => setFieldValue('items', DEFAULT_ITEM)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="jobCode"
                      label={t('suppliesRequest.form.field.jobCode')}
                      placeholder={t('suppliesRequest.form.field.jobCode')}
                      asyncRequest={(s) =>
                        searchJobApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            type: [
                              JOB_TYPE.SCHEDULE_MAINTAIN,
                              JOB_TYPE.REQUEST,
                            ],
                            status: [
                              JOB_STATUS.WAIT_CONFIRM,
                              JOB_STATUS.IN_PROGRESS,
                            ],
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('suppliesRequest.form.field.description')}
                      placeholder={t('suppliesRequest.form.field.description')}
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

            <Box mt={2}>
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <ItemSettingTable
                    items={values?.items || []}
                    arrayHelpers={arrayHelpers}
                    setFieldValue={setFieldValue}
                    values={values}
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

export default SuppliesRequestForm
