import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useMaintenanceAttribute from '~/modules/mmsx/redux/hooks/useMaintenanceAttribute'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'

function MaintenanceAttributeDetail() {
  const { t } = useTranslation(['database'])
  const { id } = useParams()
  const history = useHistory()
  const { withSearch } = useQueryState()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const {
    data: { maintenanceAttributeDetails, isLoading },
    actions,
  } = useMaintenanceAttribute()

  const breadcrumbs = [
    {
      route: withSearch(ROUTE.MAINTENANCE_ATTRIBUTE.LIST.PATH),
      title: ROUTE.MAINTENANCE_ATTRIBUTE.LIST.TITLE,
    },
    {
      route: ROUTE.MAINTENANCE_ATTRIBUTE.DETAIL.PATH,
      title: ROUTE.MAINTENANCE_ATTRIBUTE.DETAIL.TITLE,
    },
  ]

  const refreshData = () => {
    actions.getDetailMaintenanceAttribute(id)
  }

  useEffect(() => {
    refreshData()
    return () => actions.resetMaintenanceAttributeState()
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.MAINTENANCE_ATTRIBUTE.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveMaintenanceAttribute(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeMaintenanceAttribute(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive =
      maintenanceAttributeDetails?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_MAINTENANCE_ATTRIBUTE}>
          {!isActive && (
            <Button
              variant="outlined"
              icon="inActive"
              onClick={() => setIsOpenInActive(true)}
              color="success"
            >
              {t('general:common.active')}
            </Button>
          )}
          {isActive && (
            <Button
              variant="outlined"
              icon="active"
              onClick={() => setIsOpenActive(true)}
              color="error"
            >
              {t('general:common.inActive')}
            </Button>
          )}
        </Guard>
        <Guard code={FUNCTION_CODE.UPDATE_MAINTENANCE_ATTRIBUTE}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(
                ROUTE.MAINTENANCE_ATTRIBUTE.EDIT.PATH.replace(':id', id),
              )
            }
          >
            {t('general:common.update')}
          </Button>
        </Guard>
      </Box>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.maintenanceAttributeDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (FUNCTION_CODE.UPDATE_MAINTENANCE_ATTRIBUTE) {
              history.push(
                ROUTE.MAINTENANCE_ATTRIBUTE.EDIT.PATH.replace(':id', id),
              )
            }
          },
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LabelValue
                label={t('general:common.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={maintenanceAttributeDetails?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('maintenanceAttribute.table.code')}
                value={maintenanceAttributeDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('maintenanceAttribute.table.name')}
                value={maintenanceAttributeDetails?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('maintenanceAttribute.table.description')}
                multiline
                value={maintenanceAttributeDetails?.description}
                rows={3}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogActive
        open={isOpenActive}
        onCancel={() => setIsOpenActive(false)}
        onSubmit={onSubmitActive}
        tempItem={maintenanceAttributeDetails}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={maintenanceAttributeDetails}
      />
    </Page>
  )
}

export default MaintenanceAttributeDetail
