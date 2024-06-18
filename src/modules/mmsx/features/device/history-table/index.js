import { useEffect } from 'react'

import { IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import Status from '~/components/Status'
import { JOB_STATUS_LIST, JOB_STATUS_MAP } from '~/modules/mmsx/constants'
import useJob from '~/modules/mmsx/redux/hooks/useJob'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

export default function TableHistory(props) {
  const { deviceId, type } = props
  const { t } = useTranslation(['mmsx'])
  const { page, pageSize, setPage, setPageSize } = useQueryState({
    pageSize: 10,
  })

  const history = useHistory()

  const {
    data: { jobHistoryDevice, total },
    actions,
  } = useJob()

  useEffect(() => {
    if (deviceId) {
      const params = {
        page,
        limit: pageSize,
        filter: convertFilterParams({ deviceId, type }),
      }
      actions.searchJobHistoryDevice(params)
    }
    return () => {
      if (deviceId) {
        actions.resetJobHistoryDevice()
      }
    }
  }, [deviceId, page, pageSize])

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('deviceList.tableHistory.name'),
      width: 150,
    },
    {
      field: 'performer',
      headerName: t('job.performer'),
      width: 150,
      renderCell: (params) => {
        return params.row.assign?.username
      },
    },
    {
      field: 'date',
      headerName: t('deviceList.tableHistory.date'),
      width: 150,
      renderCell: (params) => {
        return params.row.planFrom && params.row.planTo
          ? convertUtcDateToLocalTz(params.row.planFrom) +
              ' - ' +
              convertUtcDateToLocalTz(params.row.planTo)
          : ''
      },
    },
    {
      field: 'status',
      headerName: t('job.status'),
      width: 150,
      renderCell: (params) => {
        const { status, isOverdue } = params.row
        return isOverdue ? (
          <Typography
            component="span"
            sx={{
              display: 'inline-block',
              color: 'error',
            }}
            variant="text"
          >
            {t(JOB_STATUS_MAP[status])} - {t('common.statusList.overdue')}
          </Typography>
        ) : (
          <Status options={JOB_STATUS_LIST} value={status} variant="text" />
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 150,
      visible: 'always',
      align: 'center',
      sticky: 'right',
      renderCell: (params) => {
        const { id } = params.row
        return (
          <IconButton
            onClick={() =>
              history.push(ROUTE.JOB.DETAIL.PATH.replace(':id', `${id}`))
            }
          >
            <Icon name="show" />
          </IconButton>
        )
      },
    },
  ]
  return (
    <DataTable
      rows={jobHistoryDevice}
      columns={columns}
      total={total}
      striped={false}
      pageSize={pageSize}
      page={page}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      hideSetting
    />
  )
}
