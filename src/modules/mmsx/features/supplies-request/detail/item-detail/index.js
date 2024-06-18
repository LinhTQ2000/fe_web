import React, { useMemo } from 'react'

import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { returnStockQuantity } from '~/utils/measure'

const ItemSettingDetail = ({ items }) => {
  const { t } = useTranslation(['mmsx'])

  const columns = useMemo(
    () => [
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
        renderCell: (params) => params?.row?.supplyGroup?.name,
      },
      {
        field: 'name',
        headerName: t('suppliesRequest.form.field.materialName'),
        width: 200,
      },
      {
        field: 'code',
        headerName: t('suppliesRequest.form.field.materialCode'),
        width: 200,
      },
      {
        field: 'vendor',
        headerName: t('warehouseDefine.vendor'),
        width: 200,
        renderCell: (params) => params.row?.vendor?.name,
      },
      {
        field: 'quantity',
        headerName: t('suppliesRequest.form.field.requireAmount'),
        width: 150,
        align: 'right',
      },
      {
        field: 'availableStockQuantity',
        headerName: t('suppliesRequest.form.field.availabilityQuantity'),
        width: 150,
        align: 'right',
        renderCell: (params) =>
          returnStockQuantity(params.row?.availableStockQuantity),
      },
      {
        field: 'stockQuantity',
        headerName: t('suppliesRequest.form.field.stockQuantity'),
        width: 150,
        align: 'right',
        renderCell: (params) => returnStockQuantity(params.row?.stockQuantity),
      },
      {
        field: 'minStockQuantity',
        headerName: t('suppliesRequest.form.field.minStockQuantity'),
        width: 150,
        align: 'right',
        renderCell: (params) =>
          returnStockQuantity(params.row?.minStockQuantity),
      },
      {
        field: 'buyQuantity',
        headerName: t('suppliesRequest.form.field.buyQuantity'),
        width: 150,
        align: 'right',
        renderCell: (params) => {
          const { quantity, availableStockQuantity } = params.row
          return returnStockQuantity(+quantity - +availableStockQuantity)
        },
      },
      {
        field: 'materialUnit',
        headerName: t('suppliesRequest.form.field.materialUnit'),
        width: 150,
        renderCell: (params) => {
          return params.row?.unit?.name
        },
      },
    ],
    [items],
  )
  return (
    <>
      <DataTable
        title={t('suppliesRequest.form.table')}
        rows={items || []}
        columns={columns}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

ItemSettingDetail.defaultProps = {
  items: [],
}

ItemSettingDetail.propTypes = {
  items: PropTypes.array,
}

export default ItemSettingDetail
