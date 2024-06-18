import React from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, TEXTFIELD_ALLOW } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import {
  ACTIVE_STATUS,
  ASSET_INVENTORY_ENUM,
  ASSET_INVENTORY_OPTIONS,
} from '~/modules/mmsx/constants'
import { searchDeviceGroupApi } from '~/modules/mmsx/redux/sagas/device-group/search'
import { searchSuppliesList } from '~/modules/mmsx/redux/sagas/supplies/search-supplies'
import { convertFilterParams } from '~/utils'

const ItemSettingTable = ({ items, arrayHelpers, setFieldValue }) => {
  const { t } = useTranslation(['mmsx'])
  const { scrollToBottom } = useApp()

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
      field: 'assetInventoryType',
      headerName: t('warehouseDefine.assetInventoryType'),
      width: 200,
      renderCell: (params, index) => {
        return (
          <Field.Autocomplete
            name={`items[${index}].assetInventoryType`}
            placeholder={t('warehouseDefine.assetInventoryType')}
            options={ASSET_INVENTORY_OPTIONS}
            getOptionLabel={(opt) => t(opt?.text)}
            getOptionValue={(opt) => opt?.id}
            onChange={() => setFieldValue(`items[${index}].asset`, null)}
          />
        )
      },
    },
    {
      field: 'asset',
      headerName: t('warehouseDefine.asset'),
      width: 200,
      renderCell: (params, index) => {
        const { assetInventoryType } = params.row
        const itemIdCodeList = items.map((item) => item?.asset?.id)
        return assetInventoryType === ASSET_INVENTORY_ENUM.DEVICE_GROUP ? (
          <Field.Autocomplete
            name={`items[${index}].asset`}
            placeholder={t('warehouseDefine.asset')}
            asyncRequest={(s) =>
              searchDeviceGroupApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  active: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestDeps={assetInventoryType}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.asset?.id
            }
          />
        ) : (
          <Field.Autocomplete
            name={`items[${index}].asset`}
            placeholder={t('warehouseDefine.asset')}
            asyncRequest={(s) =>
              searchSuppliesList({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestDeps={assetInventoryType}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) =>
              `${opt?.nameOther || ''} - ${opt?.code}`
            }
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.asset?.id
            }
          />
        )
      },
    },
    {
      field: 'vendor',
      headerName: t('warehouseDefine.vendor'),
      width: 200,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].asset.vendor.name`}
            placeholder={t('warehouseDefine.vendor')}
            disabled
          />
        )
      },
    },
    {
      field: 'minStockQuantity',
      headerName: t('warehouseDefine.minStockQuantity'),
      width: 200,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].minStockQuantity`}
            placeholder={t('warehouseDefine.minStockQuantity')}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
    {
      field: 'maxStockQuantity',
      headerName: t('warehouseDefine.maxStockQuantity'),
      width: 200,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].maxStockQuantity`}
            placeholder={t('warehouseDefine.maxStockQuantity')}
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
      sticky: 'right',
      renderCell: (params) => {
        const idx = items.findIndex((item) => item?.id === params.row?.id)
        return (
          <IconButton
            onClick={() => arrayHelpers.remove(idx)}
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
          {t('warehouseDefine.tableTitle')}
        </Typography>
        <Box mt={1}>
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                assetInventoryType: ASSET_INVENTORY_ENUM.DEVICE_GROUP,
                asset: null,
                minStockQuantity: null,
                maxStockQuantity: null,
              })
              scrollToBottom()
            }}
          >
            {t('warehouseDefine.add')}
          </Button>
        </Box>
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

ItemSettingTable.defaultProps = {
  items: [],
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
}

export default ItemSettingTable
