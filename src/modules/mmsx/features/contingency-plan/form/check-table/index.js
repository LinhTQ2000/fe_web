import React, { useCallback, useEffect } from 'react'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Box, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_ALLOW } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import { SUPPLY_TYPE } from '~/modules/mmsx/constants'
import { convertWithCommas, round } from '~/utils'
import { returnStockQuantity } from '~/utils/measure'

function CheckTable({
  checkItems,
  mode,
  setFieldValue,
  items,
  setTotalAmount,
}) {
  const { t } = useTranslation(['mmsx'])
  const isDetail = mode === MODAL_MODE.DETAIL
  const TYPE_OF_SUPPLY = [SUPPLY_TYPE.SUPPLY, SUPPLY_TYPE.ACCESSORY]
  const TYPE_OF_OTHER_SUPPLY = [
    SUPPLY_TYPE.STATIONERY,
    SUPPLY_TYPE.TOOLS,
    SUPPLY_TYPE.OTHER,
  ]

  const caculateTotalCost = useCallback(() => {
    const totalCost = items
      .filter((item) => TYPE_OF_SUPPLY.includes(item?.supply?.supplyType?.type))
      .reduce(
        (prev, curr) =>
          (+curr?.price || 0) *
            (returnStockQuantity(
              +curr?.proposalQuantity - +curr?.supply?.stockQuantity,
            ) || 0) +
          prev,
        0,
      )
    const otherCost = items
      .filter((item) =>
        TYPE_OF_OTHER_SUPPLY.includes(item?.supply?.supplyType?.type),
      )
      .reduce(
        (prev, curr) =>
          (+curr?.price || 0) *
            (returnStockQuantity(
              +curr?.proposalQuantity - +curr?.supply?.stockQuantity,
            ) || 0) +
          prev,
        0,
      )
    setFieldValue('checklist[3].totalCostSparePart', totalCost)
    setFieldValue('checklist[6].totalCostOther', otherCost)
  }, [items])

  useEffect(() => {
    if (!isDetail) {
      caculateTotalCost()
    }
  }, [caculateTotalCost])

  const caculate = useCallback(() => {
    const revenueVnd = checkItems[0].revenue * checkItems[1].rate
    setTotalAmount(revenueVnd)
    setFieldValue('checklist[2].revenueVnd', revenueVnd)
    const totalCostSparePartPerRevenue =
      (checkItems[3].totalCostSparePart / revenueVnd) * 100
    setFieldValue(
      'checklist[4].totalCostSparePartPerRevenue',
      round(totalCostSparePartPerRevenue, 2) || 0,
    )
    const totalCostOtherPerRevenue =
      (checkItems[6].totalCostOther / revenueVnd) * 100
    setFieldValue(
      'checklist[7].totalCostOtherPerRevenue',
      round(totalCostOtherPerRevenue, 2) || 0,
    )
    const totalCostSuggest =
      checkItems[5].totalCostConfirmed + checkItems[8].otherTotalCostConfirmed
    setFieldValue('checklist[9].totalCostSuggest', totalCostSuggest)
  }, [
    checkItems[0].revenue,
    checkItems[1].rate,
    checkItems[6].totalCostOther,
    checkItems[3].totalCostSparePart,
    checkItems[5].totalCostConfirmed,
    checkItems[8].otherTotalCostConfirmed,
  ])

  useEffect(() => {
    caculate()
  }, [caculate])

  const columns = [
    {
      field: 'id',
      headerName: '',
      width: 80,
      renderCell: (_, index) => {
        return (
          <Typography variant="h4" sx={{ fontStyle: 'italic' }}>
            {`(${index + 1})`}
          </Typography>
        )
      },
    },
    {
      field: 'name',
      headerName: '',
      width: 200,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex' }}>
            <Typography
              variant="h4"
              sx={{ textTransform: 'uppercase', fontStyle: 'italic' }}
            >
              {t(`contingencyPlan.form.checkTable.${params?.row?.name}`)}
            </Typography>
            {params.row?.tooltip && (
              <Box
                component="span"
                sx={{
                  ml: 0.5,
                  position: 'relative',
                }}
              >
                <Tooltip title={params.row?.tooltip} arrow placement="top">
                  <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                </Tooltip>
              </Box>
            )}
          </Box>
        )
      },
    },
    {
      field: 'value',
      headerName: '',
      width: 200,
      renderCell: (params, index) => {
        return isDetail ? (
          convertWithCommas(params?.row[params.row.name] || 0)
        ) : (
          <Field.TextField
            name={`checklist[${index}].[${params?.row?.name}]`}
            placeholder={t(
              `contingencyPlan.form.checkTable.${[params?.row?.name]}`,
            )}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
            disabled={params.row?.disabled}
            numberProps={{
              decimalScale: 3,
              thousandSeparator: true,
            }}
          />
        )
      },
    },
  ]

  return (
    <>
      <DataTable
        title={t('contingencyPlan.form.censorshipCheck')}
        rows={checkItems || []}
        columns={columns}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default CheckTable
