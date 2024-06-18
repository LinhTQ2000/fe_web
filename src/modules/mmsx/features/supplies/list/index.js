import React, { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

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
import useDefineSupplies from '~/modules/mmsx/redux/hooks/useDefineSupplies'
import {
  exportDefineSuppliesApi,
  getDefineSuppliesTemplateApi,
  importDefineSuppliesApi,
} from '~/modules/mmsx/redux/sagas/supplies/import-export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'
import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'deviceManagement',
  },
  {
    route: ROUTE.DEFINE_SUPPLIES.LIST.PATH,
    title: ROUTE.DEFINE_SUPPLIES.LIST.TITLE,
  },
]
const DefineSupplies = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const { canAccess } = useApp()

  const {
    data: { suppliesList, isLoading, total },
    actions,
  } = useDefineSupplies()
  const { t } = useTranslation(['mmsx'])
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

  const columns = useMemo(
    () => [
      {
        field: 'code',
        headerName: t('supplies.category.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('supplies.category.name'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'nameOther',
        headerName: t('supplies.form.field.nameOther'),
        width: 150,
      },
      {
        field: 'supplyGroupName',
        headerName: t('supplies.category.suppliesCategory'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.supplyGroup?.name
        },
      },
      {
        field: 'type',
        headerName: t('supplies.category.type'),
        width: 150,
        sortable: true,
        renderCell: (params) => params?.row?.supplyType?.name,
      },
      {
        field: 'vendor',
        headerName: t('supplies.category.supplier'),
        width: 150,
        renderCell: (params) => params?.row?.vendor?.name,
      },
      {
        field: 'unit',
        headerName: t('supplies.category.unit'),
        width: 150,
        renderCell: (params) => params?.row?.unit?.name,
      },
      {
        field: 'price',
        headerName: t('supplies.category.price'),
        width: 150,
      },
      {
        field: 'active',
        headerName: t('deviceCategory.form.status'),
        width: 200,
        sortable: false,
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
        sortable: false,
        filterFormat: 'date',
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.updatedAt)
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
              <Guard code={FUNCTION_CODE.DETAIL_SUPPLY}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.DEFINE_SUPPLIES.DETAIL.PATH.replace(':id', id),
                      ),
                    )
                  }
                >
                  <Icon name="show" />
                </IconButton>
              </Guard>
              <Guard code={FUNCTION_CODE.UPDATE_SUPPLY}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.DEFINE_SUPPLIES.EDIT.PATH.replace(':id', id),
                      ),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              </Guard>
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_SUPPLY}>
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
          supplyTypeId: filters?.supplyTypeId?.id,
          vendorId: filters?.vendorId?.id,
          supplyGroupId: filters?.supplyGroupId?.id,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchListSupplies(params)
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
    actions.inActiveSupplies(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeSupplies(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('supplies.export')}
          {...(canAccess(FUNCTION_CODE.IMPORT_SUPPLY)
            ? { onImport: (params) => importDefineSuppliesApi(params) }
            : {})}
          {...(canAccess(FUNCTION_CODE.EXPORT_SUPPLY)
            ? {
                onExport: () =>
                  exportDefineSuppliesApi({
                    columnSettings: JSON.stringify(columnsSettings),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: x?.id })),
                    ),
                    keyword: keyword.trim(),
                    filter: convertFilterParams(filters, [
                      { field: 'createdAt', filterFormat: 'date' },
                    ]),
                    page,
                    limit: pageSize,
                    sort: convertSortParams(sort),
                  }),
              }
            : {})}
          onDownloadTemplate={getDefineSuppliesTemplateApi}
          onRefresh={refreshData}
        />
        <Guard code={FUNCTION_CODE.CREATE_SUPPLY}>
          <Button
            onClick={() => history.push(ROUTE.DEFINE_SUPPLIES.CREATE.PATH)}
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
      title={t('menu.supplies')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('supplies.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_SUPPLY))
              history.push(ROUTE.DEFINE_SUPPLIES.CREATE.PATH)
          },
        }}
      />
      <DataTable
        title={t('supplies.title')}
        columns={columns}
        rows={suppliesList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
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

export default DefineSupplies
