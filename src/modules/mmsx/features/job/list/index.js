import React, { useEffect, useMemo, useState } from 'react'

import { IconButton, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { useQueryState } from '~/common/hooks/useQueryState'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  JOB_STATUS,
  JOB_STATUS_LIST,
  JOB_STATUS_MAP,
  JOB_TYPE_MAP,
  OVERDUE_STATUS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useCreatePlan from '~/modules/mmsx/redux/hooks/useCreatePlan'
import useJob from '~/modules/mmsx/redux/hooks/useJob'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'
import qs from '~/utils/qs'

import DialogAccept from '../dialogs/accept'
import DialogConfirm from '../dialogs/confirm'
import DialogQuickAssign from '../dialogs/quick-assign'
import DialogReject from '../dialogs/reject'
import DialogUpdateTime from '../dialogs/update-time'
import FilterForm from './filter-form'
import JobQuickFilter from './filter-quick-form'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.JOB.LIST.PATH,
    title: ROUTE.JOB.LIST.TITLE,
  },
]
const Job = () => {
  const {
    data: { jobLists, jobDetail, isLoading, total },
    actions,
  } = useJob()

  const [tempItem, setTempItem] = useState(null)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)
  const [isAcceptance, setIsAcceptance] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [isQuickAssign, setIsQuickAssign] = useState(false)
  const [quickAssignValues, setQuickAssignValues] = useState([])
  const [isUpdateTime, setIsUpdateTime] = useState(false)

  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const location = useLocation()
  const { plan } = qs.parse(location.search)
  const {
    data: { detailPlan },
    actions: createPlanAction,
  } = useCreatePlan()

  useEffect(() => {
    if (plan) {
      createPlanAction.getDetailPlan(plan)
    }
    return () => {
      createPlanAction.resetStateCreatePlan()
    }
  }, [id])

  const DEFAULT_QUICK_FILTERS = {
    type: '',
    status: [],
    createdAt:
      plan && !isEmpty(detailPlan)
        ? [new Date(detailPlan?.planFrom), new Date(detailPlan?.planTo)]
        : null,
    isOverdue: OVERDUE_STATUS.ALL,
    assignId: null,
  }

  const DEFAULT_FILTERS = {
    code: '',
    requestOrWarningCode: '',
    deviceSerial: '',
    deviceNameId: null,
    deviceIdentificationNo: '',
    factoryIds: [],
  }

  const {
    page,
    pageSize,
    sort,
    filters,
    keyword,
    selectedRowsDeps,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    setKeyword,
    quickFilters,
    setQuickFilters,
    withSearch,
  } = useQueryState({
    filters: DEFAULT_QUICK_FILTERS,
  })

  const columns = useMemo(
    () => [
      {
        field: 'code',
        headerName: t('job.workCode'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'request',
        headerName: t('job.requestCode'),
        width: 150,
        sortable: true,
        visible: 'always',
        renderCell: (params) =>
          params?.row?.warning?.code || params?.row?.repairRequest?.code,
      },
      {
        field: 'workType',
        headerName: t('job.workType'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const { type } = params.row
          return t(JOB_TYPE_MAP[type])
        },
      },
      {
        field: 'performer',
        headerName: t('job.performer'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params.row.assign?.username
        },
      },
      {
        field: 'serial',
        headerName: t('job.serial'),
        width: 150,
        sortable: true,
        renderCell: (params) => params?.row?.device?.serial,
      },
      {
        field: 'identificationNo',
        headerName: t('deviceList.identificationNo'),
        width: 150,
        renderCell: (params) => params?.row?.device?.identificationNo,
      },
      {
        field: 'deviceName',
        headerName: t('job.deviceName'),
        width: 150,
        sortable: true,
        renderCell: (params) => params?.row?.device?.name,
      },
      {
        field: 'description',
        headerName: t('ganttChart.description'),
        width: 150,
      },
      {
        field: 'status',
        headerName: t('job.status'),
        width: 150,
        sortable: true,
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
        field: 'planDay',
        headerName: t('job.planDay'),
        width: 150,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return params.row.planFrom && params.row.planTo
            ? convertUtcDateToLocalTz(params.row.planFrom) +
                ' - ' +
                convertUtcDateToLocalTz(params.row.planTo)
            : ''
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
          const { id, status, canUpdateJobTime } = params.row
          return (
            <>
              <Guard code={FUNCTION_CODE.DETAIL_JOB}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(ROUTE.JOB.DETAIL.PATH.replace(':id', `${id}`)),
                    )
                  }
                >
                  <Icon name="show" />
                </IconButton>
              </Guard>
              {(status === JOB_STATUS.NON_ASSIGN ||
                status === JOB_STATUS.REJECT) && (
                <Guard code={FUNCTION_CODE.ASSIGNMENT_JOB}>
                  <IconButton
                    onClick={() =>
                      history.push({
                        state: params.row,
                        pathname: ROUTE.JOB.ASSIGN.PATH.replace(':id', id),
                        search: withSearch(),
                      })
                    }
                  >
                    <Icon name="assign" />
                  </IconButton>
                </Guard>
              )}
              {status === JOB_STATUS.WAIT_CONFIRM && (
                <Guard code={FUNCTION_CODE.UPDATE_STATUS_JOB}>
                  <IconButton
                    onClick={() =>
                      onClickConfirmJob({
                        ...params?.row,
                        action: 'confirm',
                      })
                    }
                  >
                    <Icon name="tick" />
                  </IconButton>
                </Guard>
              )}
              {status === JOB_STATUS.COMPLETED && (
                <IconButton onClick={() => onClickAcceptance(params.row)}>
                  <Icon name="checkDouble" />
                </IconButton>
              )}
              {canUpdateJobTime && (
                <IconButton onClick={() => onClickUpdateTime(params.row)}>
                  <Icon name="clock" />
                </IconButton>
              )}
            </>
          )
        },
      },
    ],
    [withSearch],
  )

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          ...quickFilters,
          assignId: quickFilters?.assignId?.id,
          deviceNameId: filters?.deviceNameId?.id,
          factoryIds: filters?.factoryIds?.map((item) => item?.id),
        },
        [...columns, { field: 'executionDatePlan', filterFormat: 'date' }],
      ),
      sort: convertSortParams(sort),
      // curUser: checked ? userId : null,
    }
    actions.searchJobList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, quickFilters])

  const onClickConfirmJob = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const onSubmitUpdateJobStatus = (val) => {
    actions.updateJobStatus(
      { id: tempItem?.id, action: tempItem?.action, reason: val?.reason },
      refreshData,
    )
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const onClickAcceptance = (tempItem) => {
    actions.getJobDetail({ id: tempItem?.id }, () => setIsAcceptance(true))
  }

  const onSubmitAcceptance = (val) => {
    actions.approvedJob(
      {
        ...val,
        executionTime: +val?.executionTime,
        stopTime: +val?.stopTime || null,
        id: jobDetail?.id,
      },
      () => {
        setIsAcceptance(false)
        refreshData()
      },
    )
  }

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps])

  useEffect(() => {
    const quickAssignValues = selectedRows
      .filter((val) =>
        [JOB_STATUS.NON_ASSIGN, JOB_STATUS.REJECT].includes(val?.status),
      )
      .map((item) => ({
        ...item,
        assign: null,
        plan: [item.planFrom, item.planTo],
        isNeedAccept: false,
      }))
    setQuickAssignValues(quickAssignValues)
  }, [selectedRows])

  const onSubmitQuickAssign = (val) => {
    const params = {
      jobs: val?.items?.map((item) => ({
        jobId: item?.id,
        assignId: item?.assign?.id,
        planFrom: item?.plan[0],
        planTo: item?.plan[1],
        isNeedAccept: item?.isNeedAccept,
      })),
    }

    actions.quickAssignJob(params, () => {
      setIsQuickAssign(false)
      refreshData()
      setTempItem(null)
      setSelectedRows([])
    })
  }

  const onClickUpdateTime = (tempItem) => {
    setTempItem(tempItem)
    setIsUpdateTime(true)
  }

  const onSubmitUpdateTime = (val) => {
    actions.updateTimeJob(
      {
        executionTime: +val?.executionTime,
        stopTime: +val?.stopTime || null,
        id: tempItem?.id,
      },
      () => {
        setIsUpdateTime(false)
        refreshData()
      },
    )
  }

  const renderFooter = () => {
    const { handleReset } = useFormikContext()
    return (
      <>
        <Button
          onClick={() => {
            actions.resetJob()
            handleReset()
            setIsAcceptance(false)
          }}
          color="grayF4"
          bold={false}
        >
          {t('general:common.cancel')}
        </Button>
        <Button
          onClick={() => {
            actions.reworkJob(jobDetail?.id, () => {
              setIsAcceptance(false)
              refreshData()
            })
          }}
          variant="outlined"
        >
          {t('job.rework')}
        </Button>
        <Button type="submit">{t('general:common.accept')}</Button>
      </>
    )
  }

  const renderFooterAssign = () => {
    const { handleReset } = useFormikContext()
    return (
      <>
        <Button
          onClick={() => {
            handleReset()
            setIsQuickAssign(false)
            setTempItem(null)
          }}
          color="grayF4"
          bold={false}
        >
          {t('general:common.close')}
        </Button>
        <Button onClick={handleReset} variant="outlined" color="subText">
          {t('general:common.cancel')}
        </Button>
        <Button type="submit">{t('general:common.save')}</Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.job')}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('maintainRequest.searchPlaceholder')}
      loading={isLoading}
    >
      <JobQuickFilter
        setQuickFilters={setQuickFilters}
        quickFilters={
          isEmpty(quickFilters) ? DEFAULT_QUICK_FILTERS : quickFilters
        }
        defaultFilter={DEFAULT_QUICK_FILTERS}
      />
      <DataTable
        title={t('job.title')}
        tableSettingKey="job"
        columns={columns}
        rows={jobLists}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          onApply: setFilters,
          defaultValue: DEFAULT_FILTERS,
        }}
        beforeTopbar={
          quickAssignValues.length > 0 && (
            <Button
              color="grayEE"
              icon="quickAssign"
              onClick={() => {
                setIsQuickAssign(true)
              }}
            >
              {t('job.quickAssign')}
            </Button>
          )
        }
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={onSubmitUpdateJobStatus}
        tempItem={tempItem}
      />
      <DialogReject
        open={isOpenRejectModal}
        onCancel={() => setIsOpenRejectModal(false)}
        onSubmit={onSubmitUpdateJobStatus}
        tempItem={tempItem}
      />
      <DialogAccept
        open={isAcceptance}
        onCancel={() => {
          setIsAcceptance(false)
          actions.resetJob()
        }}
        renderDeps={jobDetail}
        renderFooter={renderFooter}
        onSubmit={onSubmitAcceptance}
      />
      <DialogQuickAssign
        open={isQuickAssign}
        onCancel={() => {
          setIsQuickAssign(false)
          setTempItem(null)
        }}
        onSubmit={onSubmitQuickAssign}
        renderFooter={renderFooterAssign}
        renderDeps={quickAssignValues}
        quickAssignValues={quickAssignValues}
      />
      <DialogUpdateTime
        open={isUpdateTime}
        onCancel={() => {
          setIsUpdateTime(false)
          setTempItem(null)
        }}
        onSubmit={onSubmitUpdateTime}
        tempItem={tempItem}
      />
    </Page>
  )
}

export default Job
