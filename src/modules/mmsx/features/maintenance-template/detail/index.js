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
import useMaintenanceTemplate from '~/modules/mmsx/redux/hooks/useMaintenanceTemplate'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'
import ItemSettingTable from '../form/item-setting-table'

function MaintenanceTemplateDetail() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const {
    data: { maintenanceTemplateDetails, isLoading },
    actions,
  } = useMaintenanceTemplate()
  const mode = MODAL_MODE.DETAIL

  const breadcrumbs = [
    {
      route: withSearch(ROUTE.MAINTENANCE_TEMPLATE.LIST.PATH),
      title: ROUTE.MAINTENANCE_TEMPLATE.LIST.TITLE,
    },
    {
      route: ROUTE.MAINTENANCE_TEMPLATE.DETAIL.PATH,
      title: ROUTE.MAINTENANCE_TEMPLATE.DETAIL.TITLE,
    },
  ]

  const refreshData = () => {
    actions.getDetailMaintenanceTemplate(id)
  }

  useEffect(() => {
    refreshData()
    return () => actions.resetMaintenanceTemplateState()
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.MAINTENANCE_TEMPLATE.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveMaintenanceTemplate(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeMaintenanceTemplate(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = maintenanceTemplateDetails?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_MAINTENANCE_TEMPLATE}>
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
        <Guard code={FUNCTION_CODE.UPDATE_MAINTENANCE_TEMPLATE}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(
                ROUTE.MAINTENANCE_TEMPLATE.EDIT.PATH.replace(':id', id),
              )
            }
          >
            {t('general:common.update')}
          </Button>
        </Guard>
      </Box>
    )
  }

  const formattedItems = maintenanceTemplateDetails?.details?.map(
    (item, index) => ({
      idx: index,
      id: item?.id,
      title: item?.title,
      type: item?.type,
      description: item?.description,
      periodTime: item?.periodTime,
      timeUnit: item?.timeUnit,
      checklistTemplate: item?.checklistTemplate,
      obligatory: item?.obligatory === OBLIGATORY_ENUM.YES,
    }),
  )

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.maintenanceTemplateDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_MAINTENANCE_TEMPLATE))
              history.push(
                ROUTE.MAINTENANCE_TEMPLATE.EDIT.PATH.replace(':id', id),
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
                    value={maintenanceTemplateDetails?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('accreditationTemplate.code')}
                value={maintenanceTemplateDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('accreditationTemplate.name')}
                value={maintenanceTemplateDetails?.name}
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
                    value={maintenanceTemplateDetails?.fileUrls}
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
                value={maintenanceTemplateDetails?.description}
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
        tempItem={maintenanceTemplateDetails}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={maintenanceTemplateDetails}
      />
    </Page>
  )
}

export default MaintenanceTemplateDetail
