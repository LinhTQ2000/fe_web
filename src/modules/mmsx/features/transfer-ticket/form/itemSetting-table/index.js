import React from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { ACTIVE_STATUS } from '~/modules/mmsx/constants'
import { searchDeviceListApi } from '~/modules/mmsx/redux/sagas/define-device/search-device-list'
import { convertFilterParams } from '~/utils'

function ItemSettingTable({
  items = [],
  mode,
  arrayHelpers,
  setFieldValue,
  listDeviceGroup = [],
  values,
  deviceGroupTransfers,
}) {
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
      field: 'deviceGroup',
      headerName: t('transferTicket.form.field.deviceGroup'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.deviceGroup?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].deviceGroup`}
            placeholder={t('transferTicket.form.field.deviceGroup')}
            options={listDeviceGroup}
            getOptionLabel={(opt) => opt?.deviceGroup?.name}
            getOptionValue={(opt) => opt?.deviceGroup}
            onChange={() => setFieldValue(`items[${index}].device`, null)}
            getOptionDisabled={(opt) => {
              const remainQuantity =
                +deviceGroupTransfers?.find(
                  (item) => item?.deviceGroup?.id === opt?.deviceGroup?.id,
                )?.remainQuantity || 0
              const deviceGroupLength = items.filter(
                (item) => item?.deviceGroup?.id === opt?.deviceGroup?.id,
              ).length
              return deviceGroupLength === remainQuantity
            }}
          />
        )
      },
    },
    {
      field: 'serial',
      headerName: t('transferTicket.form.field.serial'),
      width: 200,
      renderCell: (params, index) => {
        const { deviceGroup } = params.row
        const itemIdCodeList = items.map((item) => item?.device?.id)
        return isDetail ? (
          params.row?.device?.serial
        ) : (
          <Field.Autocomplete
            name={`items[${index}].device`}
            placeholder={t('transferTicket.form.field.serial')}
            asyncRequest={(s) =>
              searchDeviceListApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  deviceGroupId: deviceGroup?.id,
                  active: ACTIVE_STATUS.ACTIVE,
                  factoryId: values?.fromFactory?.id,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.serial}
            getOptionSubLabel={(opt) =>
              `${opt?.identificationNo} - ${opt?.name}`
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestDeps={[deviceGroup?.id, values?.fromFactory?.id]}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.device?.id
            }
            disabled={!params.row?.deviceGroup?.id}
          />
        )
      },
    },
    {
      field: 'warehouse',
      headerName: t('transferTicket.form.field.transferWarehouse'),
      width: 200,
      renderCell: (params) => {
        return (
          params.row?.device?.warehouse?.name || params.row?.warehouse?.name
        )
      },
    },
    {
      field: 'identificationNo',
      headerName: t('transferTicket.form.field.identificationNo'),
      width: 200,
      renderCell: (params) => {
        return params.row?.device?.identificationNo
      },
    },
    {
      field: 'deviceName',
      headerName: t('transferTicket.form.field.deviceName'),
      width: 200,
      renderCell: (params) => {
        return params.row?.device?.name
      },
    },
    {
      field: 'remove',
      headerName: t('general:common.action'),
      width: 100,
      align: 'center',
      hide: isDetail,
      sticky: 'right',
      renderCell: (_, index) => {
        return (
          <IconButton
            onClick={() => {
              arrayHelpers.remove(index)
            }}
            size="large"
            disabled={items?.length === 1}
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]

  return (
    <DataTable
      title={t('transferTicket.form.table')}
      rows={items}
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
                deviceGroup: null,
                warehouse: null,
                serial: null,
              })
              scrollToBottom()
            }}
          >
            {t('transferTicket.add')}
          </Button>
        )
      }
    />
  )
}

export default ItemSettingTable
