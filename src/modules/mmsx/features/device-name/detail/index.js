import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { useApp } from '~/common/hooks/useApp'
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
import useDeviceName from '~/modules/mmsx/redux/hooks/useDeviceName'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'

const breadcrumbs = [
  {
    route: ROUTE.DEVICE_NAME.LIST.PATH,
    title: ROUTE.DEVICE_NAME.LIST.TITLE,
  },
  {
    route: ROUTE.DEVICE_NAME.DETAIL.PATH,
    title: ROUTE.DEVICE_NAME.DETAIL.TITLE,
  },
]
function DeviceNameDetail() {
  const { t } = useTranslation(['database'])
  const { id } = useParams()
  const history = useHistory()
  const { canAccess } = useApp()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const {
    data: { deviceNameDetail, isLoading },
    actions,
  } = useDeviceName()

  const refreshData = () => {
    actions.getDetailDeviceName(id)
  }

  useEffect(() => {
    refreshData()
    return () => actions.resetDeviceNameState()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEVICE_NAME.LIST.PATH)
  }

  const onSubmitActive = () => {
    actions.inActiveDeviceName(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeDeviceName(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = deviceNameDetail?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_DEVICE_NAME}>
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
        <Guard code={FUNCTION_CODE.UPDATE_DEVICE_NAME}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.DEVICE_NAME.EDIT.PATH.replace(':id', id))
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
      title={t('menu.deviceNameDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_DEVICE_NAME))
              history.push(ROUTE.DEVICE_NAME.EDIT.PATH.replace(':id', id))
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
                    value={deviceNameDetail?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceName.code')}
                value={deviceNameDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceName.name')}
                value={deviceNameDetail?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('deviceName.description')}
                multiline
                value={deviceNameDetail?.description}
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
        tempItem={deviceNameDetail}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={deviceNameDetail}
      />
    </Page>
  )
}

export default DeviceNameDetail