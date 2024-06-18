import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { map } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useMaintenanceTeam from '~/modules/mmsx/redux/hooks/useMaintenanceTeam'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'
import ItemSettingTable from '../form/items-setting-table'

const MaintenanceTeamDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const mode = MODAL_MODE.DETAIL
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const breadcrumbs = [
    {
      route: withSearch(ROUTE.MAINTENANCE_TEAM.LIST.PATH),
      title: ROUTE.MAINTENANCE_TEAM.LIST.TITLE,
    },
    {
      route: ROUTE.MAINTENANCE_TEAM.DETAIL.PATH,
      title: ROUTE.MAINTENANCE_TEAM.DETAIL.TITLE,
    },
  ]

  const {
    data: { maintenanceTeamDetail, isLoading },
    actions,
  } = useMaintenanceTeam()
  const refreshData = () => {
    actions.getDetailMaintenanceTeamStart(id)
  }

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetMaintenanceTeam()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.MAINTENANCE_TEAM.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveMaintenanceTeam(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeMaintenanceTeam(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = maintenanceTeamDetail?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_MAINTENANCE_TEAM}>
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
        <Guard code={FUNCTION_CODE.UPDATE_MAINTENANCE_TEAM}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.MAINTENANCE_TEAM.EDIT.PATH.replace(':id', id))
            }
          >
            {t('general:common.update')}
          </Button>
        </Guard>
      </Box>
    )
  }

  const formattedItems = maintenanceTeamDetail?.members?.map((item) => ({
    username: item?.username,
    role: item?.role,
    areas: item?.areas,
    deviceGroups: item?.deviceGroups,
  }))

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.maintenanceTeamDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_MAINTENANCE_TEAM))
              history.push(ROUTE.MAINTENANCE_TEAM.EDIT.PATH.replace(':id', id))
          },
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV label={t('common.status')}>
                <Status
                  options={ACTIVE_STATUS_OPTIONS}
                  value={maintenanceTeamDetail?.active}
                />
              </LV>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('maintenanceTeam.team.code')}
                value={maintenanceTeamDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('maintenanceTeam.team.name')}
                value={maintenanceTeamDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('maintenanceTeam.factory')}
                value={maintenanceTeamDetail?.factory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('maintenanceTeam.team.deviceGroup')}
                value={map(maintenanceTeamDetail?.deviceGroups, 'name').join(
                  ', ',
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('maintenanceTeam.team.area')}
                value={map(maintenanceTeamDetail?.areas, 'name').join(', ')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('maintenanceTeam.team.description')}
                multiline
                rows={3}
                value={maintenanceTeamDetail?.description}
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
      <Box sx={{ mt: 3 }}>
        <ItemSettingTable items={formattedItems || []} mode={mode} />
      </Box>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogActive
        open={isOpenActive}
        onCancel={() => setIsOpenActive(false)}
        onSubmit={onSubmitActive}
        tempItem={maintenanceTeamDetail}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={maintenanceTeamDetail}
      />
    </Page>
  )
}

export default MaintenanceTeamDetail
