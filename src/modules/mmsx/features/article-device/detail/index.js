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
import TextField from '~/components/TextField'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useArticleDevice from '~/modules/mmsx/redux/hooks/useArticleDevice'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'

function ArticleDeviceDetail() {
  const { t } = useTranslation(['database'])
  const { id } = useParams()
  const history = useHistory()
  const { canAccess } = useApp()
  const { withSearch } = useQueryState()
  const {
    data: { articleDeviceDetails, isLoading },
    actions,
  } = useArticleDevice()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const breadcrumbs = [
    {
      route: withSearch(ROUTE.ARTICLE_DEVICE.LIST.PATH),
      title: ROUTE.ARTICLE_DEVICE.LIST.TITLE,
    },
    {
      route: ROUTE.ARTICLE_DEVICE.DETAIL.PATH,
      title: ROUTE.ARTICLE_DEVICE.DETAIL.TITLE,
    },
  ]

  const refreshData = () => {
    actions.getDetailArticleDevice(id)
  }

  useEffect(() => {
    refreshData()
    return () => actions.resetArticleDeviceState()
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.ARTICLE_DEVICE.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveArticleDevice(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeArticleDevice(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = articleDeviceDetails?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_ARTICLE_DEVICE_GROUP}>
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
        <Guard code={FUNCTION_CODE.UPDATE_ARTICLE_DEVICE_GROUP}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.ARTICLE_DEVICE.EDIT.PATH.replace(':id', id))
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
      title={t('menu.articleDeviceDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_ARTICLE_DEVICE_GROUP))
              history.push(ROUTE.ARTICLE_DEVICE.EDIT.PATH.replace(':id', id))
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
                    value={articleDeviceDetails?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('articleDevice.code')}
                value={articleDeviceDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('articleDevice.name')}
                value={articleDeviceDetails?.name}
              />
            </Grid>
            {articleDeviceDetails?.codeOnWfx && (
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('deviceName.codeOnWfx')}
                  value={articleDeviceDetails?.codeOnWfx}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('articleDevice.description')}
                multiline
                value={articleDeviceDetails?.description}
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
        tempItem={articleDeviceDetails}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={articleDeviceDetails}
      />
    </Page>
  )
}

export default ArticleDeviceDetail
