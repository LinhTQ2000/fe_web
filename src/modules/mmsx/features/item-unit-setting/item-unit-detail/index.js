import React, { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
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
import useItemUnit from '~/modules/database/redux/hooks/useItemUnit'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'

function ItemUnitDetail() {
  const { t } = useTranslation(['database'])
  const { id } = useParams()
  const history = useHistory()
  const { canAccess } = useApp()
  const { withSearch } = useQueryState()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const {
    data: { isLoading, itemUnitDetails },
    actions,
  } = useItemUnit()
  const breadcrumbs = [
    {
      route: withSearch(ROUTE.ITEM_UNIT.LIST.PATH),
      title: ROUTE.ITEM_UNIT.LIST.TITLE,
    },
    {
      route: ROUTE.ITEM_UNIT.DETAIL.PATH,
      title: ROUTE.ITEM_UNIT.DETAIL.TITLE,
    },
  ]

  const refreshData = () => {
    actions.getItemUnitDetailsById(id)
  }

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetItemUnitDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.ITEM_UNIT.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveItemUnit(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeItemUnit(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = itemUnitDetails?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_UNIT}>
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
        <Guard code={FUNCTION_CODE.UPDATE_UNIT}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.ITEM_UNIT.EDIT.PATH.replace(':id', id))
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
      title={t('menu.itemUnitDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_UNIT))
              history.push(ROUTE.ITEM_UNIT.EDIT.PATH.replace(':id', id))
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
                    value={itemUnitDetails?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('itemUnitDefine.code')}
                value={itemUnitDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('itemUnitDefine.name')}
                value={itemUnitDetails?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('itemUnitDefine.description')}
                multiline
                value={itemUnitDetails.description}
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
        tempItem={itemUnitDetails}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={itemUnitDetails}
      />
    </Page>
  )
}
export default ItemUnitDetail
