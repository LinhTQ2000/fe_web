import React from 'react'

import { IconButton } from '@mui/material'
import { uniqBy } from 'lodash'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import {
  ACTIVE_STATUS,
  WAREHOUSE_IMPORT_REQUEST_TYPE,
} from '~/modules/mmsx/constants'
import { searchDeviceListApi } from '~/modules/mmsx/redux/sagas/define-device/search-device-list'
import { getDetailSupplies } from '~/modules/mmsx/redux/sagas/supplies/get-supplies'
import { convertFilterParams, convertWithCommas } from '~/utils'

function ItemSettingTable({
  items,
  mode,
  arrayHelpers,
  values,
  setFieldValue,
  listItem = [],
  deviceGroups = [],
}) {
  const { t } = useTranslation(['mmsx'])
  const { scrollToBottom } = useApp()
  const isView = mode === MODAL_MODE.DETAIL
  const isUpdate = mode === MODAL_MODE.UPDATE

  const handleChangeSupply = async (val, index) => {
    if (val?.id) {
      const res = await getDetailSupplies(val?.id)
      if (res?.statusCode === 200) {
        setFieldValue(`items[${index}].price`, res?.data?.price || null)
      }
    } else {
      setFieldValue(`items[${index}].price`, null)
    }
  }

  const deviceColumns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => index + 1,
    },
    {
      field: 'deviceCategory',
      headerName: t('warehouseImportManagement.form.table.deviceCategory'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          <>{params.row?.deviceGroup?.name}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].deviceGroup`}
            placeholder={t(
              'warehouseImportManagement.form.table.deviceCategory',
            )}
            options={uniqBy(listItem, 'deviceGroup.id')}
            getOptionLabel={(opt) => opt?.name}
            getOptionValue={(opt) => opt?.deviceGroup}
            getOptionDisabled={(opt) => {
              const max = +listItem?.filter(
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
        return isView ? (
          params.row?.serial
        ) : (
          <Field.Autocomplete
            name={`items[${index}].device`}
            placeholder={t('warehouseExportManagement.form.table.serial')}
            options={listItem.filter(
              (item) =>
                item?.deviceGroup?.id === params.row?.deviceGroup?.id &&
                !item?.imported,
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
        return isView ? (
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
        return isView ? (
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
      field: 'color',
      headerName: t('warehouseImportManagement.form.table.color'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.color
        ) : (
          <Field.TextField
            name={`items[${index}].color`}
            placeholder={t('warehouseImportManagement.form.table.color')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
          />
        )
      },
    },
    {
      field: 'size',
      headerName: t('warehouseImportManagement.form.table.size'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.size
        ) : (
          <Field.TextField
            name={`items[${index}].size`}
            placeholder={t('warehouseImportManagement.form.table.size')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
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
      renderCell: (_, index) => {
        return isView ? null : (
          <IconButton
            onClick={() => arrayHelpers.remove(index)}
            disabled={items?.length === 1}
            size="large"
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]

  const deviceBuyColumns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => index + 1,
    },
    {
      field: 'deviceCategory',
      headerName: t('warehouseImportManagement.form.table.deviceCategory'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          <>{params.row?.deviceGroup?.name}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].deviceGroup`}
            placeholder={t(
              'warehouseImportManagement.form.table.deviceCategory',
            )}
            options={deviceGroups}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            onChange={() => setFieldValue(`items[${index}].device`, null)}
            getOptionDisabled={(opt) => {
              const remainQuantity =
                +deviceGroups?.find((item) => item?.id === opt?.id)
                  ?.remainQuantity || 0
              const deviceGroupLength = items.filter(
                (item) => item?.deviceGroup?.id === opt?.id,
              ).length
              return deviceGroupLength === remainQuantity
            }}
            {...(isUpdate
              ? {
                  isOptionEqualToValue: (opt, val) => opt?.id === val?.id,
                }
              : {})}
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
        return isView ? (
          params.row?.serial
        ) : (
          <Field.Autocomplete
            name={`items[${index}].device`}
            placeholder={t('warehouseExportManagement.form.table.serial')}
            asyncRequest={(s) =>
              searchDeviceListApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  active: ACTIVE_STATUS.ACTIVE,
                  deviceGroupId: params.row?.deviceGroup?.id,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionLabel={(opt) => opt?.serial}
            asyncRequestDeps={params.row?.deviceGroup}
            getOptionSubLabel={(opt) =>
              `${opt?.identificationNo} - ${opt?.name}`
            }
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
      field: 'deviceName',
      headerName: t('warehouseExportManagement.form.table.deviceName'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
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
        return isView ? (
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
      field: 'color',
      headerName: t('warehouseImportManagement.form.table.color'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.color
        ) : (
          <Field.TextField
            name={`items[${index}].color`}
            placeholder={t('warehouseImportManagement.form.table.color')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
          />
        )
      },
    },
    {
      field: 'size',
      headerName: t('warehouseImportManagement.form.table.size'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.size
        ) : (
          <Field.TextField
            name={`items[${index}].size`}
            placeholder={t('warehouseImportManagement.form.table.size')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
          />
        )
      },
    },
    {
      field: 'price',
      headerName: t('warehouseImportManagement.form.table.price'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          convertWithCommas(params.row?.price)
        ) : (
          <Field.TextField
            name={`items[${index}].price`}
            placeholder={t('warehouseImportManagement.form.table.price')}
            type="number"
            numberProps={{
              decimalScale: 3,
              thousandSeparator: true,
            }}
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
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
      renderCell: (params) => {
        const idx = items.findIndex((item) => item.id === params.row.id)
        return isView ? null : (
          <IconButton
            onClick={() => arrayHelpers.remove(idx)}
            disabled={items?.length === 1}
            size="large"
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]

  const supplyColumns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => index + 1,
    },
    {
      field: 'supplyGroup',
      headerName: t('warehouseExportManagement.form.table.supplyGroup'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.supplyGroup?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].supplyGroup`}
            placeholder={t('warehouseExportManagement.form.table.supplyGroup')}
            options={uniqBy(listItem, 'supplyGroup.id')}
            getOptionLabel={(opt) => opt?.supplyGroup?.name}
            getOptionValue={(opt) => opt?.supplyGroup}
            onChange={() => {
              setFieldValue(`items[${index}].supply`, null)
            }}
            getOptionDisabled={(opt) => {
              const max = +listItem?.filter(
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
        return isView ? (
          params.row?.supplyType?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].supplyType`}
            placeholder={t('suppliesInventory.suppliesType')}
            options={uniqBy(listItem, 'supplyType.id')}
            getOptionLabel={(opt) => opt?.supplyType?.name}
            getOptionValue={(opt) => opt?.supplyType}
            onChange={() => {
              setFieldValue(`items[${index}].supply`, null)
            }}
            getOptionDisabled={(opt) => {
              const max = +listItem?.filter(
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
        return isView ? (
          params.row?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].supply`}
            placeholder={t('warehouseExportManagement.form.table.supplyName')}
            options={listItem.filter(
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
            getOptionValue={(opt) => opt?.supply}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.supply?.id) &&
              opt?.supply?.id !== items[index]?.supply?.id
            }
            onChange={(val) => handleChangeSupply(val, index)}
            {...(isUpdate
              ? {
                  isOptionEqualToValue: (opt, val) =>
                    opt?.supply?.id === val?.id,
                }
              : {})}
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
        return isView ? (
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
      field: 'color',
      headerName: t('warehouseImportManagement.form.table.color'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.color
        ) : (
          <Field.TextField
            name={`items[${index}].color`}
            placeholder={t('warehouseImportManagement.form.table.color')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
          />
        )
      },
    },
    {
      field: 'size',
      headerName: t('warehouseImportManagement.form.table.size'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.size
        ) : (
          <Field.TextField
            name={`items[${index}].size`}
            placeholder={t('warehouseImportManagement.form.table.size')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
          />
        )
      },
    },
    {
      field: 'vendor',
      headerName: t('warehouseExportManagement.form.table.vendor'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
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
      field: 'importQuantity',
      headerName: t('warehouseImportManagement.importQuantity'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.requestQuantity || 0
        ) : (
          <Field.TextField
            name={`items[${index}].supply.importQuantity`}
            placeholder={t('warehouseImportManagement.importQuantity')}
            type="number"
            disabled
          />
        )
      },
    },
    {
      field: 'remainQuantity',
      headerName: t('warehouseImportManagement.remainQuantity'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.requestQuantity - params.row?.importedQuantity || 0
        ) : (
          <Field.TextField
            name={`items[${index}].supply.remainQuantity`}
            placeholder={t('warehouseImportManagement.remainQuantity')}
            type="number"
            disabled
          />
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('warehouseImportManagement.quantity'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.importQuantity || 0
        ) : (
          <Field.TextField
            name={`items[${index}].quantity`}
            placeholder={t('warehouseImportManagement.quantity')}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
            onChange={(val) => {
              setFieldValue(
                `items[${index}].intoMoney`,
                val * params.row?.price || 0,
              )
            }}
          />
        )
      },
    },
    {
      field: 'unit',
      headerName: t('warehouseExportManagement.form.table.unit'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
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
      field: 'price',
      headerName: t('warehouseImportManagement.form.table.price'),
      width: 200,
      hide:
        values?.requestType ===
        WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST,
      renderCell: (params, index) => {
        return isView ? (
          convertWithCommas(params.row?.price)
        ) : (
          <Field.TextField
            name={`items[${index}].price`}
            placeholder={t('warehouseImportManagement.form.table.price')}
            type="number"
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
            numberProps={{
              decimalScale: 3,
              thousandSeparator: true,
            }}
            onChange={(val) => {
              setFieldValue(
                `items[${index}].intoMoney`,
                val * params.row?.quantity || 0,
              )
            }}
          />
        )
      },
    },
    {
      field: 'intoMoney',
      headerName: t('warehouseImportManagement.form.table.intoMoney'),
      width: 200,
      hide:
        values?.requestType ===
        WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST,
      renderCell: (params, index) => {
        return isView ? (
          convertWithCommas(params.row?.intoMoney)
        ) : (
          <Field.TextField
            name={`items[${index}].intoMoney`}
            placeholder={t('warehouseImportManagement.form.table.intoMoney')}
            type="number"
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
            numberProps={{
              decimalScale: 3,
              thousandSeparator: true,
            }}
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
      renderCell: (params, idx) => {
        return (
          <IconButton
            onClick={() => arrayHelpers.remove(idx)}
            disabled={items?.length === 1}
            size="large"
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]

  const renderColumns = () => {
    switch (values?.requestType) {
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
        return deviceColumns
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST:
        return supplyColumns
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST:
        return deviceBuyColumns
      default:
        return deviceColumns
    }
  }

  const renderTitle = () => {
    switch (values?.requestType) {
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST:
        return t('warehouseImportManagement.form.table.title')
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
        return t('warehouseImportRequest.supplyTitle')
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST:
        return t('warehouseImportRequest.supplyTitleBuy')
      default:
        return t('warehouseImportManagement.form.table.title')
    }
  }

  const renderButton = () => {
    switch (values?.requestType) {
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
        return t('warehouseDefine.add')
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST:
        return t('warehouseImportManagement.form.table.addSupply')
      default:
        return
    }
  }

  return (
    <DataTable
      title={renderTitle()}
      rows={!values?.requestType && values?.requestType !== 0 ? [] : items}
      columns={renderColumns()}
      striped={false}
      hideSetting
      hideFooter
      beforeTopbar={
        !isView &&
        Boolean(values?.requestType || values?.requestType === 0) && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                deviceGroup: null,
                device: null,
                color: '',
                size: '',
                price: null,
                supplyGroup: null,
                supplyType: null,
                supply: null,
                quantity: null,
                intoMoney: null,
              })
              scrollToBottom()
            }}
          >
            {renderButton()}
          </Button>
        )
      }
    />
  )
}

export default ItemSettingTable
