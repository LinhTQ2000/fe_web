import React, { useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'

const ItemSettingTable = ({ items, arrayHelpers }) => {
  const { t } = useTranslation(['mmsx'])
  const { scrollToBottom } = useApp()

  const getColumns = useMemo(
    () => [
      {
        field: 'id',
        headerName: t('#'),
        width: 50,
        align: 'center',
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'role',
        headerName: t('signatureConfiguration.role'),
        width: 200,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].role`}
              placeholder={t('signatureConfiguration.role')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
              }}
            />
          )
        },
      },
      {
        field: 'name',
        headerName: t('signatureConfiguration.signerName'),
        width: 200,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].name`}
              placeholder={t('signatureConfiguration.signerName')}
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
        headerName: t('general:common.action'),
        width: 100,
        align: 'center',
        sticky: 'right',
        renderCell: (params, index) => {
          return (
            <IconButton
              type="button"
              onClick={() => {
                arrayHelpers.remove(index)
              }}
              disabled={items?.length === 1}
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
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" component="span">
          {t('signatureConfiguration.list')}
        </Typography>

        <Button
          icon="add"
          onClick={() => {
            arrayHelpers.push({
              id: new Date().getTime(),
              role: '',
              name: '',
            })
            scrollToBottom()
          }}
        >
          {t('signatureConfiguration.add')}
        </Button>
      </Box>
      <DataTable
        rows={items}
        columns={getColumns}
        total={items.length}
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
  mode: PropTypes.string,
}

export default ItemSettingTable
