import { IconButton } from '@mui/material'
import { uniqBy } from 'lodash'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import {
  ACTIVE_STATUS,
  SUPPLY_REQUEST_TYPE_ENUM,
  WAREHOUSE_IMPORT_REQUEST_TYPE,
} from '~/modules/mmsx/constants'
import { searchDeviceGroupApi } from '~/modules/mmsx/redux/sagas/device-group/search'
import { searchSupplyGroupApi } from '~/modules/mmsx/redux/sagas/supplies-category/search-supplies-category'
import { searchSuppliesList } from '~/modules/mmsx/redux/sagas/supplies/search-supplies'
import { SearchSupplyTypeApi } from '~/modules/mmsx/redux/sagas/supply-type/search-supply-type'
import { getInventorySupplyByWarehouseApi } from '~/modules/mmsx/redux/sagas/warehouse-inventory/get-inventory'
import { convertFilterParams } from '~/utils'

function ItemSettingTable(props) {
  const {
    items = [],
    mode,
    arrayHelpers,
    values,
    requestType,
    defaultList = [],
    setFieldValue,
  } = props
  const { t } = useTranslation(['mmsx'])
  const isDetail = mode === MODAL_MODE.DETAIL
  const isUpdate = mode === MODAL_MODE.UPDATE

  const handleChangeSupply = async (val, index) => {
    if (val?.id && values?.warehouse?.id) {
      const res = await getInventorySupplyByWarehouseApi({
        assetId: val?.id,
        warehouseId: values?.warehouse?.id,
        supplyRequestId: values?.supplyRequest?.id,
        type: SUPPLY_REQUEST_TYPE_ENUM.RETURN,
      })
      const remainQuantity =
        +val?.quantity - (+res?.data?.importPlannedQuantity || 0)
      setFieldValue(`items[${index}].remainQuantity`, remainQuantity)
    } else {
      setFieldValue(`items[${index}].remainQuantity`, null)
    }
  }

  const deviceColumn = [
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
                !item?.importPlanned &&
                (requestType !==
                  WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET ||
                  item.exported),
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
      field: 'warehouse',
      headerName: t('warehouseImportRequest.transferWarehouse'),
      width: 200,
      hide:
        values?.requestType ===
        WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.exportWarehouse?.name
        ) : (
          <Field.TextField
            name={`items[${index}].device.warehouse.name`}
            placeholder={t('warehouseImportRequest.transferWarehouse')}
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

  const deviceBuyColumn = [
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
          params.row?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].deviceGroup`}
            placeholder={t(
              'warehouseExportManagement.form.table.deviceCategory',
            )}
            asyncRequest={(s) =>
              searchDeviceGroupApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  active: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionLabel={(opt) => opt?.name}
          />
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('warehouseImportRequest.quantityImport'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.quantity || 0
        ) : (
          <Field.TextField
            name={`items[${index}].quantity`}
            placeholder={t('warehouseImportRequest.quantityImport')}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
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

  const supplyColumn = [
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
      headerTooltip: t('warehouseImportRequest.validSupply'),
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
      field: 'requestQuantity',
      headerName: t('warehouseExportManagement.form.table.requestQuantity'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.requestQuantity || 0
        ) : (
          <Field.TextField
            name={`items[${index}].supply.quantity`}
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
      field: 'quantity',
      headerName: t('warehouseImportRequest.quantityImport'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.importQuantity || 0
        ) : (
          <Field.TextField
            name={`items[${index}].quantity`}
            placeholder={t('warehouseImportRequest.quantityImport')}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
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
          params.row?.requestQuantity - params.row?.importPlannedQuantity || 0
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

  const supplyBuyColumn = [
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
            asyncRequest={(s) =>
              searchSupplyGroupApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  active: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionLabel={(opt) => opt?.name}
            onChange={() => {
              setFieldValue(`items[${index}].supply`, null)
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
            asyncRequest={(s) =>
              SearchSupplyTypeApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionLabel={(opt) => opt?.name}
            onChange={() => {
              setFieldValue(`items[${index}].supply`, null)
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
            asyncRequest={(s) =>
              searchSuppliesList({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  active: ACTIVE_STATUS.ACTIVE,
                  supplyTypeId: params.row?.supplyType?.id,
                  supplyGroupId: params.row?.supplyGroup?.id,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) =>
              `${opt?.nameOther || ''} - ${opt?.code}`
            }
            asyncRequestDeps={[
              params.row?.supplyType?.id,
              params.row?.supplyGroup?.id,
            ]}
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
      field: 'quantity',
      headerName: t('warehouseImportRequest.quantityImport'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.importQuantity || 0
        ) : (
          <Field.TextField
            name={`items[${index}].quantity`}
            placeholder={t('warehouseImportRequest.quantityImport')}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
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

  const renderColumn = () => {
    switch (values?.requestType) {
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
        return deviceColumn
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
        return supplyColumn
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST:
        return deviceBuyColumn
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST:
        return supplyBuyColumn
      default:
        return deviceColumn
    }
  }

  const renderTitle = () => {
    switch (values?.requestType) {
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
      case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
        return t('warehouseImportManagement.form.table.title')
      case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
        return t('warehouseImportRequest.supplyTitle')
      case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST:
        return t('warehouseImportRequest.deviceTitleBuy')
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
      columns={renderColumn()}
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
                deviceGroup: null,
                device: null,
                quantity: null,
                supplyGroup: null,
                supplyType: null,
                supply: null,
                remainQuantity: null,
              })
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
