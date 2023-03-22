import { useEffect, useState } from 'react'

import {
  Box,
  Checkbox,
  FormControlLabel,
  Popover,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { usePage } from '~/components/Page/hook/usePage'
import usePageSetting from '~/components/Page/hook/usePageSetting'
import { DASHBOARD_CHART_OPTION } from '~/modules/mmsx/constants'
import { useClasses } from '~/themes'

import style from './style'

function PageSetting() {
  const classes = useClasses(style)
  const [anchorEl, setAnchorEl] = useState(null)
  const { t } = useTranslation()

  const { setPageSetting } = usePageSetting()
  const { visibleCharts, setVisibleCharts } = usePage()

  const onApplySetting = (cols = []) => {
    setVisibleCharts(cols)
  }

  useEffect(() => {
    setPageSetting(visibleCharts)
  }, [visibleCharts])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Box className={classes.root}>
      <Button icon="setting" color="grayEE" onClick={handleClick} />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          variant: 'caret',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box className={classes.formContainer}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {t('setting.title')}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={visibleCharts.length === DASHBOARD_CHART_OPTION.length}
                indeterminate={
                  visibleCharts.length !== DASHBOARD_CHART_OPTION.length &&
                  visibleCharts.length !== 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    onApplySetting(
                      DASHBOARD_CHART_OPTION.map((chart) => chart.id),
                    )
                  } else {
                    onApplySetting([])
                  }
                }}
              />
            }
            label={t('dataTable.showAllColumns')}
          />
          {DASHBOARD_CHART_OPTION.map((chart, idx) => {
            return (
              <Box key={chart.id || idx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={visibleCharts.includes(chart.id)}
                      onChange={(e) => {
                        if (e.target.checked)
                          onApplySetting([...visibleCharts, chart.id])
                        else
                          onApplySetting(
                            visibleCharts.filter((col) => col !== chart.id),
                          )
                      }}
                    />
                  }
                  label={t(chart.text)}
                />
              </Box>
            )
          })}
        </Box>
      </Popover>
    </Box>
  )
}

export default PageSetting
