import { useEffect } from 'react'

import { Card, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import Summary from '~/components/Summary'
import { DEVICE_REQUEST_STATUS } from '~/modules/mmsx/constants'
import { useDashboardTransferSummary } from '~/modules/mmsx/redux/hooks/useDashboard'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { useClasses } from '~/themes'
import { convertNumberWithSISymbol } from '~/utils'
import qs from '~/utils/qs'

import style from '../style'

function TransferSummary({ factory }) {
  const classes = useClasses(style)
  const { t } = useTranslation(['mmsx'])
  const theme = useTheme()
  const history = useHistory()
  const { search } = useLocation()

  const { data, actions } = useDashboardTransferSummary()

  useEffect(() => {
    actions.getTransferSummary({
      factoryIds: isEmpty(factory)
        ? undefined
        : factory?.map((item) => item?.id).toString(),
    })
  }, [factory])

  const handleClick = (filters) => {
    const newSearch = qs.add(
      search,
      {
        filters: JSON.stringify({
          ...filters,
          factoryIds: factory,
        }),
        page: 1,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    )
    history.push(`${ROUTE.TRANSFER_REQUEST.LIST.PATH}?${newSearch}`)
  }

  return (
    <Card sx={{ p: 2 }} className={classes.root}>
      <Typography variant="h2" sx={{ mb: 1 }}>
        {t('dashboard.transferRequest')}
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={10}
          lg={5}
          md={10}
          sx={{
            '& p': {
              color: theme.palette.status.pending.text,
            },
          }}
        >
          <Summary
            icon="pending"
            label={t('mmsx:general.waitingApprove')}
            value={convertNumberWithSISymbol(data?.awaiting)}
            onClick={() =>
              handleClick({ status: DEVICE_REQUEST_STATUS.WAITING_APPROVE })
            }
          />
        </Grid>
        <Grid
          item
          xs={10}
          lg={5}
          md={10}
          sx={{
            '& p': {
              color: theme.palette.status.active.text,
            },
          }}
        >
          <Summary
            icon="confirm"
            label={t('mmsx:general.confirmed')}
            value={convertNumberWithSISymbol(data?.confirmed)}
            onClick={() =>
              handleClick({ status: DEVICE_REQUEST_STATUS.CONFIRMED })
            }
          />
        </Grid>
        <Grid
          item
          xs={10}
          lg={5}
          md={10}
          sx={{
            '& p': {
              color: theme.palette.status.completed.text,
            },
          }}
        >
          <Summary
            icon="resolved"
            label={t('mmsx:general.completed')}
            value={convertNumberWithSISymbol(data?.completed)}
            onClick={() =>
              handleClick({ status: DEVICE_REQUEST_STATUS.COMPLETED })
            }
          />
        </Grid>
        <Grid
          item
          xs={10}
          lg={5}
          md={10}
          sx={{
            '& p': {
              color: theme.palette.status.rejected.text,
            },
          }}
        >
          <Summary
            icon="reject"
            label={t('mmsx:general.rejected')}
            value={convertNumberWithSISymbol(data?.rejected)}
            onClick={() =>
              handleClick({ status: DEVICE_REQUEST_STATUS.REJECTED })
            }
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default TransferSummary
