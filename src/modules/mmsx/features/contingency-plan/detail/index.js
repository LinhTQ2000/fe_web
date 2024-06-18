import React, { useEffect, useMemo, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ASSET_PROJECTION_STATUS,
  SPARE_PART_PLAN_STATUS_OPTION,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useContingencyPlan from '~/modules/mmsx/redux/hooks/useContingencyPlan'
import { exportContingencyPlanApi } from '~/modules/mmsx/redux/sagas/contingency-plan/export-detail-contingency-plan'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import CheckTable from './check-table'
import ItemSettingTable from './itemSetting-table'

const ContingencyPlanDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const {
    data: { contingencyPlanDetail, isLoading },
    actions,
  } = useContingencyPlan()

  const breadcrumbs = [
    {
      title: ROUTE.PLAN.TITLE,
    },
    {
      route: withSearch(ROUTE.CONTINGENCY_PLAN.LIST.PATH),
      title: ROUTE.CONTINGENCY_PLAN.LIST.TITLE,
    },
    {
      route: ROUTE.CONTINGENCY_PLAN.DETAIL.PATH,
      title: ROUTE.CONTINGENCY_PLAN.DETAIL.TITLE,
    },
  ]

  const refreshData = () => actions.getContingencyPlanDetail(id)

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetStateContingencyPlan()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.CONTINGENCY_PLAN.LIST.PATH))
  }

  const DEFAULT_CHECKLIST = [
    {
      id: 1,
      revenue: 0,
      name: 'revenue',
      disabled: false,
      tooltip: t('contingencyPlan.tooltip.revenue'),
    },
    {
      id: 2,
      rate: 0,
      name: 'rate',
      disabled: false,
      tooltip: t('contingencyPlan.tooltip.rate'),
    },
    {
      id: 3,
      revenueVnd: 0,
      name: 'revenueVnd',
      disabled: true,
      tooltip: t('contingencyPlan.tooltip.revenueVnd'),
    },
    {
      id: 4,
      totalCostSparePart: 0,
      name: 'totalCostSparePart',
      disabled: true,
      tooltip: t('contingencyPlan.tooltip.totalCostSparePart'),
    },
    {
      id: 5,
      totalCostSparePartPerRevenue: 0,
      name: 'totalCostSparePartPerRevenue',
      disabled: true,
      tooltip: t('contingencyPlan.tooltip.totalCostSparePartPerRevenue'),
    },
    {
      id: 6,
      totalCostConfirmed: 0,
      name: 'totalCostConfirmed',
      disabled: false,
    },
    {
      id: 7,
      totalCostOther: 0,
      name: 'totalCostOther',
      disabled: true,
      tooltip: t('contingencyPlan.tooltip.totalCostOther'),
    },
    {
      id: 8,
      totalCostOtherPerRevenue: 0,
      name: 'totalCostOtherPerRevenue',
      disabled: true,
      tooltip: t('contingencyPlan.tooltip.totalCostOtherPerRevenue'),
    },
    {
      id: 9,
      otherTotalCostConfirmed: 0,
      name: 'otherTotalCostConfirmed',
      disabled: false,
    },
    {
      id: 10,
      totalCostSuggest: 0,
      name: 'totalCostSuggest',
      disabled: true,
      tooltip: t('contingencyPlan.tooltip.totalCostSuggest'),
    },
  ]

  const checkItems = useMemo(() => {
    return formatChecklist(contingencyPlanDetail, DEFAULT_CHECKLIST)
  }, [contingencyPlanDetail?.checklist])

  const onSubmitDelete = () => {
    actions.deleteContingencyPlan(id, backToList)
    setIsOpenDeleteModal(false)
  }

  const submitConfirm = () => {
    actions.confirmContingencyPlan(id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
  }

  const onSubmitRejected = () => {
    actions.rejectContingencyPlan(id, () => {
      refreshData()
    })
    setIsOpenRejectedModal(false)
  }
  const isPending =
    contingencyPlanDetail?.status === ASSET_PROJECTION_STATUS.AWAITING

  const actionBefore = () => {
    return (
      isPending && (
        <Box sx={{ mr: 'auto' }}>
          <Guard code={FUNCTION_CODE.UPDATE_PLAN}>
            <Button
              variant="outlined"
              icon="edit"
              onClick={() =>
                history.push(
                  ROUTE.CONTINGENCY_PLAN.EDIT.PATH.replace(':id', id),
                )
              }
            >
              {t('general:common.update')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.DELETE_PLAN}>
            <Button
              variant="outlined"
              icon="delete"
              color="subText"
              onClick={() => setIsOpenDeleteModal(true)}
            >
              {t('mmsx:common.delete')}
            </Button>
          </Guard>
          <Guard code={FUNCTION_CODE.UPDATE_STATUS_PLAN}>
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

  const renderHeaderRight = () => {
    return (
      <Guard code={FUNCTION_CODE.EXPORT_PLAN}>
        <ImportExport
          name={t('contingencyPlan.exportName')}
          title={t('contingencyPlan.export')}
          onExport={() => exportContingencyPlanApi(id)}
        />
      </Guard>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.contingencyPlanSupplyDetail')}
      onBack={backToList}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
    >
      <HotKeys
        handlers={{
          onEdit: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_PLAN) && isPending)
              history.push(ROUTE.CONTINGENCY_PLAN.EDIT.PATH.replace(':id', id))
          },
          onBack: backToList,
          onDelete: () => {
            if (canAccess(FUNCTION_CODE.DELETE_PLAN) && isPending)
              setIsOpenDeleteModal(true)
          },
          onApprove: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_STATUS_PLAN) && isPending)
              setIsOpenConfirmModal(true)
          },
          onReject: () => {
            if (canAccess(FUNCTION_CODE.UPDATE_STATUS_PLAN) && isPending)
              setIsOpenRejectedModal(true)
          },
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12} lg={6}>
              <Typography variant="h3">
                {t('contingencyPlan.form.info')}
              </Typography>
            </Grid>
            {/* <Grid
              item
              xs={12}
              lg={6}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button onClick={() => {}}>
                {t('contingencyPlan.form.preview')}
              </Button>
            </Grid> */}
            <Grid item xs={12}>
              <LV
                label={t('contingencyPlan.table.status')}
                value={
                  <Status
                    options={SPARE_PART_PLAN_STATUS_OPTION}
                    value={contingencyPlanDetail?.status}
                  />
                }
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('contingencyPlan.table.code')}
                value={contingencyPlanDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('contingencyPlan.table.name')}
                value={contingencyPlanDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('contingencyPlan.form.maintenancePlan')}
                value={contingencyPlanDetail?.maintenancePlan?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('contingencyPlan.table.time')}
                value={`${convertUtcDateToLocalTz(
                  contingencyPlanDetail?.fromDate,
                )} - ${convertUtcDateToLocalTz(contingencyPlanDetail?.toDate)}`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('contingencyPlan.form.factory')}
                value={contingencyPlanDetail?.factory?.name}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <ItemSettingTable items={contingencyPlanDetail?.supplies || []} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <CheckTable checkItems={checkItems} />
      </Box>
      <ActionBar onBack={backToList} elBefore={actionBefore} />
      <DialogDelete
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        tempItem={contingencyPlanDetail}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={contingencyPlanDetail}
      />
      <DialogReject
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={contingencyPlanDetail}
      />
    </Page>
  )
}

export default ContingencyPlanDetail

export const formatChecklist = (contingencyPlanDetail, DEFAULT_CHECKLIST) => {
  let checklist = []
  const getIndex = (key) => {
    let index = 0
    switch (key) {
      case 'revenue':
        index = 0
        break
      case 'rate':
        index = 1
        break
      case 'revenueVnd':
        index = 2
        break
      case 'totalCostSparePart':
        index = 3
        break
      case 'totalCostSparePartPerRevenue':
        index = 4
        break
      case 'totalCostConfirmed':
        index = 5
        break
      case 'totalCostOther':
        index = 6
        break
      case 'totalCostOtherPerRevenue':
        index = 7
        break
      case 'otherTotalCostConfirmed':
        index = 8
        break
      case 'totalCostSuggest':
        index = 9
        break
      default:
        break
    }
    return index
  }
  for (let key in contingencyPlanDetail?.checklist) {
    const index = getIndex(key)
    checklist[index] = {
      [key]: contingencyPlanDetail?.checklist[key],
      name: key,
      disabled: ![0, 1, 5, 8].includes(index),
      tooltip: DEFAULT_CHECKLIST[index]?.tooltip,
    }
  }
  return checklist
}
