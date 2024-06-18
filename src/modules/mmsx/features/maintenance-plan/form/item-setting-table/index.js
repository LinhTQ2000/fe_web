import React from 'react'

import { IconButton } from '@mui/material'
import { add, startOfTomorrow } from 'date-fns'
import { findLastIndex, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import { ACTIVE_STATUS, CREATE_PLAN_STATUS } from '~/modules/mmsx/constants'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { searchDeviceListApi } from '~/modules/mmsx/redux/sagas/define-device/search-device-list'
import { searchDeviceGroupApi } from '~/modules/mmsx/redux/sagas/device-group/search'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

const ItemSettingTable = ({
  items = [],
  mode,
  arrayHelpers,
  values,
  status,
  idPlan,
  defaultList,
}) => {
  const { t } = useTranslation(['mmsx'])
  const { withSearch } = useQueryState()
  const isDetail = mode === MODAL_MODE.DETAIL
  const history = useHistory()
  const subColumns = [
    {
      field: 'index',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'deviceCategory',
      headerName: t('maintenancePlan.form.subTable.deviceCategory'),
      width: 200,
      renderCell: (params, index) => {
        const deviceGroupIds = values?.deviceGroups?.map((item) => item?.id)
        return isDetail ? (
          params.row?.deviceGroup?.name
        ) : (
          <Field.Autocomplete
            name={`items[${index}].deviceGroup`}
            placeholder={t('maintenancePlan.form.subTable.deviceCategory')}
            asyncRequest={(s) =>
              searchDeviceGroupApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(option) => option?.name}
            getOptionSubLabel={(option) => option?.code}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            {...(!isEmpty(deviceGroupIds)
              ? {
                  getOptionDisabled: (opt) =>
                    !deviceGroupIds.some((id) => id === opt?.id),
                }
              : {})}
          />
        )
      },
    },
    {
      field: 'serial',
      headerName: t('maintenancePlan.form.subTable.serial'),
      width: 200,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((item) => item?.device?.id)
        return isDetail ? (
          params.row?.device?.serial
        ) : (
          <Field.Autocomplete
            name={`items[${index}].device`}
            placeholder={t('maintenancePlan.form.subTable.serial')}
            asyncRequest={(s) =>
              searchDeviceListApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  deviceGroupId: params.row?.deviceGroup?.id,
                  factoryId: values?.factory?.id,
                  active: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(option) => option?.serial}
            getOptionSubLabel={(opt) =>
              `${opt?.identificationNo} - ${opt?.name}`
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestDeps={params.row?.deviceGroup}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.device?.id
            }
            disabled={!params.row?.deviceGroup?.id}
          />
        )
      },
    },
    {
      field: 'identificationNo',
      headerName: t('maintenancePlan.form.subTable.identificationNo'),
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.device?.identificationNo
        ) : (
          <Field.TextField
            name={`items[${index}].device.identificationNo`}
            placeholder={t('maintenancePlan.form.subTable.identificationNo')}
            disabled
          />
        )
      },
    },
    {
      field: 'deviceName',
      headerName: t('maintenancePlan.form.subTable.deviceName'),
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.device?.name
        ) : (
          <Field.TextField
            name={`items[${index}].device.name`}
            placeholder={t('maintenancePlan.form.subTable.deviceName')}
            disabled
          />
        )
      },
    },
    {
      field: 'datePlan',
      headerName: t('maintenancePlan.form.subTable.datePlan'),
      renderCell: (params, index) => {
        return isDetail ? (
          `${convertUtcDateToLocalTz(
            params?.row?.fromDate,
          )} - ${convertUtcDateToLocalTz(params?.row?.toDate)}`
        ) : (
          <Field.DateRangePicker
            name={`items[${index}].datePlan`}
            placeholder={t('maintenancePlan.form.subTable.datePlan')}
            minDate={startOfTomorrow()}
            maxDate={add(new Date(), {
              years: 1,
              months: 0,
              weeks: 0,
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
            })}
          />
        )
      },
    },
    {
      field: 'area',
      headerName: t('maintenancePlan.form.subTable.area'),
      renderCell: (params, index) => {
        return isDetail ? (
          params.row?.device?.area?.name
        ) : (
          <Field.TextField
            name={`items[${index}].device.area.name`}
            placeholder={t('maintenancePlan.form.subTable.area')}
            disabled
          />
        )
      },
    },
    {
      field: 'actions',
      headerName: t('common.action'),
      width: 200,
      visible: 'always',
      hide: !isDetail || !(status === CREATE_PLAN_STATUS.CONFIRMED),
      align: 'center',
      sticky: 'right',
      renderCell: (params) => {
        return (
          <Guard code={FUNCTION_CODE.GENERATE_JOB_FOR_PLAN}>
            <IconButton
              onClick={() => {
                history.push({
                  pathname: ROUTE.MAINTENANCE_PLAN.DETAIL_JOB.PATH.replace(
                    ':id',
                    idPlan,
                  ).replace(':deviceId', params.row?.device?.id),

                  search: withSearch(),
                  state: params?.row,
                })
              }}
            >
              <Icon name="show" />
            </IconButton>
          </Guard>
        )
      },
    },
    {
      field: 'remove',
      headerName: t('general:common.action'),
      width: 100,
      align: 'center',
      hide: isDetail,
      renderCell: (params, index) => {
        return (
          <IconButton
            onClick={() => {
              arrayHelpers.remove(index)
            }}
            size="large"
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]
  return (
    <HotKeys
      handlers={{
        ...(!isDetail
          ? {
              onAddRow: () => {
                if (items.length !== defaultList?.length)
                  arrayHelpers.push({
                    id: new Date().getTime(),
                    datePlan: values?.time,
                  })
              },
              onRemoveRow: () => {
                arrayHelpers.remove(findLastIndex(items))
              },
            }
          : {}),
      }}
    >
      <DataTable
        {...(!isDetail
          ? { title: t('maintenancePlan.form.subTable.deviceList') }
          : {})}
        rows={items || []}
        columns={subColumns}
        striped={false}
        hideSetting
        hideFooter
        beforeTopbar={
          !isDetail && (
            <Button
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  datePlan: values?.time,
                })
              }}
              disabled={items.length === defaultList?.length}
            >
              {t('maintenancePlan.form.subTable.add')}
            </Button>
          )
        }
      />
    </HotKeys>
  )
}

export default ItemSettingTable
