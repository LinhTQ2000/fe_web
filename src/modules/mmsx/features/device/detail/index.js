import React, { useEffect } from 'react'

import {
  Box,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Switch,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, Link } from 'react-router-dom'

import { IMG_FILE_TYPE, MODAL_MODE } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import FileUploadDropzone from '~/components/FileUploadDropzone'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import {
  ACTIVE_STATUS,
  ASSET_TYPE_MAP,
  DEVICE_STATUS_MAP,
  DEVICE_STATUS_OPTIONS,
  FIELDS_LOG_HISTORY,
  FIELDS_LOG_HISTORY_MAP,
  HISTORY_ACTION,
  HISTORY_REASON_REF_MAP,
  HISTORY_REASON_REF_ROUTE,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import Activities from '~/modules/mmsx/partials/Activities'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import ErrorInfo from '../error-info'
import TableInfo from '../info-table'
import MaintainTable from '../maintain-table'

const DefineDeviceDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const breadcrumbs = [
    {
      title: ROUTE.DEVICE_MANAGEMENT.TITLE,
    },
    {
      route: withSearch(ROUTE.DEVICE_LIST.LIST.PATH),
      title: ROUTE.DEVICE_LIST.LIST.TITLE,
    },
    {
      route: ROUTE.DEVICE_LIST.DETAIL.PATH,
      title: ROUTE.DEVICE_LIST.DETAIL.TITLE,
    },
  ]

  const {
    data: { isLoading, deviceDetail },
    actions,
  } = useDefineDevice()

  useEffect(() => {
    actions.getDeviceDetailById(id)
    return () => {
      actions.resetDeviceState()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.DEVICE_LIST.LIST.PATH))
  }

  const actionBefore = () => {
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_DEVICE}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.DEVICE_LIST.EDIT.PATH.replace(':id', id))
            }
          >
            {t('general:common.update')}
          </Button>
        </Guard>
      </Box>
    )
  }

  const getHistory = () => {
    const histories = []
    deviceDetail?.histories?.forEach((item) => {
      if (item?.action === HISTORY_ACTION.CREATE) {
        histories.push({
          content: t('deviceList.history.create'),
          createdAt: item?.createdAt,
          id: item?.id,
          username: item?.createdBy?.username,
        })
      } else {
        histories.push({
          createdAt: item?.createdAt,
          id: item?.id,
          username: item?.createdBy?.username,
          content: () => {
            return (
              <>
                {item?.reason?.reasonRef ? (
                  <Typography display="flex">
                    <Typography>{t('deviceList.history.updateBy')}</Typography>
                    <Typography sx={{ ml: 0.5, mr: 0.5 }} variant="h5">
                      {t(HISTORY_REASON_REF_MAP[item?.reason?.reasonRef])}
                    </Typography>
                    <Link
                      variant="body2"
                      to={HISTORY_REASON_REF_ROUTE[
                        item?.reason?.reasonRef
                      ]?.replace(':id', item?.reason?.reason?.id)}
                    >
                      {item?.reason?.reason?.code}
                    </Link>
                  </Typography>
                ) : (
                  <Typography>{t('deviceList.history.update')}</Typography>
                )}
                <List sx={{ padding: 0 }}>
                  {(item?.contents || []).map((value, index) => (
                    <ListItem key={value?.valueField || index}>
                      <ListItemText
                        sx={{ margin: 0 }}
                        primary={
                          value?.valueField === FIELDS_LOG_HISTORY.STATUS
                            ? `${t(
                                FIELDS_LOG_HISTORY_MAP[value?.valueField],
                              )}: ${t(
                                DEVICE_STATUS_MAP[value?.oldValue],
                              )} -> ${t(DEVICE_STATUS_MAP[value?.newValue])}`
                            : `${t(
                                FIELDS_LOG_HISTORY_MAP[value?.valueField],
                              )}: ${
                                value?.oldObjectValue?.name ||
                                value?.oldValue ||
                                t('general:common.null')
                              } -> ${
                                value?.newObjectValue?.name ||
                                value?.newValue ||
                                t('general:common.null')
                              }`
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )
          },
        })
      }
    })
    return histories
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceDetail')}
      onBack={backToList}
      loading={isLoading}
      freeSolo
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_DEVICE))
              history.push(ROUTE.DEVICE_LIST.EDIT.PATH.replace(':id', id))
          },
        }}
      />
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('general:common.status')}
                  value={
                    <Status
                      options={DEVICE_STATUS_OPTIONS}
                      value={deviceDetail?.status}
                    />
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      sx={{ ml: 1 }}
                      color="success"
                      checked={deviceDetail?.active === ACTIVE_STATUS.ACTIVE}
                    />
                  }
                  label={t('deviceList.activeDevice')}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV label={t('deviceList.code')} value={deviceDetail?.code} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV label={t('deviceList.name')} value={deviceDetail?.name} />
              </Grid>
              {deviceDetail?.codeOnWfx && (
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('general.codeOnWfx')}
                    value={deviceDetail?.codeOnWfx}
                  />
                </Grid>
              )}
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.deviceGroup')}
                  value={deviceDetail?.deviceGroup?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.tableMaintenance.maintenanceTemplate')}
                  value={deviceDetail?.maintenanceTemplate?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.serial')}
                  value={deviceDetail?.serial}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.actualSerial')}
                  value={deviceDetail?.actualSerial}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.deviceType')}
                  value={deviceDetail?.deviceType?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.factory')}
                  value={deviceDetail?.factory?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.numericalOrder')}
                  value={deviceDetail?.numericalOrder}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.originFactory')}
                  value={deviceDetail?.originFactory?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.warehouse')}
                  value={deviceDetail?.warehouse?.name}
                />
              </Grid>
              {/* <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.originWarehouse')}
                  value={deviceDetail?.originWarehouse?.name}
                />
              </Grid> */}
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.area')}
                  value={deviceDetail?.area?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.type')}
                  value={t(ASSET_TYPE_MAP[deviceDetail?.assetType])}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV label={t('deviceList.model')} value={deviceDetail?.model} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.vendor')}
                  value={deviceDetail?.vendor?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.proDate')}
                  value={convertUtcDateToLocalTz(deviceDetail?.manufactureDate)}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.producer')}
                  value={deviceDetail?.manufacturer}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV label={t('deviceList.insuranceDay')}>
                  {deviceDetail?.warrantyPeriod
                    ? `${deviceDetail?.warrantyPeriod} ${t('general:months')}`
                    : ''}
                </LV>
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.creationDate')}
                  value={convertUtcDateToLocalTz(deviceDetail?.creationDate)}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.capitalizationDate')}
                  value={convertUtcDateToLocalTz(
                    deviceDetail?.capitalizationDate,
                  )}
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
                  label={t('deviceList.unit')}
                  value={deviceDetail?.unit?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.initMaintenanceDate')}
                  value={convertUtcDateToLocalTz(
                    deviceDetail?.initMaintenanceDate ||
                      deviceDetail?.createdAt,
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceList.initAccreditationDate')}
                  value={
                    deviceDetail?.initAccreditationDate
                      ? convertUtcDateToLocalTz(
                          deviceDetail?.initAccreditationDate,
                        )
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FileUploadDropzone
                  name="file"
                  value={deviceDetail?.imageUrl}
                  accept={IMG_FILE_TYPE}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Tabs
          list={[
            t('deviceList.tableInfo.title'),
            t('deviceList.tableMaintenance.title'),
            t('deviceList.tableMaintenance.repair'),
          ]}
          sx={{ mt: 3 }}
        >
          <TableInfo
            items={deviceDetail?.supplies?.map((item) => ({
              ...item,
              supply: { ...item },
            }))}
            mode={MODAL_MODE.DETAIL}
          />
          <MaintainTable values={deviceDetail?.deviceGroup} deviceId={id} />
          <ErrorInfo deviceId={id} mode={MODAL_MODE.DETAIL} />
        </Tabs>
        <ActionBar onBack={backToList} elBefore={actionBefore} />
      </Paper>
      <Activities data={getHistory()} />
    </Page>
  )
}

export default DefineDeviceDetail
