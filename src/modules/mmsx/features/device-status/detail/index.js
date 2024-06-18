import React, { useEffect, useState } from 'react'

import { Box, Grid, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import DateRangePicker from '~/components/DateRangePicker'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { DEVICE_STATUS_ENUM_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'
import useDeviceStatus from '~/modules/mmsx/redux/hooks/useDeviceStatus'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSeconds,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import ItemSettingTable from '../form/item-setting-table'

const DeviceStatusDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const { canAccess } = useApp()

  const MODE_MAP = {
    [ROUTE.DEVICE_STATUS.DETAIL.PATH]: MODAL_MODE.DETAIL,
    [ROUTE.DEVICE_STATUS.ACTION_DETAIL.PATH]: 'action-detail',
  }

  const mode = MODE_MAP[routeMatch.path]
  const isDetail = mode === MODAL_MODE.DETAIL
  const isActionDetail = mode === 'action-detail'

  const { page, pageSize, sort, setPage, setPageSize, setSort, withSearch } =
    useQueryState()

  const breadcrumbs = [
    {
      title: ROUTE.DEVICE_MANAGEMENT.TITLE,
    },
    {
      route: withSearch(ROUTE.DEVICE_STATUS.LIST.PATH),
      title: ROUTE.DEVICE_STATUS.LIST.TITLE,
    },
    {
      route: ROUTE.DEVICE_STATUS.DETAIL.PATH,
      title: ROUTE.DEVICE_STATUS.DETAIL.TITLE,
    },
  ]

  const [dateFilter, setDateFilter] = useState([null, null])

  const {
    data: { deviceStatusDetail, isLoading, detailList, totalDetail },
    actions,
  } = useDeviceStatus()
  const {
    data: { deviceDetail },
    actions: actionsDevice,
  } = useDefineDevice()

  useEffect(() => {
    if (isDetail) {
      const params = {
        id,
        filter: convertFilterParams(
          {
            time: dateFilter,
          },
          [{ field: 'time', filterFormat: 'date' }],
        ),
      }
      actions.getDetailDeviceStatus(params)
      actionsDevice.getDeviceDetailById(id)
    }
    return () => {
      actions.resetDeviceStatus()
      actionsDevice.resetDeviceState()
    }
  }, [id, dateFilter])

  const backToList = () => {
    if (isDetail) {
      history.push(withSearch(ROUTE.DEVICE_STATUS.LIST.PATH))
    } else if (isActionDetail) {
      history.push(ROUTE.DEVICE_STATUS.DETAIL.PATH.replace(':id', `${id}`))
    }
  }

  const columns = [
    {
      field: 'id',
      width: 50,
      headerName: '#',
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'startTime',
      width: 120,
      headerName: t('deviceStatus.startTime'),
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateTimeToLocalTz(params?.row?.startTime)
      },
    },
    {
      field: 'endTime',
      width: 120,
      headerName: t('deviceStatus.endTime'),
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateTimeToLocalTz(params?.row?.endTime)
      },
    },
    {
      field: 'status',
      headerName: t('deviceStatus.status.title'),
      width: 200,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={DEVICE_STATUS_ENUM_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'activeTime',
      headerName: t('deviceStatus.active'),
      width: 120,
      renderCell: (params) => {
        const { activeTime } = params.row
        const { day, hour, minute, second } = convertSeconds(+activeTime)
        return `${day} ${t('general:days')} ${hour} ${t(
          'general:hours',
        )} ${minute} ${t('general:minutes')} ${second} ${t('general:seconds')}`
      },
    },
    {
      field: 'updatedAt',
      headerName: t('general:common.updatedAt'),
      width: 150,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateTimeToLocalTz(params?.row?.updatedAt)
      },
    },
    {
      field: 'action',
      headerName: t('deviceStatus.action'),
      width: 150,
      align: 'center',
      sticky: 'right',
      renderCell: (params) => {
        const { id: accessId } = params.row
        return (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_DEVICE_STATUS}>
              <IconButton
                onClick={() =>
                  history.push({
                    pathname: ROUTE.DEVICE_STATUS.ACTION_DETAIL.PATH.replace(
                      ':id',
                      id,
                    ).replace(':accessId', accessId),
                    search: withSearch(),
                  })
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.UPDATE_DEVICE_STATUS}>
              <IconButton
                onClick={() =>
                  history.push({
                    pathname: ROUTE.DEVICE_STATUS.EDIT.PATH.replace(
                      ':id',
                      id,
                    ).replace(':accessId', accessId),
                    search: withSearch(),
                  })
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
          </>
        )
      },
    },
  ]

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.listDeviceStatusDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_DEVICE_STATUS))
              history.push(
                withSearch(ROUTE.DEVICE_STATUS.CREATE.PATH.replace(':id', id)),
              )
          },
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('deviceStatus.form.serial')}
                value={deviceDetail?.serial}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('deviceStatus.form.deviceName')}
                value={deviceDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('deviceList.identificationNo')}
                value={deviceDetail?.identificationNo}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              {isActionDetail ? (
                <LV
                  label={t('deviceStatus.form.dateFilter')}
                  value={deviceStatusDetail?.date}
                />
              ) : (
                <DateRangePicker
                  value={dateFilter}
                  onChange={(val) => setDateFilter(val)}
                  label={t('deviceStatus.form.dateFilter')}
                  placeholder={t('deviceStatus.form.dateFilter')}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box mt={2}>
        {isDetail && (
          <>
            <DataTable
              columns={columns}
              title={t('deviceStatus.form.tableTitle')}
              rows={detailList}
              pageSize={pageSize}
              page={page}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              onSortChange={setSort}
              sort={sort}
              total={totalDetail}
              hideSetting
              beforeTopbar={
                <Guard code={FUNCTION_CODE.CREATE_DEVICE_STATUS}>
                  <Button
                    onClick={() =>
                      history.push({
                        pathname: ROUTE.DEVICE_STATUS.CREATE.PATH.replace(
                          ':id',
                          id,
                        ),
                        search: withSearch(),
                      })
                    }
                    icon="add"
                    sx={{ ml: 4 / 3 }}
                  >
                    {t('deviceStatus.form.editButton')}
                  </Button>
                </Guard>
              }
            />
          </>
        )}
        {isActionDetail && (
          <ItemSettingTable
            items={deviceStatusDetail?.data?.find((i) => i?.id === id) || []}
            pageSize={pageSize}
            page={page}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onSortChange={setSort}
            sort={sort}
            total={deviceStatusDetail?.data?.count}
            isActionDetail
          />
        )}
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default DeviceStatusDetail
