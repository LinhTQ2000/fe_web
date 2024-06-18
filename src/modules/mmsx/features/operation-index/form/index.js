import { useEffect, useMemo } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import useOperationIndex from '~/modules/mmsx/redux/hooks/useOperationIndex'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from './item-setting-table'
import { validateSchema } from './schema'

export default function OperationIndexForm() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { withSearch } = useQueryState()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const MODE_MAP = {
    [ROUTE.OPERATION_INDEX.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.OPERATION_INDEX.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const DEFAULT_ITEM = [
    {
      id: new Date().getTime(),
      uniqId: new Date().getTime().toString(),
      name: '',
      description: '',
    },
  ]

  const {
    data: { detail, isLoading },
    actions,
  } = useOperationIndex()

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.OPERATION_INDEX.LIST.PATH),
        title: ROUTE.OPERATION_INDEX.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.OPERATION_INDEX.CREATE.PATH,
          title: ROUTE.OPERATION_INDEX.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.OPERATION_INDEX.EDIT.PATH,
          title: ROUTE.OPERATION_INDEX.EDIT.TITLE,
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
        return ROUTE.OPERATION_INDEX.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.OPERATION_INDEX.EDIT.TITLE
      default:
        break
    }
  }
  const backToList = () => {
    history.push(withSearch(ROUTE.OPERATION_INDEX.LIST.PATH))
  }

  const initialValues = useMemo(
    () => ({
      name: detail?.name || '',
      unit: detail?.unit || '',
      factories: detail?.factories || [],
      items:
        detail?.parameters?.map((item) => ({ ...item, uniqId: item.id })) ||
        DEFAULT_ITEM,
    }),
    [detail],
  )

  const refreshData = () => {
    actions.getDetailOperationIndex(id)
  }

  useEffect(() => {
    if (isUpdate) {
      refreshData()
    }
    return () => actions.resetOperationIndexState()
  }, [id])

  const onSubmit = (val) => {
    const params = {
      ...val,
      factoryIds: val?.factories?.map((factory) => factory?.id),
      parameters: val?.items?.map((param) => ({
        name: param?.name,
        description: param?.description,
        ...(isUpdate ? { id: param?.id } : {}),
      })),
    }
    if (isUpdate) {
      actions.updateOperationIndex({ id, ...params }, () =>
        history.push(ROUTE.OPERATION_INDEX.DETAIL.PATH.replace(':id', id)),
      )
    } else {
      actions.createOperationIndex(params, (data) =>
        history.push(
          ROUTE.OPERATION_INDEX.DETAIL.PATH.replace(':id', data?.id),
        ),
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
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, handleReset }) => (
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
                              value={detail?.active}
                            />
                          }
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <TextField
                          label={t('operationIndex.code')}
                          value={detail?.code}
                          placeholder={t('operationIndex.code')}
                          disabled
                          required
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('operationIndex.name')}
                      name="name"
                      placeholder={t('operationIndex.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="unit"
                      label={t('mmsx:deviceSynthesisReport.unit')}
                      placeholder={t('mmsx:deviceSynthesisReport.unit')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="factories"
                      label={t('operationIndex.factory')}
                      placeholder={t('operationIndex.factory')}
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
                      multiple
                      required
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
                    items={values?.items.map((item, index) => ({
                      ...item,
                      idx: index,
                    }))}
                    arrayHelpers={arrayHelpers}
                    mode={mode}
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
