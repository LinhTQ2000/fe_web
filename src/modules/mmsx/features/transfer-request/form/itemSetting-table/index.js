import React from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_ALLOW } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'

function ItemSettingTable({ items, mode, deviceGroups = [], arrayHelpers }) {
  const { t } = useTranslation(['mmsx'])
  const { scrollToBottom } = useApp()
  const isDetail = mode === MODAL_MODE.DETAIL
  const isUpdate = mode === MODAL_MODE.UPDATE

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'deviceGroup',
      headerName: t('transferRequest.form.field.deviceGroup'),
      width: 200,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((item) => item?.deviceGroup?.id)
        return isDetail ? (
          <>{params.row?.deviceGroup?.name}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].deviceGroup`}
            placeholder={t('transferRequest.form.field.deviceGroup')}
            options={deviceGroups}
            getOptionLabel={(opt) => opt?.name}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.deviceGroup?.id
            }
            {...(isUpdate
              ? {
                  isOptionEqualToValue: (opt, val) => opt?.id === val?.id,
                }
              : {})}
            required
          />
        )
      },
    },
    {
      field: 'requestQuantity',
      headerName: t('transferRequest.form.field.requestQuantity'),
      width: 100,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params, index) => {
        return isDetail ? (
          <>{+params.row?.requestQuantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].deviceGroup.quantity`}
            placeholder={t('transferRequest.form.field.requestQuantity')}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
            disabled
          />
        )
      },
    },
    {
      field: 'transferQuantity',
      headerName: t('transferRequest.form.field.transferQuantity'),
      width: 100,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params, index) => {
        return isDetail ? (
          <>{+params.row?.quantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].quantity`}
            placeholder={t('transferRequest.form.field.transferQuantity')}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
    {
      field: 'remove',
      headerName: t('general:common.action'),
      width: 100,
      align: 'center',
      hide: isDetail,
      sticky: 'right',
      renderCell: (params) => {
        const idx = items.findIndex((item) => item.id === params.row.id)
        return (
          <IconButton
            onClick={() => {
              arrayHelpers.remove(idx)
            }}
            disabled={items?.length === 1}
            size="large"
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" mt={1} mb={1}>
          {t('transferRequest.form.table')}
        </Typography>
        {!isDetail && (
          <Box>
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  deviceGroup: null,
                  factory: null,
                  warehouse: null,
                  quantity: null,
                })
                scrollToBottom()
              }}
            >
              {t('transferRequest.add')}
            </Button>
          </Box>
        )}
      </Box>
      <DataTable
        rows={items || []}
        columns={columns}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default ItemSettingTable
