import React, { useEffect, useState } from 'react'

import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

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
import {
  ACTIVE_STATUS,
  ACTIVE_STATUS_MAP,
  ACTIVE_STATUS_OPTIONS,
  FIELDS_LOG_HISTORY,
  FIELDS_LOG_HISTORY_MAP,
  HISTORY_ACTION,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import Activities from '~/modules/mmsx/partials/Activities'
import useDefineSupplies from '~/modules/mmsx/redux/hooks/useDefineSupplies'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz, convertWithCommas } from '~/utils'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'

const DefineSuppliesDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const breadcrumbs = [
    {
      title: 'deviceManagement',
    },
    {
      route: withSearch(ROUTE.DEFINE_SUPPLIES.LIST.PATH),
      title: ROUTE.DEFINE_SUPPLIES.LIST.TITLE,
    },
    {
      route: ROUTE.DEFINE_SUPPLIES.DETAIL.PATH,
      title: ROUTE.DEFINE_SUPPLIES.DETAIL.TITLE,
    },
  ]

  const {
    data: { suppliesDetail, isLoading },
    actions,
  } = useDefineSupplies()

  const refreshData = () => actions.getSupplies(id)

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetSupplies()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.DEFINE_SUPPLIES.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveSupplies(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeSupplies(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = suppliesDetail?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_SUPPLY}>
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
        <Guard code={FUNCTION_CODE.UPDATE_SUPPLY}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.DEFINE_SUPPLIES.EDIT.PATH.replace(':id', id))
            }
          >
            {t('general:common.update')}
          </Button>
        </Guard>
      </Box>
    )
  }

  const getHistory = () => {
    const histories = []
    suppliesDetail?.histories?.forEach((element) => {
      if (element.action === HISTORY_ACTION.CREATE) {
        histories.push({
          content: t('supplies.created'),
          createdAt: element?.createdAt,
          id: element?.id,
          username: element?.createdBy?.username,
        })
      } else {
        histories.push({
          createdAt: element?.createdAt,
          id: element?.id,
          username: element?.createdBy?.username,
          content: () => {
            return (
              <>
                <Typography>{t('supplies.update')}</Typography>
                <List sx={{ padding: 0 }}>
                  {(element?.contents || []).map((value, index) => (
                    <ListItem key={value?.valueField || index}>
                      <ListItemText
                        sx={{ margin: 0 }}
                        primary={
                          value?.valueField === FIELDS_LOG_HISTORY.ACTIVE
                            ? `${t(
                                FIELDS_LOG_HISTORY_MAP[value?.valueField],
                              )}: ${t(
                                ACTIVE_STATUS_MAP[value?.oldValue],
                              )} -> ${t(ACTIVE_STATUS_MAP[value?.newValue])}`
                            : `${t(
                                FIELDS_LOG_HISTORY_MAP[value?.valueField],
                              )}: ${
                                value?.oldObjectValue?.name ||
                                value?.oldValue ||
                                t('general:common.null')
                              } -> ${
                                value?.newObjectValue?.name ||
                                value?.newValue ||
                                t('general:common.null')
                              }`
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )
          },
        })
      }
    })
    return histories
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.suppliesDetail')}
      onBack={backToList}
      loading={isLoading}
      freeSolo
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_SUPPLY))
              history.push(ROUTE.DEFINE_SUPPLIES.EDIT.PATH.replace(':id', id))
          },
        }}
      />
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12}>
                <LV
                  label={t('deviceCategory.form.status')}
                  value={
                    <Status
                      options={ACTIVE_STATUS_OPTIONS}
                      value={suppliesDetail?.active}
                    />
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('supplies.form.field.code')}
                  value={suppliesDetail?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('supplies.form.field.categoryId')}
                  value={suppliesDetail?.supplyGroup?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('supplies.form.field.name')}
                  value={suppliesDetail?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('supplies.form.field.nameOther')}
                  value={suppliesDetail?.nameOther}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('supplies.form.field.type')}
                  value={suppliesDetail?.supplyType?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('supplies.category.supplier')}
                  value={suppliesDetail?.vendor?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('supplies.form.field.unit')}
                  value={suppliesDetail?.unit?.name}
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('supplies.form.field.price')}
                  value={
                    suppliesDetail?.price
                      ? `${convertWithCommas(suppliesDetail?.price)} ${t(
                          'common.suffix.denominations',
                        )}`
                      : ''
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('supplies.form.field.dateAdded')}
                  value={convertUtcDateToLocalTz(suppliesDetail?.createdAt)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('supplies.form.field.description')}
                  multiline
                  rows={3}
                  value={suppliesDetail?.description}
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
          tempItem={suppliesDetail}
        />
        <DialogInActive
          open={isOpenInActive}
          onCancel={() => setIsOpenInActive(false)}
          onSubmit={onSubmitInActive}
          tempItem={suppliesDetail}
        />
      </Paper>
      <Activities data={getHistory()} />
    </Page>
  )
}

export default DefineSuppliesDetail
