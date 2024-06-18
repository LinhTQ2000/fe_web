import React from 'react'

import { IconButton } from '@mui/material'
import { findLastIndex } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, TEXTFIELD_ALLOW } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import { ACTIVE_STATUS } from '~/modules/mmsx/constants'
import { searchSupplyGroupApi } from '~/modules/mmsx/redux/sagas/supplies-category/search-supplies-category'
import { searchSuppliesList } from '~/modules/mmsx/redux/sagas/supplies/search-supplies'
import { getInventorySupplyByWarehouseApi } from '~/modules/mmsx/redux/sagas/warehouse-inventory/get-inventory'
import { convertFilterParams } from '~/utils'
import { returnStockQuantity } from '~/utils/measure'

function ItemSettingTable({ items, arrayHelpers, setFieldValue, values }) {
  const { t } = useTranslation(['mmsx'])

  const handleChangeSupply = async (val, index) => {
    if (val?.id && values?.warehouse?.id) {
      const res = await getInventorySupplyByWarehouseApi({
        assetId: val?.id,
        warehouseId: values?.warehouse?.id,
      })
      if (res?.statusCode === 200) {
        setFieldValue(`items[${index}].stockQuantity`, res?.data?.stockQuantity)
        setFieldValue(
          `items[${index}].availableStockQuantity`,
          res?.data?.availableQuantity,
        )
        setFieldValue(
          `items[${index}].minStockQuantity`,
          res?.data?.minStockQuantity,
        )
      }
    }
  }

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
      field: 'supplyGroup',
      headerName: t('suppliesRequest.form.field.supplyGroup'),
      width: 200,
      renderCell: (params, index) => {
        return (
          <Field.Autocomplete
            name={`items[${index}].supplyGroup`}
            placeholder={t('suppliesRequest.form.field.supplyGroup')}
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
            getOptionLabel={(opt) => opt?.code}
            getOptionSubLabel={(opt) => opt?.name}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            onChange={() => setFieldValue(`items[${index}].supply`, null)}
          />
        )
      },
    },
    {
      field: 'supply',
      headerName: t('suppliesRequest.form.field.materialName'),
      width: 200,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((i) => i?.supply?.id)
        return (
          <Field.Autocomplete
            name={`items[${index}].supply`}
            placeholder={t('suppliesRequest.form.field.materialName')}
            asyncRequest={(s) =>
              searchSuppliesList({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  active: ACTIVE_STATUS.ACTIVE,
                  supplyGroupId: params.row?.supplyGroup?.id,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) =>
              `${opt?.nameOther || ''} - ${opt?.code}`
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some(
                (id) =>
                  id === (opt?.id || opt?.itemId) &&
                  opt?.id !== items[index]?.supply?.id,
              )
            }
            onChange={(val) => handleChangeSupply(val, index)}
            asyncRequestDeps={params.row?.supplyGroup}
          />
        )
      },
    },
    {
      field: 'materialName',
      headerName: t('suppliesRequest.form.field.materialCode'),
      width: 200,
      renderCell: (_, index) => {
        return (
          <Field.TextField
            name={`items[${index}].supply.code`}
            placeholder={t('suppliesRequest.form.field.materialCode')}
            disabled
          />
        )
      },
    },
    {
      field: 'vendor',
      headerName: t('warehouseDefine.vendor'),
      width: 200,
      renderCell: (_, index) => {
        return (
          <Field.TextField
            name={`items[${index}].supply.vendor.name`}
            placeholder={t('warehouseDefine.vendor')}
            disabled
          />
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('suppliesRequest.form.field.requireAmount'),
      width: 100,
      renderCell: (_, index) => {
        return (
          <Field.TextField
            name={`items[${index}].quantity`}
            placeholder={t('suppliesRequest.form.field.requireAmount')}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
    {
      field: 'availableStockQuantity',
      headerName: t('suppliesRequest.form.field.availabilityQuantity'),
      width: 100,
      align: 'right',
      renderCell: (params) =>
        returnStockQuantity(params.row?.availableStockQuantity),
    },

    {
      field: 'stockQuantity',
      headerName: t('suppliesRequest.form.field.stockQuantity'),
      width: 100,
      align: 'right',
      renderCell: (params) => returnStockQuantity(params.row?.stockQuantity),
    },
    {
      field: 'minStockQuantity',
      headerName: t('suppliesRequest.form.field.minStockQuantity'),
      width: 100,
      align: 'right',
      renderCell: (params) => returnStockQuantity(params.row?.minStockQuantity),
    },
    {
      field: 'buyQuantity',
      headerName: t('suppliesRequest.form.field.buyQuantity'),
      width: 100,
      align: 'right',
      renderCell: (params) => {
        const { quantity, availableStockQuantity, buyQuantity } = params.row
        return quantity > +availableStockQuantity
          ? returnStockQuantity(
              quantity - returnStockQuantity(availableStockQuantity),
            )
          : returnStockQuantity(buyQuantity)
      },
    },
    {
      field: 'materialUnit',
      headerName: t('suppliesRequest.form.field.materialUnit'),
      width: 150,
      renderCell: (params) => {
        const { supply } = params.row
        return supply?.unit?.name
      },
    },
    {
      field: 'remove',
      headerName: t('general:common.action'),
      width: 100,
      align: 'center',
      sticky: 'right',
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

  return (
    <HotKeys
      handlers={{
        onAddRow: () => {
          arrayHelpers.push({
            id: new Date().getTime(),
            supplyGroup: null,
            supply: null,
            quantity: null,
          })
        },
        onRemoveRow: () => {
          if (items?.length > 1) arrayHelpers.remove(findLastIndex(items))
        },
      }}
    >
      <DataTable
        title={t('suppliesRequest.form.table')}
        rows={items}
        columns={columns}
        striped={false}
        hideSetting
        hideFooter
        beforeTopbar={
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                supplyGroup: null,
                supply: null,
                quantity: null,
              })
            }}
          >
            {t('suppliesRequest.form.addRow')}
          </Button>
        }
      />
    </HotKeys>
  )
}

export default ItemSettingTable
