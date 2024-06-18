import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

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
import useDefineFactory from '~/modules/database/redux/hooks/useDefineFactory'
import { ROUTE } from '~/modules/database/routes/config'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'

function DefineFactoryDetail() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const breadcrumbs = [
    {
      route: withSearch(ROUTE.DEFINE_FACTORY.LIST.PATH),
      title: ROUTE.DEFINE_FACTORY.LIST.TITLE,
    },
    {
      route: ROUTE.DEFINE_FACTORY.DETAIL.PATH,
      title: ROUTE.DEFINE_FACTORY.DETAIL.TITLE,
    },
  ]

  const {
    data: { isLoading, factoryDetails },
    actions,
  } = useDefineFactory()

  const refreshData = () => {
    actions.getFactoryDetailsById(id)
  }

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetFactoryDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.DEFINE_FACTORY.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveFactory(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeFactory(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = factoryDetails?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_FACTORY}>
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
        <Guard code={FUNCTION_CODE.UPDATE_FACTORY}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.DEFINE_FACTORY.EDIT.PATH.replace(':id', id))
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
      title={t('menu.defineFactoryDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess())
              history.push(ROUTE.DEFINE_FACTORY.EDIT.PATH.replace(':id', id))
          },
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('general:common.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={factoryDetails?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineFactory.code')} value={factoryDetails.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineFactory.location')}
                value={factoryDetails.location}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineFactory.name')} value={factoryDetails.name} />
            </Grid>
            {factoryDetails?.codeOnWfx && (
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceName.codeOnWfx')}
                  value={factoryDetails?.codeOnWfx}
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineFactory.phone')}
                value={factoryDetails.phone}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineFactory.regionName')}
                value={factoryDetails?.region?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineFactory.description')}
                multiline
                rows={3}
                value={factoryDetails.description}
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
        tempItem={factoryDetails}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={factoryDetails}
      />
    </Page>
  )
}

export default DefineFactoryDetail
