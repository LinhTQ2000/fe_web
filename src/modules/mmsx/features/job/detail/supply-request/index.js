import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import Status from '~/components/Status'
import { SUPPLY_REQUEST_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useJob from '~/modules/mmsx/redux/hooks/useJob'
import { ROUTE } from '~/modules/mmsx/routes/config'

function SupplyRequestTable() {
  const { t } = useTranslation(['mmsx'])
  const {
    data: { jobDetail },
  } = useJob()
  const history = useHistory()
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
      field: 'code',
      headerName: t('suppliesRequest.table.code'),
      width: 200,
    },
    {
      field: 'name',
      headerName: t('suppliesRequest.table.name'),
      width: 200,
    },
    {
      field: 'status',
      headerName: t('suppliesCategory.form.status'),
      width: 200,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={SUPPLY_REQUEST_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'actions',
      headerName: t('general:common.action'),
      width: 200,
      align: 'center',
      sticky: 'right',
      renderCell: (params) => {
        return (
          <Guard code={FUNCTION_CODE.DETAIL_SUPPLY_REQUEST_TICKET}>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.SUPPLIES_REQUEST.DETAIL.PATH.replace(
                    ':id',
                    params.row?.id,
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
          </Guard>
        )
      },
    },
  ]
  return (
    <DataTable
      columns={columns}
      rows={jobDetail?.supplyRequests || []}
      hideFooter
      hideSetting
      striped={false}
    />
  )
}
export default SupplyRequestTable
