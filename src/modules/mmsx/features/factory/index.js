import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
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
import {
  ACTIVE_STATUS,
  ACTIVE_STATUS_OPTIONS,
  TYPE_ENUM_EXPORT,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDefineFactory from '~/modules/mmsx/redux/hooks/useDefineFactory'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import {
  exportFactoryApi,
  getFactoryTemplateApi,
  importFactoryApi,
} from '../../redux/sagas/factory/import-export-factory'
import DialogActive from './dialogs/active'
import DialogInActive from './dialogs/in-active'
import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    route: ROUTE.DEFINE_FACTORY.LIST.PATH,
    title: ROUTE.DEFINE_FACTORY.LIST.TITLE,
  },
]

function DefineFactory() {
  const { t } = useTranslation('database')
  const history = useHistory()
  const { canAccess } = useApp()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: null,
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
  } = useQueryState({ filters: DEFAULT_FILTERS })

  const {
    data: { factoryList, total, isLoading },
    actions,
  } = useDefineFactory()

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [tempItem, setTempItem] = useState(null)
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const columns = [
    {
      field: 'code',
      headerName: t('defineFactory.code'),
      width: 100,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('defineFactory.name'),
      width: 200,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'region',
      headerName: t('defineFactory.regionName'),
      width: 200,
      renderCell: (params) => {
        return params.row?.region?.name
      },
    },
    {
      field: 'location',
      headerName: t('defineFactory.location'),
      width: 200,
      sortable: false,
    },
    {
      field: 'phone',
      headerName: t('defineFactory.phone'),
      width: 150,
      sortable: false,
    },
    {
      field: 'description',
      headerName: t('defineFactory.description'),
      width: 150,
      sortable: false,
    },
    {
      field: 'manageBy',
      headerName: t('general.manageBy.title'),
      width: 150,
      visible: 'always',
      renderCell: (params) => {
        const { manageBy } = params.row
        return manageBy ? t('general.manageBy.wfx') : t('general.manageBy.mmsx')
      },
    },
    {
      field: 'codeOnWfx',
      headerName: t('deviceName.codeOnWfx'),
      width: 150,
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
            <Guard code={FUNCTION_CODE.DETAIL_FACTORY}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.DEFINE_FACTORY.DETAIL.PATH.replace(':id', `${id}`),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.UPDATE_FACTORY}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.DEFINE_FACTORY.EDIT.PATH.replace(':id', `${id}`),
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            {isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_FACTORY}>
                <IconButton onClick={() => onClickActive(params.row)}>
                  <Icon name="active" />
                </IconButton>
              </Guard>
            )}
            {!isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_FACTORY}>
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
      filter: convertFilterParams(
        { ...filters, regionId: filters?.regionId?.id },
        [{ field: 'createdAt', filterFormat: 'date' }],
      ),
      sort: convertSortParams(sort),
      isMasterData: 1,
    }

    actions.searchFactories(params)
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
    actions.inActiveFactory(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeFactory(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('defineFactory.export')}
          {...(canAccess(FUNCTION_CODE.IMPORT_FACTORY)
            ? {
                onImport: (params) => importFactoryApi(params),
                onDownloadTemplate: getFactoryTemplateApi,
              }
            : {})}
          {...(canAccess(FUNCTION_CODE.EXPORT_FACTORY)
            ? {
                onExport: () =>
                  exportFactoryApi({
                    columnSettings: JSON.stringify(columnsSettings),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: x?.id })),
                    ),
                    keyword: keyword.trim(),
                    filter: convertFilterParams(
                      { ...filters, regionId: filters?.regionId?.id },
                      [{ field: 'createdAt', filterFormat: 'date' }],
                    ),
                    page,
                    limit: pageSize,
                    sort: convertSortParams(sort),
                    type: TYPE_ENUM_EXPORT.FACTORY,
                  }),
              }
            : {})}
          onRefresh={refreshData}
        />
        <Guard code={FUNCTION_CODE.CREATE_FACTORY}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.DEFINE_FACTORY.CREATE.PATH))
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
      title={t('menu.defineFactory')}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('defineFactory.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_FACTORY))
              history.push(withSearch(ROUTE.DEFINE_FACTORY.CREATE.PATH))
          },
        }}
      />
      <DataTable
        title={t('defineFactory.factoryList')}
        rows={factoryList}
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
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
          validationSchema: filterSchema(t),
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

export default DefineFactory
