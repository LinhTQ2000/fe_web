import React, { useCallback } from 'react'

import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import {
  DEVICE_STATUS_ENUM_MAP,
  DEVICE_STATUS_ENUM_OPTIONS,
} from '~/modules/mmsx/constants'
import { convertUtcDateTimeToLocalTz } from '~/utils'

function ItemSettingTable(props) {
  const { t } = useTranslation(['mmsx'])
  const { items, isActionDetail, attributeTypes, ...tableProps } = props

  const getColumns = useCallback(() => {
    const columns = [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'date',
        headerName: t('deviceStatus.form.fromDate'),
        width: 200,
        renderCell: (params, index) => {
          return isActionDetail ? (
            convertUtcDateTimeToLocalTz(params?.row?.startTime)
          ) : (
            <Field.DateTimePicker
              name={`items[${index}].fromDate`}
              maxDate={new Date()}
            />
          )
        },
      },
      {
        field: 'date',
        headerName: t('deviceStatus.form.toDate'),
        width: 200,
        renderCell: (params, index) => {
          return isActionDetail ? (
            convertUtcDateTimeToLocalTz(params?.row?.endTime)
          ) : (
            <Field.DateTimePicker
              name={`items[${index}].toDate`}
              maxDate={new Date()}
            />
          )
        },
      },
      {
        field: 'status',
        headerName: t('deviceStatus.status.title'),
        width: 200,
        renderCell: (params, index) => {
          return isActionDetail ? (
            t(DEVICE_STATUS_ENUM_MAP[params?.row?.status])
          ) : (
            <Field.Autocomplete
              name={`items[${index}].status`}
              placeholder={t('deviceStatus.status.title')}
              options={DEVICE_STATUS_ENUM_OPTIONS}
              getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
              getOptionValue={(opt) => opt?.id}
            />
          )
        },
      },
    ]

    if (!isEmpty(attributeTypes)) {
      attributeTypes.forEach((type) => {
        columns.push({
          field: type?.id || type?.attributeTypeId,
          headerName: type?.name || type?.attributeTypeName,
          width: 150,
          renderCell: (params, index) => {
            return isActionDetail ? (
              type?.value
            ) : (
              <Field.TextField
                name={`items[${index}].${type?.id}`}
                type="number"
              />
            )
          },
        })
      })
    }

    return columns
  }, [attributeTypes, items?.length])

  return (
    <>
      <DataTable
        rows={items}
        title={t('deviceStatus.form.tableTitle')}
        columns={getColumns()}
        striped={true}
        {...(isActionDetail ? {} : { hideSetting: true, hideFooter: true })}
        {...tableProps}
        hideSetting
        hideFooter
        enableResizable={false}
      />
    </>
  )
}

export default ItemSettingTable
