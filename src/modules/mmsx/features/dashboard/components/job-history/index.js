import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Column } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import DateGroupSelection from '~/components/DateGroupSelection'
import DateGroupToggle from '~/components/DateGroupToggle'
import Loading from '~/components/Loading'
import { JOB_HISTORY_DASHBOARD, JOB_TYPE } from '~/modules/mmsx/constants'
import { useDashboardRequestStatus } from '~/modules/mmsx/redux/hooks/useDashboard'
import { convertUtcDateToLocalTz } from '~/utils'

const JobHistory = ({ factory }) => {
  const { t } = useTranslation(['mmsx'])
  const { data, actions, isLoading } = useDashboardRequestStatus()
  const JOB_TYPE_HISTORY = [
    JOB_TYPE.SCHEDULE_MAINTAIN,
    JOB_TYPE.INSTALL,
    JOB_TYPE.REQUEST,
    JOB_TYPE.PERIOD_CHECK,
    JOB_TYPE.ACCREDITATION,
  ]

  const [groupBy, setGroupBy] = useState(0)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const getData = useCallback(() => {
    const payload = {
      reportType: groupBy,
      startDate,
      endDate,
      factoryIds: isEmpty(factory)
        ? undefined
        : factory?.map((item) => item?.id).toString(),
    }
    actions.getHistoryJob(payload)
  }, [groupBy, startDate, endDate, factory])

  useEffect(() => {
    getData()
  }, [getData])

  const handleChangeDate = (unit, { start, end }) => {
    setGroupBy(unit.value)
    setStartDate(start.toISOString())
    setEndDate(end.toISOString())
  }

  const convertData = useMemo(() => {
    let col = []
    data?.forEach((item) => {
      item?.countReport
        ?.filter((e) => JOB_TYPE_HISTORY.includes(e?.type))
        ?.forEach((data) => {
          col.push({
            time:
              groupBy === 0
                ? `${convertUtcDateToLocalTz(item?.rangeDate?.endDate)}`
                : `${convertUtcDateToLocalTz(
                    item?.rangeDate?.startDate,
                  )} - ${convertUtcDateToLocalTz(item?.rangeDate?.endDate)}`,
            value: data?.count,
            type: t(
              `dashboard.jobHistory.${JOB_HISTORY_DASHBOARD[data?.type]}`,
            ),
          })
        })
    })
    return col
  }, [data])

  const config = useMemo(
    () => ({
      data: convertData,
      isStack: true,
      height: 255,
      xField: 'time',
      yField: 'value',
      seriesField: 'type',
      color: ['#56CCF2', '#7B61FF', '#026EC9', '#FC762E'],
      columnWidthRatio: 0.2,
      yAxis: {
        grid: {
          line: {
            style: {
              stroke: '#ddd',
              lineDash: [4, 2],
            },
          },
        },
      },
      label: {
        position: 'middle',
        content: '',
        layout: [
          {
            type: 'adjust-color',
          },
          {
            type: 'interval-hide-overlap',
          },
          {
            type: 'interval-adjust-position',
          },
        ],
      },
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
          {t('dashboard.chart.requestStatus')}
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
        <Column {...config} />
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

export default JobHistory
