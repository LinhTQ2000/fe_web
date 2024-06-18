import React from 'react'

import { IconButton } from '@mui/material'
import { findLastIndex } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import { searchUsersApi } from '~/modules/configuration/redux/sagas/user-management/search-users'
import {
  ROLE_ENUM,
  ROLE_ENUM_MAP,
  ROLE_ENUM_OPTIONS,
} from '~/modules/mmsx/constants'
import { convertFilterParams } from '~/utils'

const ItemSettingTable = ({
  items,
  mode,
  arrayHelpers,
  factoryId,
  areas,
  deviceGroups,
}) => {
  const { t } = useTranslation(['mmsx'])
  const { scrollToBottom } = useApp()
  const isView = mode === MODAL_MODE.DETAIL

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
      field: 'memberName',
      headerName: t('maintenanceTeam.team.memberName'),
      width: 250,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((item) => item?.memberName?.id)
        return isView ? (
          <>{params.row.username}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].memberName`}
            placeholder={t('maintenanceTeam.team.memberName')}
            asyncRequest={(s) =>
              searchUsersApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  departmentCode: 'me',
                  factoryId,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.username}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.memberName?.id
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestDeps={factoryId}
            required
          />
        )
      },
    },
    {
      field: 'role',
      headerName: t('maintenanceTeam.team.mission'),
      width: 250,
      renderCell: (params, index) => {
        const hasLeader = items.some((item) => item?.role === ROLE_ENUM.LEADER)

        return isView ? (
          <>{t(ROLE_ENUM_MAP[params.row.role])}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].role`}
            placeholder={t('maintenanceTeam.team.mission')}
            options={ROLE_ENUM_OPTIONS}
            getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
            getOptionValue={(opt) => opt?.id}
            getOptionDisabled={(opt) =>
              hasLeader && opt.id === ROLE_ENUM.LEADER
            }
            required
          />
        )
      },
    },
    {
      field: 'area',
      headerName: t('maintenanceTeam.team.area'),
      width: 250,
      renderCell: (params, index) => {
        return isView ? (
          <>{params.row.areas?.map((i) => i?.name).join(', ')}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].area`}
            placeholder={t('maintenanceTeam.team.area')}
            options={areas || []}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            required
            multiple
          />
        )
      },
    },
    {
      field: 'deviceGroup',
      headerName: t('maintenanceTeam.team.deviceGroup'),
      width: 250,
      renderCell: (params, index) => {
        return isView ? (
          <>{params.row.deviceGroups?.map((i) => i?.name).join(', ')}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].deviceGroup`}
            placeholder={t('maintenanceTeam.team.deviceGroup')}
            options={deviceGroups || []}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            required
            multiple
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
      renderCell: (_, index) => {
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
  ]
  return (
    <>
      <HotKeys
        handlers={{
          ...(!isView
            ? {
                onAddRow: () => {
                  arrayHelpers.push({
                    id: new Date().getTime(),
                    memberName: null,
                    role: null,
                    area: [],
                    deviceGroup: [],
                  })
                  scrollToBottom()
                },
                onRemoveRow: () => {
                  if (items?.length > 1)
                    arrayHelpers.remove(findLastIndex(items))
                },
              }
            : {}),
        }}
      >
        <DataTable
          rows={items}
          title={t('maintenanceTeam.roleDetail')}
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
                    memberName: null,
                    role: null,
                    area: [],
                    deviceGroup: [],
                  })
                  scrollToBottom()
                }}
              >
                {t('maintenanceTeam.addMember')}
              </Button>
            )
          }
        />
      </HotKeys>
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
