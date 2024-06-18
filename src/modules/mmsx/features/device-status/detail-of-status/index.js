import { useEffect, useMemo, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { isEmpty } from 'lodash'
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
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'
import useDeviceStatus from '~/modules/mmsx/redux/hooks/useDeviceStatus'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemSettingTable from '../form/item-setting-table'

function DetailOfStatusDevice() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id, accessId } = useParams()
  const { canAccess } = useApp()
  const { withSearch } = useQueryState()
  const [list, setList] = useState([])

  const breadcrumbs = [
    {
      title: ROUTE.DEVICE_MANAGEMENT.TITLE,
    },
    {
      route: withSearch(ROUTE.DEVICE_STATUS.LIST.PATH),
      title: ROUTE.DEVICE_STATUS.LIST.TITLE,
    },
    {
      route: withSearch(ROUTE.DEVICE_STATUS.DETAIL.PATH.replace(':id', id)),
      title: ROUTE.DEVICE_STATUS.DETAIL.TITLE,
    },
    {
      route: ROUTE.DEVICE_STATUS.ACTION_DETAIL.PATH,
      title: ROUTE.DEVICE_STATUS.ACTION_DETAIL.TITLE,
    },
  ]

  const {
    data: { detailOfStatus, isLoading },
    actions,
  } = useDeviceStatus()

  const {
    data: { deviceDetail },
    actions: actionsDevice,
  } = useDefineDevice()

  useEffect(() => {
    actions.getDetailOfStatus(accessId)
    actionsDevice.getDeviceDetailById(id)
    return () => {
      actions.resetDetailOfStatus()
      actionsDevice.resetDeviceState()
    }
  }, [accessId])

  useMemo(() => {
    if (!isEmpty(detailOfStatus)) {
      const convertData = []
      convertData.push(detailOfStatus)
      setList(convertData)
    }
  }, [detailOfStatus])

  const backToList = () => {
    history.push(withSearch(ROUTE.DEVICE_STATUS.DETAIL.PATH.replace(':id', id)))
  }

  const actionBefore = () => {
    return (
      <Box sx={{ mr: 'auto' }}>
        <Guard code={FUNCTION_CODE.DETAIL_DEVICE_STATUS}>
          <Button
            variant="outlined"
            icon="edit"
            onClick={() =>
              history.push(
                ROUTE.DEVICE_STATUS.EDIT.PATH.replace(':id', id).replace(
                  ':accessId',
                  accessId,
                ),
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
      title={t('menu.deviceStatusDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.DETAIL_DEVICE_STATUS))
              history.push(
                ROUTE.DEVICE_STATUS.EDIT.PATH.replace(':id', id).replace(
                  ':accessId',
                  accessId,
                ),
              )
          },
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceStatus.form.serial')}
                value={deviceDetail?.serial}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceList.identificationNo')}
                value={deviceDetail?.identificationNo}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('deviceStatus.form.deviceName')}
                value={deviceDetail?.name}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box mt={2}>
        <ItemSettingTable
          items={list}
          attributeTypes={detailOfStatus?.attributeTypes}
          isActionDetail
        />
      </Box>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
    </Page>
  )
}

export default DetailOfStatusDevice
