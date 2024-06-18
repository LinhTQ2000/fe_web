import React from 'react'

import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { convertWithCommas } from '~/utils'
import { returnStockQuantity } from '~/utils/measure'

function ItemSettingTable({ items }) {
  const { t } = useTranslation(['mmsx'])

  const columns = [
    {
      field: 'materialGroup',
      headerName: t('contingencyPlan.form.field.materialGroup'),
      width: 200,
      renderCell: (params) => params.row?.supplyGroup?.name,
    },
    {
      field: 'materialCode',
      headerName: t('contingencyPlan.form.field.materialCode'),
      width: 200,
      renderCell: (params) => params.row?.supply?.code,
    },
    {
      field: 'materialName',
      headerName: t('contingencyPlan.form.field.materialName'),
      width: 200,
      renderCell: (params) => params.row?.supply?.name,
    },
    {
      field: 'proposalQuantity',
      headerName: t('contingencyPlan.form.field.proposalQuantity'),
      width: 100,
      renderCell: (params) => params?.row?.proposalQuantity || 0,
    },
    {
      field: 'stockQuantity',
      headerName: t('contingencyPlan.form.field.stockQuantity'),
      width: 100,
      renderCell: (params) => params?.row?.stockQuantity || 0,
    },
    {
      field: 'minStockQuantity',
      headerName: t('contingencyPlan.form.field.minStockQuantity'),
      width: 100,
      renderCell: (params) => params?.row?.minStockQuantity || 0,
    },
    {
      field: 'buyQuantity',
      headerName: t('contingencyPlan.form.field.buyQuantity'),
      width: 100,
      renderCell: (params) =>
        convertWithCommas(
          returnStockQuantity(
            +params?.row?.proposalQuantity - +params?.row?.stockQuantity,
          ) || 0,
        ),
    },
    {
      field: 'unit',
      headerName: t('contingencyPlan.form.field.unit'),
      width: 100,
      renderCell: (params) => params.row?.unit?.name,
    },
    {
      field: 'price',
      headerName: t('contingencyPlan.form.field.price'),
      width: 100,
      renderCell: (params) => convertWithCommas(params?.row?.price) || 0,
    },
    {
      field: 'money',
      headerName: t('contingencyPlan.form.field.money'),
      width: 100,
      renderCell: (params) =>
        convertWithCommas(
          (+params?.row?.price || 0) *
            (returnStockQuantity(
              +params?.row?.proposalQuantity - +params?.row?.stockQuantity,
            ) || 0),
        ),
    },
    {
      field: 'note',
      headerName: t('contingencyPlan.form.field.note'),
      width: 100,
      renderCell: (params) => params?.row?.description,
    },
  ]

  // const customFooter = () => {
  //   const proposalTotalAmount = items.reduce(
  //     (total, curr) =>
  //       (+curr?.price || 0) *
  //         ((+curr?.proposalQuantity || 0) +
  //           (+curr?.extraProposalQuantity || 0)) +
  //       total,
  //     0,
  //   )
  //   return (
  //     <Box
  //       sx={{ display: 'flex', flexDirection: 'row', with: 'max-content' }}
  //       ml={2}
  //     >
  //       <Typography variant="h4" mt={1} mb={1} component="span" width={200}>
  //         {t('contingencyPlan.form.field.proposalTotalAmount')}:
  //       </Typography>
  //       <Typography variant="h4" mt={1} mb={1} ml={2} component="span">
  //         {convertWithCommas(proposalTotalAmount)}
  //       </Typography>
  //     </Box>
  //   )
  // }

  return (
    <>
      <DataTable
        title={t('contingencyPlan.form.title')}
        rows={items || []}
        columns={columns}
        striped={false}
        hideSetting
        // customFooter={customFooter}
        hideFooter
      />
    </>
  )
}

export default ItemSettingTable
