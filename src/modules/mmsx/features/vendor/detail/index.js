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
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDefineVendor from '~/modules/mmsx/redux/hooks/useDefineVendor'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'

const DefineVendorDetail = () => {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { id } = useParams()
  const { canAccess } = useApp()
  const { withSearch } = useQueryState()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const {
    data: { isLoading, vendorDetails },
    actions,
  } = useDefineVendor()

  const breadcrumbs = [
    {
      route: withSearch(ROUTE.DEFINE_VENDOR.LIST.PATH),
      title: ROUTE.DEFINE_VENDOR.LIST.TITLE,
    },
    {
      route: ROUTE.DEFINE_VENDOR.DETAIL.PATH,
      title: ROUTE.DEFINE_VENDOR.DETAIL.TITLE,
    },
  ]

  const refreshData = () => {
    actions.getVendorDetailsById(id)
  }

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetDetailVendorState()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.DEFINE_VENDOR.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveVendor(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeVendor(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = vendorDetails?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_VENDOR}>
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
        <Guard code={FUNCTION_CODE.UPDATE_VENDOR}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.DEFINE_VENDOR.EDIT.PATH.replace(':id', id))
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
      title={t('menu.defineVendorDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_VENDOR))
              history.push(ROUTE.DEFINE_VENDOR.EDIT.PATH.replace(':id', id))
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
                    value={vendorDetails?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineVendor.code')} value={vendorDetails.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineVendor.name')} value={vendorDetails.name} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineVendor.address')}
                value={vendorDetails.address}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineVendor.phone')} value={vendorDetails.phone} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineVendor.contactUser')}
                value={vendorDetails.contactUser}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineVendor.email')} value={vendorDetails.email} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineVendor.fax')} value={vendorDetails.fax} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineVendor.taxNo')}
                value={vendorDetails.taxCode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineVendor.description')}
                multiline
                rows={3}
                value={vendorDetails?.description}
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
        tempItem={vendorDetails}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={vendorDetails}
      />
    </Page>
  )
}

export default DefineVendorDetail
