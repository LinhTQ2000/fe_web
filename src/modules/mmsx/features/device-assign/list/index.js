import React, { useEffect, useMemo, useState } from 'react'

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
  DEVICE_ASSIGN_STATUS,
  DEVICE_ASSIGN_STATUS_ENUM,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useDeviceAssign from '~/modules/mmsx/redux/hooks/useDeviceAssign'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
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
    route: ROUTE.DEVICE_ASSIGN.LIST.PATH,
    title: ROUTE.DEVICE_ASSIGN.LIST.TITLE,
  },
]

const DeviceAssign = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)

  const {
    data: { deviceAssignList, isLoading, total },
    actions,
  } = useDeviceAssign()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { canAccess } = useApp()

  const DEFAULT_FILTERS = {
    code: '',
    serial: '',
    factoryIds: [],
    deviceRequestId: null,
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

  const columns = useMemo(
    () => [
      // {
      //   field: 'id',
      //   headerName: '#',
      //   width: 80,
      //   visible: 'always',
      // },
      {
        field: 'serial',
        headerName: t('deviceAssign.assign.serial'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'code',
        headerName: t('deviceAssign.assign.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'deviceRequest',
        headerName: t('deviceAssign.assign.assignCode'),
        width: 150,
        renderCell: (params) => params.row?.deviceRequest?.name,
      },
      {
        field: 'factory',
        headerName: t('deviceAssign.assign.factory'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.factory?.name
        },
      },
      {
        field: 'status',
        headerName: t('deviceAssign.assign.status'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={DEVICE_ASSIGN_STATUS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'updatedAt',
        headerName: t('common.updatedAt'),
        width: 200,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.updatedAt)
        },
      },
      {
        field: 'actions',
        headerName: t('deviceCategory.action'),
        width: 200,
        visible: 'always',
        align: 'center',
        sticky: 'right',
        renderCell: (params) => {
          const { id, status } = params?.row
          const isWaitingConfirm =
            status === DEVICE_ASSIGN_STATUS_ENUM.WAIT_CONFIRM
          return (
            <div>
              <Guard code={FUNCTION_CODE.DETAIL_DEVICE_ASSIGNMENT}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.DEVICE_ASSIGN.DETAIL.PATH.replace(':id', `${id}`),
                      ),
                    )
                  }
                >
                  <Icon name="show" />
                </IconButton>
              </Guard>
              {isWaitingConfirm && (
                <Guard code={FUNCTION_CODE.UPDATE_DEVICE_ASSIGNMENT}>
                  <IconButton
                    onClick={() =>
                      history.push(
                        withSearch(
                          ROUTE.DEVICE_ASSIGN.EDIT.PATH.replace(':id', `${id}`),
                        ),
                      )
                    }
                  >
                    <Icon name="edit" />
                  </IconButton>
                </Guard>
              )}
              {isWaitingConfirm && (
                <Guard code={FUNCTION_CODE.DELETE_DEVICE_ASSIGNMENT}>
                  <IconButton onClick={() => onClickDelete(params.row)}>
                    <Icon name="delete" />
                  </IconButton>
                </Guard>
              )}
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_DEVICE_ASSIGNMENT}>
                {isWaitingConfirm && (
                  <IconButton onClick={() => onClickConfirmed(params.row)}>
                    <Icon name="tick" />
                  </IconButton>
                )}
                {isWaitingConfirm && (
                  <IconButton onClick={() => onClickRejected(params.row)}>
                    <Icon name="remove" />
                  </IconButton>
                )}
              </Guard>
            </div>
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
      filter: convertFilterParams(
        {
          ...filters,
          deviceRequestId: filters?.deviceRequestId?.id,
          factoryIds: filters?.factoryIds?.map((item) => item?.id),
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchDeviceAssign(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const renderHeaderRight = () => {
    return (
      <>
        <Guard code={FUNCTION_CODE.CREATE_DEVICE_ASSIGNMENT}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.DEVICE_ASSIGN.CREATE.PATH))
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

  // delete
  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }

  const onSubmitDelete = () => {
    actions.deleteDeviceAssign(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  // reject
  const onClickRejected = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenRejectedModal(true)
  }

  const onSubmitRejected = (values) => {
    const params = {
      id: tempItem?.id,
      reason: values?.comment,
    }
    actions.rejectDeviceAssign(params, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectedModal(false)
  }

  // confirm
  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    const params = {
      id: tempItem?.id,
      reason: null,
    }
    actions.confirmDeviceAssign(params, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceAssign')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('deviceAssign.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_DEVICE_ASSIGNMENT))
              history.push(withSearch(ROUTE.DEVICE_ASSIGN.CREATE.PATH))
          },
        }}
      />
      <DataTable
        title={t('deviceAssign.title')}
        columns={columns}
        rows={deviceAssignList}
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
        open={isOpenRejectedModal}
        onCancel={() => setIsOpenRejectedModal(false)}
        onSubmit={onSubmitRejected}
        tempItem={tempItem}
      />
      {/* end reject dialog */}
    </Page>
  )
}

export default DeviceAssign
