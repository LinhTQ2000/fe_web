import React, { useEffect, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import FileUploadButton from '~/components/FileUploadButton'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDefineInstallationTemplate from '~/modules/mmsx/redux/hooks/useDefineInstallationTemplate'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'
import ItemSettingTable from '../form/item-setting-table'

const DefineInstallationTemplateDetail = () => {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const mode = MODAL_MODE.DETAIL
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const breadcrumbs = [
    {
      route: withSearch(ROUTE.INSTALLATION_TEMPLATE.LIST.PATH),
      title: ROUTE.INSTALLATION_TEMPLATE.LIST.TITLE,
    },
    {
      route: ROUTE.INSTALLATION_TEMPLATE.DETAIL.PATH,
      title: ROUTE.INSTALLATION_TEMPLATE.DETAIL.TITLE,
    },
  ]

  const {
    data: { installDetail, isLoading },
    actions,
  } = useDefineInstallationTemplate()

  const refreshData = () => {
    actions.getDetailTemplateInstall(id)
  }

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetTempalteInstall()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.INSTALLATION_TEMPLATE.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveTemplateInstall(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeTemplateInstall(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = installDetail?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_INSTALLATION_TEMPLATE}>
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
        <Guard code={FUNCTION_CODE.UPDATE_INSTALLATION_TEMPLATE}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(
                ROUTE.INSTALLATION_TEMPLATE.EDIT.PATH.replace(':id', id),
              )
            }
          >
            {t('general:common.update')}
          </Button>
        </Guard>
      </Box>
    )
  }

  const items = installDetail?.details?.map((data) => ({
    title: data?.title?.trim(),
    description: data?.description?.trim(),
    isRequire: data?.obligatory === 1,
  }))
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.templateInstallDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_INSTALLATION_TEMPLATE))
              history.push(
                ROUTE.INSTALLATION_TEMPLATE.EDIT.PATH.replace(':id', id),
              )
          },
          onBack: backToList,
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
                    value={installDetail?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('templateInstall.form.field.code')}
                value={installDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('templateInstall.form.field.name')}
                value={installDetail?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={
                  <Typography variant="body2" mt={1}>
                    {t('general:fileUpload.title')}
                  </Typography>
                }
                value={
                  <FileUploadButton value={installDetail?.fileUrls} readOnly />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('templateInstall.form.field.description')}
                multiline
                rows={3}
                value={installDetail?.description}
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
        <ItemSettingTable items={items} mode={mode} />
      </Box>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogActive
        open={isOpenActive}
        onCancel={() => setIsOpenActive(false)}
        onSubmit={onSubmitActive}
        tempItem={installDetail}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={installDetail}
      />
    </Page>
  )
}

export default DefineInstallationTemplateDetail
