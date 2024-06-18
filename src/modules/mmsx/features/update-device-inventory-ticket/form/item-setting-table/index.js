import React from 'react'

import { IconButton } from '@mui/material'
import { map } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import {
  ACTIVE_STATUS,
  DEVICE_STATUS_MAP,
  DEVICE_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { searchAreaApi } from '~/modules/mmsx/redux/sagas/area/search'
import { searchDeviceListApi } from '~/modules/mmsx/redux/sagas/define-device/search-device-list'
import { searchWarehouseDefineApi } from '~/modules/mmsx/redux/sagas/warehouse-define/search'
import { convertFilterParams } from '~/utils'

function ItemSettingTable({ items = [], mode, arrayHelpers, values }) {
  const { t } = useTranslation(['mmsx'])
  const { scrollToBottom } = useApp()
  const isDetail = mode === MODAL_MODE.DETAIL
  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'deviceName',
      headerName: t('deviceInventory.deviceName'),
      width: 200,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((i) => i?.device?.id)
        return isDetail ? (
          params.row?.device?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].device`}
            placeholder={t('deviceInventory.deviceName')}
            asyncRequest={(s) =>
              searchDeviceListApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  active: ACTIVE_STATUS.ACTIVE,
                  factoryIds: values?.factory?.id,
                  warehouseIds: map(values?.warehouse, 'id'),
                }),
                isMasterData: 1,
              })
            }
            asyncRequestDeps={[
              values?.factory?.id,
              ...(values?.warehouse ?? []),
            ]}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) =>
              `${opt?.serial || ''} - ${opt?.identificationNo || ''}`
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some(
                (id) => id === opt?.id && opt?.id !== items[index]?.device?.id,
              )
            }
          />
        )
      },
    },
    {
      field: 'deviceCode',
      headerName: t('deviceInventory.deviceCode'),
      width: 200,
      renderCell: (params) => params.row?.device?.code,
    },
    {
      field: 'deviceSerial',
      headerName: t('deviceInventory.deviceSerial'),
      width: 200,
      renderCell: (params) => params.row?.device?.serial,
    },
    {
      field: 'identificationNo',
      headerName: t('deviceInventory.identificationNo'),
      width: 200,
      renderCell: (params) => params.row?.device?.identificationNo,
    },
    {
      field: 'warehouse',
      headerName: t('deviceInventory.warehouse'),
      width: 200,
      renderCell: (params) => params.row?.device?.warehouse?.name,
    },
    {
      field: 'updatedWarehouse',
      headerName: t('deviceInventory.updatedWarehouse'),
      width: 400,
      renderCell: (params, index) => {
        return isDetail ? (
          <>{params.row?.updatedWarehouse?.name}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].updatedWarehouse`}
            placeholder={t('deviceInventory.updatedWarehouse')}
            asyncRequest={(s) =>
              searchWarehouseDefineApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  factoryIds: values?.factory?.id,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            asyncRequestDeps={values?.factory?.id}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
          />
        )
      },
    },
    {
      field: 'area',
      headerName: t('deviceInventory.area'),
      width: 200,
      renderCell: (params) => params.row?.device?.area?.name,
    },
    {
      field: 'updatedArea',
      headerName: t('deviceInventory.updatedArea'),
      width: 400,
      renderCell: (params, index) => {
        return isDetail ? (
          <>{params.row?.updatedArea?.name}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].updatedArea`}
            placeholder={t('deviceInventory.updatedArea')}
            asyncRequest={(s) =>
              searchAreaApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  factoryIds: values?.factory?.id,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            asyncRequestDeps={values?.factory?.id}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
          />
        )
      },
    },
    {
      field: 'status',
      headerName: t('deviceInventory.status'),
      width: 200,
      renderCell: (params) => t(DEVICE_STATUS_MAP[params.row?.device?.status]),
    },
    {
      field: 'updatedStatus',
      headerName: t('deviceInventory.updatedStatus'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          <>{t(DEVICE_STATUS_MAP[params.row?.updatedStatus])}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].updatedStatus`}
            placeholder={t('deviceInventory.updatedStatus')}
            options={DEVICE_STATUS_OPTIONS}
            getOptionLabel={(opt) => t(opt?.text)}
            getOptionValue={(opt) => opt?.id}
            disableClearable
          />
        )
      },
    },
    {
      field: 'remove',
      headerName: t('general:common.action'),
      width: 100,
      align: 'center',
      hide: isDetail,
      sticky: 'right',
      renderCell: (params, index) => {
        return (
          <IconButton
            onClick={() => {
              arrayHelpers.remove(index)
            }}
            size="large"
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]

  return (
    <DataTable
      rows={items || []}
      title={t('deviceInventory.deviceList')}
      columns={columns}
      striped={false}
      hideSetting
      hideFooter
      beforeTopbar={
        !isDetail && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                device: null,
                updatedWarehouse: null,
                updatedArea: null,
                updatedStatus: null,
              })
              scrollToBottom()
            }}
          >
            {t('requestDevice.addButton')}
          </Button>
        )
      }
    />
  )
}

export default ItemSettingTable
