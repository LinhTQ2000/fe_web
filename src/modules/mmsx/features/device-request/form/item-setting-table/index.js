import { Box, IconButton } from '@mui/material'
import { findLastIndex } from 'lodash'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import { ACTIVE_STATUS } from '~/modules/mmsx/constants'
import { searchDeviceGroupApi } from '~/modules/mmsx/redux/sagas/device-group/search'
import { getInventoryApi } from '~/modules/mmsx/redux/sagas/warehouse-inventory/get-inventory'
import { convertFilterParams } from '~/utils'

function ItemSettingTable({
  items = [],
  mode,
  setFieldValue,
  arrayHelpers,
  factory,
}) {
  const { t } = useTranslation(['mmsx'])
  const { scrollToBottom } = useApp()
  const isView = mode === MODAL_MODE.DETAIL

  const handleChangeDeviceGroup = async (val, index) => {
    setFieldValue(`items[${index}].stockQuantityInFactory`, 0)
    setFieldValue(`items[${index}].stockQuantityOtherFactory`, 0)
    if (factory?.id && val?.id) {
      const res = await getInventoryApi({
        assetId: val?.id,
        factoryId: factory?.id,
      })
      if (res?.statusCode === 200) {
        setFieldValue(
          `items[${index}].stockQuantityInFactory`,
          res?.data?.availableStockQuantityInFactory || 0,
        )
        setFieldValue(
          `items[${index}].stockQuantityOtherFactory`,
          res?.data?.availableStockQuantityOtherFactory || 0,
        )
      }
    }
  }

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
      field: 'name',
      headerName: t('requestDevice.form.field.deviceGroup'),
      width: 200,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((item) => item?.deviceGroup?.id)
        return isView ? (
          params.row.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].deviceGroup`}
            placeholder={t('requestDevice.form.field.deviceGroup')}
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
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            onChange={(val) => handleChangeDeviceGroup(val, index)}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.deviceGroup?.id
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            required
          />
        )
      },
    },
    {
      field: 'stockQuantityInFactory',
      headerName: t('requestDevice.avaiableStockQuantityInFactory'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row.availableStockQuantityInFactory || 0
        ) : (
          <Field.TextField
            name={`items[${index}].stockQuantityInFactory`}
            disabled
          />
        )
      },
    },
    {
      field: 'stockQuantity',
      headerName: t('requestDevice.avaiableStockQuantity'),
      width: 200,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.availableStockQuantityOtherFactory || 0
        ) : (
          <Field.TextField
            name={`items[${index}].stockQuantityOtherFactory`}
            disabled
          />
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('requestDevice.requestQuantity'),
      width: 200,
      renderCell: (params, index) => {
        return !isView ? (
          <Field.TextField
            name={`items[${index}].quantity`}
            placeholder={t('requestDevice.requestQuantity')}
            type="number"
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
          />
        ) : (
          <>{params.row?.quantity}</>
        )
      },
    },
    {
      field: 'remove',
      headerName: t('general:common.action'),
      width: 100,
      hide: isView,
      align: 'center',
      sticky: 'right',
      renderCell: (_, index) => {
        return (
          <IconButton
            onClick={() => {
              arrayHelpers.remove(index)
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
    <HotKeys
      handlers={{
        ...(!isView
          ? {
              onAddRow: () => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  deviceGroup: null,
                  stockQuantityInFactory: 0,
                  stockQuantityOtherFactory: 0,
                  quantity: null,
                })
                scrollToBottom()
              },
              onRemoveRow: () => {
                if (items?.length > 1) arrayHelpers.remove(findLastIndex(items))
              },
            }
          : {}),
      }}
    >
      <DataTable
        title={t('requestDevice.title')}
        rows={items}
        columns={columns}
        striped={false}
        hideSetting
        hideFooter
        beforeTopbar={
          !isView && (
            <Box>
              <Button
                variant="outlined"
                onClick={() => {
                  arrayHelpers.push({
                    id: new Date().getTime(),
                    deviceGroup: null,
                    stockQuantityInFactory: 0,
                    stockQuantityOtherFactory: 0,
                    quantity: null,
                  })
                  scrollToBottom()
                }}
              >
                {t('requestDevice.add')}
              </Button>
            </Box>
          )
        }
      />
    </HotKeys>
  )
}

export default ItemSettingTable
