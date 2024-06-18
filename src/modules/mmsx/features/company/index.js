import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { BULK_ACTION } from '~/common/constants'
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
import {
  ACTIVE_STATUS,
  ACTIVE_STATUS_OPTIONS,
  TYPE_ENUM_EXPORT,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDefineCompany from '~/modules/mmsx/redux/hooks/useDefineCompany'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import { exportCompanyApi } from '../../redux/sagas/define-company/import-export-company'
import DialogActive from './dialogs/active'
import DialogInActive from './dialogs/in-active'
import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    route: ROUTE.DEFINE_COMPANY.LIST.PATH,
    title: ROUTE.DEFINE_COMPANY.LIST.TITLE,
  },
]

function DefineCompany() {
  const { t } = useTranslation('database')
  const history = useHistory()
  const { canAccess } = useApp()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    taxNo: '',
    createTime: [],
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
    data: { companyList, total, isLoading },
    actions,
  } = useDefineCompany()

  const [tempItem, setTempItem] = useState(null)
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'code',
      headerName: t('defineCompany.code'),
      width: 100,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('defineCompany.name'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'address',
      headerName: t('defineCompany.address'),
      width: 150,
    },
    {
      field: 'phone',
      headerName: t('defineCompany.phone'),
      width: 100,
    },
    {
      field: 'email',
      headerName: t('defineCompany.email'),
      width: 100,
    },
    {
      field: 'fax',
      headerName: t('defineCompany.fax'),
      width: 100,
    },
    {
      field: 'taxNo',
      headerName: t('defineCompany.tax'),
      width: 100,
    },
    {
      field: 'description',
      headerName: t('defineCompany.description'),
      width: 100,
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
            <Guard code={FUNCTION_CODE.DETAIL_COMPANY}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.DEFINE_COMPANY.DETAIL.PATH.replace(':id', `${id}`),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.UPDATE_COMPANY}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.DEFINE_COMPANY.EDIT.PATH.replace(':id', `${id}`),
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            {isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_COMPANY}>
                <IconButton onClick={() => onClickActive(params.row)}>
                  <Icon name="active" />
                </IconButton>
              </Guard>
            )}
            {!isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_COMPANY}>
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
      filter: convertFilterParams(filters, [
        { field: 'createdAt', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }
    actions.searchCompanies(params)
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
    actions.inActiveCompany(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeCompany(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Guard code={FUNCTION_CODE.EXPORT_COMPANY}>
          <ImportExport
            name={t('defineCompany.export')}
            onExport={() =>
              exportCompanyApi({
                columnSettings: JSON.stringify(columnsSettings),
                queryIds: JSON.stringify(
                  selectedRows?.map((x) => ({ id: `${x?.id}` })),
                ),
                keyword: keyword.trim(),
                filter: convertFilterParams(filters, [
                  { field: 'createdAt', filterFormat: 'date' },
                ]),
                page,
                limit: pageSize,
                sort: convertSortParams(sort),
                type: TYPE_ENUM_EXPORT.COMPANY,
              })
            }
            onRefresh={refreshData}
          />
        </Guard>
        <Guard code={FUNCTION_CODE.CREATE_COMPANY}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.DEFINE_COMPANY.CREATE.PATH))
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
      title={t('menu.defineCompany')}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('defineCompany.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_COMPANY))
              history.push(withSearch(ROUTE.DEFINE_COMPANY.CREATE.PATH))
          },
        }}
      />
      <DataTable
        title={t('defineCompany.companyList')}
        rows={companyList}
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
        {...(canAccess(FUNCTION_CODE.DELETE_COMPANY)
          ? {
              bulkActions: {
                actions: [BULK_ACTION.DELETE],
                apiUrl: API_URL.COMPANY,
                onSuccess: () => {
                  if (page === 1) {
                    refreshData()
                  } else {
                    setPage(1)
                  }
                  setSelectedRows([])
                },
              },
            }
          : {})}
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

export default DefineCompany
