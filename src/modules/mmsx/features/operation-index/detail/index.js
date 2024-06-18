import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min'

import { MODAL_MODE } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useOperationIndex from '~/modules/mmsx/redux/hooks/useOperationIndex'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'
import ItemSettingTable from '../form/item-setting-table'

export default function operationIndexDetail() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { id } = useParams()
  const { canAccess } = useApp()

  const { withSearch } = useQueryState()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const {
    data: { detail, isLoading },
    actions,
  } = useOperationIndex()
  const breadcrumbs = [
    {
      route: withSearch(ROUTE.OPERATION_INDEX.LIST.PATH),
      title: ROUTE.OPERATION_INDEX.LIST.TITLE,
    },
    {
      route: ROUTE.OPERATION_INDEX.DETAIL.PATH,
      title: ROUTE.OPERATION_INDEX.DETAIL.TITLE,
    },
  ]

  const refreshData = () => actions.getDetailOperationIndex(id)

  useEffect(() => {
    refreshData()
    return () => actions.resetOperationIndexState()
  }, [id])

  const backToList = () =>
    history.push(withSearch(ROUTE.OPERATION_INDEX.LIST.PATH))

  const onSubmitActive = () => {
    actions.inActiveOperationIndex(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeOperationIndex(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = detail?.active === ACTIVE_STATUS.ACTIVE
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_STATUS_OPERATION_INDEX}>
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
        <Guard code={FUNCTION_CODE.UPDATE_OPERATION_INDEX}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.OPERATION_INDEX.EDIT.PATH.replace(':id', id))
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
      title={t('menu.operationIndexDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_OPERATION_INDEX))
              history.push(ROUTE.OPERATION_INDEX.EDIT.PATH.replace(':id', id))
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
                    value={detail?.active}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('operationIndex.code')}
                value={detail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('operationIndex.name')}
                value={detail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('mmsx:deviceSynthesisReport.unit')}
                value={detail?.unit}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('operationIndex.factory')}
                value={detail?.factories
                  ?.map((factory) => factory.name)
                  .join(', ')}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <ItemSettingTable
          items={detail?.parameters?.map((item, index) => ({
            ...item,
            idx: index,
          }))}
          mode={MODAL_MODE.DETAIL}
        />
      </Box>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogActive
        open={isOpenActive}
        onCancel={() => setIsOpenActive(false)}
        onSubmit={onSubmitActive}
        tempItem={detail}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={detail}
      />
    </Page>
  )
}
