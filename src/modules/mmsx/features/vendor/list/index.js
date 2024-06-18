import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
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
import useDefineVendor from '~/modules/mmsx/redux/hooks/useDefineVendor'
import {
  exportVendorApi,
  getVendorTemplateApi,
  importVendorApi,
} from '~/modules/mmsx/redux/sagas/define-vendor/import-export-vendor'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'
import FilterForm from './form-filters'

const breadcrumbs = [
  {
    route: ROUTE.DEFINE_VENDOR.LIST.PATH,
    title: ROUTE.DEFINE_VENDOR.LIST.TITLE,
  },
]
function DefineVendor() {
  const { t } = useTranslation('database')
  const history = useHistory()
  const { canAccess } = useApp()

  const {
    data: { vendorsList, total, isLoading },
    actions,
  } = useDefineVendor()

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
  } = useQueryState()

  const columns = [
    {
      field: 'code',
      headerName: t('defineVendor.code'),
      width: 100,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('defineVendor.name'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'address',
      headerName: t('defineVendor.addressColumn'),
      filterFormat: 'date',
      width: 150,
    },
    {
      field: 'email',
      headerName: t('defineVendor.email'),
      width: 150,
    },
    {
      field: 'phone',
      headerName: t('defineVendor.phoneColumn'),
      width: 150,
      visible: 'always',
    },
    {
      field: 'taxCode',
      headerName: t('defineVendor.taxNo'),
      width: 150,
    },
    {
      field: 'contactUser',
      headerName: t('defineVendor.contactUser'),
      width: 150,
      visible: 'always',
    },
    {
      field: 'active',
      headerName: t('general:common.status'),
      width: 150,
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
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateTimeToLocalTz(params?.row?.updatedAt)
      },
    },
    {
      field: 'action',
      headerName: t('defineVendor.action'),
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
            <Guard code={FUNCTION_CODE.DETAIL_VENDOR}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.DEFINE_VENDOR.DETAIL.PATH.replace(':id', id),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.UPDATE_VENDOR}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.DEFINE_VENDOR.EDIT.PATH.replace(':id', id),
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            {isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_VENDOR}>
                <IconButton onClick={() => onClickActive(params.row)}>
                  <Icon name="active" />
                </IconButton>
              </Guard>
            )}
            {!isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_VENDOR}>
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
    actions.searchVendors(params)
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
    actions.inActiveVendor(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeVendor(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('menu.defineVendor')}
          {...(canAccess(FUNCTION_CODE.IMPORT_VENDOR)
            ? {
                onImport: (params) => importVendorApi(params),
                onDownloadTemplate: getVendorTemplateApi,
              }
            : {})}
          {...(canAccess(FUNCTION_CODE.EXPORT_VENDOR)
            ? {
                onExport: () =>
                  exportVendorApi({
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
                    type: TYPE_EXPORT.VENDOR,
                  }),
              }
            : {})}
          onRefresh={refreshData}
        />
        <Guard code={FUNCTION_CODE.CREATE_VENDOR}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.DEFINE_VENDOR.CREATE.PATH))
            }
            sx={{ ml: 4 / 3 }}
            icon="add"
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
      title={t('menu.defineVendor')}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('defineVendor.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_VENDOR)) {
              history.push(withSearch(ROUTE.DEFINE_VENDOR.CREATE.PATH))
            }
          },
        }}
      />
      <DataTable
        title={t('defineVendor.title')}
        rows={vendorsList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        onSettingChange={setColumnsSettings}
        total={total}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
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

export default DefineVendor
