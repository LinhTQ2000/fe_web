import React from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { findLastIndex } from 'lodash'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import { ACTIVE_STATUS } from '~/modules/mmsx/constants'
import { searchSupplyGroupApi } from '~/modules/mmsx/redux/sagas/supplies-category/search-supplies-category'
import { searchSuppliesList } from '~/modules/mmsx/redux/sagas/supplies/search-supplies'
import { getInventoryApi } from '~/modules/mmsx/redux/sagas/warehouse-inventory/get-inventory'
import { convertFilterParams, convertWithCommas } from '~/utils'
import { returnStockQuantity } from '~/utils/measure'

function ItemSettingTable({
  items,
  arrayHelpers,
  mode,
  setFieldValue,
  values,
}) {
  const { t } = useTranslation(['mmsx'])
  const isDetail = mode === MODAL_MODE.DETAIL

  const handleChangeSupply = async (val, index) => {
    setFieldValue(`items[${index}].price`, val?.price)
    if (values?.factory?.id && val?.id) {
      const res = await getInventoryApi({
        assetId: val?.id,
        factoryId: values?.factory?.id,
      })
      if (res?.statusCode === 200) {
        setFieldValue(
          `items[${index}].supply.stockQuantity`,
          res?.data?.stockQuantityInFactory || 0,
        )
        setFieldValue(
          `items[${index}].supply.minStockQuantity`,
          res?.data?.minStockQuantity || 0,
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
      field: 'materialGroup',
      headerName: t('contingencyPlan.form.field.materialGroup'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.supplyGroup?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].supplyGroup`}
            placeholder={t('contingencyPlan.form.field.materialGroup')}
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
            getOptionSubLabel={(opt) => opt?.code}
            onChange={() => setFieldValue(`items[${index}].supply`, null)}
            required
          />
        )
      },
    },
    {
      field: 'materialCode',
      headerName: t('contingencyPlan.form.field.materialName'),
      headerTooltip: t('contingencyPlan.guideSupply'),
      width: 200,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((item) => item?.supply?.id)
        return isDetail ? (
          params.row?.supply?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].supply`}
            placeholder={t('contingencyPlan.form.field.materialName')}
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
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) =>
              `${opt?.nameOther || ''} - ${opt?.code}`
            }
            asyncRequestDeps={params.row?.supplyGroup}
            disabled={!params.row?.supplyGroup?.id || !values?.factory?.id}
            onChange={(val) => handleChangeSupply(val, index)}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.supply?.id
            }
            required
          />
        )
      },
    },
    {
      field: 'materialName',
      headerName: t('contingencyPlan.form.field.materialCode'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.supply?.code
        ) : (
          <Field.TextField
            name={`items[${index}].supply.code`}
            placeholder={t('contingencyPlan.form.field.materialCode')}
            disabled
          />
        )
      },
    },
    {
      field: 'supplyType',
      headerName: t('contingencyPlan.form.field.vendor'),
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.vendor?.name
        ) : (
          <Field.TextField
            name={`items[${index}].supply.vendor.name`}
            placeholder={t('contingencyPlan.form.field.vendor')}
            disabled
          />
        )
      },
    },
    {
      field: 'proposalQuantity',
      headerName: t('contingencyPlan.form.field.proposalQuantity'),
      width: 100,
      renderCell: (params, index) => {
        return isDetail ? (
          params?.row?.proposalQuantity || 0
        ) : (
          <Field.TextField
            name={`items[${index}].proposalQuantity`}
            placeholder={t('contingencyPlan.form.field.proposalQuantity')}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
    {
      field: 'stockQuantity',
      headerName: t('contingencyPlan.form.field.stockQuantity'),
      width: 100,
      renderCell: (params, index) => {
        return isDetail ? (
          params?.row?.stockQuantity || 0
        ) : (
          <Field.TextField
            name={`items[${index}].supply.stockQuantity`}
            placeholder={t('contingencyPlan.form.field.stockQuantity')}
            disabled
          />
        )
      },
    },
    {
      field: 'minStockQuantity',
      headerName: t('contingencyPlan.form.field.minStockQuantity'),
      width: 100,
      renderCell: (params, index) => {
        return isDetail ? (
          params?.row?.minStockQuantity || 0
        ) : (
          <Field.TextField
            name={`items[${index}].supply.minStockQuantity`}
            placeholder={t('contingencyPlan.form.field.minStockQuantity')}
            disabled
          />
        )
      },
    },
    {
      field: 'buyQuantity',
      headerName: t('contingencyPlan.form.field.buyQuantity'),
      width: 100,
      renderCell: (params, index) => {
        const value =
          returnStockQuantity(
            +params?.row?.proposalQuantity -
              +params?.row?.supply?.stockQuantity,
          ) || 0
        return isDetail ? (
          value
        ) : (
          <Field.TextField
            name={`items[${index}].buyQuantity`}
            placeholder={t('contingencyPlan.form.field.buyQuantity')}
            disabled
            value={value}
          />
        )
      },
    },
    {
      field: 'unit',
      headerName: t('contingencyPlan.form.field.unit'),
      width: 100,
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.unit?.name
        ) : (
          <Field.TextField
            name={`items[${index}].supply.unit.name`}
            placeholder={t('contingencyPlan.form.field.unit')}
            disabled
          />
        )
      },
    },
    {
      field: 'price',
      headerName: t('contingencyPlan.form.field.price'),
      width: 100,
      renderCell: (params, index) => {
        return isDetail ? (
          params?.row?.price || 0
        ) : (
          <Field.TextField
            name={`items[${index}].price`}
            placeholder={t('contingencyPlan.form.field.price')}
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
      field: 'money',
      headerName: t('contingencyPlan.form.field.money'),
      width: 100,
      renderCell: (params, index) => {
        const buyQuantity =
          returnStockQuantity(
            +params?.row?.proposalQuantity -
              +params?.row?.supply?.stockQuantity,
          ) || 0
        const value = (+params?.row?.price || 0) * buyQuantity
        return isDetail ? (
          value
        ) : (
          <Field.TextField
            name={`items[${index}].money`}
            placeholder={t('contingencyPlan.form.field.money')}
            numberProps={{
              decimalScale: 3,
              thousandSeparator: true,
            }}
            disabled
            value={value}
          />
        )
      },
    },
    {
      field: 'note',
      headerName: t('contingencyPlan.form.field.note'),
      width: 100,
      renderCell: (params, index) => {
        return isDetail ? (
          params?.row?.description
        ) : (
          <Field.TextField
            name={`items[${index}].note`}
            placeholder={t('contingencyPlan.form.field.note')}
          />
        )
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

  const customFooter = () => {
    const proposalTotalAmount = items.reduce(
      (total, curr) =>
        (+curr?.price || 0) *
          ((+curr?.proposalQuantity || 0) +
            (+curr?.extraProposalQuantity || 0)) +
        total,
      0,
    )
    return (
      <Box
        sx={{ display: 'flex', flexDirection: 'row', with: 'max-content' }}
        ml={2}
      >
        <Typography variant="h4" mt={1} mb={1} component="span" width={200}>
          {t('contingencyPlan.form.field.proposalTotalAmount')}:
        </Typography>
        <Typography variant="h4" mt={1} mb={1} ml={2} component="span">
          {convertWithCommas(proposalTotalAmount)}
        </Typography>
      </Box>
    )
  }

  return (
    <HotKeys
      handlers={{
        ...(!isDetail
          ? {
              onAddRow: () => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  supplyGroup: null,
                  supply: null,
                  proposalQuantity: 0,
                  price: 0,
                  buyQuantity: 0,
                })
              },
              onRemoveRow: () => {
                if (items?.length > 1) arrayHelpers.remove(findLastIndex(items))
              },
            }
          : {}),
      }}
    >
      <DataTable
        rows={items || []}
        title={t('contingencyPlan.form.title')}
        columns={columns}
        striped={false}
        hideSetting
        customFooter={customFooter}
        beforeTopbar={
          isDetail ? null : (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  supplyGroup: null,
                  supply: null,
                  proposalQuantity: 0,
                  price: 0,
                  buyQuantity: 0,
                })
              }}
            >
              {t('contingencyPlan.form.addSupply')}
            </Button>
          )
        }
        hideFooter
      />
    </HotKeys>
  )
}

export default ItemSettingTable
