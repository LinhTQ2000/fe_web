import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { TYPE_EXPORT } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
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

import useDeviceName from '../../redux/hooks/useDeviceName'
import {
  exportDeviceNameApi,
  getDeviceNameTemplateApi,
  importDeviceNameApi,
} from '../../redux/sagas/device-name/import-export'
import DialogActive from './dialogs/active'
import DialogInActive from './dialogs/in-active'
import FilterForm from './filter-form'
const breadcrumbs = [
  {
    route: ROUTE.DEVICE_NAME.LIST.PATH,
    title: ROUTE.DEVICE_NAME.LIST.TITLE,
  },
]
function DeviceName() {
  const { t } = useTranslation(['database'])
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
    data: { deviceNameList, isLoading, total },
    actions,
  } = useDeviceName()

  const [selectedRows, setSelectedRows] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])

  const [tempItem, setTempItem] = useState(null)
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const columns = [
    {
      field: 'code',
      headerName: t('deviceName.code'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('deviceName.name'),
      width: 150,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('deviceName.description'),
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
            <Guard code={FUNCTION_CODE.DETAIL_DEVICE_NAME}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.DEVICE_NAME.DETAIL.PATH.replace(':id', id),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.UPDATE_DEVICE_NAME}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(ROUTE.DEVICE_NAME.EDIT.PATH.replace(':id', id)),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            {isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_DEVICE_NAME}>
                <IconButton onClick={() => onClickActive(params.row)}>
                  <Icon name="active" />
                </IconButton>
              </Guard>
            )}
            {!isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_DEVICE_NAME}>
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
    actions.searchDeviceName(params)
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
    actions.inActiveDeviceName(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeDeviceName(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('deviceName.export')}
          {...(canAccess(FUNCTION_CODE.IMPORT_DEVICE_NAME)
            ? {
                onImport: (params) => importDeviceNameApi(params),
              }
            : {})}
          {...(canAccess(FUNCTION_CODE.EXPORT_DEVICE_NAME)
            ? {
                onExport: () =>
                  exportDeviceNameApi({
                    keyword: keyword.trim(),
                    columnSettings: JSON.stringify(columnsSettings),
                    filter: convertFilterParams(filters, [
                      { field: 'createdAt', filterFormat: 'date' },
                    ]),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: x?.id })),
                    ),
                    page,
                    limit: pageSize,
                    sort: convertSortParams(sort),
                    type: TYPE_EXPORT.DEVICE_NAME,
                  }),
              }
            : {})}
          onDownloadTemplate={getDeviceNameTemplateApi}
          onRefresh={refreshData}
        />
        <Guard code={FUNCTION_CODE.CREATE_DEVICE_NAME}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.DEVICE_NAME.CREATE.PATH))
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
      title={t('menu.deviceName')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('deviceName.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_DEVICE_NAME)) {
              history.push(withSearch(ROUTE.DEVICE_NAME.CREATE.PATH))
            }
          },
        }}
      />
      <DataTable
        title={t('deviceName.title')}
        columns={columns}
        rows={deviceNameList}
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
        enableResizable={false}
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

export default DeviceName
