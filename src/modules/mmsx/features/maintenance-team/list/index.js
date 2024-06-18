import React, { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { TYPE_EXPORT } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ACTIVE_STATUS,
  ACTIVE_STATUS_OPTIONS,
  ROLE_ENUM,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useMaintenanceTeam from '~/modules/mmsx/redux/hooks/useMaintenanceTeam'
import {
  exportMaintenanceTeamApi,
  getMaintenanceTeamTemplateApi,
  importMaintenanceTeamApi,
} from '~/modules/mmsx/redux/sagas/maintenance-team/import-export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'
import FilterForm from './filter-form'
const breadcrumbs = [
  {
    route: ROUTE.MAINTENANCE_TEAM.LIST.PATH,
    title: ROUTE.MAINTENANCE_TEAM.LIST.TITLE,
  },
]
const MaintenanceTeam = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const [selectedRows, setSelectedRows] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])

  const {
    data: { maintenanceTeams, isLoading, meta },
    actions,
  } = useMaintenanceTeam()
  const { canAccess } = useApp()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    type: '',
    createdAt: '',
    updateAt: '',
  }

  const {
    page,
    pageSize,
    sort,
    filters,
    keyword,
    selectedRowsDeps,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    setKeyword,
    withSearch,
  } = useQueryState()

  const columns = useMemo(
    () => [
      {
        field: 'code',
        headerName: t('maintenanceTeam.team.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('maintenanceTeam.team.name'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'leaderName',
        headerName: t('maintenanceTeam.leader'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const leader = params.row.members.find(
            (member) => member.role === ROLE_ENUM.LEADER,
          )
          return leader.username
        },
      },
      {
        field: 'factory',
        headerName: t('maintenanceTeam.factory'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params.row?.factory?.name
        },
      },
      {
        field: 'active',
        headerName: t('common.status'),
        width: 150,
        renderCell: (params) => {
          const { active } = params.row
          return (
            <Status
              options={ACTIVE_STATUS_OPTIONS}
              value={active}
              variant="text"
            />
          )
        },
      },
      {
        field: 'updatedAt',
        headerName: t('general:common.updatedAt'),
        width: 150,
        filterFormat: 'date',
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.updatedAt)
        },
      },
      {
        field: 'actions',
        headerName: t('maintenanceTeam.action'),
        width: 200,
        visible: 'always',
        align: 'center',
        sticky: 'right',
        renderCell: (params) => {
          const { id, active } = params?.row
          const isActive = active === ACTIVE_STATUS.ACTIVE
          return (
            <>
              <Guard code={FUNCTION_CODE.DETAIL_MAINTENANCE_TEAM}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.MAINTENANCE_TEAM.DETAIL.PATH.replace(
                          ':id',
                          `${id}`,
                        ),
                      ),
                    )
                  }
                >
                  <Icon name="show" />
                </IconButton>
              </Guard>
              <Guard code={FUNCTION_CODE.UPDATE_MAINTENANCE_TEAM}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.MAINTENANCE_TEAM.EDIT.PATH.replace(
                          ':id',
                          `${id}`,
                        ),
                      ),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              </Guard>
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_MAINTENANCE_TEAM}>
                {isActive && (
                  <IconButton onClick={() => onClickActive(params.row)}>
                    <Icon name="active" />
                  </IconButton>
                )}
                {!isActive && (
                  <IconButton onClick={() => onClickInActive(params.row)}>
                    <Icon name="inActive" />
                  </IconButton>
                )}
              </Guard>
            </>
          )
        },
      },
    ],
    [withSearch],
  )

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          factoryId: filters?.factoryId?.id,
          leaderId: filters?.leaderId?.id,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.getListMaintenanceTeamStart(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps])

  const onClickActive = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenActive(true)
  }

  const onClickInActive = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenInActive(true)
  }

  const onSubmitActive = () => {
    actions.inActiveMaintenanceTeam(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeMaintenanceTeam(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('maintenanceTeam.export')}
          onImport={(params) => importMaintenanceTeamApi(params)}
          onExport={() =>
            exportMaintenanceTeamApi({
              keyword: keyword.trim(),
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: x?.id })),
              ),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              page,
              limit: pageSize,
              sort: convertSortParams(sort),
              type: TYPE_EXPORT.MAINTENANCE_TEAM,
            })
          }
          onDownloadTemplate={getMaintenanceTeamTemplateApi}
          onRefresh={refreshData}
        />
        <Guard code={FUNCTION_CODE.CREATE_MAINTENANCE_TEAM}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.MAINTENANCE_TEAM.CREATE.PATH))
            }
            icon="add"
            sx={{ ml: 4 / 3 }}
          >
            {t('general:common.create')}
          </Button>
        </Guard>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.maintenanceTeam')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('maintenanceTeam.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_MAINTENANCE_TEAM))
              history.push(withSearch(ROUTE.MAINTENANCE_TEAM.CREATE.PATH))
          },
        }}
      />
      <DataTable
        title={t('maintenanceTeam.title')}
        columns={columns}
        rows={maintenanceTeams}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={meta.total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
      />
      <DialogActive
        open={isOpenActive}
        onCancel={() => setIsOpenActive(false)}
        onSubmit={onSubmitActive}
        tempItem={tempItem}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={tempItem}
      />
    </Page>
  )
}

export default MaintenanceTeam
