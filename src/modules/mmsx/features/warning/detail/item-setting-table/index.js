import React, { useMemo } from 'react'

import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Checkbox from '~/components/Checkbox'
import DataTable from '~/components/DataTable'
import { OBLIGATORY_ENUM } from '~/modules/database/constants'

const ItemSettingTable = ({ items }) => {
  const { t } = useTranslation(['mmsx'])

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'title',
        width: 150,
        headerName: t('warningList.formTable.title'),
        align: 'center',
        renderCell: (params) => {
          return params?.row?.title
        },
      },
      {
        field: 'description',
        width: 300,
        headerName: t('jobList.checklistDetail.description'),
        align: 'center',
        renderCell: (params) => {
          return params?.row?.description ?? params?.subtitle
        },
      },
      {
        field: 'obligatory',
        width: 100,
        headerName: t('jobList.checklistDetail.obligatory'),
        align: 'center',
        renderCell: (params) => {
          return (
            <Checkbox
              checked={params?.row?.obligatory === OBLIGATORY_ENUM.YES}
              name="obligatory"
              disabled
            />
          )
        },
      },
      {
        field: 'result',
        width: 300,
        headerName: t('jobList.checklistDetail.result'),
        align: 'center',
        renderCell: (params) => {
          return params?.row?.status === 1
            ? t('jobList.checklistDetail.pass')
            : params?.row?.status === 0
            ? t('jobList.checklistDetail.fail')
            : ''
        },
      },
    ],
    [items],
  )

  return (
    <>
      <DataTable
        rows={items}
        columns={columns}
        hideSetting
        hideFooter
        total={items.length}
        striped={false}
      />
    </>
  )
}

ItemSettingTable.defaultProps = {
  items: [],
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
}

export default ItemSettingTable
