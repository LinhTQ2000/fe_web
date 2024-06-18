import React from 'react'

import { IconButton } from '@mui/material'
import { findLastIndex, uniqBy } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import useTransferTicket from '~/modules/mmsx/redux/hooks/useTransferTicket'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['mmsx'])
  const { scrollToBottom } = useApp()
  const isView = mode === MODAL_MODE.DETAIL
  const {
    data: { transferTicketDetail },
  } = useTransferTicket()

  const convertList = transferTicketDetail?.devices
    ? transferTicketDetail?.devices?.map((item) => ({
        ...item,
        device: {
          ...item?.device,
          warehouse: item?.warehouse,
          area: item?.area,
        },
      }))
    : []

  const getColumns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'deviceGroup',
      headerName: t('requestDevice.form.field.deviceGroup'),
      width: 200,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((item) => item?.deviceGroup?.id)
        return isView ? (
          params.row?.deviceGroup?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].deviceGroup`}
            placeholder={t('requestDevice.form.field.deviceGroup')}
            options={uniqBy(convertList, 'deviceGroup.id')}
            getOptionLabel={(opt) => opt?.deviceGroup?.name}
            getOptionSubLabel={(opt) => opt?.deviceGroup?.code}
            getOptionValue={(opt) => opt?.deviceGroup}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.deviceGroup?.id
            }
            required
          />
        )
      },
    },
    {
      field: 'serial',
      headerName: t('requestDevice.form.field.serial'),
      width: 200,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((item) => item?.device?.id)
        return isView ? (
          params.row?.serial
        ) : (
          <Field.Autocomplete
            name={`items[${index}].device`}
            placeholder={t('requestDevice.form.field.serial')}
            options={convertList}
            getOptionLabel={(opt) => opt?.device?.serial}
            getOptionSubLabel={(opt) =>
              `${opt?.device?.identificationNo} - ${opt?.device?.name}`
            }
            getOptionValue={(opt) => opt?.device}
            isOptionEqualToValue={(opt, val) => opt?.device?.id === val?.id}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.device?.id
            }
          />
        )
      },
    },
    {
      field: 'identificationNo',
      headerName: t('requestDevice.form.field.identificationNo'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.name
        ) : (
          <Field.TextField
            name={`items[${index}].device.identificationNo`}
            placeholder={t('requestDevice.form.field.identificationNo')}
            disabled
          />
        )
      },
    },
    {
      field: 'deviceName',
      headerName: t('requestDevice.form.field.deviceName'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.name
        ) : (
          <Field.TextField
            name={`items[${index}].device.name`}
            placeholder={t('requestDevice.form.field.deviceName')}
            disabled
          />
        )
      },
    },
    {
      field: 'area',
      headerName: t('requestDevice.form.field.area'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.area?.name
        ) : (
          <Field.TextField
            name={`items[${index}].device.area.name`}
            placeholder={t('requestDevice.form.field.area')}
            disabled
          />
        )
      },
    },
    {
      field: 'warehouse',
      headerName: t('requestDevice.form.field.warehouse'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.warehouse?.name
        ) : (
          <Field.TextField
            name={`items[${index}].device.warehouse.name`}
            placeholder={t('requestDevice.form.field.warehouse')}
            disabled
          />
        )
      },
    },
    {
      field: 'remove',
      headerName: t('general:common.action'),
      width: 100,
      align: 'center',
      hide: isView,
      sticky: 'right',
      renderCell: (_, index) => {
        return (
          <IconButton
            type="button"
            onClick={() => {
              arrayHelpers.remove(index)
            }}
            disabled={items?.length === 1}
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]

  return (
    <HotKeys
      handlers={{
        ...(!isView
          ? {
              onAddRow: () => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  deviceGroup: null,
                  device: null,
                })
                scrollToBottom()
              },
              onRemoveRow: () => {
                if (items?.length > 1) arrayHelpers.remove(findLastIndex(items))
              },
            }
          : {}),
      }}
    >
      <DataTable
        rows={items}
        columns={getColumns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
        title={t('requestDevice.deviceList')}
        beforeTopbar={
          !isView && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  deviceGroup: null,
                  device: null,
                })
                scrollToBottom()
              }}
              disabled={items?.length === transferTicketDetail?.devices?.length}
            >
              {t('requestDevice.addButton')}
            </Button>
          )
        }
      />
    </HotKeys>
  )
}

ItemSettingTable.defaultProps = {
  items: [],
  mode: '',
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  mode: PropTypes.string,
}

export default ItemSettingTable
