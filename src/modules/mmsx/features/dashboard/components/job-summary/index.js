import { useEffect } from 'react'

import { Card, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import Summary from '~/components/Summary'
import { JOB_STATUS, OVERDUE_STATUS } from '~/modules/mmsx/constants'
import { useDashboardJobSummary } from '~/modules/mmsx/redux/hooks/useDashboard'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { useClasses } from '~/themes'
import { convertNumberWithSISymbol } from '~/utils'
import qs from '~/utils/qs'

import style from '../style'

function JobSummary({ factory }) {
  const { t } = useTranslation(['mmsx'])
  const classes = useClasses(style)
  const history = useHistory()
  const { search } = useLocation()
  const theme = useTheme()
  const { data, actions } = useDashboardJobSummary()

  useEffect(() => {
    actions.getJobSummary({
      factoryIds: isEmpty(factory)
        ? undefined
        : factory?.map((item) => item?.id).toString(),
    })
  }, [factory])

  const handleClick = (filters) => {
    const newSearch = qs.add(
      search,
      {
        quickFilters: JSON.stringify({
          ...filters,
          factoryIds: factory,
        }),
        filters: JSON.stringify({
          factoryIds: factory,
        }),
        page: 1,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    )
    history.push(`${ROUTE.JOB.LIST.PATH}?${newSearch}`)
  }

  return (
    <Card sx={{ p: 2, height: 490 }} className={classes.root}>
      <Typography variant="h2" textAlign="center">
        {t('dashboard.allJob')}
      </Typography>
      <Typography
        sx={{ fontSize: 38, fontWeight: 700, lineHeight: 1, mb: 1, mt: 1 }}
        textAlign="center"
      >
        {convertNumberWithSISymbol(data?.allJob)}
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={10}
          lg={10}
          md={10}
          sx={{
            '& p': {
              color: theme.palette.status.default.text,
            },
          }}
        >
          <Summary
            icon="nonAssign"
            label={t('common.statusList.nonAssign')}
            value={convertNumberWithSISymbol(data?.nonAssignJob)}
            onClick={() =>
              handleClick({
                status: JOB_STATUS.NON_ASSIGN,
                isOverdue: OVERDUE_STATUS.ALL,
              })
            }
          />
        </Grid>
        <Grid
          item
          xs={10}
          lg={10}
          md={10}
          sx={{
            '& p': {
              color: theme.palette.status.pending.text,
            },
          }}
        >
          <Summary
            icon="pending"
            label={t('common.statusList.waitingToComfirm')}
            value={convertNumberWithSISymbol(data?.waitConfirmJob)}
            onClick={() =>
              handleClick({
                status: JOB_STATUS.WAIT_CONFIRM,
                isOverdue: OVERDUE_STATUS.ALL,
              })
            }
          />
        </Grid>
        <Grid
          item
          xs={10}
          lg={10}
          md={10}
          sx={{
            '& p': {
              color: theme.palette.status.inProgress.text,
            },
          }}
        >
          <Summary
            icon="inProgress"
            label={t('common.statusList.inProgress')}
            value={convertNumberWithSISymbol(data?.inProgressJob)}
            onClick={() =>
              handleClick({
                status: JOB_STATUS.IN_PROGRESS,
                isOverdue: OVERDUE_STATUS.ALL,
              })
            }
          />
        </Grid>
        <Grid
          item
          xs={10}
          lg={10}
          md={10}
          sx={{
            '& p': {
              color: theme.palette.status.active.text,
            },
          }}
        >
          <Summary
            icon="completed"
            label={t('common.statusList.completed')}
            value={convertNumberWithSISymbol(data?.completedJob)}
            onClick={() =>
              handleClick({
                status: JOB_STATUS.COMPLETED,
                isOverdue: OVERDUE_STATUS.ALL,
              })
            }
          />
        </Grid>
        <Grid
          item
          xs={10}
          lg={10}
          md={10}
          sx={{
            '& p': {
              color: theme.palette.status.completed.text,
            },
          }}
        >
          <Summary
            icon="resolved"
            label={t('common.statusList.resolved')}
            value={convertNumberWithSISymbol(data?.resolvedJob)}
            onClick={() =>
              handleClick({
                status: JOB_STATUS.RESOLVED,
                isOverdue: OVERDUE_STATUS.ALL,
              })
            }
          />
        </Grid>
        <Grid
          item
          xs={10}
          lg={10}
          md={10}
          sx={{
            '& p': {
              color: theme.palette.status.rejected.text,
            },
          }}
        >
          <Summary
            icon="overdue"
            label={t('common.statusList.overdue')}
            value={convertNumberWithSISymbol(data?.isOverdueJob)}
            onClick={() =>
              handleClick({
                isOverdue: OVERDUE_STATUS.YES,
              })
            }
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default JobSummary
