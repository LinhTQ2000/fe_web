import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { gantt } from 'dhtmlx-gantt'
import { isEmpty, first, last } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import Button from '~/components/Button'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import {
  MAINTENANCE_PLAN_UNIT_TYPE_ENUM,
  REPORT_JOB_TYPE_ENUM,
} from '~/modules/configuration/constants'
import { JOB_REPORT_STATUS_ENUM } from '~/modules/mmsx/constants'
import GanttChart from '~/modules/mmsx/partials/gantt-chart'
import { GanttChartProvider } from '~/modules/mmsx/partials/gantt-chart/GanttContext'
import useMaintenancePlan from '~/modules/mmsx/redux/hooks/useMaintenancePlan'
import useReport from '~/modules/mmsx/redux/hooks/useReport'
import { reportMaintenancePlanExportApi } from '~/modules/mmsx/redux/sagas/report/report-maintenance-plan'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'
import './style.css'

function GanttChartView() {
  const { t } = useTranslation('mmsx')
  const history = useHistory()
  const { id } = useParams()

  const breadcrumbs = [
    {
      title: 'plan',
    },
    {
      route: ROUTE.MAINTENANCE_PLAN.LIST.PATH,
      title: ROUTE.MAINTENANCE_PLAN.LIST.TITLE,
    },
    {
      route: ROUTE.MAINTENANCE_PLAN.DETAIL.PATH.replace(':id', id),
      title: ROUTE.MAINTENANCE_PLAN.DETAIL.TITLE,
    },
    {
      route: ROUTE.MAINTENANCE_PLAN.GANNT_CHART.PATH,
      title: ROUTE.MAINTENANCE_PLAN.GANNT_CHART.TITLE,
    },
  ]

  const labels = [
    {
      span: 6,
      boxCss: 'waitForConfirm',
      value: '',
      text: t('maintainanceProgress.status.notExecuted'),
    },
    {
      span: 6,
      boxCss: 'inProgress',
      value: '',
      text: t('maintainanceProgress.status.inProgress'),
    },
    {
      span: 6,
      boxCss: 'completed',
      value: '',
      text: t('maintainanceProgress.status.executed'),
    },
  ]
  const [tasks, setTasks] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [datePlan, setDatePlan] = useState([null, null])
  const [timeType, setTimeType] = useState(
    MAINTENANCE_PLAN_UNIT_TYPE_ENUM.MONTH,
  )
  const {
    data: { maintenancePlanList: ganttChartData, isLoading },
    actions,
  } = useReport()

  const {
    data: { maintenancePlanDetail },
    actions: actionMaintenance,
  } = useMaintenancePlan()

  useEffect(() => {
    actionMaintenance.getDetailMaintenancePlan(id)
    return () => actionMaintenance.resetMaintenanceDetail()
  }, [id])

  useEffect(() => {
    const params = {
      reportUnitType: MAINTENANCE_PLAN_UNIT_TYPE_ENUM.MONTH,
      type: REPORT_JOB_TYPE_ENUM.PERIOD_MAINTENANCE,
      filter: convertFilterParams({
        deviceId: selectedPlan,
        maintenancePlanId: id,
      }),
      ...(datePlan[0] && datePlan[1]
        ? { startDate: datePlan[0], endDate: datePlan[1] }
        : {}),
    }
    actions.reportMaintenancePlan(params)
  }, [selectedPlan, datePlan])

  const handleChangeTypeDate = (val) => {
    setTimeType(val)
  }

  const convertDateMoment = (arrDateData, type) => {
    const firstDate = first(arrDateData)
    const lastDate = last(arrDateData)
    switch (type) {
      case 'start':
        return new Date(firstDate?.startDate)
      case 'end':
        return new Date(lastDate?.endDate)
      default:
        return new Date()
    }
  }

  const getTasks = (datas) => {
    const jobs = []
    const childenJobs = []
    const devices = datas.map((data) => ({
      id: data?.device?.id,
      text: data?.device?.name,
      type: gantt.config.types.project,
      // render: 'split',
      open: true,
    }))

    datas.forEach((data) => {
      data?.jobs?.forEach((job, indexJob) => {
        const unitDetails = job?.reportByUnits?.filter(
          (e) => e?.status !== JOB_REPORT_STATUS_ENUM.NO_JOB,
        )
        if (!isEmpty(unitDetails)) {
          // get parent job
          const jobObj = {
            id: `${data?.device?.id}-${indexJob}`,
            text: job?.category,
            parent: data?.device?.id,
            start_date: convertDateMoment(unitDetails, 'start'),
            end_date: convertDateMoment(unitDetails, 'end'),
            type: 'project',
            render: 'split',
          }
          jobs.push(jobObj)
          // get childen job
          unitDetails.forEach((item, index) => {
            childenJobs.push({
              id: `${data?.device?.id}-${indexJob}-${index}`,
              text: job?.category,
              parent: `${data?.device?.id}-${indexJob}`,
              start_date: new Date(item?.startDate),
              end_date: new Date(item?.endDate),
              status: item?.status,
            })
          })
        }
      })
    })
    return [...devices, ...jobs, ...childenJobs]
  }

  useEffect(() => {
    if (!isEmpty(ganttChartData)) {
      const tasks = getTasks(ganttChartData)
      setTasks(tasks)
    } else {
      setTasks([])
    }
  }, [ganttChartData])

  const linkRelateList = (data) => {
    const links = data
      .filter((work) => work?.parent)
      .map((item) => ({
        source: item.id,
        target: item.parent,
        type: 1,
      }))
    return links
  }

  const handleChangeFilter = (id) => {
    setSelectedPlan(id)
  }

  const handleChangeDatePlan = (val) => {
    setDatePlan(val)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('maintenancePlan.ganttExport')}
          onExport={() =>
            reportMaintenancePlanExportApi({
              reportUnitType: timeType,
              type: REPORT_JOB_TYPE_ENUM.PERIOD_MAINTENANCE,
              filter: convertFilterParams({
                deviceId: selectedPlan,
                maintenancePlanId: id,
              }),
              ...(datePlan[0] && datePlan[1]
                ? { startDate: datePlan[0], endDate: datePlan[1] }
                : {}),
            })
          }
        />
        <Button
          onClick={() => history.push(ROUTE.MAINTENANCE_PLAN.LIST.PATH)}
          icon="ganttChart"
          variant="outlined"
          sx={{ ml: 4 / 3 }}
        >
          {t('jobList.button.listView')}
        </Button>
      </>
    )
  }

  const backToPage = () => {
    history.push(ROUTE.MAINTENANCE_PLAN.DETAIL.PATH.replace(':id', id))
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.ganttChart')}
      renderHeaderRight={renderHeaderRight}
      placeholder={t('deviceCategory.searchPlaceholder')}
      onBack={backToPage}
      loading={isLoading}
    >
      <Box sx={{ display: 'flex', mb: 3 }}>
        {labels?.map((item) => (
          <Grid
            item
            xs={3}
            lg={12}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <div className={`${item?.boxCss} box`} />
            <span style={{ marginLeft: '10px' }}>{item?.text}</span>
          </Grid>
        ))}
      </Box>
      <GanttChartProvider
        maintenancePlanId={id}
        datePlan={datePlan}
        maintenancePlanDetail={maintenancePlanDetail}
      >
        <GanttChart
          config={{
            columns: [
              {
                name: 'text',
                label: t('ganttChart.title'),
                tree: true,
                width: '*',
                min_width: 200,
                resize: true,
                template: (task) => {
                  return `
                        <div value="${task.id}">
                        ${task.text}
                        </div> `
                },
              },
            ],
            grid_resize: true,
            drag_progress: false,
            keyboard_navigation: true,
            horizontal_scroll_key: 'shiftKey',
            readonly: true,
          }}
          tasks={{
            data: tasks,
            links: linkRelateList(tasks),
          }}
          display
          handleChangeFilter={handleChangeFilter}
          handleChangeTypeDate={handleChangeTypeDate}
          handleChangeDatePlan={handleChangeDatePlan}
        />
      </GanttChartProvider>
    </Page>
  )
}
export default GanttChartView
