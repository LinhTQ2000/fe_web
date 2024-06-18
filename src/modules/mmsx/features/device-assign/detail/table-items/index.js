import React from 'react'

import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import useDeviceAssign from '~/modules/mmsx/redux/hooks/useDeviceAssign'

function TableItems() {
  const { t } = useTranslation(['mmsx'])
  const {
    data: { deviceAssignDetail },
  } = useDeviceAssign()

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => index + 1,
    },
    {
      field: 'articleDevice',
      headerName: t('deviceAssign.moTable.articleDevice'),
      width: 150,
      renderCell: (params) => params.row?.deviceGroup?.name,
    },
    {
      field: 'serial',
      headerName: t('deviceAssign.moTable.serial'),
      width: 150,
      renderCell: (params) => params?.row?.device?.serial,
    },
    {
      field: 'identificationNo',
      headerName: t('deviceAssign.moTable.identificationNo'),
      width: 150,
      renderCell: (params) => params?.row?.device?.identificationNo,
    },
    {
      field: 'deviceName',
      headerName: t('deviceAssign.moTable.deviceName'),
      width: 150,
      renderCell: (params) => params?.row?.device?.name,
    },
    {
      field: 'area',
      headerName: t('deviceAssign.moTable.area'),
      width: 150,
      renderCell: (params) => params.row?.area?.name,
    },
  ]

  return (
    <DataTable
      uniqKey=""
      title={t('deviceAssign.title2')}
      rows={deviceAssignDetail?.details || []}
      columns={columns}
      striped={false}
      hideSetting
      hideFooter
    />
  )
}

TableItems.defaultProps = {
  items: [],
}

TableItems.propTypes = {
  items: PropTypes.array,
}

export default TableItems
