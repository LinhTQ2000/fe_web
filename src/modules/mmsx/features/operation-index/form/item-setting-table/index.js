import { useCallback, useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  MODAL_MODE,
  ROWS_PER_PAGE_OPTIONS,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'

export default function ItemSettingTable({ items = [], arrayHelpers, mode }) {
  const { t } = useTranslation(['database'])
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
      width: 80,
      renderCell: (params) => {
        return params.row.idx + 1
      },
    },
    {
      field: 'name',
      headerName: t('operationIndex.form.name'),
      width: 400,
      renderCell: (params) => {
        return isView ? (
          <>{params.row.name}</>
        ) : (
          <Field.TextField
            name={`items[${params.row.idx}].name`}
            placeholder={t('operationIndex.form.name')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
            }}
            required
          />
        )
      },
    },
    {
      field: 'descriptionDetail',
      headerName: t('templateChecklist.form.description'),
      width: 400,
      renderCell: (params) => {
        return isView ? (
          <>{params.row.description}</>
        ) : (
          <Field.TextField
            name={`items[${params.row.idx}].description`}
            placeholder={t('templateChecklist.form.description')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
            required
          />
        )
      },
    },
    {
      field: 'remove',
      width: 100,
      hide: isView,
      align: 'center',
      sticky: 'right',
      headerName: t('general:common.action'),
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
    <DataTable
      title={t('operationIndex.tableTitle')}
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
                name: '',
                description: '',
              })
              scrollToBottom()
            }}
          >
            {t('operationIndex.add')}
          </Button>
        )
      }
    />
  )
}
