import React from 'react'

import { IconButton } from '@mui/material'
import { uniqBy } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_ALLOW } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import {
  REQUEST_TYPE_EXPORT,
  SUPPLY_REQUEST_TYPE_ENUM,
  WAREHOUSE_EXPORT_REQUEST_TYPE,
} from '~/modules/mmsx/constants'
import { getInventorySupplyByWarehouseApi } from '~/modules/mmsx/redux/sagas/warehouse-inventory/get-inventory'

function ItemSettingTable({
  items,
  mode,
  arrayHelpers,
  values,
  defaultList,
  setFieldValue,
}) {
  const { t } = useTranslation(['mmsx'])
  const isDetail = mode === MODAL_MODE.DETAIL
  const isUpdate = mode === MODAL_MODE.UPDATE

  const handleChangeSupply = async (val, index) => {
    if (val?.id) {
      const res = await getInventorySupplyByWarehouseApi({
        assetId: val?.id,
        warehouseId: values?.supplyRequest?.warehouse?.id,
        supplyRequestId: values?.supplyRequest?.id,
        type: SUPPLY_REQUEST_TYPE_ENUM.PROVIDE,
      })
      const remainQuantity =
        +val?.quantity - (+res?.data?.exportPlannedQuantity || 0)
      setFieldValue(`items[${index}].remainQuantity`, remainQuantity)
      setFieldValue(`items[${index}].requestQuantity`, +val?.quantity)
    } else {
      setFieldValue(`items[${index}].remainQuantity`, null)
      setFieldValue(`items[${index}].requestQuantity`, null)
    }
  }

  const supplyColumns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'supplyGroup',
      headerName: t('warehouseExportManagement.form.table.supplyGroup'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.supplyGroup?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].supplyGroup`}
            placeholder={t('warehouseExportManagement.form.table.supplyGroup')}
            options={uniqBy(defaultList, 'supplyGroup.id')}
            getOptionLabel={(opt) => opt?.supplyGroup?.name}
            getOptionValue={(opt) => opt?.supplyGroup}
            onChange={() => {
              setFieldValue(`items[${index}].supply`, null)
            }}
            getOptionDisabled={(opt) => {
              const max = +defaultList?.filter(
                (item) => item?.supplyGroup?.id === opt?.supplyGroup?.id,
              )?.length
              const curr = +items?.filter(
                (item) => item?.supplyGroup?.id === opt?.supplyGroup?.id,
              )?.length
              return curr >= max
            }}
          />
        )
      },
    },
    {
      field: 'supplyType',
      headerName: t('suppliesInventory.suppliesType'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.supplyType?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].supplyType`}
            placeholder={t('suppliesInventory.suppliesType')}
            options={uniqBy(defaultList, 'supplyType.id')}
            getOptionLabel={(opt) => opt?.supplyType?.name}
            getOptionValue={(opt) => opt?.supplyType}
            onChange={() => {
              setFieldValue(`items[${index}].supply`, null)
            }}
            getOptionDisabled={(opt) => {
              const max = +defaultList?.filter(
                (item) => item?.supplyType?.id === opt?.supplyType?.id,
              )?.length
              const curr = +items?.filter(
                (item) => item?.supplyType?.id === opt?.supplyType?.id,
              )?.length
              return curr >= max
            }}
          />
        )
      },
    },
    {
      field: 'supplyCode',
      headerName: t('warehouseExportManagement.form.table.supplyName'),
      width: 200,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((item) => item?.supply?.id)
        return isDetail ? (
          params.row?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].supply`}
            placeholder={t('warehouseExportManagement.form.table.supplyName')}
            options={defaultList.filter(
              (item) =>
                item?.supplyGroup?.id === params.row?.supplyGroup?.id &&
                item?.supplyType?.id === params.row?.supplyType?.id,
            )}
            getOptionLabel={(opt) => opt?.name || opt?.supply?.name}
            getOptionSubLabel={(opt) =>
              `${opt?.nameOther || opt?.supply?.nameOther || ''} - ${
                opt?.code || opt?.supply?.code
              }`
            }
            getOptionValue={(opt) => opt?.supply || opt}
            {...(isUpdate
              ? {
                  isOptionEqualToValue: (opt, val) =>
                    opt?.supply?.id === val?.id,
                }
              : {})}
            onChange={(val) => handleChangeSupply(val, index)}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.supply?.id) &&
              opt?.supply?.id !== items[index]?.supply?.id
            }
            disabled={
              !params.row?.supplyGroup?.id || !params.row?.supplyType?.id
            }
          />
        )
      },
    },
    {
      field: 'supplyName',
      headerName: t('warehouseExportManagement.form.table.supplyCode'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.code
        ) : (
          <Field.TextField
            name={`items[${index}].supply.code`}
            placeholder={t('warehouseExportManagement.form.table.supplyCode')}
            disabled
          />
        )
      },
    },
    {
      field: 'vendor',
      headerName: t('warehouseExportManagement.form.table.vendor'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.vendor?.name
        ) : (
          <Field.TextField
            name={`items[${index}].supply.vendor.name`}
            placeholder={t('warehouseExportManagement.form.table.vendor')}
            disabled
          />
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('warehouseExportManagement.form.table.exportQuantity'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.exportQuantity || 0
        ) : (
          <Field.TextField
            name={`items[${index}].quantity`}
            placeholder={t(
              'warehouseExportManagement.form.table.exportQuantity',
            )}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
    {
      field: 'requestQuantity',
      headerName: t('warehouseExportManagement.form.table.requestQuantity'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.requestQuantity || 0
        ) : (
          <Field.TextField
            name={`items[${index}].requestQuantity`}
            placeholder={t(
              'warehouseExportManagement.form.table.requestQuantity',
            )}
            type="number"
            disabled
          />
        )
      },
    },
    {
      field: 'remainQuantity',
      headerName: t('warehouseExportManagement.form.table.remainQuantity'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.requestQuantity - params.row?.exportPlannedQuantity || 0
        ) : (
          <Field.TextField
            name={`items[${index}].remainQuantity`}
            placeholder={t(
              'warehouseExportManagement.form.table.remainQuantity',
            )}
            type="number"
            disabled
          />
        )
      },
    },
    {
      field: 'unit',
      headerName: t('warehouseExportManagement.form.table.unit'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.unit?.name
        ) : (
          <Field.TextField
            name={`items[${index}].supply.unit.name`}
            placeholder={t('warehouseExportManagement.form.table.unit')}
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
      hide: isDetail,
      renderCell: (params, idx) => {
        return (
          <IconButton
            onClick={() => arrayHelpers.remove(idx)}
            size="large"
            disabled={items.length === 1}
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]

  const deviceRequestColumn = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'deviceCategory',
      headerName: t('warehouseExportManagement.form.table.deviceCategory'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.deviceGroup?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].deviceGroup`}
            placeholder={t(
              'warehouseExportManagement.form.table.deviceCategory',
            )}
            options={uniqBy(defaultList, 'deviceGroup.id')}
            getOptionLabel={(opt) => opt?.deviceGroup?.name}
            getOptionValue={(opt) => opt?.deviceGroup}
            onChange={() => {
              setFieldValue(`items[${index}].device`, null)
            }}
            getOptionDisabled={(opt) => {
              const max = +defaultList?.filter(
                (item) => item?.deviceGroup?.id === opt?.deviceGroup?.id,
              )?.length
              const curr = +items?.filter(
                (item) => item?.deviceGroup?.id === opt?.deviceGroup?.id,
              )?.length
              return curr >= max
            }}
          />
        )
      },
    },
    {
      field: 'serial',
      headerName: t('warehouseExportManagement.form.table.serial'),
      width: 200,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((item) => item?.device?.id)
        return isDetail ? (
          params.row?.serial
        ) : (
          <Field.Autocomplete
            name={`items[${index}].device`}
            placeholder={t('warehouseExportManagement.form.table.serial')}
            options={defaultList.filter(
              (item) =>
                item?.deviceGroup?.id === params.row?.deviceGroup?.id &&
                !item?.exportPlanned,
            )}
            getOptionLabel={(opt) => opt?.device?.serial}
            getOptionSubLabel={(opt) =>
              `${opt?.device?.identificationNo} - ${opt?.device?.name}`
            }
            getOptionValue={(opt) => opt?.device}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.device?.id) &&
              opt?.device?.id !== items[index]?.device?.id
            }
            {...(isUpdate
              ? {
                  isOptionEqualToValue: (opt, val) =>
                    opt?.device?.id === val?.id,
                }
              : {})}
            disabled={!params.row?.deviceGroup?.id}
          />
        )
      },
    },
    {
      field: 'deviceName',
      headerName: t('warehouseExportManagement.form.table.deviceName'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.name
        ) : (
          <Field.TextField
            name={`items[${index}].device.name`}
            placeholder={t('warehouseExportManagement.form.table.deviceName')}
            disabled
          />
        )
      },
    },
    {
      field: 'identificationNo',
      headerName: t('warehouseExportManagement.form.table.identificationNo'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.identificationNo
        ) : (
          <Field.TextField
            name={`items[${index}].device.identificationNo`}
            placeholder={t(
              'warehouseExportManagement.form.table.identificationNo',
            )}
            disabled
          />
        )
      },
    },
    {
      field: 'exportWarehouse',
      headerName: t('requestDevice.form.field.warehouse'),
      width: 200,
      hide:
        values?.requestType === WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.area?.name
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
      field: 'warehouse',
      headerName: t('transferRequest.form.field.transferWarehouse'),
      width: 200,
      hide:
        values?.requestType ===
          WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST ||
        !Boolean(values?.requestType || values?.requestType === 0),
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.warehouse?.name
        ) : (
          <Field.TextField
            name={`items[${index}].device.warehouse.name`}
            placeholder={t('transferRequest.form.field.transferWarehouse')}
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
      hide: isDetail,
      renderCell: (params, idx) => {
        return (
          <IconButton
            onClick={() => arrayHelpers.remove(idx)}
            size="large"
            disabled={items.length === 1}
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]

  const renderColumns = () => {
    switch (values?.requestType) {
      case WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
      case WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET:
        return deviceRequestColumn
      case WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST:
        return supplyColumns
      default:
        return deviceRequestColumn
    }
  }

  const renderTitle = () => {
    if (values?.requestType === REQUEST_TYPE_EXPORT.PROVIDE_SUPPLY_REQUEST) {
      return t('warehouseExportManagement.form.table.addSupply')
    }
    return t('warehouseExportManagement.form.table.addDevice')
  }

  return (
    <>
      <DataTable
        title={t('warehouseExportManagement.form.table.title')}
        rows={!values?.requestType && values?.requestType !== 0 ? [] : items}
        columns={renderColumns()}
        striped={false}
        hideSetting
        hideFooter
        beforeTopbar={
          !isDetail &&
          Boolean(values?.requestType || values?.requestType === 0) && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  supplyGroup: null,
                  supplyType: null,
                  supply: null,
                  quantity: null,
                  remainQuantity: null,
                  deviceGroup: null,
                  device: null,
                })
              }}
            >
              {renderTitle()}
            </Button>
          )
        }
      />
    </>
  )
}

export default ItemSettingTable
