import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Column } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import DateGroupSelection from '~/components/DateGroupSelection'
import DateGroupToggle from '~/components/DateGroupToggle'
import Loading from '~/components/Loading'
import { useDashboardDeviceError } from '~/modules/mmsx/redux/hooks/useDashboard'

const DeviceError = ({ factory }) => {
  const { t } = useTranslation(['mmsx'])
  const { data, actions, isLoading } = useDashboardDeviceError()

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
    actions.getDeviceError(payload)
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
    const col = data?.map((item) => ({
      type: item?.name,
      counts: item?.countError,
    }))
    return col
  }, [data])

  const config = useMemo(
    () => ({
      data: convertData,
      xField: 'type',
      yField: 'counts',
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle',
        // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        counts: {
          alias: t('dashboard.chart.quantityError'),
        },
      },
    }),
    [convertData],
  )

  return (
    <Card sx={{ p: 2, position: 'relative', height: 490 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h2">{t('dashboard.chart.deviceError')}</Typography>
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

export default DeviceError
