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

import useArticleDevice from '../../redux/hooks/useArticleDevice'
import { importArticleDeviceApi } from '../../redux/sagas/article-device/import-export'
import {
  exportDeviceTypeApi,
  getDeviceTypeTemplateApi,
} from '../../redux/sagas/device-type/import-export'
import DialogActive from './dialogs/active'
import DialogInActive from './dialogs/in-active'
import FilterForm from './filter-form'
const breadcrumbs = [
  {
    route: ROUTE.ARTICLE_DEVICE.LIST.PATH,
    title: ROUTE.ARTICLE_DEVICE.LIST.TITLE,
  },
]
function ArticleDevice() {
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
    data: { articleDeviceList, isLoading, total },
    actions,
  } = useArticleDevice()

  const { canAccess } = useApp()

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const [tempItem, setTempItem] = useState(null)
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const columns = [
    {
      field: 'code',
      headerName: t('articleDevice.code'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('articleDevice.name'),
      width: 150,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('articleDevice.description'),
      width: 200,
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
      width: 200,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      renderCell: (params) => {
        const { id, active } = params?.row
        const isActive = active === ACTIVE_STATUS.ACTIVE
        return (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_ARTICLE_DEVICE_GROUP}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.ARTICLE_DEVICE.DETAIL.PATH.replace(':id', id),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.UPDATE_ARTICLE_DEVICE_GROUP}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.ARTICLE_DEVICE.EDIT.PATH.replace(':id', id),
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            {isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_ARTICLE_DEVICE_GROUP}>
                <IconButton onClick={() => onClickActive(params.row)}>
                  <Icon name="active" />
                </IconButton>
              </Guard>
            )}
            {!isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_ARTICLE_DEVICE_GROUP}>
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
    actions.searchArticleDevice(params)
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
    actions.inActiveArticleDevice(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeArticleDevice(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('articleDevice.export')}
          {...(canAccess(FUNCTION_CODE.IMPORT_ARTICLE_DEVICE_GROUP)
            ? {
                onImport: (params) => importArticleDeviceApi(params),
              }
            : {})}
          {...(canAccess(FUNCTION_CODE.EXPORT_ARTICLE_DEVICE_GROUP)
            ? {
                onExport: () =>
                  exportDeviceTypeApi({
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
                    type: TYPE_EXPORT.ARTICLE_DEVICE_GROUP,
                  }),
              }
            : {})}
          onDownloadTemplate={getDeviceTypeTemplateApi}
          onRefresh={refreshData}
        />
        <Guard code={FUNCTION_CODE.CREATE_ARTICLE_DEVICE_GROUP}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.ARTICLE_DEVICE.CREATE.PATH))
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
      title={t('menu.articleDevice')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('articleDevice.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_ARTICLE_DEVICE_GROUP)) {
              history.push(withSearch(ROUTE.ARTICLE_DEVICE.CREATE.PATH))
            }
          },
        }}
      />
      <DataTable
        title={t('articleDevice.title')}
        columns={columns}
        rows={articleDeviceList}
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

export default ArticleDevice
