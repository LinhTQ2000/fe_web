import { useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import { REPORT_TYPE } from '~/modules/database/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useOperationValue from '~/modules/mmsx/redux/hooks/useOperationValue'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

export default function OperationValueDetail() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id, factoryId, startDate, endDate } = useParams()
  const { withSearch, quickFilters } = useQueryState()
  const { canAccess } = useApp()
  const { timeUnit = REPORT_TYPE.DAY } = quickFilters
  const {
    data: { isLoading, operationDetail },
    actions,
  } = useOperationValue()
  const breadcrumb = [
    { title: ROUTE.DEVICE_MANAGEMENT.TITLE },
    {
      route: withSearch(ROUTE.OPERATION_VALUE.LIST.PATH),
      title: ROUTE.OPERATION_VALUE.LIST.TITLE,
    },
    {
      route: ROUTE.OPERATION_VALUE.DETAIL.PATH,
      title: ROUTE.OPERATION_VALUE.DETAIL.TITLE,
    },
  ]

  const refreshData = () =>
    actions.getDetailOperationValue({ factoryId, startDate, endDate, id })

  useEffect(() => {
    refreshData()
    return () => actions.resetOperationValueDetail()
  }, [factoryId, startDate, endDate, id])

  const backToList = () =>
    history.push(withSearch(ROUTE.OPERATION_VALUE.LIST.PATH))

  const actionBefore = () => {
    return (
      startDate === endDate && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_OPERATION_VALUE}>
            <Button
              variant="outlined"
              icon="edit"
              onClick={() =>
                history.push(
                  ROUTE.OPERATION_VALUE.EDIT.PATH.replace(':id', id)
                    .replace(':factoryId', factoryId)
                    .replace(':startDate', startDate)
                    .replace(':endDate', endDate),
                )
              }
            >
              {t('general:common.update')}
            </Button>
          </Guard>
        </Box>
      )
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumb}
      title={t(`menu.${ROUTE.OPERATION_VALUE.DETAIL.TITLE}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_OPERATION_VALUE))
              history.push(
                ROUTE.OPERATION_VALUE.EDIT.PATH.replace(':id', id)
                  .replace(':factoryId', factoryId)
                  .replace(':startDate', startDate)
                  .replace(':endDate', endDate),
              )
          },
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('database:defineFactory.name')}
                value={operationDetail?.factory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('operationValue.declarationDate')}
                value={
                  !timeUnit || timeUnit === REPORT_TYPE.DAY
                    ? convertUtcDateToLocalTz(startDate)
                    : `${convertUtcDateToLocalTz(
                        startDate,
                      )} - ${convertUtcDateToLocalTz(endDate)} `
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {(operationDetail?.operationIndexes || []).map((item) => {
        const parameters = item?.parameters || []
        return (
          <Grid container justifyContent="center">
            <Grid item xl={11} xs={12}>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 11, xs: 12 }}
              >
                <Grid item xs={12}>
                  <Typography variant="h3" mt={2}>
                    {`${item?.name} (${item?.unit})`}
                  </Typography>
                </Grid>
                {parameters.map((parameter) => (
                  <Grid item xs={12} lg={6}>
                    <LabelValue
                      label={parameter?.name}
                      value={parameter?.value}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )
      })}
      <ActionBar onBack={backToList} elBefore={actionBefore} />
    </Page>
  )
}
