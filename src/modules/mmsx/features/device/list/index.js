import React, { useState, useEffect } from 'react'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { NOTIFICATION_TYPE, TYPE_EXPORT } from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ASSET_TYPE_OPTIONS,
  DEVICE_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'
import {
  exportDeviceApi,
  getDeviceTemplateApi,
  importDeviceApi,
} from '~/modules/mmsx/redux/sagas/define-device/import-export-device'
import { printQRDevice } from '~/modules/mmsx/redux/sagas/define-device/print'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'
import addNotification from '~/utils/toast'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: ROUTE.DEVICE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEVICE_LIST.LIST.PATH,
    title: ROUTE.DEVICE_LIST.LIST.TITLE,
  },
]
function DefineDevice() {
  const { t } = useTranslation('mmsx')
  const history = useHistory()
  const {
    data: { deviceList, total, isLoading },
    actions,
  } = useDefineDevice()

  const DEFAULT_FILTERS = {
    code: '',
    deviceNameId: null,
    articleDeviceGroupId: null,
    deviceGroupId: null,
    deviceTypeId: null,
    factoryIds: [],
    vendorId: null,
    serial: '',
    identificationNo: '',
    manageBy: null,
    status: null,
    active: null,
  }

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [open, setOpen] = useState(false)
  const { canAccess } = useApp()

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
  const checkedIcon = <CheckBoxIcon fontSize="small" color="success" />

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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const columns = [
    {
      field: 'code',
      headerName: t('deviceList.code'),
      width: 200,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('deviceList.name'),
      width: 200,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'articleDeviceGroupCode',
      headerName: t('deviceList.articleDeviceCode'),
      width: 200,
      renderCell: (params) => {
        return params?.row?.articleDeviceGroup?.code
      },
    },
    {
      field: 'articleDeviceGroupName',
      headerName: t('deviceList.articleDevice'),
      width: 200,
      renderCell: (params) => {
        return params?.row?.articleDeviceGroup?.name
      },
    },
    {
      field: 'deviceGroupCode',
      headerName: t('deviceList.deviceGroupCode'),
      width: 200,
      renderCell: (params) => {
        return params?.row?.deviceGroup?.code
      },
    },
    {
      field: 'deviceGroup',
      headerName: t('deviceList.deviceGroup'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.deviceGroup?.name
      },
    },
    {
      field: 'deviceType',
      headerName: t('deviceList.deviceType'),
      width: 200,
      renderCell: (params) => {
        return params?.row?.deviceType?.name
      },
    },
    {
      field: 'factory',
      headerName: t('deviceList.factory'),
      width: 200,
      renderCell: (params) => {
        return params?.row?.factory?.name
      },
    },
    {
      field: 'vendor',
      headerName: t('deviceList.vendor'),
      width: 200,
      renderCell: (params) => {
        return params.row?.vendor?.name
      },
    },
    {
      field: 'serial',
      headerName: t('deviceList.serial'),
      width: 200,
    },
    {
      field: 'actualSerial',
      headerName: t('deviceList.actualSerial'),
      width: 200,
    },
    {
      field: 'identificationNo',
      headerName: t('deviceList.identificationNo'),
      width: 200,
    },
    {
      field: 'model',
      headerName: t('deviceList.model'),
      width: 200,
    },
    {
      field: 'manufacturer',
      headerName: t('deviceList.producer'),
      width: 200,
    },
    {
      field: 'type',
      headerName: t('deviceList.type'),
      width: 200,
      renderCell: (params) => {
        const { assetType } = params.row
        return (
          <Status
            options={ASSET_TYPE_OPTIONS}
            value={assetType}
            variant="text"
          />
        )
      },
    },
    {
      field: 'capitalizationDate',
      headerName: t('deviceList.capitalizationDate'),
      width: 200,
      renderCell: (params) => {
        const { capitalizationDate, createdAt } = params.row
        return convertUtcDateToLocalTz(capitalizationDate || createdAt)
      },
    },
    {
      field: 'manageBy',
      headerName: t('deviceList.manageBy.title'),
      width: 200,
      renderCell: (params) => {
        const { isFixedAsset } = params.row
        return isFixedAsset
          ? t('deviceList.manageBy.wfx')
          : t('deviceList.manageBy.mmsx')
      },
    },
    {
      field: 'status',
      headerName: t('deviceList.deviceStatus'),
      width: 200,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={DEVICE_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'active',
      headerName: t('deviceList.activeStatus'),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { active } = params.row
        return active ? checkedIcon : icon
      },
    },

    {
      field: 'updatedAt',
      headerName: t('general:common.updatedAt'),
      width: 150,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.updatedAt)
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 200,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      renderCell: (params) => {
        const { id } = params.row
        return (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_DEVICE}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.DEVICE_LIST.DETAIL.PATH.replace(':id', `${id}`),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.UPDATE_DEVICE}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.DEVICE_LIST.EDIT.PATH.replace(':id', `${id}`),
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
          </>
        )
      },
    },
  ]

  const columnsQR = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => index + 1,
    },
    {
      field: 'code',
      headerName: t('deviceList.code'),
      width: 200,
    },
    {
      field: 'name',
      headerName: t('deviceList.name'),
      width: 200,
    },
    {
      field: 'serial',
      headerName: t('deviceList.serial'),
      width: 200,
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          articleDeviceGroupId: filters?.articleDeviceGroupId?.id,
          deviceGroupId: filters?.deviceGroupId?.id,
          deviceTypeId: filters?.deviceTypeId?.id,
          factoryIds: filters?.factoryIds?.map((item) => item?.id),
          vendorId: filters?.vendorId?.id,
          deviceNameId: filters?.deviceNameId?.id,
        },
        columns,
      ),
      sort: convertSortParams(sort),
      isMasterData: 1,
    }
    actions.searchDevice(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps])

  const handlePrint = async () => {
    const res = await printQRDevice({
      items: selectedRows.map((item) => ({
        code: item?.code,
        quantity: 1,
      })),
    })
    if (res?.statusCode === 200) {
      // eslint-disable-next-line no-undef
      BrowserPrint.getDefaultDevice(
        'printer',
        (printer) => {
          printer.send(res?.data)
        },
        () => {
          alert(
            'An error occured while attempting to connect to your Zebra Printer. ' +
              'You may not have Zebra Browser Print installed, or it may not be running. ' +
              'Install Zebra Browser Print, or start the Zebra Browser Print Service, and try again.',
          )
        },
      )
      setOpen(false)
    } else {
      addNotification(res?.message || res?.statusText, NOTIFICATION_TYPE.ERROR)
    }
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('deviceList.export')}
          {...(canAccess(FUNCTION_CODE.IMPORT_DEVICE)
            ? { onImport: (params) => importDeviceApi(params) }
            : {})}
          {...(canAccess(FUNCTION_CODE.EXPORT_DEVICE)
            ? {
                onExport: () =>
                  exportDeviceApi({
                    columnSettings: JSON.stringify(columnsSettings),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: x?.id })),
                    ),
                    keyword: keyword.trim(),
                    filter: convertFilterParams(
                      {
                        ...filters,
                        articleDeviceGroupId: filters?.articleDeviceGroupId?.id,
                        deviceGroupId: filters?.deviceGroupId?.id,
                        deviceTypeId: filters?.deviceTypeId?.id,
                        factoryIds: filters?.factoryIds?.map(
                          (item) => item?.id,
                        ),
                        vendorId: filters?.vendorId?.id,
                        deviceNameId: filters?.deviceNameId?.id,
                      },
                      columns,
                      [{ field: 'createdAt', filterFormat: 'date' }],
                    ),
                    page,
                    limit: pageSize,
                    sort: convertSortParams(sort),
                    type: TYPE_EXPORT.DEVICE,
                  }),
              }
            : {})}
          onDownloadTemplate={getDeviceTemplateApi}
          onRefresh={refreshData}
        />
        <Guard code={FUNCTION_CODE.CREATE_DEVICE}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.DEVICE_LIST.CREATE.PATH))
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
      title={t('menu.deviceList')}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('deviceList.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_DEVICE)) {
              history.push(withSearch(ROUTE.DEVICE_LIST.CREATE.PATH))
            }
          },
        }}
      />
      <DataTable
        title={t('deviceList.title')}
        rows={deviceList}
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
          onApply: setFilters,
          defaultValue: DEFAULT_FILTERS,
        }}
        beforeTopbar={
          selectedRows.length > 0 ? (
            <Button
              color="grayEE"
              icon="setting"
              onClick={() => {
                setOpen(true)
              }}
            >
              {t('common.printQR')}
            </Button>
          ) : null
        }
      />
      <Dialog
        open={open}
        title={t('common.printQR')}
        onCancel={() => setOpen(false)}
        cancelLabel={t('general:common.cancel')}
        onSubmit={() => handlePrint()}
        submitLabel={t('common.print')}
        submitProps={{
          color: 'success',
        }}
        noBorderBottom
      >
        <DataTable
          title={t('deviceList.titleQR')}
          rows={selectedRows}
          hideFooter
          hideSetting
          striped
          columns={columnsQR}
        />
      </Dialog>
    </Page>
  )
}

export default DefineDevice
