import { useCallback, useEffect, useState } from 'react'

import { IconButton, InputAdornment } from '@mui/material'
import { first } from 'lodash'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  ROWS_PER_PAGE_OPTIONS,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import Checkbox from '~/components/Checkbox'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import {
  MAINTENANCE_JOB_TYPE,
  MAINTENANCE_JOB_TYPE_MAP,
  MAINTENANCE_JOB_TYPE_OPTIONS,
  MAINTENANCE_PERIOD_UNIT_MAP,
  ACTIVE_STATUS,
} from '~/modules/mmsx/constants'
import { searchTemplateListApi } from '~/modules/mmsx/redux/sagas/template-checklist/search-template-checklist'
import { convertFilterParams } from '~/utils'

function ItemSettingTable(props) {
  const { t } = useTranslation(['database'])
  const { items = [], arrayHelpers, mode, setFieldValue } = props
  const isView = mode === MODAL_MODE.DETAIL
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(ROWS_PER_PAGE_OPTIONS[0])
  const [arrayItem, setArrayItem] = useState(items)
  const { scrollToBottom } = useApp()

  const refreshData = useCallback(() => {
    const start = items.length ? pageSize * (page - 1) + 1 : 0
    const end = items.length ? Math.min(pageSize * page, items.length) : 0

    const arr = items.slice(start - 1, end)
    setArrayItem(arr)
  }, [page, pageSize, items])

  useEffect(() => {
    refreshData()
  }, [refreshData])

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (params) => {
        return params.row.idx + 1
      },
    },
    {
      field: 'title',
      headerName: t('maintenanceTemplate.table.title'),
      width: 180,
      renderCell: (params) => {
        return isView ? (
          <>{params.row?.title}</>
        ) : (
          <Field.TextField
            name={`items[${params.row.idx}].title`}
            placeholder={t('maintenanceTemplate.table.title')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
            }}
          />
        )
      },
    },
    {
      field: 'type',
      headerName: t('maintenanceTemplate.table.type'),
      width: 180,
      renderCell: (params) => {
        return isView ? (
          <>{t(MAINTENANCE_JOB_TYPE_MAP[params.row?.type])}</>
        ) : (
          <Field.Autocomplete
            name={`items[${params.row.idx}].type`}
            placeholder={t('maintenanceTemplate.table.type')}
            options={MAINTENANCE_JOB_TYPE_OPTIONS}
            getOptionLabel={(opt) => t(opt?.text)}
            getOptionValue={(opt) => opt?.id}
            onChange={() =>
              setFieldValue(`items[${params.row.idx}].checklistTemplate`, null)
            }
          />
        )
      },
    },
    {
      field: 'description',
      headerName: t('maintenanceTemplate.table.description'),
      width: 200,
      renderCell: (params) => {
        return isView ? (
          <>{params.row?.description}</>
        ) : (
          <Field.TextField
            name={`items[${params.row.idx}].description`}
            placeholder={t('maintenanceTemplate.table.description')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
          />
        )
      },
    },
    {
      field: 'checklistTemplate',
      headerName: t('maintenanceTemplate.table.checklistTemplate'),
      width: 200,
      renderCell: (params) => {
        const { checklistTemplate, type } = params.row
        return isView ? (
          <>{checklistTemplate?.name}</>
        ) : (
          <Field.Autocomplete
            name={`items[${params.row.idx}].checklistTemplate`}
            placeholder={t('maintenanceTemplate.table.checklistTemplate')}
            asyncRequest={(s) =>
              searchTemplateListApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  active: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            disabled={type === MAINTENANCE_JOB_TYPE.MAINTENANCE}
          />
        )
      },
    },
    {
      field: 'time',
      headerName: t('maintenanceTemplate.table.time'),
      width: 200,
      renderCell: (params) => {
        return isView ? (
          <>
            {params.row?.periodTime}{' '}
            {t(MAINTENANCE_PERIOD_UNIT_MAP[params.row?.timeUnit])}
          </>
        ) : (
          <Field.TextField
            name={`items[${params.row.idx}].periodTime`}
            type="number"
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {t('general:days')}
                </InputAdornment>
              ),
            }}
          />
        )
      },
    },
    {
      field: 'obligatory',
      headerName: t('maintenanceTemplate.table.obligatory'),
      align: 'center',
      width: 150,
      renderCell: (params) => {
        return isView ? (
          <Checkbox disabled checked={params.row?.obligatory} />
        ) : (
          <Field.Checkbox name={`items[${params.row.idx}].obligatory`} />
        )
      },
    },
    {
      field: 'remove',
      headerName: t('general:common.action'),
      width: 100,
      align: 'center',
      hide: isView,
      sticky: 'right',
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => arrayHelpers.remove(params.row.idx)}
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
                arrayHelpers.unshift({
                  id: new Date().getTime(),
                  uniqId: new Date().getTime().toString(),
                  title: '',
                  type: MAINTENANCE_JOB_TYPE.CHECK,
                  description: '',
                  checklistTemplate: null,
                  periodTime: null,
                  obligatory: true,
                })
                scrollToBottom()
              },
              onRemoveRow: () => {
                const item = first(items)
                if (items?.length > 1) arrayHelpers.remove(item?.idx)
              },
            }
          : {}),
      }}
    >
      <DataTable
        title={t('maintenanceTemplate.tableTitle')}
        rows={arrayItem}
        columns={columns}
        total={items.length}
        hideSetting
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        beforeTopbar={
          !isView && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.unshift({
                  id: new Date().getTime(),
                  uniqId: new Date().getTime().toString(),
                  title: '',
                  type: MAINTENANCE_JOB_TYPE.CHECK,
                  description: '',
                  checklistTemplate: null,
                  periodTime: null,
                  obligatory: true,
                })
                scrollToBottom()
              }}
            >
              {t('maintenanceTemplate.add')}
            </Button>
          )
        }
      />
    </HotKeys>
  )
}

export default ItemSettingTable
