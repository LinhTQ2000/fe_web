import { useEffect, useState } from 'react'

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
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  OBLIGATORY_ENUM,
  ACTIVE_STATUS,
  ACTIVE_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useAccreditationTemplate from '~/modules/mmsx/redux/hooks/useAccreditationTemplate'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'
import ItemSettingTable from '../form/items-setting-table'

function AccreditationTemplateDetail() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const mode = MODAL_MODE.DETAIL

  const breadcrumbs = [
    {
      route: withSearch(ROUTE.ACCREDITATION_TEMPLATE.LIST.PATH),
      title: ROUTE.ACCREDITATION_TEMPLATE.LIST.TITLE,
    },
    {
      route: ROUTE.ACCREDITATION_TEMPLATE.DETAIL.PATH,
      title: ROUTE.ACCREDITATION_TEMPLATE.DETAIL.TITLE,
    },
  ]

  const {
    data: { accreditationTemplateDetails, isLoading },
    actions,
  } = useAccreditationTemplate()

  const refreshData = () => {
    actions.getDetailAccreditationTemplate(id)
  }

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetAccreditationTemplateState()
    }
  }, [id])

  const formattedItems = accreditationTemplateDetails?.details?.map(
    (detail) => ({
      title: detail.title,
      description: detail.description,
      obligatory: detail.obligatory === OBLIGATORY_ENUM.YES,
    }),
  )

  const backToList = () => {
    history.push(withSearch(ROUTE.ACCREDITATION_TEMPLATE.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveAccreditationTemplate(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeAccreditationTemplate(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive =
      accreditationTemplateDetails?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_ACCREDITATION_TEMPLATE}>
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
        <Guard code={FUNCTION_CODE.UPDATE_ACCREDITATION_TEMPLATE}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(
                ROUTE.ACCREDITATION_TEMPLATE.EDIT.PATH.replace(':id', id),
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
      title={t('menu.accreditationTemplateDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_ACCREDITATION_TEMPLATE))
              history.push(
                ROUTE.ACCREDITATION_TEMPLATE.EDIT.PATH.replace(':id', id),
              )
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
                    value={accreditationTemplateDetails?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('accreditationTemplate.code')}
                value={accreditationTemplateDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('accreditationTemplate.name')}
                value={accreditationTemplateDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('accreditationTemplate.periodic')}
                value={`${accreditationTemplateDetails?.periodic} ${t(
                  'general:days',
                ).toLowerCase()}`}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={
                  <Typography variant="body2" mt={1}>
                    {t('general:fileUpload.title')}
                  </Typography>
                }
                value={
                  <FileUploadButton
                    value={accreditationTemplateDetails?.fileUrls}
                    readOnly
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('accreditationTemplate.description')}
                multiline
                rows={3}
                value={accreditationTemplateDetails?.description}
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
        tempItem={accreditationTemplateDetails}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={accreditationTemplateDetails}
      />
    </Page>
  )
}

export default AccreditationTemplateDetail
