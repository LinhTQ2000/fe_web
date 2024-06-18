import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import Summary from '~/components/Summary'
import { ACTIVE_STATUS, DEVICE_STATUS } from '~/modules/mmsx/constants'
import { useDashboardItemSummary } from '~/modules/mmsx/redux/hooks/useDashboard'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertNumberWithSISymbol } from '~/utils'
import qs from '~/utils/qs'

function ItemSummary({ factory }) {
  const { t } = useTranslation(['mmsx'])
  const theme = useTheme()
  const history = useHistory()
  const { search } = useLocation()

  const { data: summary, actions: actionsItemSummary } =
    useDashboardItemSummary()

  useEffect(() => {
    actionsItemSummary.getSummary({
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
    history.push(`${ROUTE.DEVICE_LIST.LIST.PATH}?${newSearch}`)
  }

  return (
    <Grid container spacing={2} columns={15}>
      <Grid item xs={5} md={5} lg={3}>
        <Summary
          icon="arrowBottom"
          label={t('dashboard.totalDevice')}
          value={convertNumberWithSISymbol(summary?.allDevice)}
          onClick={() => handleClick({ active: ACTIVE_STATUS.ACTIVE })}
        />
      </Grid>
      <Grid
        item
        xs={5}
        md={5}
        lg={3}
        sx={{
          '& p:last-of-type': {
            color: theme.palette.success.main,
          },
        }}
      >
        <Summary
          icon="rhombus"
          label={t('dashboard.using')}
          value={convertNumberWithSISymbol(summary?.usingDevice)}
          onClick={() =>
            handleClick({
              status: DEVICE_STATUS.USING,
              active: ACTIVE_STATUS.ACTIVE,
            })
          }
        />
      </Grid>
      <Grid
        item
        xs={5}
        md={5}
        lg={3}
        sx={{
          '& p:last-of-type': {
            color: theme.palette.primary.main,
          },
        }}
      >
        <Summary
          icon="bag"
          label={t('dashboard.preventive')}
          value={convertNumberWithSISymbol(summary?.preventiveDevice)}
          onClick={() =>
            handleClick({
              status: DEVICE_STATUS.PREVENTIVE,
              active: ACTIVE_STATUS.ACTIVE,
            })
          }
        />
      </Grid>
      <Grid
        item
        xs={5}
        md={5}
        lg={3}
        sx={{
          '& p:last-of-type': {
            color: theme.palette.error.main,
          },
        }}
      >
        <Summary
          icon="overdue"
          label={t('dashboard.damaged')}
          value={convertNumberWithSISymbol(summary?.brokenDevice)}
          onClick={() =>
            handleClick({
              status: DEVICE_STATUS.BROKEN,
              active: ACTIVE_STATUS.ACTIVE,
            })
          }
        />
      </Grid>
      <Grid
        item
        xs={5}
        md={5}
        lg={3}
        sx={{
          '& p:last-of-type': {
            color: theme.palette.secondary.main,
          },
        }}
      >
        <Summary
          icon="bin"
          label={t('dashboard.await')}
          value={convertNumberWithSISymbol(summary?.awaitClearanceDevice)}
          onClick={() =>
            handleClick({
              status: DEVICE_STATUS.AWAIT_CLEARANCE,
              active: ACTIVE_STATUS.ACTIVE,
            })
          }
        />
      </Grid>
    </Grid>
  )
}

export default ItemSummary
