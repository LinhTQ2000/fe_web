import React, { useMemo } from 'react'

import { IconButton } from '@mui/material'
import { findLastIndex } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import Checkbox from '~/components/Checkbox'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'

const ItemSettingTable = ({ items, arrayHelpers, mode }) => {
  const { t } = useTranslation(['database'])
  const { scrollToBottom } = useApp()
  const isView = mode === MODAL_MODE.DETAIL
  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'title',
        width: 200,
        headerName: t('templateInstall.form.field.title'),
        renderCell: (params, index) => {
          return isView ? (
            <>{params?.row?.title}</>
          ) : (
            <Field.TextField
              name={`items[${index}].title`}
              placeholder={t('templateInstall.titlePlaceholer')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
              }}
            />
          )
        },
      },
      {
        field: 'description',
        width: 300,
        headerName: t('templateInstall.form.field.description'),
        renderCell: (params, index) => {
          return isView ? (
            <>{params?.row?.description}</>
          ) : (
            <Field.TextField
              name={`items[${index}].description`}
              placeholder={t('templateInstall.descriptionPlaceholer')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
              }}
            />
          )
        },
      },
      {
        field: 'isRequire',
        width: 100,
        headerName: t('templateInstall.form.field.mandatory'),
        align: 'center',
        renderCell: (params, index) => {
          return isView ? (
            <Checkbox
              checked={params?.row?.isRequire}
              name="isProductionObject"
              disabled
            />
          ) : (
            <Field.Checkbox
              name={`items[${index}].isRequire`}
              disabled={isView}
            />
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
        renderCell: (params, index) => {
          return (
            <IconButton
              onClick={() => arrayHelpers.remove(index)}
              disabled={items?.length === 1}
              size="large"
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [items],
  )

  return (
    <HotKeys
      handlers={{
        ...(!isView
          ? {
              onAddRow: () => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  title: '',
                  description: '',
                  isRequire: true,
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
        rows={items}
        title={t('templateInstall.installListTable')}
        columns={columns}
        hideSetting
        hideFooter
        total={items.length}
        striped={false}
        beforeTopbar={
          !isView && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  title: '',
                  description: '',
                  isRequire: true,
                })
                scrollToBottom()
              }}
            >
              {t('templateInstall.addRow')}
            </Button>
          )
        }
      />
    </HotKeys>
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
