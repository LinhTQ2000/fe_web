import React, { useEffect, useMemo, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FieldArray, Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
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
  ACTIVE_STATUS,
  CREATE_PLAN_STATUS,
  SUPPLY_REQUEST_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import useContingencyPlan from '~/modules/mmsx/redux/hooks/useContingencyPlan'
import { getSuppliesByMaintenancePlan } from '~/modules/mmsx/redux/sagas/contingency-plan/get-supplies-by-maintenance-plan'
import { searchMaintenancePlanApi } from '~/modules/mmsx/redux/sagas/maintenance-plan/search'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'
import { returnStockQuantity } from '~/utils/measure'

import { formatChecklist } from '../detail'
import CheckTable from './check-table'
import ItemSettingTable from './itemSetting-table'
import { validateSchema } from './schema'

const DEFAULT_ITEM = [
  {
    id: new Date().getTime(),
    supplyGroup: null,
    supply: null,
    proposalQuantity: 0,
    price: 0,
    buyQuantity: 0,
  },
]

const ContingencyPlanForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const {
    data: { contingencyPlanDetail, isLoading },
    actions,
  } = useContingencyPlan()

  const [totalAmount, setTotalAmount] = useState(0)

  const MODE_MAP = {
    [ROUTE.CONTINGENCY_PLAN.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.CONTINGENCY_PLAN.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const DEFAULT_CHECKLIST = [
    {
      id: 1,
      revenue: 0,
      name: 'revenue',
      disabled: false,
      tooltip: t('contingencyPlan.tooltip.revenue'),
    },
    {
      id: 2,
      rate: 0,
      name: 'rate',
      disabled: false,
      tooltip: t('contingencyPlan.tooltip.rate'),
    },
    {
      id: 3,
      revenueVnd: 0,
      name: 'revenueVnd',
      disabled: true,
      tooltip: t('contingencyPlan.tooltip.revenueVnd'),
    },
    {
      id: 4,
      totalCostSparePart: 0,
      name: 'totalCostSparePart',
      disabled: true,
      tooltip: t('contingencyPlan.tooltip.totalCostSparePart'),
    },
    {
      id: 5,
      totalCostSparePartPerRevenue: 0,
      name: 'totalCostSparePartPerRevenue',
      disabled: true,
      tooltip: t('contingencyPlan.tooltip.totalCostSparePartPerRevenue'),
    },
    {
      id: 6,
      totalCostConfirmed: 0,
      name: 'totalCostConfirmed',
      disabled: false,
    },
    {
      id: 7,
      totalCostOther: 0,
      name: 'totalCostOther',
      disabled: true,
      tooltip: t('contingencyPlan.tooltip.totalCostOther'),
    },
    {
      id: 8,
      totalCostOtherPerRevenue: 0,
      name: 'totalCostOtherPerRevenue',
      disabled: true,
      tooltip: t('contingencyPlan.tooltip.totalCostOtherPerRevenue'),
    },
    {
      id: 9,
      otherTotalCostConfirmed: 0,
      name: 'otherTotalCostConfirmed',
      disabled: false,
    },
    {
      id: 10,
      totalCostSuggest: 0,
      name: 'totalCostSuggest',
      disabled: true,
      tooltip: t('contingencyPlan.tooltip.totalCostSuggest'),
    },
  ]

  const backToList = () => {
    history.push(withSearch(ROUTE.CONTINGENCY_PLAN.LIST.PATH))
  }

  const initialValues = useMemo(
    () => ({
      code: contingencyPlanDetail?.code || '',
      name: contingencyPlanDetail?.name || '',
      maintenancePlan: contingencyPlanDetail?.maintenancePlan || null,
      factory: contingencyPlanDetail?.factory || null,
      time: isUpdate
        ? [contingencyPlanDetail?.fromDate, contingencyPlanDetail?.toDate]
        : null,
      items:
        contingencyPlanDetail?.supplies?.map((supply) => ({
          ...supply,
          supply: {
            ...supply.supply,
            ...supply,
            unit: supply?.unit,
          },
          note: supply?.description,
        })) || DEFAULT_ITEM,
      checklist: isEmpty(contingencyPlanDetail)
        ? DEFAULT_CHECKLIST
        : formatChecklist(contingencyPlanDetail || {}, DEFAULT_CHECKLIST),
    }),
    [contingencyPlanDetail],
  )

  useEffect(() => {
    if (isUpdate) {
      actions.getContingencyPlanDetail(id)
    }
    return () => {
      if (isUpdate) {
        actions.resetStateContingencyPlan()
      }
    }
  }, [mode])

  const handleSubmit = (val) => {
    const checklist = {}
    val?.checklist.forEach((check) => {
      checklist[check.name] = check[check.name]
    })
    const params = {
      code: val?.code,
      name: val?.name,
      maintenancePlanId: val?.maintenancePlan?.id,
      fromDate: val?.time[0],
      toDate: val?.time[1],
      factoryId: val?.factory?.id,
      supplies: val?.items?.map((item) => ({
        supplyId: item?.supply?.id,
        proposalQuantity: +item?.proposalQuantity,
        extraProposalQuantity: +item?.extraProposalQuantity,
        price: +item?.price,
        description: item?.note,
      })),
      checklist: checklist,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createContingencyPlan(params, (data) =>
        history.push(
          ROUTE.CONTINGENCY_PLAN.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    } else {
      actions.updateContingencyPlan(
        { ...params, id },
        history.push(ROUTE.CONTINGENCY_PLAN.DETAIL.PATH.replace(':id', id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.PLAN.TITLE,
      },
      {
        route: withSearch(ROUTE.CONTINGENCY_PLAN.LIST.PATH),
        title: ROUTE.CONTINGENCY_PLAN.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.CONTINGENCY_PLAN.CREATE.PATH,
          title: ROUTE.CONTINGENCY_PLAN.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.CONTINGENCY_PLAN.EDIT.PATH,
          title: ROUTE.CONTINGENCY_PLAN.EDIT.TITLE,
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
        return ROUTE.CONTINGENCY_PLAN.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.CONTINGENCY_PLAN.EDIT.TITLE
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

  const handleChangeMaintenancePlan = async (setFieldValue, value) => {
    setFieldValue('items', DEFAULT_ITEM)
    if (!isEmpty(value)) {
      const res = await getSuppliesByMaintenancePlan(value)
      if (res?.statusCode === 200) {
        const itemData = res?.data?.items?.map((item) => ({
          ...item,
          supply: {
            code: item.code,
            name: item.name,
            id: item.id,
            unit: item.unit,
            stockQuantity: item?.stockQuantity,
            minStockQuantity: item?.minStockQuantity,
            supplyType: item?.supplyType,
          },
          proposalQuantity: item?.quantity,
          buyQuantity: returnStockQuantity(
            +item?.quantity - +item?.stockQuantity,
          ),
        }))
        setFieldValue('items', itemData)
      }
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
        validationSchema={validateSchema(t, totalAmount)}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnChange={false}
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
                  <Grid item xs={12} lg={12}>
                    <Typography variant="h3">
                      {t('contingencyPlan.form.info')}
                    </Typography>
                  </Grid>
                  {isUpdate && (
                    <>
                      <Grid item xs={12}>
                        <LabelValue
                          label={
                            <Typography>
                              {t('contingencyPlan.table.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={SUPPLY_REQUEST_STATUS_OPTIONS}
                              value={contingencyPlanDetail?.status}
                            />
                          }
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('contingencyPlan.table.code')}
                          name="code"
                          placeholder={t('contingencyPlan.table.code')}
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
                      label={t('contingencyPlan.table.name')}
                      name="name"
                      placeholder={t('contingencyPlan.table.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="factory"
                      label={t('contingencyPlan.factory')}
                      placeholder={t('contingencyPlan.factory')}
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
                      onChange={() => {
                        setFieldValue('items', DEFAULT_ITEM)
                        setFieldValue('maintenancePlan', null)
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DateRangePicker
                      name="time"
                      label={t('contingencyPlan.table.time')}
                      placeholder={t('contingencyPlan.table.time')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="maintenancePlan"
                      label={t('contingencyPlan.form.maintenancePlan')}
                      placeholder={t('contingencyPlan.form.maintenancePlan')}
                      asyncRequest={(s) =>
                        searchMaintenancePlanApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            status: CREATE_PLAN_STATUS.CONFIRMED,
                            factoryId: values?.factory?.id,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      onChange={(value) =>
                        handleChangeMaintenancePlan(
                          setFieldValue,
                          value,
                          values,
                        )
                      }
                      asyncRequestDeps={values?.factory}
                      disabled={!values?.factory?.id}
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
                    mode={mode}
                    values={values}
                  />
                )}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <CheckTable
                mode={mode}
                checkItems={values?.checklist}
                values={values}
                setFieldValue={setFieldValue}
                items={values?.items || []}
                setTotalAmount={setTotalAmount}
              />
            </Box>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default ContingencyPlanForm
