import React, { useEffect, useMemo } from 'react'

import { Box, Grid } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { first, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import HotKeys from '~/components/HotKeys'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'
import useDeviceStatus from '~/modules/mmsx/redux/hooks/useDeviceStatus'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemSettingTable from './item-setting-table'
import { validateSchema } from './schema'

const DeviceStatusForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id, accessId } = useParams()
  const routeMatch = useRouteMatch()
  const { withSearch } = useQueryState()

  const MODE_MAP = {
    [ROUTE.DEVICE_STATUS.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEVICE_STATUS.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]

  const isUpdate = mode === MODAL_MODE.UPDATE

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    fromDate: null,
    status: null,
    toDate: null,
  }

  const {
    data: { isLoading, infoData, detailOfStatus },
    actions,
  } = useDeviceStatus()

  const {
    data: { deviceDetail },
    actions: actionDevice,
  } = useDefineDevice()

  const backToList = () => {
    history.push({
      pathname: ROUTE.DEVICE_STATUS.DETAIL.PATH.replace(':id', `${id}`),
      search: withSearch(),
    })
  }

  const initialValues = useMemo(() => {
    const convertData = []
    if (!isEmpty(detailOfStatus)) {
      const tempObj = {
        id: detailOfStatus?.id,
        fromDate: detailOfStatus?.startTime,
        toDate: detailOfStatus?.endTime,
        status: detailOfStatus?.status,
      }
      detailOfStatus?.attributeTypes?.forEach((type) => {
        tempObj[type?.attributeTypeId] = type?.value
      })
      convertData.push(tempObj)
    }
    return {
      items: isUpdate ? convertData : [DEFAULT_ITEM],
      date: new Date(),
    }
  }, [detailOfStatus])

  useEffect(() => {
    actionDevice.getDeviceDetailById(id)
    if (isUpdate) {
      actions.getDetailOfStatus(accessId)
    }
    return () => {
      actions.resetDetailOfStatus()
      actionDevice.resetDeviceState()
    }
  }, [id])

  const handleSubmit = (val) => {
    const deviceStatuses = val?.items?.map((item) => ({
      startTime: item?.fromDate,
      endTime: item?.toDate,
      status: +item?.status,
      attributeTypes: deviceDetail?.deviceGroup?.attributeTypes?.map((i) => ({
        attributeTypeId: i?.id,
        value: +item[i?.id] || null,
      })),
    }))
    const params = {
      deviceId: id,
      date: val?.date,
      status: first(deviceStatuses)?.status,
      startTime: first(deviceStatuses)?.startTime,
      endTime: first(deviceStatuses)?.endTime,
      attributeTypes: first(deviceStatuses)?.attributeTypes,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createInfoDeviceStatus(params, (data) =>
        history.push({
          pathname: ROUTE.DEVICE_STATUS.ACTION_DETAIL.PATH.replace(
            ':id',
            id,
          ).replace(':accessId', data?.id),
        }),
      )
    } else {
      actions.updateInfoDeviceStatus({ ...params, id: accessId }, () =>
        history.push(
          ROUTE.DEVICE_STATUS.ACTION_DETAIL.PATH.replace(
            ':accessId',
            accessId,
          ).replace(':id', id),
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
        route: withSearch(ROUTE.DEVICE_STATUS.LIST.PATH),
        title: ROUTE.DEVICE_STATUS.LIST.TITLE,
      },
      {
        route: withSearch(ROUTE.DEVICE_STATUS.DETAIL.PATH.replace(':id', id)),
        title: ROUTE.DEVICE_STATUS.DETAIL.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEVICE_STATUS.CREATE.PATH,
          title: ROUTE.DEVICE_STATUS.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEVICE_STATUS.EDIT.PATH,
          title: ROUTE.DEVICE_STATUS.EDIT.TITLE,
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
        return ROUTE.DEVICE_STATUS.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEVICE_STATUS.EDIT.TITLE
      default:
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
        validationSchema={validateSchema({
          t,
          attributes: deviceDetail?.deviceGroup?.attributeTypes,
        })}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, values }) => (
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
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceStatus.form.serial')}
                      value={deviceDetail?.serial}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceList.identificationNo')}
                      value={deviceDetail?.identificationNo}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceStatus.form.deviceName')}
                      value={deviceDetail?.name}
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
                    infoData={infoData}
                    attributeTypes={
                      deviceDetail?.deviceGroup?.attributeTypes || []
                    }
                    mode={mode}
                  />
                )}
              />
            </Box>
            <ActionBar
              onBack={backToList}
              onCancel={handleReset}
              mode={MODAL_MODE.UPDATE}
            />
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default DeviceStatusForm
