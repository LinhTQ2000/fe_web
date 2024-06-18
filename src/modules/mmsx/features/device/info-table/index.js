import { IconButton, InputAdornment } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_ALLOW } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import Checkbox from '~/components/Checkbox'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import { SUPPLY_TYPE } from '~/modules/mmsx/constants'

export default function TableInfo(props) {
  const { items = [], supplyList, mode, arrayHelpers } = props
  const { t } = useTranslation(['database'])
  const { scrollToBottom } = useApp()

  const isView = mode === MODAL_MODE.DETAIL

  const columns = [
    {
      field: 'name',
      headerName: t('deviceGroup.tableInfo.name'),
      width: 150,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((i) => i?.supply?.id)
        return isView ? (
          params.row?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].supply`}
            placeholder={t('deviceGroup.tableInfo.name')}
            options={supplyList}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) =>
              `${opt?.nameOther || ''} - ${opt?.code}`
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some(
                (id) => id === opt?.id && opt?.id !== items[index]?.supply?.id,
              )
            }
          />
        )
      },
    },
    {
      field: 'type',
      headerName: t('deviceGroup.tableInfo.type'),
      width: 150,
      renderCell: (params) => params.row?.supply?.supplyType?.name,
    },
    {
      field: 'quantity',
      headerName: t('deviceGroup.tableInfo.quantity'),
      width: 150,
      renderCell: (params, index) => {
        return isView ? (
          params.row?.quantity
        ) : (
          <Field.TextField
            name={`items[${index}].quantity`}
            placeholder={t('deviceGroup.tableInfo.quantity')}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
    {
      field: 'usageTime',
      headerName: t('deviceGroup.tableInfo.usageTime'),
      width: 150,
      renderCell: (params, index) => {
        const { estimateUsedTime } = params.row
        return isView ? (
          estimateUsedTime ? (
            `${estimateUsedTime} ${t('general:minutes')}`
          ) : (
            ``
          )
        ) : (
          <Field.TextField
            name={`items[${index}].estimateUsedTime`}
            placeholder={t('deviceGroup.tableInfo.usageTime')}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
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
        return isView ? (
          params.row?.type === SUPPLY_TYPE.ACCESSORY ? (
            <Checkbox checked={params.row?.canFixable} disabled />
          ) : null
        ) : params.row?.supply?.type === SUPPLY_TYPE.ACCESSORY ? (
          <Field.Checkbox name={`items[${index}].supply.canFixable`} />
        ) : null
      },
    },
    {
      field: 'remove',
      headerName: t('general:common.action'),
      width: 100,
      align: 'center',
      hide: isView,
      sticky: 'right',
      renderCell: (_, index) => {
        return (
          <IconButton
            onClick={() => {
              arrayHelpers.remove(index)
            }}
            size="large"
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]

  const onAddItems = () => {
    if (supplyList?.length !== items?.length) {
      arrayHelpers.push({
        id: new Date().getTime(),
        supply: null,
        estimateUsedTime: null,
        quantity: null,
      })
      scrollToBottom()
    }
  }
  return (
    <HotKeys
      handlers={{
        onAddRow: onAddItems,
        onRemoveRow: () => {
          if (items?.length) arrayHelpers.remove(0)
        },
      }}
    >
      <DataTable
        rows={items}
        title={t('deviceGroup.tableInfo.listTitle')}
        columns={columns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
        beforeTopbar={
          !isView && (
            <Button
              variant="outlined"
              onClick={onAddItems}
              disabled={supplyList?.length === items?.length}
            >
              {t('deviceGroup.addItem')}
            </Button>
          )
        }
        enableResizable={false}
      />
    </HotKeys>
  )
}
