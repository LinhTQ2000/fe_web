import React, { useMemo } from 'react'

import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'

import {} from '~/modules/mmsx/constants'

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
        field: 'providedQuantity',
        headerName: t('suppliesRequest.form.field.grantedQuantity'),
        width: 100,
        align: 'right',
      },
      {
        field: 'quantity',
        headerName: t('suppliesRequest.form.field.returnQuantity'),
        width: 200,
        align: 'right',
      },
      {
        field: 'materialUnit',
        headerName: t('suppliesRequest.form.field.materialUnit'),
        width: 200,
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
        title={t('suppliesRequest.form.returnTable')}
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
