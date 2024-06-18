import { useCallback, useEffect, useMemo, useState } from 'react'

import { Pie, G2 } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import DateGroupSelection from '~/components/DateGroupSelection'
import Loading from '~/components/Loading'
import { PIE_CHART_COLORS } from '~/modules/mmsx/constants'
import { useDashboardDeviceStatus } from '~/modules/mmsx/redux/hooks/useDashboard'
import { convertFilterParams } from '~/utils'

const DeviceStatus = ({ factory }) => {
  const { t } = useTranslation(['mmsx'])

  const { data, actions, isLoading } = useDashboardDeviceStatus()
  const [groupBy, setGroupBy] = useState(0)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const getData = useCallback(() => {
    const payload = {
      factoryIds: isEmpty(factory)
        ? undefined
        : factory?.map((item) => item?.id).toString(),
      filter: convertFilterParams({
        fromDate: startDate,
        toDate: endDate,
      }),
    }
    actions.getDeviceStatus(payload)
  }, [factory, endDate, startDate])

  useEffect(() => {
    getData()
  }, [getData])

  const handleChangeDate = (unit, { start, end }) => {
    setGroupBy(unit.value)
    setStartDate(start.toISOString())
    setEndDate(end.toISOString())
  }

  const dataChart = useMemo(
    () => [
      {
        type: t('dashboard.chart.totalPreventiveItem'),
        value: data?.totalPreventive || 0,
      },
      {
        type: t('dashboard.chart.totalInUseItem'),
        value: data?.totalUsing || 0,
      },
      {
        type: t('dashboard.chart.totalDamagedItem'),
        value: data?.totalBroken || 0,
      },

      {
        type: t('dashboard.chart.totalScrappingItem'),
        value: data?.totalAwaitClearance || 0,
      },
    ],
    [data],
  )

  const config = useMemo(() => {
    return {
      appendPadding: 10,
      data: dataChart,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      innerRadius: 0.7,
      height: 306,
      color: PIE_CHART_COLORS,
      legend: {
        marker: {
          symbol: 'square',
        },
        itemName: {
          style: {
            fontSize: 14,
          },
        },
      },
      label: {
        type: 'outer',
        offset: '-50%',
        style: {
          textAlign: 'center',
          fontSize: 14,
        },
        formatter: (data, mappingData) => {
          const G = G2.getEngine('canvas')
          const group = new G.Group({})
          group.addShape({
            type: 'text',
            attrs: {
              x: -5,
              y: 8,
              text: `${data.value}`,
              fill: mappingData.color,
            },
          })
          return group
        },
      },
      interactions: [
        {
          type: 'pie-legend-active',
        },
        {
          type: 'element-active',
        },
      ],
      statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          content: '',
        },
      },
    }
  }, [data])

  return (
    <Card sx={{ p: 2, position: 'relative', height: 490 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.chart.deviceStatus')}
        </Typography>
      </Box>
      <Box sx={{ height: 375 }}>
        <Pie {...config} data={dataChart} />
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

export default DeviceStatus
