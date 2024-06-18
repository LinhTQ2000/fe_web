import React, { useMemo } from 'react'

import { FormControlLabel, IconButton } from '@mui/material'
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

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['database'])
  const { scrollToBottom } = useApp()

  const isView = mode === MODAL_MODE.DETAIL

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        width: 80,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'title',
        headerName: t('templateChecklist.form.title'),
        width: 400,
        renderCell: (params, index) => {
          return isView ? (
            <>{params.row.title}</>
          ) : (
            <Field.TextField
              name={`items[${index}].title`}
              placeholder={t('templateChecklist.form.title')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
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
        renderCell: (params, index) => {
          return isView ? (
            <>{params.row.descriptionDetail}</>
          ) : (
            <Field.TextField
              name={`items[${index}].descriptionDetail`}
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
        field: 'obligatory',
        headerName: t('templateChecklist.form.obligatory'),
        align: 'center',
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            <Checkbox disabled checked={params.row.obligatory} />
          ) : (
            <FormControlLabel
              control={<Field.Checkbox name={`items[${index}].obligatory`} />}
              label=""
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
                  descriptionDetail: '',
                  obligatory: true,
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
        title={t('templateChecklist.checkDetail')}
        columns={columns}
        striped={false}
        hideSetting
        hideFooter
        beforeTopbar={
          !isView && (
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  title: '',
                  descriptionDetail: '',
                  obligatory: true,
                })
                scrollToBottom()
              }}
            >
              {t('templateChecklist.addRow')}
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
