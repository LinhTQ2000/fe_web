import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  SUPPLY_REQUEST_STATUS_ENUM,
  SUPPLY_REQUEST_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useSuppliesRequest from '~/modules/mmsx/redux/hooks/useSuppliesRequest'
import { ROUTE } from '~/modules/mmsx/routes/config'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import ItemSettingDetail from './item-detail'

const SuppliesReturnDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const breadcrumbs = [
    {
      title: ROUTE.DEVICE_MANAGEMENT.TITLE,
    },
    {
      route: withSearch(ROUTE.SUPPLIES_REQUEST.LIST.PATH),
      title: ROUTE.SUPPLIES_REQUEST.LIST.TITLE,
    },
    {
      route: ROUTE.SUPPLIES_REQUEST.RETURN_DETAIL.PATH,
      title: ROUTE.SUPPLIES_REQUEST.RETURN_DETAIL.TITLE,
    },
  ]

  const {
    data: { suppliesRequestDetail, isLoading },
    actions,
  } = useSuppliesRequest()

  const refreshData = () => actions.getSuppliesRequestDetail(id)

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetStateSuppliesRequest()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.SUPPLIES_REQUEST.LIST.PATH))
  }

  const onSubmitDelete = () => {
    actions.deleteSuppliesRequest(id, backToList)
    setIsOpenDeleteModal(false)
  }

  const submitConfirm = () => {
    actions.confirmSuppliesRequest(id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }

  const onSubmitRejected = () => {
    actions.rejectSuppliesRequest(id, () => {
      refreshData()
    })
    setIsOpenRejectedModal(false)
  }

  const actionBefore = () => {
    const isPending =
      suppliesRequestDetail?.status === SUPPLY_REQUEST_STATUS_ENUM.WAITING
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_SUPPLY_REQUEST_TICKET}>
            <Button
              variant="outlined"
              icon="edit"
              onClick={() =>
                history.push(
                  ROUTE.SUPPLIES_REQUEST.RETURN_EDIT.PATH.replace(':id', id),
                )
              }
            >
              {t('general:common.update')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.DELETE_DEVICE_REQUEST_TICKET}>
            <Button
              variant="outlined"
              icon="delete"
              color="subText"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              {t('mmsx:common.delete')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.CONFIRM_DEVICE_REQUEST}>
            <Button
              variant="outlined"
              icon="tick"
              color="success"
              onClick={() => setIsOpenConfirmModal(true)}
            >
              {t('general:common.accept')}
            </Button>
            <Button
              variant="outlined"
              icon="remove"
              color="error"
              onClick={() => setIsOpenRejectedModal(true)}
            >
              {t('general:common.reject')}
            </Button>
          </Guard>
        </Box>
      )
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.suppliesReturnDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('suppliesCategory.form.status')}
                value={
                  <Status
                    options={SUPPLY_REQUEST_STATUS_OPTIONS}
                    value={suppliesRequestDetail?.status}
                  />
                }
              />
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              {/* <Button>{t('suppliesRequest.print')}</Button> */}
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('suppliesRequest.form.field.code')}
                value={suppliesRequestDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12} />

            <Grid item lg={6} xs={12}>
              <LV
                label={t('suppliesRequest.form.field.name')}
                value={suppliesRequestDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('suppliesRequest.form.field.request')}
                value={suppliesRequestDetail?.request?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('suppliesRequest.form.field.description')}
                multiline
                rows={3}
                value={suppliesRequestDetail?.description}
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
        <ItemSettingDetail items={suppliesRequestDetail?.supplies || []} />
      </Box>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogDelete
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        tempItem={suppliesRequestDetail}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={suppliesRequestDetail}
      />
      <DialogReject
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={suppliesRequestDetail}
      />
    </Page>
  )
}

export default SuppliesReturnDetail
