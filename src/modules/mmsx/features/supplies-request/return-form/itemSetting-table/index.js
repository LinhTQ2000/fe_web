import React from 'react'

import { IconButton } from '@mui/material'
import { findLastIndex, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import useSuppliesRequest from '~/modules/mmsx/redux/hooks/useSuppliesRequest'

function ItemSettingTable({ items, arrayHelpers, listSupply }) {
  const { t } = useTranslation(['mmsx'])
  const { scrollToBottom } = useApp()
  const {
    data: { suppliesRequestDetail },
  } = useSuppliesRequest()

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
      field: 'supply',
      headerName: t('suppliesRequest.form.field.materialName'),
      width: 200,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((i) => i?.supply?.id)
        return (
          <Field.Autocomplete
            name={`items[${index}].supply`}
            placeholder={t('suppliesRequest.form.field.materialName')}
            options={
              !isEmpty(listSupply)
                ? listSupply
                : suppliesRequestDetail?.supplies?.map((item) => ({
                    ...item,
                    quantity: item?.providedQuantity,
                  }))
            }
            getOptionLabel={(opt) => opt?.supply?.name || opt?.name}
            getOptionSubLabel={(opt) =>
              `${opt?.nameOther || ''} - ${opt?.code}`
            }
            getOptionValue={(opt) => opt?.supply || opt}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some(
                (id) =>
                  id === (opt?.id || opt?.itemId) &&
                  opt?.id !== items[index]?.supply?.id,
              )
            }
            required
          />
        )
      },
    },
    {
      field: 'materialName',
      headerName: t('suppliesRequest.form.field.materialCode'),
      width: 200,
      renderCell: (params, index) => {
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
      field: 'providedQuantity',
      headerName: t('suppliesRequest.form.field.grantedQuantity'),
      width: 100,
      align: 'right',
      renderCell: (params, index) => (
        <Field.TextField name={`items[${index}].supply.quantity`} disabled />
      ),
    },
    {
      field: 'returnQuantity',
      headerName: t('suppliesRequest.form.field.returnQuantity'),
      width: 100,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].returnQuantity`}
            placeholder={t('suppliesRequest.form.field.returnQuantity')}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
    {
      field: 'materialUnit',
      headerName: t('suppliesRequest.form.field.materialUnit'),
      width: 150,
      renderCell: (params) => {
        return params.row?.unit?.name || params.row?.supply?.unit?.name
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
            supply: null,
            returnQuantity: null,
          })
          scrollToBottom()
        },
        onRemoveRow: () => {
          if (items?.length > 1) arrayHelpers.remove(findLastIndex(items))
        },
      }}
    >
      <DataTable
        rows={items || []}
        title={t('suppliesRequest.form.returnTable')}
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
                supply: null,
                returnQuantity: null,
              })
              scrollToBottom()
            }}
            sx={{ ml: 1 }}
            // disabled={items?.length === listSupply?.length}
          >
            {t('suppliesRequest.form.addRow')}
          </Button>
        }
      />
    </HotKeys>
  )
}

export default ItemSettingTable
