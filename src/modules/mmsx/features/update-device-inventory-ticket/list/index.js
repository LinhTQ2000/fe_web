import React, { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks/useQueryState'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ASSET_MAINTENANCE_TYPE,
  UPDATE_INVENTORY_STATUS,
  UPDATE_INVENTORY_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import useDeviceInventory from '~/modules/mmsx/redux/hooks/useDeviceInventory'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE.TITLE,
  },
  {
    route: ROUTE.DEVICE_INVENTORY.LIST.PATH,
    title: ROUTE.DEVICE_INVENTORY.LIST.TITLE,
  },
]
const DeviceInventory = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const {
    data: { deviceInventoryList, isLoading, total },
    actions,
  } = useDeviceInventory()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const {
    page,
    pageSize,
    sort,
    filters,
    keyword,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    withSearch,
  } = useQueryState()

  const columns = useMemo(
    () => [
      {
        field: 'code',
        headerName: t('deviceInventory.requestCode'),
        width: 150,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('deviceInventory.requestName'),
        width: 150,
        visible: 'always',
      },
      {
        field: 'createdAt',
        headerName: t('deviceInventory.createdAt'),
        width: 150,
        filterFormat: 'date',
        renderCell: (params) =>
          convertUtcDateTimeToLocalTz(params.row?.createdAt),
      },
      {
        field: 'updatedAt',
        headerName: t('deviceInventory.updatedAt'),
        width: 150,
        filterFormat: 'date',
        renderCell: (params) =>
          convertUtcDateTimeToLocalTz(params.row?.updatedAt),
      },
      {
        field: 'status',
        headerName: t('deviceInventory.status'),
        width: 150,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={UPDATE_INVENTORY_STATUS_OPTIONS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'action',
        headerName: t('deviceInventory.action'),
        width: 150,
        visible: 'always',
        align: 'center',
        sticky: 'right',
        renderCell: (params) => {
          const { id, status } = params?.row
          const isPending = status === UPDATE_INVENTORY_STATUS.PENDING
          return (
            <>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.DEVICE_INVENTORY.DETAIL.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
              {isPending && (
                <>
                  <IconButton
                    onClick={() =>
                      history.push(
                        withSearch(
                          ROUTE.DEVICE_INVENTORY.EDIT.PATH.replace(
                            ':id',
                            `${id}`,
                          ),
                        ),
                      )
                    }
                  >
                    <Icon name="edit" />
                  </IconButton>
                  <IconButton onClick={() => onClickDelete(params.row)}>
                    <Icon name="delete" />
                  </IconButton>
                  <IconButton onClick={() => onClickConfirmed(params.row)}>
                    <Icon name="tick" />
                  </IconButton>
                  <IconButton onClick={() => onClickRejected(params.row)}>
                    <Icon name="remove" />
                  </IconButton>
                </>
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
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
      type: ASSET_MAINTENANCE_TYPE.DEVICE,
    }
    actions.getDeviceInventoryList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteDeviceInventory(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    actions.confirmDeviceInventory(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const onClickRejected = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenRejectedModal(true)
  }
  const onSubmitRejected = () => {
    actions.rejectDeviceInventory(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectedModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <Button
        onClick={() =>
          history.push(withSearch(ROUTE.DEVICE_INVENTORY.CREATE.PATH))
        }
        icon="add"
      >
        {t('general:common.create')}
      </Button>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceInventory')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () =>
            history.push(withSearch(ROUTE.DEVICE_INVENTORY.CREATE.PATH)),
        }}
      />
      <DataTable
        title={t('deviceInventory.title')}
        columns={columns}
        rows={deviceInventoryList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          onApply: setFilters,
        }}
      />
      <DialogDelete
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        tempItem={tempItem}
      />
      <DialogConfirm
        open={isOpenConfirmModal}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        tempItem={tempItem}
      />
      <DialogReject
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={tempItem}
      />
    </Page>
  )
}

export default DeviceInventory
