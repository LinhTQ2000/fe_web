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
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useSuppliesCategory from '~/modules/mmsx/redux/hooks/useSuppliesCategory'
import {
  exportSuppliesCategoryApi,
  getSuppliesCategoryTemplateApi,
  importSuppliesCategoryApi,
} from '~/modules/mmsx/redux/sagas/supplies-category/import-export'
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
    route: ROUTE.SUPPLIES_CATEGORY.LIST.PATH,
    title: ROUTE.SUPPLIES_CATEGORY.LIST.TITLE,
  },
]
const SuppliesCategory = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const {
    data: { suppliesCategoryList, isLoading, total },
    actions,
  } = useSuppliesCategory()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { canAccess } = useApp()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    active: '',
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
        headerName: t('suppliesCategory.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('suppliesCategory.name'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'description',
        headerName: t('suppliesCategory.description'),
        width: 150,
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
        headerName: t('suppliesCategory.action'),
        width: 200,
        visible: 'always',
        align: 'center',
        sticky: 'right',
        renderCell: (params) => {
          const { id, active } = params?.row
          const isActive = active === ACTIVE_STATUS.ACTIVE

          return (
            <>
              <Guard code={FUNCTION_CODE.DETAIL_SUPPLY_GROUP}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.SUPPLIES_CATEGORY.DETAIL.PATH.replace(':id', id),
                      ),
                    )
                  }
                >
                  <Icon name="show" />
                </IconButton>
              </Guard>
              <Guard code={FUNCTION_CODE.UPDATE_SUPPLY_GROUP}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.SUPPLIES_CATEGORY.EDIT.PATH.replace(':id', id),
                      ),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              </Guard>
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_SUPPLY_GROUP}>
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
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchListSuppliesCategory(params)
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
    actions.inActiveSuppliesCategory(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeSuppliesCategory(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('suppliesCategory.export')}
          {...(canAccess(FUNCTION_CODE.IMPORT_SUPPLY_GROUP)
            ? { onImport: (params) => importSuppliesCategoryApi(params) }
            : {})}
          {...(canAccess(FUNCTION_CODE.EXPORT_SUPPLY_GROUP)
            ? {
                onExport: () =>
                  exportSuppliesCategoryApi({
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
                    type: TYPE_EXPORT.SUPPLY_GROUP,
                  }),
              }
            : {})}
          onDownloadTemplate={getSuppliesCategoryTemplateApi}
          onRefresh={refreshData}
        />
        <Guard code={FUNCTION_CODE.CREATE_SUPPLY_GROUP}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.SUPPLIES_CATEGORY.CREATE.PATH))
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
      title={t('menu.suppliesCategory')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('suppliesCategory.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_SUPPLY_GROUP)) {
              history.push(withSearch(ROUTE.SUPPLIES_CATEGORY.CREATE.PATH))
            }
          },
        }}
      />
      <DataTable
        title={t('suppliesCategory.title')}
        columns={columns}
        rows={suppliesCategoryList}
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

export default SuppliesCategory
