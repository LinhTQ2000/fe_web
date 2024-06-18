import React, { useEffect, useMemo, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
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
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  SUPPLY_REQUEST_STATUS_ENUM,
  SUPPLY_REQUEST_STATUS_OPTIONS,
  SUPPLY_REQUEST_TYPE_ENUM,
} from '~/modules/mmsx/constants'
import useSuppliesRequest from '~/modules/mmsx/redux/hooks/useSuppliesRequest'
import { getSuppliesRequestDetailApi } from '~/modules/mmsx/redux/sagas/supplies-request/get-supplies-request-detail'
import { getSuppliesRequestListApi } from '~/modules/mmsx/redux/sagas/supplies-request/get-supplies-request-list'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from '../return-form/itemSetting-table'
import { validateSchema } from './schema'

const SuppliesReturnForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const {
    data: { suppliesRequestDetail, isLoading },
    actions,
  } = useSuppliesRequest()
  const [listSupply, setListSupply] = useState([])

  const MODE_MAP = {
    [ROUTE.SUPPLIES_REQUEST.RETURN_CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.SUPPLIES_REQUEST.RETURN_EDIT.PATH]: MODAL_MODE.UPDATE,
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
      supplyRequest: suppliesRequestDetail?.request || null,
      description: suppliesRequestDetail?.description || '',
      items: suppliesRequestDetail?.supplies?.map((item) => ({
        ...item,
        returnQuantity: item?.quantity || 0,
        quantity: item?.providedQuantity,
        supply: {
          ...item,
          quantity: item?.providedQuantity,
        },
      })),
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
  }, [mode])

  useEffect(() => {
    if (isUpdate) {
      const fetchData = async () => {
        const res = await getSuppliesRequestDetailApi(
          suppliesRequestDetail?.request?.id,
        )
        if (res?.statusCode === 200) {
          const tempArr = res?.data?.supplies?.map((item) => ({
            ...item,
            returnQuantity: item.quantity || 0,
          }))
          setListSupply(tempArr)
        } else {
          setListSupply([])
        }
      }

      fetchData()
    }
  }, [mode])

  const handleSubmit = (val) => {
    const params = {
      name: val?.name,
      requestId: val?.supplyRequest?.id,
      type: SUPPLY_REQUEST_TYPE_ENUM.RETURN,
      description: val?.description,
      supplies: val?.items?.map((item) => ({
        supplyId: item?.supply?.id,
        quantity: +item?.returnQuantity,
      })),
    }
    if (isUpdate) {
      actions.updateSuppliesRequest({ ...params, id }, () =>
        history.push(
          ROUTE.SUPPLIES_REQUEST.RETURN_DETAIL.PATH.replace(':id', id),
        ),
      )
    } else {
      actions.createSuppliesRequest(params, (data) =>
        history.push(
          ROUTE.SUPPLIES_REQUEST.RETURN_DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    }
  }

  const handleChangeRequest = async (id, setFieldValue) => {
    if (id) {
      const res = await getSuppliesRequestDetailApi(id)
      if (res?.statusCode === 200) {
        const tempArr = res?.data?.supplies?.map((item) => ({
          ...item,
          returnQuantity: item.quantity || 0,
          supply: item,
        }))
        setListSupply(tempArr)
        setFieldValue('items', tempArr)
      } else {
        setListSupply([])
        setFieldValue('items', [])
      }
    } else {
      setFieldValue('items', [])
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
          route: ROUTE.SUPPLIES_REQUEST.RETURN_CREATE.PATH,
          title: ROUTE.SUPPLIES_REQUEST.RETURN_CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.SUPPLIES_REQUEST.RETURN_EDIT.PATH,
          title: ROUTE.SUPPLIES_REQUEST.RETURN_EDIT.TITLE,
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
        return ROUTE.SUPPLIES_REQUEST.RETURN_CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.SUPPLIES_REQUEST.RETURN_EDIT.TITLE
      default:
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={() => {
              handleReset()
              setListSupply([])
            }}
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
                ...(isUpdate
                  ? {
                      onReset: handleReset,
                    }
                  : {
                      onReset: () => {
                        handleReset()
                        setListSupply([])
                      },
                    }),
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
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="supplyRequest"
                      label={t('suppliesRequest.form.field.request')}
                      placeholder={t('suppliesRequest.form.field.request')}
                      asyncRequest={(s) =>
                        getSuppliesRequestListApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            status: SUPPLY_REQUEST_STATUS_ENUM.COMPLETED,
                            type: SUPPLY_REQUEST_TYPE_ENUM.PROVIDE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      onChange={(val) =>
                        handleChangeRequest(val?.id, setFieldValue)
                      }
                      required
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
                    listSupply={listSupply}
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

export default SuppliesReturnForm
