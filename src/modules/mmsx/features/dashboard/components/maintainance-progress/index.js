import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { DualAxes } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import DateGroupSelection from '~/components/DateGroupSelection'
import DateGroupToggle from '~/components/DateGroupToggle'
import Loading from '~/components/Loading'
import { JOB_STATUS, JOB_STATUS_MAP } from '~/modules/mmsx/constants'
import { useDashboardMaintainanceJobStatus } from '~/modules/mmsx/redux/hooks/useDashboard'
import { convertUtcDateToLocalTz } from '~/utils'

const MaintainanceProgress = ({ factory }) => {
  const { t } = useTranslation(['mmsx'])

  const { data, actions, isLoading } = useDashboardMaintainanceJobStatus()

  const [groupBy, setGroupBy] = useState(0)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const JOB_STATUS_DASHBOARD = [
    JOB_STATUS.WAIT_CONFIRM,
    JOB_STATUS.COMPLETED,
    JOB_STATUS.RESOLVED,
    JOB_STATUS.IN_PROGRESS,
  ]

  const getData = useCallback(() => {
    const payload = {
      reportType: groupBy,
      startDate,
      endDate,
      factoryIds: isEmpty(factory)
        ? undefined
        : factory?.map((item) => item?.id).toString(),
    }
    actions.getMaintainanceJob(payload)
  }, [groupBy, startDate, endDate, factory])

  useEffect(() => {
    getData()
  }, [getData])

  const handleChangeDate = (_, { start, end }) => {
    setStartDate(start.toISOString())
    setEndDate(end.toISOString())
  }

  const convertData = useMemo(() => {
    let line = []
    let col = []
    data?.forEach((item) => {
      item?.countReport
        ?.filter((e) => JOB_STATUS_DASHBOARD.includes(e?.type))
        .forEach((data) => {
          if (
            [JOB_STATUS_DASHBOARD[1], JOB_STATUS_DASHBOARD[2]].includes(
              data?.type,
            )
          ) {
            col.push({
              time:
                groupBy === 0
                  ? `${convertUtcDateToLocalTz(item?.rangeDate?.endDate)}`
                  : `${convertUtcDateToLocalTz(
                      item?.rangeDate?.startDate,
                    )} - ${convertUtcDateToLocalTz(item?.rangeDate?.endDate)}`,
              value: data?.count,
              type: t(JOB_STATUS_MAP[data?.type]),
            })
          } else {
            line.push({
              time:
                groupBy === 0
                  ? `${convertUtcDateToLocalTz(item?.rangeDate?.endDate)}`
                  : `${convertUtcDateToLocalTz(
                      item?.rangeDate?.startDate,
                    )} - ${convertUtcDateToLocalTz(item?.rangeDate?.endDate)}`,
              count: data?.count,
              name: t(JOB_STATUS_MAP[data?.type]),
            })
          }
        })
    })
    return [col, line]
  }, [data])

  const config = useMemo(
    () => ({
      data: convertData,
      xField: 'time',
      yField: ['value', 'count'],
      yAxis: {
        value: {
          min: 0,
          label: {
            formatter: (val) => val,
          },
        },
        count: {
          label: {
            formatter: () => {},
          },
        },
      },
      height: 255,
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          seriesField: 'type',
          columnWidthRatio: 0.2,
          marginRatio: 0.1,
          color: ['#0761AD', '#FF9054'],
        },
        {
          geometry: 'line',
          seriesField: 'name',
          color: ['#7F9EF4', '#FFE129'],
          smooth: true,
        },
      ],
      legend: {
        layout: 'horizontal',
        position: 'bottom',
        itemName: {
          style: {
            fontSize: 14,
          },
        },
      },
    }),
    [convertData],
  )

  return (
    <Card sx={{ p: 2, position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.chart.maintainanceProgress')}
        </Typography>
        <Box>
          <DateGroupToggle
            groupBy={groupBy}
            setGroupBy={(val) => {
              setGroupBy(val)
              setStartDate(null)
              setEndDate(null)
            }}
          />
        </Box>
      </Box>
      <Box sx={{ height: 360 }}>
        <DualAxes {...config} />
      </Box>
      <DateGroupSelection
        reportType={groupBy}
        handleChange={handleChangeDate}
      />
      <Loading
        open={isLoading}
        sx={{ position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0)' }}
      ></Loading>
    </Card>
  )
}

export default MaintainanceProgress
