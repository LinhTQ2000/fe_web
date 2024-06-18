import { useEffect, useMemo, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { first, omit } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import {
  useHistory,
  useRouteMatch,
} from 'react-router-dom/cjs/react-router-dom.min'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Page from '~/components/Page'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { ACTIVE_STATUS } from '~/modules/mmsx/constants'
import useOperationIndex from '~/modules/mmsx/redux/hooks/useOperationIndex'
import useOperationValue from '~/modules/mmsx/redux/hooks/useOperationValue'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import { validateSchema } from './schema'

export default function OperationValueForm() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id, startDate, factoryId, endDate } = useParams()
  const { withSearch } = useQueryState()
  const MODE_MAP = {
    [ROUTE.OPERATION_VALUE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.OPERATION_VALUE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const isCreate = mode === MODAL_MODE.CREATE

  const {
    data: { isLoading, operationDetail },
    actions,
  } = useOperationValue()
  const {
    data: { userInfo },
  } = useUserInfo()
  const {
    data: { list: operationIndexes },
    actions: actionsOperationIndex,
  } = useOperationIndex()

  const userFactory = useMemo(() => {
    return first(userInfo?.factories)
  }, [userInfo])
  const [selectedFactory, setSelectedFactory] = useState(userFactory)

  const refreshData = () =>
    actions.getDetailOperationValue({ factoryId, startDate, endDate, id })

  useEffect(() => {
    if (isUpdate) refreshData()
    return () => {
      actionsOperationIndex.resetList()
      actions.resetOperationValueDetail()
    }
  }, [])

  useEffect(() => {
    if (isCreate) handleChangeFactory(userFactory?.id)
    return () => {
      actionsOperationIndex.resetList()
      actions.resetOperationValueDetail()
    }
  }, [userFactory])

  const handleChangeFactory = (factoryId) => {
    if (factoryId) {
      const params = {
        isGetAll: 1,
        filter: convertFilterParams({
          active: ACTIVE_STATUS.ACTIVE,
          factoryIds: factoryId,
        }),
      }
      actionsOperationIndex.searchOperationIndex(params)
    } else {
      actionsOperationIndex.resetList()
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.DEVICE_MANAGEMENT.TITLE,
      },
      {
        route: withSearch(ROUTE.OPERATION_VALUE.LIST.PATH),
        title: ROUTE.OPERATION_VALUE.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.OPERATION_VALUE.CREATE.PATH,
          title: ROUTE.OPERATION_VALUE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.OPERATION_VALUE.EDIT.PATH,
          title: ROUTE.OPERATION_VALUE.EDIT.TITLE,
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
        return ROUTE.OPERATION_VALUE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.OPERATION_VALUE.EDIT.TITLE
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

  const initialValues = useMemo(() => {
    let initValue = {}
    if (isCreate) {
      initValue = {
        factory: selectedFactory,
        date: new Date(),
      }
      operationIndexes?.forEach((item) => {
        const parameterObj = {}
        item?.parameters?.forEach((parameter) => {
          parameterObj[parameter?.id] = 0
        })
        initValue[item?.id] = parameterObj
      })
    }
    if (isUpdate) {
      initValue = {
        factory: operationDetail?.factory,
        date: startDate,
      }
      operationDetail?.operationIndexes &&
        operationDetail?.operationIndexes?.forEach((item) => {
          const parameterObj = {}
          item?.parameters?.forEach((parameter) => {
            parameterObj[parameter?.id] = parameter?.value || 0
          })
          initValue[item?.id] = parameterObj
        })
    }
    return initValue
  }, [operationDetail, operationIndexes])

  const handleSubmit = (val) => {
    const objectOperationIndex = omit(val, ['date', 'factory'])
    const arrayOperationIndex = []
    for (const operationIndex in objectOperationIndex) {
      const objectParameter = objectOperationIndex[operationIndex]
      const arrayParameter = []
      for (const parameter in objectParameter) {
        const obj = {
          parameterId: parameter,
          value: +objectParameter[parameter],
        }
        arrayParameter.push(obj)
      }
      const obj = {
        operationIndexId: operationIndex,
        parameters: arrayParameter,
      }
      arrayOperationIndex.push(obj)
    }
    const params = {
      date: val?.date,
      factoryId: val?.factory?.id || null,
      operationIndexes: arrayOperationIndex,
    }
    if (isUpdate) {
      actions.updateOperationValue({ ...params, id }, () =>
        history.push(
          ROUTE.OPERATION_VALUE.DETAIL.PATH.replace(':id', id)
            .replace(':factoryId', params.factoryId)
            .replace(':startDate', params.date)
            .replace(':endDate', params.date),
        ),
      )
    } else {
      actions.createOperationValue(params, (data) =>
        history.push(
          ROUTE.OPERATION_VALUE.DETAIL.PATH.replace(':id', data?.id)
            .replace(':factoryId', params.factoryId)
            .replace(':startDate', params.date?.toISOString())
            .replace(':endDate', params.date?.toISOString()),
        ),
      )
    }
  }

  const backToList = () => history.push(ROUTE.OPERATION_VALUE.LIST.PATH)
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema({
          t,
          operationIndexes: isCreate
            ? operationIndexes
            : operationDetail?.operationIndexes,
        })}
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
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="factory"
                      label={t('deviceList.factory')}
                      placeholder={t('deviceList.factory')}
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
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      onChange={(val) => {
                        setSelectedFactory(val)
                        handleChangeFactory(val?.id)
                      }}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DatePicker
                      name="date"
                      label={t('operationValue.declarationDate')}
                      placeholder={t('operationValue.declarationDate')}
                      maxDate={new Date()}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {(operationDetail?.operationIndexes || operationIndexes || [])
              .filter((item) => item.active === ACTIVE_STATUS.ACTIVE)
              .map((item) => {
                const parameters = item?.parameters || []
                return (
                  <Grid container justifyContent="center" key={item?.id}>
                    <Grid item xl={11} xs={12}>
                      <Grid
                        container
                        rowSpacing={4 / 3}
                        columnSpacing={{ xl: 11, xs: 12 }}
                      >
                        <Grid item xs={12}>
                          <Typography
                            variant="h3"
                            mt={2}
                            sx={{ overflow: 'hidden' }}
                          >
                            {`${item?.name} (${item?.unit})`}
                          </Typography>
                        </Grid>
                        {parameters.map((parameter) => (
                          <Grid item xs={12} lg={6} key={parameter.id}>
                            <Field.TextField
                              name={`${item?.id}.${parameter?.id}`}
                              label={parameter?.name}
                              placeholder={parameter?.name}
                              type="number"
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })}
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}
