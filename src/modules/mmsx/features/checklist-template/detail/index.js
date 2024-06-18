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
import {
  OBLIGATORY_ENUM,
  ACTIVE_STATUS,
  ACTIVE_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useTemplateChecklist from '~/modules/mmsx/redux/hooks/useTemplateChecklist'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'
import ItemSettingTable from '../form/items-setting-table'

const TemplateChecklistDetail = () => {
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
      route: withSearch(ROUTE.TEMPLATE_CHECKLIST.LIST.PATH),
      title: ROUTE.TEMPLATE_CHECKLIST.LIST.TITLE,
    },
    {
      route: ROUTE.TEMPLATE_CHECKLIST.DETAIL.PATH,
      title: ROUTE.TEMPLATE_CHECKLIST.DETAIL.TITLE,
    },
  ]

  const {
    data: { templateChecklistDetail, isLoading },
    actions,
  } = useTemplateChecklist()

  const refreshData = () => {
    actions.getTemplateCheckList(id)
  }

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetTemplateChecklist()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.TEMPLATE_CHECKLIST.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveTemplateChecklist(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeTemplateChecklist(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = templateChecklistDetail?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_CHECKLIST_TEMPLATE}>
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
        <Guard code={FUNCTION_CODE.UPDATE_CHECKLIST_TEMPLATE}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(
                ROUTE.TEMPLATE_CHECKLIST.EDIT.PATH.replace(':id', id),
              )
            }
          >
            {t('general:common.update')}
          </Button>
        </Guard>
      </Box>
    )
  }

  const formattedItems = templateChecklistDetail?.details?.map((detail) => ({
    title: detail.title,
    descriptionDetail: detail.description,
    obligatory: detail.obligatory === OBLIGATORY_ENUM.YES ? true : false,
  }))

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.templateChecklistDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_STATUS_CHECKLIST_TEMPLATE))
              history.push(
                ROUTE.TEMPLATE_CHECKLIST.EDIT.PATH.replace(':id', id),
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
                    value={templateChecklistDetail?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('templateChecklist.form.code')}
                value={templateChecklistDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('templateChecklist.form.name')}
                value={templateChecklistDetail?.name}
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
                  <FileUploadButton
                    value={templateChecklistDetail?.fileUrls}
                    readOnly
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('templateChecklist.form.description')}
                multiline
                rows={3}
                value={templateChecklistDetail?.description}
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
        tempItem={templateChecklistDetail}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={templateChecklistDetail}
      />
    </Page>
  )
}

export default TemplateChecklistDetail