import React, { useEffect, useState } from 'react'

import { Box, Grid, Hidden } from '@mui/material'
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
import useDefineCompany from '~/modules/database/redux/hooks/useDefineCompany'
import { ROUTE } from '~/modules/database/routes/config'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'

function DefineCompanyDetail() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()

  const breadcrumbs = [
    // {
    //   title: 'database',
    // },
    {
      route: withSearch(ROUTE.DEFINE_COMPANY.LIST.PATH),
      title: ROUTE.DEFINE_COMPANY.LIST.TITLE,
    },
    {
      route: ROUTE.DEFINE_COMPANY.DETAIL.PATH,
      title: ROUTE.DEFINE_COMPANY.DETAIL.TITLE,
    },
  ]

  const {
    data: { isLoading, companyDetails },
    actions,
  } = useDefineCompany()

  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const refreshData = () => {
    actions.getCompanyDetailsById(id)
  }
  useEffect(() => {
    refreshData()
    return () => {
      actions.resetCompanyDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.DEFINE_COMPANY.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveCompany(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeCompany(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = companyDetails?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_COMPANY}>
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
        <Guard code={FUNCTION_CODE.UPDATE_COMPANY}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.DEFINE_COMPANY.EDIT.PATH.replace(':id', id))
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
      title={t('menu.defineCompanyDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_COMPANY))
              history.push(ROUTE.DEFINE_COMPANY.EDIT.PATH.replace(':id', id))
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
                    value={companyDetails?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineCompany.code')} value={companyDetails.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineCompany.tax')} value={companyDetails.taxNo} />
            </Grid>
            <Grid item lg={6} xs={12} variant="detail">
              <LV label={t('defineCompany.name')} value={companyDetails.name} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCompany.email')}
                value={companyDetails.email}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCompany.address')}
                value={companyDetails.address}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineCompany.fax')} value={companyDetails.fax} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCompany.phone')}
                value={companyDetails.phone}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCompany.user')}
                value={companyDetails.createdBy?.username}
              />
            </Grid>
            <Hidden lgDown>
              <Grid item lg={6} xs={12}></Grid>
            </Hidden>{' '}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCompany.createDate')}
                value={convertUtcDateTimeToLocalTz(companyDetails.createdAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineCompany.description')}
                multiline
                rows={3}
                value={companyDetails.description}
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
        tempItem={companyDetails}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={companyDetails}
      />
    </Page>
  )
}

export default DefineCompanyDetail
