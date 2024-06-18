import React, { useEffect, useState, useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { BULK_ACTION, TYPE_EXPORT } from '~/common/constants'
import { API_URL } from '~/common/constants/apiUrl'
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
import useItemUnit from '~/modules/mmsx/redux/hooks/useItemUnit'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import {
  exportItemUnitSettingApi,
  getItemUnitSettingTemplateApi,
  importItemUnitSettingApi,
} from '../../redux/sagas/item-unit-setting/import-export-item-unit'
import DialogActive from './dialogs/active'
import DialogInActive from './dialogs/in-active'
import FilterForm from './filter-form'

const breadcrumbs = [
  {
    route: ROUTE.ITEM_UNIT.LIST.PATH,
    title: ROUTE.ITEM_UNIT.LIST.TITLE,
  },
]
function ItemUnitSetting() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { canAccess } = useApp()

  const {
    data: { isLoading, itemUnitList, total },
    actions,
  } = useItemUnit()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
  }

  const [tempItem, setTempItem] = useState(null)
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

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
  } = useQueryState({ filters: DEFAULT_FILTERS })

  const columns = useMemo(
    () => [
      {
        field: 'code',
        headerName: t('itemUnitDefine.unitCode'),
        width: 100,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('itemUnitDefine.unitName'),
        width: 200,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'description',
        headerName: t('itemUnitDefine.unitNote'),
        width: 250,
        sortable: false,
      },
      {
        field: 'manageBy',
        headerName: t('general.manageBy.title'),
        width: 150,
        visible: 'always',
        renderCell: (params) => {
          const { manageBy } = params.row
          return manageBy
            ? t('general.manageBy.wfx')
            : t('general.manageBy.mmsx')
        },
      },
      {
        field: 'active',
        headerName: t('general:common.status'),
        width: 150,
        sortable: true,
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
        sortable: true,
        filterFormat: 'date',
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.updatedAt)
        },
      },
      {
        field: 'action',
        headerName: t('itemUnitDefine.action'),
        width: 150,
        sortable: false,
        align: 'center',
        visible: 'always',
        sticky: 'right',
        renderCell: (params) => {
          const { id, active } = params?.row
          const isActive = active === ACTIVE_STATUS.ACTIVE
          return (
            <>
              <Guard code={FUNCTION_CODE.DETAIL_UNIT}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.ITEM_UNIT.DETAIL.PATH.replace(':id', `${id}`),
                      ),
                    )
                  }
                >
                  <Icon name="show" />
                </IconButton>
              </Guard>
              <Guard code={FUNCTION_CODE.UPDATE_UNIT}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.ITEM_UNIT.EDIT.PATH.replace(':id', `${id}`),
                      ),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              </Guard>
              {isActive && (
                <Guard code={FUNCTION_CODE.UPDATE_STATUS_UNIT}>
                  <IconButton onClick={() => onClickActive(params.row)}>
                    <Icon name="active" />
                  </IconButton>
                </Guard>
              )}
              {!isActive && (
                <Guard code={FUNCTION_CODE.UPDATE_STATUS_UNIT}>
                  <IconButton onClick={() => onClickInActive(params.row)}>
                    <Icon name="inActive" />
                  </IconButton>
                </Guard>
              )}
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
      page: page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchItemUnits(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps])

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('itemUnitDefine.export')}
          {...(canAccess(FUNCTION_CODE.IMPORT_UNIT)
            ? {
                onImport: (params) => importItemUnitSettingApi(params),
                onDownloadTemplate: getItemUnitSettingTemplateApi,
              }
            : {})}
          {...(canAccess(FUNCTION_CODE.EXPORT_UNIT)
            ? {
                onExport: () =>
                  exportItemUnitSettingApi({
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
                    type: TYPE_EXPORT.UNIT,
                  }),
              }
            : {})}
          onRefresh={refreshData}
        />
        <Guard code={FUNCTION_CODE.CREATE_UNIT}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.ITEM_UNIT.CREATE.PATH))
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

  const onClickActive = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenActive(true)
  }

  const onClickInActive = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenInActive(true)
  }

  const onSubmitActive = () => {
    actions.inActiveItemUnit(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeItemUnit(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.itemUnitDefine')}
        onSearch={setKeyword}
        keyword={keyword}
        placeholder={t('itemUnitDefine.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <HotKeys
          handlers={{
            onCreate: () => {
              if (canAccess(FUNCTION_CODE.CREATE_UNIT)) {
                history.push(withSearch(ROUTE.ITEM_UNIT.CREATE.PATH))
              }
            },
          }}
        />
        <DataTable
          title={t('itemUnitDefine.title')}
          rows={itemUnitList}
          pageSize={pageSize}
          page={page}
          columns={columns}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSortChange={setSort}
          onSettingChange={setColumnsSettings}
          onSelectionChange={setSelectedRows}
          selected={selectedRows}
          total={total}
          filters={{
            form: <FilterForm />,
            values: filters,
            defaultValue: DEFAULT_FILTERS,
            onApply: setFilters,
          }}
          sort={sort}
          bulkActions={{
            actions: [BULK_ACTION.DELETE],
            apiUrl: API_URL.ITEM_UNIT,
            onSuccess: () => {
              if (page === 1) {
                refreshData()
              } else {
                setPage(1)
              }
              setSelectedRows([])
            },
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
    </>
  )
}

export default ItemUnitSetting
