import React from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { ASSET_MAINTENANCE_TYPE } from '~/modules/mmsx/constants'
import { searchSupplyGroupApi } from '~/modules/mmsx/redux/sagas/supplies-category/search-supplies-category'
import { SearchSupplyTypeApi } from '~/modules/mmsx/redux/sagas/supply-type/search-supply-type'
import { searchWarehouseDefineApi } from '~/modules/mmsx/redux/sagas/warehouse-define/search'
import { searchWarehouseInventoryApi } from '~/modules/mmsx/redux/sagas/warehouse-inventory/search'
import { convertFilterParams } from '~/utils'

function ItemSettingTable({
  items,
  mode,
  values,
  setFieldValue,
  arrayHelpers,
}) {
  const { t } = useTranslation(['mmsx'])
  const { scrollToBottom } = useApp()
  const isDetail = mode === MODAL_MODE.DETAIL
  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      renderCell: (_, index) => index + 1,
    },
    {
      field: 'warehouse',
      headerName: t('suppliesInventory.warehouse'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.warehouse?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].warehouse`}
            placeholder={t('suppliesInventory.warehouse')}
            asyncRequest={(s) =>
              searchWarehouseDefineApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  factoryId: values?.factory?.id,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            asyncRequestDeps={values?.factory?.id}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            onChange={() => setFieldValue(`items[${index}].supply`, null)}
          />
        )
      },
    },
    {
      field: 'suppliesGroup',
      headerName: t('suppliesInventory.suppliesGroup'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.supplyGroup?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].supplyGroup`}
            placeholder={t('suppliesInventory.suppliesGroup')}
            asyncRequest={(s) =>
              searchSupplyGroupApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            onChange={() => {
              setFieldValue(`items[${index}].supplyType`, null)
              setFieldValue(`items[${index}].supply`, null)
            }}
          />
        )
      },
    },
    {
      field: 'suppliesType',
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
                filter: convertFilterParams({
                  supplyGroupId: params.row?.supplyGroup?.id,
                }),
              })
            }
            asyncRequestDeps={params.row?.supplyGroup}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            onChange={() => setFieldValue(`items[${index}].supply`, null)}
          />
        )
      },
    },
    {
      field: 'suppliesName',
      headerName: t('suppliesInventory.suppliesName'),
      width: 200,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((i) => i?.supply?.assetId)
        return isDetail ? (
          params.row?.supply?.assetName
        ) : (
          <Field.Autocomplete
            name={`items[${index}].supply`}
            placeholder={t('suppliesInventory.suppliesName')}
            asyncRequest={(s) =>
              searchWarehouseInventoryApi({
                type: ASSET_MAINTENANCE_TYPE.SUPPLY,
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  supplyGroupId: params.row?.supplyGroup?.id,
                  supplyTypeId: params.row?.supplyType?.id,
                  factoryId: values?.factory?.id,
                  warehouseId: params.row?.warehouse?.id,
                }),
                isGetAllFactory: 1,
              })
            }
            asyncRequestDeps={[
              params.row?.supplyGroup?.id,
              params.row?.supplyType?.id,
              values?.factory?.id,
              params.row?.warehouse?.id,
            ]}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.assetName}
            getOptionSubLabel={(opt) => opt?.assetCode}
            isOptionEqualToValue={(opt, val) => opt?.assetId === val?.assetId}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some(
                (id) =>
                  id === opt?.assetId &&
                  opt?.assetId !== items[index]?.supply?.assetId,
              )
            }
          />
        )
      },
    },
    {
      field: 'vendor',
      headerName: t('suppliesInventory.vendor'),
      width: 200,
      renderCell: (params) => params.row?.supply?.vendor?.name,
    },
    {
      field: 'quantity',
      headerName: t('suppliesInventory.quantity'),
      width: 200,
      renderCell: (params) => params.row?.supply?.stockQuantity,
    },
    {
      field: 'updatedQuantity',
      headerName: t('suppliesInventory.updatedQuantity'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          <>{+params.row?.updatedQuantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].updatedQuantity`}
            placeholder={t('suppliesInventory.updatedQuantity')}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
    {
      field: 'unit',
      headerName: t('suppliesInventory.unit'),
      width: 200,
      renderCell: (params) => params.row?.supply?.unit?.name,
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
      title={t('suppliesInventory.suppliesList')}
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
                id: new Date().getDate(),
                supplyGroup: null,
                supplyType: null,
                supply: null,
                updatedQuantity: null,
                warehouse: null,
              })
              scrollToBottom()
            }}
          >
            {t('warehouseExportManagement.form.table.addSupply')}
          </Button>
        )
      }
    />
  )
}

export default ItemSettingTable
