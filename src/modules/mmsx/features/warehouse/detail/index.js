import { useEffect } from 'react'

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
import TextField from '~/components/TextField'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useWarehouseDefine from '~/modules/mmsx/redux/hooks/useWarehouseDefine'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemSettingTable from './item-setting-table'

function WarehouseDefineDetail() {
  const { t } = useTranslation(['mmsx'])
  const { id } = useParams()
  const history = useHistory()
  const { canAccess } = useApp()
  const { withSearch } = useQueryState()

  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE.TITLE,
    },
    {
      route: withSearch(ROUTE.WAREHOUSE_DEFINE.LIST.PATH),
      title: ROUTE.WAREHOUSE_DEFINE.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_DEFINE.DETAIL.PATH,
      title: ROUTE.WAREHOUSE_DEFINE.DETAIL.TITLE,
    },
  ]

  const {
    data: { warehouselDetail, isLoading },
    actions,
  } = useWarehouseDefine()

  useEffect(() => {
    actions.getDetailWarehouseDefine(id)
    return () => actions.resetState()
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.WAREHOUSE_DEFINE.LIST.PATH))
  }

  const actionBefore = () => {
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.UPDATE_WAREHOUSE}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(ROUTE.WAREHOUSE_DEFINE.EDIT.PATH.replace(':id', id))
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
      title={t('warehouseDefine.detail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_WAREHOUSE))
              history.push(ROUTE.WAREHOUSE_DEFINE.EDIT.PATH.replace(':id', id))
          },
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseDefine.code')}
                value={warehouselDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseDefine.name')}
                value={warehouselDetail?.name}
              />
            </Grid>
            {warehouselDetail?.codeOnWfx && (
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('general.codeOnWfx')}
                  value={warehouselDetail?.codeOnWfx}
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('warehouseDefine.factory')}
                value={warehouselDetail?.factory?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('warehouseDefine.description')}
                multiline
                value={warehouselDetail?.description}
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
      <Box sx={{ mt: 3 }}>
        <ItemSettingTable items={warehouselDetail?.inventories || []} />
      </Box>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
    </Page>
  )
}

export default WarehouseDefineDetail
