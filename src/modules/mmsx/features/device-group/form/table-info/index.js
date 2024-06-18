import { IconButton, InputAdornment } from '@mui/material'
import { findLastIndex, last } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import { ACTIVE_STATUS, SUPPLY_TYPE } from '~/modules/mmsx/constants'
import { searchSuppliesList } from '~/modules/mmsx/redux/sagas/supplies/search-supplies'
import { convertFilterParams } from '~/utils'

function TableInfo(props) {
  const {
    items = [],
    arrayHelpers,
    setFieldValue,
    settableMaintenance,
    values,
  } = props
  const { t } = useTranslation(['database'])
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
      field: 'supply',
      headerName: t('deviceGroup.tableInfo.name'),
      width: 150,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((item) => item?.supply?.id)
        return (
          <Field.Autocomplete
            name={`itemInfo[${index}].supply`}
            asyncRequest={(s) =>
              searchSuppliesList({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  active: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) =>
              `${opt?.nameOther || ''} - ${opt?.code}`
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.supply?.id
            }
          />
        )
      },
    },
    {
      field: 'type',
      headerName: t('deviceGroup.tableInfo.type'),
      width: 150,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`itemInfo[${index}].supply.supplyType.name`}
            placeholder={t('deviceGroup.tableInfo.type')}
            disabled
          />
        )
      },
    },
    {
      field: 'vendor',
      headerName: t('deviceGroup.tableInfo.vendor'),
      width: 150,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`itemInfo[${index}].supply.vendor.name`}
            placeholder={t('deviceGroup.tableInfo.vendor')}
            disabled
          />
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('deviceGroup.tableInfo.quantity'),
      width: 150,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`itemInfo[${index}].quantity`}
            placeholder={t('deviceGroup.tableInfo.quantity')}
            type="number"
          />
        )
      },
    },
    {
      field: 'usageTime',
      headerName: t('deviceGroup.tableInfo.usageTime'),
      width: 150,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`itemInfo[${index}].usageTime`}
            placeholder={t('deviceGroup.tableInfo.usageTime')}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {t('general:minutes')}
                </InputAdornment>
              ),
            }}
          />
        )
      },
    },
    {
      field: 'isFix',
      headerName: t('deviceGroup.tableInfo.isFix'),
      width: 150,
      align: 'center',
      renderCell: (params, index) => {
        const { supply } = params.row
        return (
          supply?.supplyType?.type === SUPPLY_TYPE.ACCESSORY && (
            <Field.Checkbox
              name={`itemInfo[${index}].isFix`}
              onChange={(val) => {
                if (val) {
                  settableMaintenance(setFieldValue, supply, values)
                } else {
                  const maintaneList = values?.itemMaintane?.filter(
                    (item) => item?.supplyId !== supply?.id,
                  )
                  setFieldValue('itemMaintane', maintaneList)
                }
              }}
              disabled={!supply}
            />
          )
        )
      },
    },
    {
      field: 'remove',
      headerName: t('general:common.action'),
      width: 100,
      align: 'center',
      sticky: 'right',
      renderCell: (params, index) => {
        const { supply } = params.row
        return (
          <IconButton
            onClick={() => {
              arrayHelpers.remove(index)
              if (supply?.type === SUPPLY_TYPE.ACCESSORY && params.row?.isFix) {
                const maintaneList = values?.itemMaintane?.filter(
                  (item) => item?.supplyId !== supply?.id,
                )
                setFieldValue('itemMaintane', maintaneList)
              }
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
        onAddRow: () => {
          arrayHelpers.push({
            id: new Date().getTime(),
            supply: null,
            quantity: '',
            usageTime: '',
            isFix: false,
          })
          scrollToBottom()
        },
        onRemoveRow: () => {
          const item = last(items)
          if (items?.length > 1) {
            arrayHelpers.remove(findLastIndex(items))
            if (item?.supply?.type === SUPPLY_TYPE.ACCESSORY && item?.isFix) {
              const maintaneList = values?.itemMaintane?.filter(
                (item) => item?.supplyId !== item?.supply?.id,
              )
              setFieldValue('itemMaintane', maintaneList)
            }
          }
        },
      }}
    >
      <DataTable
        title={t('deviceGroup.tableInfo.listTitle')}
        rows={items}
        columns={columns}
        hideSetting
        hideFooter
        striped={false}
        beforeTopbar={
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                supply: null,
                quantity: '',
                usageTime: '',
                isFix: false,
              })
              scrollToBottom()
            }}
          >
            {t('deviceGroup.addItem')}
          </Button>
        }
      />
    </HotKeys>
  )
}

export default TableInfo
