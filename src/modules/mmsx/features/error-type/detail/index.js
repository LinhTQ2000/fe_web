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
import {
  ERROR_TYPE_PRIORITY_OPTION,
  ACTIVE_STATUS,
  ACTIVE_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useErrorType from '~/modules/mmsx/redux/hooks/useErrorType'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'

function ErrorTypeDetail() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { id } = useParams()
  const { canAccess } = useApp()
  const { withSearch } = useQueryState()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const breadcrumbs = [
    {
      route: withSearch(ROUTE.ERROR_TYPE.LIST.PATH),
      title: ROUTE.ERROR_TYPE.LIST.TITLE,
    },
    {
      title: ROUTE.ERROR_TYPE.DETAIL.TITLE,
    },
  ]

  const {
    data: { errorTypeDetails, isLoading },
    actions,
  } = useErrorType()

  const refreshData = () => {
    actions.getErrorTypeDetailsById(id)
  }

  useEffect(() => {
    refreshData()
    return () => actions.resetErrorTypeDetailsState()
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.ERROR_TYPE.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveErrorType(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeErrorType(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = errorTypeDetails?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_ERROR_TYPE}>
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
        <Guard code={FUNCTION_CODE.UPDATE_ERROR_TYPE}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.ERROR_TYPE.EDIT.PATH.replace(':id', id))
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
      title={t('menu.errorTypeDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_ERROR_TYPE))
              history.push(ROUTE.ERROR_TYPE.EDIT.PATH.replace(':id', id))
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
                    value={errorTypeDetails?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('errorType.code')}
                value={errorTypeDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('errorType.name')}
                value={errorTypeDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('errorType.priority')}
                value={
                  <Status
                    options={ERROR_TYPE_PRIORITY_OPTION}
                    value={errorTypeDetails?.priority}
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('errorType.description')}
                multiline
                rows={3}
                value={errorTypeDetails?.description}
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
        tempItem={errorTypeDetails}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={errorTypeDetails}
      />
    </Page>
  )
}

export default ErrorTypeDetail
