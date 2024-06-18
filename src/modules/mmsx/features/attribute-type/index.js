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
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import {
  exportAttributeTypeApi,
  getAttributeTypeTemplateApi,
  importAttributeTypeApi,
} from '~/modules/mmsx/redux/sagas/attribute-type/import-export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '../../constants'
import useAttributeType from '../../redux/hooks/useAttributeType'
import DialogActive from './dialogs/active'
import DialogInActive from './dialogs/in-active'
import FilterForm from './filter'

const breadcrumbs = [
  {
    route: ROUTE.ATTRIBUTE_TYPE.LIST.PATH,
    title: ROUTE.ATTRIBUTE_TYPE.LIST.TITLE,
  },
]
function AttributeType() {
  const { t } = useTranslation('mmsx')
  const history = useHistory()
  const { canAccess } = useApp()

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
    data: { total, isLoading, attributeTypeList },
    actions,
  } = useAttributeType()

  const [tempItem, setTempItem] = useState(null)
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'code',
      headerName: t('attributeType.table.code'),
      width: 200,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('attributeType.table.name'),
      width: 200,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'description',
      headerName: t('attributeType.table.description'),
      width: 150,
    },
    {
      field: 'unit',
      headerName: t('attributeType.table.unit'),
      width: 150,
      renderCell: (params) => params?.row?.unit?.name || '',
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
      headerName: t('common.action'),
      width: 200,
      sortable: false,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      renderCell: (params) => {
        const { id, active } = params?.row
        const isActive = active === ACTIVE_STATUS.ACTIVE
        return (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_ATTRIBUTE_TYPE}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.ATTRIBUTE_TYPE.DETAIL.PATH.replace(':id', `${id}`),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.UPDATE_ATTRIBUTE_TYPE}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.ATTRIBUTE_TYPE.EDIT.PATH.replace(':id', `${id}`),
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            {isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_ATTRIBUTE_TYPE}>
                <IconButton onClick={() => onClickActive(params.row)}>
                  <Icon name="active" />
                </IconButton>
              </Guard>
            )}
            {!isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_ATTRIBUTE_TYPE}>
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
        { ...filters, unitId: filters?.unitId?.id },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.getAttributeTypeList(params)
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
    actions.inActiveAttributeType(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeAttributeType(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('attributeType.export')}
          {...(canAccess(FUNCTION_CODE.IMPORT_ATTRIBUTE_TYPE)
            ? {
                onImport: (params) => importAttributeTypeApi(params),
                onDownloadTemplate: getAttributeTypeTemplateApi,
              }
            : {})}
          {...(canAccess(FUNCTION_CODE.EXPORT_ATTRIBUTE_TYPE)
            ? {
                onExport: () =>
                  exportAttributeTypeApi({
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
                    type: TYPE_EXPORT.ATTRIBUTE_TYPE,
                  }),
              }
            : {})}
          onRefresh={refreshData}
        />
        <Guard code={FUNCTION_CODE.CREATE_ATTRIBUTE_TYPE}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.ATTRIBUTE_TYPE.CREATE.PATH))
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
      title={t('menu.attributeType')}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('attributeType.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_ATTRIBUTE_TYPE)) {
              history.push(withSearch(ROUTE.ATTRIBUTE_TYPE.CREATE.PATH))
            }
          },
        }}
      />
      <DataTable
        title={t('attributeType.title')}
        rows={attributeTypeList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
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

export default AttributeType
