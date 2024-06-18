import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import {
  OBLIGATORY_ENUM,
  ACTIVE_STATUS,
  ACTIVE_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDeviceGroup from '~/modules/mmsx/redux/hooks/useDeviceGroup'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'
import TableInfo from './table-info'
import TableMaintenance from './table-maintanence'

function DeviceGroupDetail() {
  const { t } = useTranslation(['database'])
  const { id } = useParams()
  const history = useHistory()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const breadcrumbs = [
    {
      route: withSearch(ROUTE.DEVICE_GROUP.LIST.PATH),
      title: ROUTE.DEVICE_GROUP.LIST.TITLE,
    },
    {
      route: ROUTE.DEVICE_GROUP.DETAIL.PATH,
      title: ROUTE.DEVICE_GROUP.DETAIL.TITLE,
    },
  ]

  const {
    data: { deviceGroupDetails, isLoading },
    actions,
  } = useDeviceGroup()

  const refreshData = () => {
    actions.getDetailDeviceGroup(id)
  }

  useEffect(() => {
    refreshData()
    return () => actions.resetDeviceGroupState()
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.DEVICE_GROUP.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveDeviceGroup(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeDeviceGroup(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = deviceGroupDetails?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_DEVICE_GROUP}>
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
        <Guard code={FUNCTION_CODE.UPDATE_DEVICE_GROUP}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.DEVICE_GROUP.EDIT.PATH.replace(':id', id))
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
      title={t('menu.deviceGroupDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_DEVICE_GROUP))
              history.push(ROUTE.DEVICE_GROUP.EDIT.PATH.replace(':id', id))
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
                    value={deviceGroupDetails?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceGroup.code')}
                value={deviceGroupDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceGroup.name')}
                value={deviceGroupDetails?.name}
              />
            </Grid>
            {deviceGroupDetails?.codeOnWfx && (
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('deviceName.codeOnWfx')}
                  value={deviceGroupDetails?.codeOnWfx}
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceGroup.deviceType')}
                value={deviceGroupDetails?.deviceType?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceGroup.symbol')}
                value={deviceGroupDetails?.symbol}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceGroup.deviceCategory')}
                value={deviceGroupDetails?.articleDeviceGroup?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceGroup.maintenanceProperty')}
                value={deviceGroupDetails?.maintenanceAttribute?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceGroup.frequency')}
                value={`${deviceGroupDetails?.frequency} ${
                  deviceGroupDetails?.maintenanceAttribute?.name
                }/${t('general:minutes')}`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceGroup.guideTemplate')}
                value={deviceGroupDetails?.maintenanceTemplate?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceGroup.installationTemplate')}
                value={deviceGroupDetails?.installationTemplate?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceGroup.accreditationTemplate')}
                value={deviceGroupDetails?.accreditationTemplate?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceGroup.errorType')}
                value={deviceGroupDetails?.errorTypes
                  ?.map((err) => err?.name)
                  .join(', ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceGroup.attributeType')}
                value={deviceGroupDetails?.attributeTypes
                  ?.map((att) => att?.name)
                  .join(', ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceGroup.updateStatus')}
                value={
                  deviceGroupDetails?.canUpdateStatus === OBLIGATORY_ENUM.YES
                    ? t('deviceGroup.yes')
                    : t('deviceGroup.no')
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Tabs
          list={[
            t('deviceGroup.tableInfo.title'),
            t('deviceGroup.tableMaintenance.title'),
          ]}
          sx={{ mt: 3 }}
        >
          <TableInfo items={deviceGroupDetails?.supplies} />
          <TableMaintenance items={deviceGroupDetails} />
        </Tabs>
      </Grid>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogActive
        open={isOpenActive}
        onCancel={() => setIsOpenActive(false)}
        onSubmit={onSubmitActive}
        tempItem={deviceGroupDetails}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={deviceGroupDetails}
      />
    </Page>
  )
}

export default DeviceGroupDetail
