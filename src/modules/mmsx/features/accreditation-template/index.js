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
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import { FUNCTION_CODE } from '../../constants/functionCode'
import useAccreditationTemplate from '../../redux/hooks/useAccreditationTemplate'
import {
  exportAccreditationTemplateApi,
  getAccreditationTemplateTemplateApi,
  importAccreditationTemplateApi,
} from '../../redux/sagas/accreditation-template/import-export'
import DialogActive from './dialogs/active'
import DialogInActive from './dialogs/in-active'
import FilterForm from './filter-form'
const breadcrumbs = [
  {
    route: ROUTE.ACCREDITATION_TEMPLATE.LIST.PATH,
    title: ROUTE.ACCREDITATION_TEMPLATE.LIST.TITLE,
  },
]
function AccreditationTemplate() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const { canAccess } = useApp()

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [tempItem, setTempItem] = useState(null)
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
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
    data: { accreditationTemplateList, isLoading, total },
    actions,
  } = useAccreditationTemplate()

  const columns = [
    {
      field: 'code',
      headerName: t('accreditationTemplate.code'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('accreditationTemplate.name'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'periodic',
      headerName: t('accreditationTemplate.periodic'),
      width: 200,
      renderCell: (param) => {
        return `${param.row.periodic} ${t('general:days').toLowerCase()}`
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
      field: 'actions',
      headerName: t('general:common.action'),
      width: 150,
      visible: 'always',
      align: 'center',
      sticky: 'right',
      renderCell: (params) => {
        const { id, active } = params?.row
        const isActive = active === ACTIVE_STATUS.ACTIVE
        return (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_ACCREDITATION_TEMPLATE}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.ACCREDITATION_TEMPLATE.DETAIL.PATH.replace(
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
            <Guard code={FUNCTION_CODE.UPDATE_ACCREDITATION_TEMPLATE}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.ACCREDITATION_TEMPLATE.EDIT.PATH.replace(
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
            {isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_ACCREDITATION_TEMPLATE}>
                <IconButton onClick={() => onClickActive(params.row)}>
                  <Icon name="active" />
                </IconButton>
              </Guard>
            )}
            {!isActive && (
              <Guard code={FUNCTION_CODE.UPDATE_STATUS_ACCREDITATION_TEMPLATE}>
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
      keyword: keyword?.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchAccreditationTemplate(params)
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
    actions.inActiveAccreditationTemplate(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeAccreditationTemplate(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('accreditationTemplate.export')}
          {...(canAccess(FUNCTION_CODE.IMPORT_ACCREDITATION_TEMPLATE)
            ? {
                onImport: (params) => importAccreditationTemplateApi(params),
                onDownloadTemplate: getAccreditationTemplateTemplateApi,
              }
            : {})}
          {...(canAccess(FUNCTION_CODE.EXPORT_ACCREDITATION_TEMPLATE)
            ? {
                onExport: () =>
                  exportAccreditationTemplateApi({
                    columnSettings: JSON.stringify(columnsSettings),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: x?.id })),
                    ),
                    keyword: keyword?.trim(),
                    filter: convertFilterParams(filters, [
                      { field: 'createdAt', filterFormat: 'date' },
                    ]),
                    page,
                    limit: pageSize,
                    sort: convertSortParams(sort),
                    type: TYPE_EXPORT.ACCREDITATION_TEMPLATE,
                  }),
              }
            : {})}
          onRefresh={refreshData}
          // @TODO: waiting BE
          // disabled
        />
        <Guard code={FUNCTION_CODE.CREATE_ACCREDITATION_TEMPLATE}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.ACCREDITATION_TEMPLATE.CREATE.PATH))
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
      title={t('menu.accreditationTemplate')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      keyword={keyword}
      placeholder={t('accreditationTemplate.searchPlaceholder')}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onCreate: () => {
            if (canAccess(FUNCTION_CODE.CREATE_ACCREDITATION_TEMPLATE))
              history.push(withSearch(ROUTE.ACCREDITATION_TEMPLATE.CREATE.PATH))
          },
        }}
      />
      <DataTable
        title={t('accreditationTemplate.title')}
        columns={columns}
        rows={accreditationTemplateList}
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

export default AccreditationTemplate
