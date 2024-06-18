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
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ASSET_PROJECTION_STATUS,
  ASSET_PROJECTION_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import useContingencyPlan from '~/modules/mmsx/redux/hooks/useContingencyPlan'
import { exportContingencyPlanApi } from '~/modules/mmsx/redux/sagas/contingency-plan/import-export'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
  convertUtcDateToLocalTz,
} from '~/utils'

import DialogConfirm from '../dialogs/confirm'
import DialogDelete from '../dialogs/delete'
import DialogReject from '../dialogs/reject'
import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: ROUTE.PLAN.TITLE,
  },
  {
    route: ROUTE.CONTINGENCY_PLAN.LIST.PATH,
    title: ROUTE.CONTINGENCY_PLAN.LIST.TITLE,
  },
]
const ContingencyPlanList = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const {
    data: { contingencyPlanList, isLoading, total },
    actions,
  } = useContingencyPlan()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { canAccess } = useApp()

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    status: null,
    factoryIds: [],
    time: null,
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
  } = useQueryState()

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        renderCell: (_, index) => index + 1,
      },
      {
        field: 'code',
        headerName: t('contingencyPlan.table.code'),
        width: 150,
        sortable: true,
        visible: 'always',
      },
      {
        field: 'name',
        headerName: t('contingencyPlan.table.name'),
        width: 150,
        visible: 'always',
      },
      {
        field: 'time',
        headerName: t('contingencyPlan.table.time'),
        width: 200,
        filterFormat: 'date',
        renderCell: (params) => {
          const { fromDate, toDate } = params?.row
          return `${convertUtcDateToLocalTz(
            fromDate,
          )} - ${convertUtcDateToLocalTz(toDate)}`
        },
      },
      {
        field: 'totalCost',
        headerName: t('contingencyPlan.table.totalProposedCost'),
        width: 150,
      },
      // {
      //   field: 'totalCostConfirmed',
      //   headerName: t('contingencyPlan.table.approvedTotalCost'),
      //   width: 150,
      // },
      {
        field: 'createdAt',
        headerName: t('contingencyPlan.table.createdAt'),
        width: 150,
        filterFormat: 'date',
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'status',
        headerName: t('contingencyPlan.table.status'),
        width: 200,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={ASSET_PROJECTION_STATUS_OPTIONS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'actions',
        headerName: t('contingencyPlan.table.action'),
        width: 200,
        visible: 'always',
        align: 'center',
        sticky: 'right',
        renderCell: (params) => {
          const { id, status } = params?.row
          const isPending = status === ASSET_PROJECTION_STATUS.AWAITING

          return (
            <div>
              <Guard code={FUNCTION_CODE.DETAIL_PLAN}>
                <IconButton
                  onClick={() =>
                    history.push(
                      withSearch(
                        ROUTE.CONTINGENCY_PLAN.DETAIL.PATH.replace(
                          ':id',
                          `${id}`,
                        ),
                      ),
                    )
                  }
                >
                  <Icon name="show" />
                </IconButton>
              </Guard>
              {isPending && (
                <>
                  <Guard code={FUNCTION_CODE.UPDATE_PLAN}>
                    <IconButton
                      onClick={() =>
                        history.push(
                          withSearch(
                            ROUTE.CONTINGENCY_PLAN.EDIT.PATH.replace(
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
                  <Guard code={FUNCTION_CODE.DELETE_PLAN}>
                    <IconButton onClick={() => onClickDelete(params.row)}>
                      <Icon name="delete" />
                    </IconButton>
                  </Guard>
                  <Guard code={FUNCTION_CODE.UPDATE_STATUS_PLAN}>
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
          factoryIds: filters?.factoryIds?.map((item) => item?.id),
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.getContingencyPlanList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteContingencyPlan(tempItem?.id, () => {
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
    actions.confirmContingencyPlan(tempItem?.id, () => {
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
    actions.rejectContingencyPlan(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectedModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <Guard code={FUNCTION_CODE.CREATE_PLAN}>
        <Button
          onClick={() =>
            history.push(withSearch(ROUTE.CONTINGENCY_PLAN.CREATE.PATH))
          }
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('contingencyPlan.contingencySupply')}
        </Button>
      </Guard>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.contingencyPlan')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('contingencyPlan.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_PLAN))
              history.push(withSearch(ROUTE.CONTINGENCY_PLAN.CREATE.PATH))
          },
        }}
      />
      <DataTable
        title={t('contingencyPlan.title')}
        columns={columns}
        rows={contingencyPlanList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
        beforeTopbar={
          <ImportExport
            name={t('common.exportFile')}
            {...(canAccess(FUNCTION_CODE.EXPORT_MAINTENANCE_PLAN)
              ? {
                  onImport: () =>
                    exportContingencyPlanApi({
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
                    }),
                }
              : {})}
            onRefresh={refreshData}
            disabled
          />
        }
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

export default ContingencyPlanList
