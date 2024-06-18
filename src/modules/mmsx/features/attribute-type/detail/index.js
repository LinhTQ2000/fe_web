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
import useAttributeType from '~/modules/mmsx/redux/hooks/useAttributeType'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'

function AttributeTypeDetail() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()

  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const breadcrumbs = [
    {
      route: withSearch(ROUTE.ATTRIBUTE_TYPE.LIST.PATH),
      title: ROUTE.ATTRIBUTE_TYPE.LIST.TITLE,
    },
    {
      route: ROUTE.ATTRIBUTE_TYPE.DETAIL.PATH,
      title: ROUTE.ATTRIBUTE_TYPE.DETAIL.TITLE,
    },
  ]

  const {
    data: { attributeTypeDetail, isLoading },
    actions,
  } = useAttributeType()

  const refreshData = () => {
    actions.getAttributeType(id)
  }

  useEffect(() => {
    refreshData()
    return () => actions.resetStateAttrbuteType()
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.ATTRIBUTE_TYPE.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.inActiveAttributeType(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeAttributeType(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = attributeTypeDetail?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_ATTRIBUTE_TYPE}>
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
        <Guard code={FUNCTION_CODE.UPDATE_ATTRIBUTE_TYPE}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.ATTRIBUTE_TYPE.EDIT.PATH.replace(':id', id))
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
      title={t('menu.attributeTypeDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_ATTRIBUTE_TYPE))
              history.push(ROUTE.ATTRIBUTE_TYPE.EDIT.PATH.replace(':id', id))
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
                    value={attributeTypeDetail?.active}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('attributeType.table.code')}
                value={attributeTypeDetail?.code}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('attributeType.table.name')}
                value={attributeTypeDetail?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('attributeType.table.unit')}
                value={attributeTypeDetail?.unit?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('attributeType.form.description')}
                placeholder={t('attributeType.form.description')}
                multiline
                readOnly
                rows={3}
                value={attributeTypeDetail?.description}
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
        tempItem={attributeTypeDetail}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={attributeTypeDetail}
      />
    </Page>
  )
}

export default AttributeTypeDetail
