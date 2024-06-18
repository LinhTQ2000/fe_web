import React, { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  TYPE_REQUEST,
  DEVICE_REQUEST_STATUS,
  TYPE_REQUEST_MAP,
  DEVICE_REQUEST_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useRequestDevice from '~/modules/mmsx/redux/hooks/useRequestDevice'
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
    title: ROUTE.DEVICE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.REQUEST_DEVICE.LIST.PATH,
    title: ROUTE.REQUEST_DEVICE.LIST.TITLE,
  },
]
const RequestDeviceList = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)

  const {
    data: { isLoading, total, requestDeviceList },
    actions,
  } = useRequestDevice()
  const { canAccess } = useApp()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    toFactoryIds: [],
    type: null,
    status: null,
  }

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
    setKeyword,
    withSearch,
  } = useQueryState()

  const columns = [
    {
      field: 'code',
      headerName: t('requestDevice.category.requestCode'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('requestDevice.category.requestName'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'type',
      headerName: t('requestDevice.category.requestType'),
      width: 150,
      visible: 'always',
      renderCell: (params) => {
        const { type } = params.row
        return t(TYPE_REQUEST_MAP[type])
      },
    },
    {
      field: 'toFactory',
      headerName: t('requestDevice.category.toFactory'),
      width: 150,
      renderCell: (params) => params.row?.factory?.name,
    },
    {
      field: 'status',
      headerName: t('requestDevice.category.status'),
      width: 150,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={DEVICE_REQUEST_STATUS_OPTIONS}
            value={status}
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
      visible: 'always',
      align: 'center',
      sticky: 'right',
      renderCell: (params) => {
        const { id, status, type } = params?.row
        const isPending = status === DEVICE_REQUEST_STATUS.WAITING_APPROVE
        return type === TYPE_REQUEST.REQUEST ? (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_DEVICE_REQUEST_TICKET}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.REQUEST_DEVICE.DETAIL.PATH.replace(':id', `${id}`),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            {isPending && (
              <>
                <Guard code={FUNCTION_CODE.UPDATE_DEVICE_REQUEST_TICKET}>
                  <IconButton
                    onClick={() =>
                      history.push(
                        withSearch(
                          ROUTE.REQUEST_DEVICE.EDIT.PATH.replace(
                            ':id',
                            `${id}`,
                          ),
                        ),
                      )
                    }
                  >
                    <Icon name="edit" />
                  </IconButton>
                </Guard>
                <Guard code={FUNCTION_CODE.DELETE_DEVICE_REQUEST_TICKET}>
                  <IconButton onClick={() => onClickDelete(params.row)}>
                    <Icon name="delete" />
                  </IconButton>
                </Guard>
                <Guard code={FUNCTION_CODE.CONFIRM_DEVICE_REQUEST}>
                  <IconButton onClick={() => onClickConfirmed(params.row)}>
                    <Icon name="tick" />
                  </IconButton>
                  <IconButton onClick={() => onClickRejected(params.row)}>
                    <Icon name="remove" />
                  </IconButton>
                </Guard>
              </>
            )}
          </>
        ) : (
          <div>
            <Guard code={FUNCTION_CODE.DETAIL_DEVICE_REQUEST_TICKET}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.REQUEST_DEVICE.DETAIL.PATH.replace(':id', `${id}`),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            {isPending && (
              <>
                <Guard code={FUNCTION_CODE.UPDATE_DEVICE_REQUEST_TICKET}>
                  <IconButton
                    onClick={() =>
                      history.push(
                        withSearch(
                          ROUTE.REQUEST_DEVICE.RETURN_EDIT.PATH.replace(
                            ':id',
                            `${id}`,
                          ),
                        ),
                      )
                    }
                  >
                    <Icon name="edit" />
                  </IconButton>
                </Guard>
                <Guard code={FUNCTION_CODE.DELETE_DEVICE_REQUEST_TICKET}>
                  <IconButton onClick={() => onClickDelete(params.row)}>
                    <Icon name="delete" />
                  </IconButton>
                </Guard>
                <Guard code={FUNCTION_CODE.CONFIRM_DEVICE_REQUEST}>
                  <IconButton onClick={() => onClickConfirmed(params.row)}>
                    <Icon name="tick" />
                  </IconButton>
                  <IconButton onClick={() => onClickRejected(params.row)}>
                    <Icon name="remove" />
                  </IconButton>
                </Guard>
              </>
            )}
          </div>
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
        {
          ...filters,
          toFactoryIds: filters?.toFactoryIds?.map((item) => item?.id),
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchRequestDevice(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }

  const onSubmitDelete = () => {
    actions.deleteRequestDevice(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  const onClickRejected = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenRejectModal(true)
  }

  const submitReject = () => {
    const params = {
      id: tempItem?.id,
      action: 'rejected',
    }
    actions.changeStatusRequestDevice(params, refreshData)
    setTempItem(null)
    setIsOpenRejectModal(false)
  }

  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    const params = {
      id: tempItem?.id,
      action: 'confirmed',
    }
    actions.changeStatusRequestDevice(params, refreshData)
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Guard code={FUNCTION_CODE.CREATE_GRANT_DEVICE_REQUEST_TICKET}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.REQUEST_DEVICE.CREATE.PATH))
            }
            icon="add"
            sx={{ ml: 4 / 3 }}
          >
            {t('requestDevice.form.createRequestDevice')}
          </Button>
        </Guard>
        <Guard code={FUNCTION_CODE.CREATE_RETURN_DEVICE_REQUEST_TICKET}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.REQUEST_DEVICE.RETURN_CREATE.PATH))
            }
            icon="add"
            sx={{ ml: 4 / 3 }}
          >
            {t('requestDevice.form.createReturnDevice')}
          </Button>
        </Guard>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.requestDevice')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('requestDevice.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_GRANT_DEVICE_REQUEST_TICKET))
              history.push(withSearch(ROUTE.REQUEST_DEVICE.CREATE.PATH))
          },
        }}
      />
      <DataTable
        title={t('requestDevice.title')}
        columns={columns}
        rows={requestDeviceList}
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
          defaultValue: DEFAULT_FILTERS,
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
        open={isOpenRejectModal}
        onCancel={() => setIsOpenRejectModal(false)}
        onSubmit={submitReject}
        tempItem={tempItem}
      />
    </Page>
  )
}

export default RequestDeviceList
