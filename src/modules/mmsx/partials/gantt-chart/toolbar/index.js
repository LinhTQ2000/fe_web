import React, { useState } from 'react'

import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import Button from '~/components/Button'
import DateRangePicker from '~/components/DateRangePicker'
import { MAINTENANCE_PLAN_UNIT_TYPE_ENUM } from '~/modules/configuration/constants'
import { useGanttChart } from '~/modules/mmsx/redux/hooks/useGanttChart'
import { searchDeviceOfMaintenancePlanApi } from '~/modules/mmsx/redux/sagas/maintenance-plan/search'

const Toolbar = (props) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { maintenancePlanId, datePlan, maintenancePlanDetail } = useGanttChart()
  const [zoom, setZoom] = useState(t('general.months'))
  const selectZoom = (zoom) => {
    setZoom(zoom)
    props.onChangeZoom(zoom)
  }

  const CustomButton = ({ active, children, ...btnProps }) => (
    <Button
      variant="outlined"
      color="subText"
      sx={{
        borderRadius: 0,
        ...(active
          ? {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.grayF4.main,
            }
          : {}),
        '&:hover': {
          border: `1px solid ${theme.palette.grayF4.main}`,
          backgroundColor: theme.palette.grayF4.a5,
        },
      }}
      {...btnProps}
    >
      {children}
    </Button>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          '& button:first-of-type': {
            borderTopLeftRadius: '3px',
          },
          '& button:last-of-type': {
            borderTopRightRadius: '3px',
          },
          mb: 2,
        }}
      >
        {/* <CustomButton
            onClick={() => selectZoom(t('general.days'))}
            active={zoom === t('general.days')}
          >
            {t('days')}
          </CustomButton> */}
        <CustomButton
          onClick={() => {
            selectZoom(t('general.months'))
            props.onChangeTypeDate(MAINTENANCE_PLAN_UNIT_TYPE_ENUM.MONTH)
          }}
          active={zoom === t('general.months')}
        >
          {t('months')}
        </CustomButton>
        <CustomButton
          onClick={() => {
            selectZoom(t('general.years'))
            props.onChangeTypeDate(MAINTENANCE_PLAN_UNIT_TYPE_ENUM.YEAR)
          }}
          active={zoom === t('general.years')}
        >
          {t('years')}
        </CustomButton>
      </Box>
      <Autocomplete
        placeholder={t('mmsx:ganttChart.device')}
        uncontrolled
        sx={{ ml: 1, width: 300 }}
        asyncRequest={(s) =>
          searchDeviceOfMaintenancePlanApi({
            id: maintenancePlanId,
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
          })
        }
        asyncRequestHelper={(res) => res?.data?.items}
        getOptionLabel={(option) => option?.serial}
        getOptionSubLabel={(option) => option?.identificationNo}
        onChange={(val) => props.onChangePlanFilter(val?.id)}
      />
      <Box sx={{ ml: 1, width: 300 }}>
        <DateRangePicker
          value={datePlan}
          maxDate={new Date(maintenancePlanDetail?.planTo)}
          minDate={new Date(maintenancePlanDetail?.planFrom)}
          onChange={(val) => {
            if (val) {
              props.onChangeDatePlan(val)
            } else {
              props.onChangeDatePlan([null, null])
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default Toolbar
