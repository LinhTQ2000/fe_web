import { useEffect, useState } from 'react'

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
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import useMaintenanceAttribute from '../../redux/hooks/useMaintenanceAttribute'
import {
  exportMaintenanceAttributeApi,
  getMaintenanceAttributeTemplateApi,
  importMaintenanceAttributeApi,
} from '../../redux/sagas/maintenance-attribute/import-export'
import DialogActive from './dialogs/active'
import DialogInActive from './dialogs/in-active'
import FilterForm from './filter-form'
const breadcrumbs = [
  {
    route: ROUTE.MAINTENANCE_ATTRIBUTE.LIST.PATH,
    title: ROUTE.MAINTENANCE_ATTRIBUTE.LIST.TITLE,
  },
]
function MaintenanceAttribute() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
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

  const {
    data: { maintenanceAttributeList, isLoading, total },
    actions,
  } = useMaintenanceAttribute()
  const { canAccess } = useApp()
  const [selectedRows, setSelectedRows] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])

  const [tempItem, setTempItem] = useState(null)
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const columns = [
    {
      field: 'code',
      headerName: t('maintenanceAttribute.table.code'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('maintenanceAttribute.table.name'),
      width: 150,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('maintenanceAttribute.table.description'),
      width: 200,
    },
    {
      field: 'active',
      headerName: t('general:common.status'),
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
      field: 'action',
      headerName: t('general:common.action'),
      width: 200,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      renderCell: (params) => {
        const { id, active } = params?.row
        const isActive = active === ACTIVE_STATUS.ACTIVE
        return (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_MAINTENANCE_ATTRIBUTE}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.MAINTENANCE_ATTRIBUTE.DETAIL.PATH.replace(
                        ':id',
                        id,
                      ),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.UPDATE_MAINTENANCE_ATTRIBUTE}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.MAINTENANCE_ATTRIBUTE.EDIT.PATH.replace(':id', id),
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            {isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_MAINTENANCE_ATTRIBUTE}>
                <IconButton onClick={() => onClickActive(params.row)}>
                  <Icon name="active" />
                </IconButton>
              </Guard>
            )}
            {!isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_MAINTENANCE_ATTRIBUTE}>
                <IconButton onClick={() => onClickInActive(params.row)}>
                  <Icon name="inActive" />
                </IconButton>
              </Guard>
            )}
          </>
        )
      },
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchMaintenanceAttribute(params)
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
    actions.inActiveMaintenanceAttribute(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeMaintenanceAttribute(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('maintenanceAttribute.export')}
          onImport={(params) => importMaintenanceAttributeApi(params)}
          onExport={() =>
            exportMaintenanceAttributeApi({
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
              type: TYPE_EXPORT.MAINTENANCE_ATTRIBUTE,
            })
          }
          onDownloadTemplate={getMaintenanceAttributeTemplateApi}
          onRefresh={refreshData}
        />
        <Guard code={FUNCTION_CODE.CREATE_MAINTENANCE_ATTRIBUTE}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.MAINTENANCE_ATTRIBUTE.CREATE.PATH))
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
      title={t('menu.maintenanceAttribute')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('maintenanceAttribute.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_MAINTENANCE_ATTRIBUTE)) {
              history.push(withSearch(ROUTE.MAINTENANCE_ATTRIBUTE.CREATE.PATH))
            }
          },
        }}
      />
      <DataTable
        title={t('maintenanceAttribute.title')}
        columns={columns}
        rows={maintenanceAttributeList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSelectionChange={setSelectedRows}
        onSettingChange={setColumnsSettings}
        selected={selectedRows}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
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

export default MaintenanceAttribute
