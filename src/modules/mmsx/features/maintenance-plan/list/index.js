import React, { useState, useEffect, useMemo } from 'react'

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
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  CREATE_PLAN_STATUS,
  CREATE_PLAN_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useMaintenancePlan from '~/modules/mmsx/redux/hooks/useMaintenancePlan'
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
    title: 'plan',
  },
  {
    route: ROUTE.MAINTENANCE_PLAN.LIST.PATH,
    title: ROUTE.MAINTENANCE_PLAN.LIST.TITLE,
  },
]
function MaintenancePlanList() {
  const { t } = useTranslation('mmsx')
  const history = useHistory()
  const {
    data: { isLoading, maintenancePlanList, total },
    actions,
  } = useMaintenancePlan()
  const { canAccess } = useApp()

  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)

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
        headerName: t('maintenancePlan.table.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('maintenancePlan.table.name'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'timePlan',
        headerName: t('maintenancePlan.table.time'),
        width: 250,
        filterFormat: 'date',
        renderCell: (params) => {
          return `${convertUtcDateToLocalTz(
            params?.row?.planFrom,
          )} - ${convertUtcDateToLocalTz(params?.row?.planTo)}`
        },
      },
      {
        field: 'deviceQuantity',
        headerName: t('maintenancePlan.table.deviceQuantity'),
        width: 150,
        renderCell: (params) => {
          return params?.row?.countDevice || 0
        },
      },

      {
        field: 'status',
        headerName: t('general:common.status'),
        width: 200,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={CREATE_PLAN_STATUS_OPTIONS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'actions',
        headerName: t('common.action'),
        width: 200,
        visible: 'always',
        align: 'center',
        sticky: 'right',
        renderCell: (params) => {
          const { id, status } = params?.row
          const isPending = status === CREATE_PLAN_STATUS.PENDING
          return (
            <div>
              <Guard code={FUNCTION_CODE.DETAIL_MAINTENANCE_PLAN}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.MAINTENANCE_PLAN.DETAIL.PATH.replace(':id', id),
                      ),
                    )
                  }
                >
                  <Icon name="show" />
                </IconButton>
              </Guard>
              {isPending && (
                <Guard code={FUNCTION_CODE.UPDATE_MAINTENANCE_PLAN}>
                  <IconButton
                    onClick={() =>
                      history.push(
                        withSearch(
                          ROUTE.MAINTENANCE_PLAN.EDIT.PATH.replace(':id', id),
                        ),
                      )
                    }
                  >
                    <Icon name="edit" />
                  </IconButton>
                </Guard>
              )}
              {isPending && (
                <Guard code={FUNCTION_CODE.DELETE_MAINTENANCE_PLAN}>
                  <IconButton onClick={() => onClickDelete(params.row)}>
                    <Icon name="delete" />
                  </IconButton>
                </Guard>
              )}
              {isPending && (
                <Guard code={FUNCTION_CODE.UPDATE_STATUS_MAINTENANCE_PLAN}>
                  <IconButton onClick={() => onClickConfirmed(params.row)}>
                    <Icon name="tick" />
                  </IconButton>
                </Guard>
              )}
              {isPending && (
                <Guard code={FUNCTION_CODE.UPDATE_STATUS_MAINTENANCE_PLAN}>
                  <IconButton onClick={() => onClickRejected(params.row)}>
                    <Icon name="remove" />
                  </IconButton>
                </Guard>
              )}
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
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchMaintenancePlan(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])
  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteMaintenancePlan(tempItem?.id, () => {
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
    const params = {
      id: tempItem?.id,
      action: 'confirm',
    }
    actions.changeStatusMaintenancePlan(params, () => {
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
    const params = {
      id: tempItem?.id,
      action: 'reject',
    }
    actions.changeStatusMaintenancePlan(params, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectedModal(false)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <Guard code={FUNCTION_CODE.CREATE_MAINTENANCE_PLAN}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.MAINTENANCE_PLAN.CREATE.PATH))
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
      title={t('menu.maintenancePlan')}
      renderHeaderRight={renderHeaderRight}
      placeholder={t('maintenancePlan.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_MAINTENANCE_PLAN))
              history.push(ROUTE.MAINTENANCE_PLAN.CREATE.PATH)
          },
        }}
      />
      <DataTable
        title={t('maintenancePlan.title')}
        columns={columns}
        rows={maintenancePlanList}
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

export default MaintenancePlanList
