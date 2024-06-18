import React from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import Status from '~/components/Status'
import { JOB_STATUS_LIST, JOB_TYPE_MAP } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useJob from '~/modules/mmsx/redux/hooks/useJob'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

const JobSettingTable = (props) => {
  const { t } = useTranslation(['mmsx'])
  const {
    data: { jobLists, total },
  } = useJob()
  const history = useHistory()

  const { page, pageSize, setPage, setPageSize } = props

  const subColumns = [
    {
      field: 'id',
      headerName: '#',
      visible: 'always',
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('job.workCode'),
      width: 150,
      visible: 'always',
      hide: false,
    },
    {
      field: 'name',
      headerName: t('maintenancePlan.form.subTable.jobTitle'),
      visible: 'always',
      width: 150,
    },
    {
      field: 'jobType',
      headerName: t('maintenancePlan.form.subTable.jobType'),
      width: 150,
      renderCell: (params) => {
        const { type } = params.row
        return t(JOB_TYPE_MAP[type])
      },
    },
    {
      field: 'planDate',
      headerName: t('maintenancePlan.form.subTable.planDate'),
      width: 150,
      renderCell: (params) => {
        const { planFrom, planTo } = params.row
        return `${convertUtcDateToLocalTz(planFrom)}-${convertUtcDateToLocalTz(
          planTo,
        )}`
      },
    },
    {
      field: 'realDate',
      headerName: t('maintenancePlan.form.subTable.realDate'),
      width: 150,
      renderCell: (params) => {
        const { executionDateFrom, executionDateTo } = params.row
        return `${convertUtcDateToLocalTz(
          executionDateFrom,
        )}-${convertUtcDateToLocalTz(executionDateTo)}`
      },
    },

    {
      field: 'status',
      headerName: t('maintenancePlan.form.subTable.status'),
      width: 150,
      visible: 'always',
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status options={JOB_STATUS_LIST} value={status} variant="text" />
        )
      },
    },
    {
      field: 'actions',
      headerName: t('job.action'),
      width: 150,
      visible: 'always',
      align: 'center',
      sticky: 'right',
      renderCell: (params) => {
        const { id } = params.row
        return (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_JOB}>
              <IconButton
                onClick={() =>
                  history.push(ROUTE.JOB.DETAIL.PATH.replace(':id', `${id}`))
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
          </>
        )
      },
    },
  ]
  return (
    <DataTable
      title={t('maintenancePlan.form.subTable.title')}
      tableSettingKey="maintenancePlanDetailJob"
      rows={jobLists}
      columns={subColumns}
      pageSize={pageSize}
      page={page}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      total={total}
      enableResizable={false}
    />
  )
}

export default JobSettingTable
