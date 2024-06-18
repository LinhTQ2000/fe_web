import React, { useEffect, useMemo } from 'react'

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
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import {
  ACTIVE_STATUS,
  ASSET_MAINTENANCE_TYPE,
  UPDATE_INVENTORY_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import useDeviceInventory from '~/modules/mmsx/redux/hooks/useDeviceInventory'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from './item-setting-table'
import { validateSchema } from './schema'

const DeviceInventoryForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const DEFAULT_ITEMS = [
    {
      id: new Date().getTime(),
      device: null,
      updatedWarehouse: null,
      updatedArea: null,
      updatedStatus: null,
    },
  ]

  const {
    data: { deviceInventoryDetail, isLoading },
    actions,
  } = useDeviceInventory()

  const MODE_MAP = {
    [ROUTE.DEVICE_INVENTORY.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEVICE_INVENTORY.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.DEVICE_INVENTORY.LIST.PATH))
  }
  const initialValues = useMemo(
    () => ({
      name: deviceInventoryDetail?.name || '',
      code: deviceInventoryDetail?.code || '',
      description: deviceInventoryDetail?.description || '',
      factory: deviceInventoryDetail?.factory || null,
      items:
        deviceInventoryDetail?.deviceDetails?.map((d) => ({
          device: {
            ...d,
            warehouse: d?.oldWarehouse,
            area: d?.oldArea,
            status: d?.oldStatus,
          },
          updatedWarehouse: d?.warehouse,
          updatedArea: d?.area,
          updatedStatus: d?.status,
        })) || DEFAULT_ITEMS,
    }),
    [deviceInventoryDetail],
  )

  useEffect(() => {
    if (isUpdate) {
      actions.getDeviceInventoryDetail(id)
    }
    return () => {
      actions.resetStateDeviceInventory()
    }
  }, [mode])

  const handleSubmit = (values) => {
    const params = {
      name: values?.name,
      code: values?.code,
      description: values?.description,
      type: ASSET_MAINTENANCE_TYPE.DEVICE,
      factoryId: values?.factory?.id,
      deviceDetails: values?.items?.map((item) => ({
        deviceId: item?.device?.id,
        warehouseId: item?.updatedWarehouse?.id,
        areaId: item?.updatedArea?.id,
        status: item?.updatedStatus,
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createDeviceInventory(params, (data) =>
        history.push(
          ROUTE.DEVICE_INVENTORY.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    } else {
      actions.updateDeviceInventory({ ...params, id }, () =>
        history.push(ROUTE.DEVICE_INVENTORY.DETAIL.PATH.replace(':id', id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.WAREHOUSE.TITLE,
      },
      {
        route: withSearch(ROUTE.DEVICE_INVENTORY.LIST.PATH),
        title: ROUTE.DEVICE_INVENTORY.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEVICE_INVENTORY.CREATE.PATH,
          title: ROUTE.DEVICE_INVENTORY.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEVICE_INVENTORY.EDIT.PATH,
          title: ROUTE.DEVICE_INVENTORY.EDIT.TITLE,
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
        return ROUTE.DEVICE_INVENTORY.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEVICE_INVENTORY.EDIT.TITLE
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
                                {t('deviceInventory.status')}
                              </Typography>
                            }
                            value={
                              <Status
                                options={UPDATE_INVENTORY_STATUS_OPTIONS}
                                value={deviceInventoryDetail?.status}
                              />
                            }
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            name="code"
                            label={t('deviceInventory.requestCode')}
                            placeholder={t('deviceInventory.requestCode')}
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
                        label={t('deviceInventory.requestName')}
                        placeholder={t('deviceInventory.requestName')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="factory"
                        label={t('deviceInventory.factory')}
                        placeholder={t('deviceInventory.factory')}
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
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        onChange={() => setFieldValue('items', DEFAULT_ITEMS)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <Field.TextField
                        name="description"
                        label={t('deviceInventory.description')}
                        placeholder={t('deviceInventory.description')}
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

export default DeviceInventoryForm
