import React, { useMemo } from 'react'

import { isEmpty } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import { ACTIVE_STATUS, DEVICE_STATUS } from '~/modules/mmsx/constants'
import useDeviceAssign from '~/modules/mmsx/redux/hooks/useDeviceAssign'
import useRequestDevice from '~/modules/mmsx/redux/hooks/useRequestDevice'
import { searchAreaApi } from '~/modules/mmsx/redux/sagas/area/search'
import { searchDeviceListApi } from '~/modules/mmsx/redux/sagas/define-device/search-device-list'
import { convertFilterParams } from '~/utils'

function TableItems({ setFieldValue, items }) {
  const { t } = useTranslation(['mmsx'])
  const {
    data: { requestDeviceDetail },
  } = useRequestDevice()

  const {
    data: { deviceAssignDetail },
  } = useDeviceAssign()

  useMemo(() => {
    if (!isEmpty(requestDeviceDetail)) {
      const tempArr = []
      requestDeviceDetail?.deviceGroupRequest?.forEach((item) => {
        for (let i = 0; i < +item?.quantity; i++) {
          tempArr.push(item)
        }
      })
      setFieldValue('items', tempArr)
    } else {
      setFieldValue('items', [])
    }
  }, [requestDeviceDetail])

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'name',
      headerName: t('deviceAssign.moTable.group'),
      width: 150,
    },
    {
      field: 'serial',
      headerName: t('deviceAssign.moTable.serial'),
      width: 150,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((item) => item?.device?.id)
        return (
          <Field.Autocomplete
            name={`items[${index}].device`}
            placeholder={t('deviceAssign.moTable.serial')}
            asyncRequest={(s) =>
              searchDeviceListApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  deviceGroupId: params.row?.deviceGroupId,
                  status: [DEVICE_STATUS.PREVENTIVE, DEVICE_STATUS.USING],
                  active: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.serial}
            getOptionSubLabel={(opt) =>
              `${opt?.identificationNo} - ${opt?.name}`
            }
            asyncRequestDeps={params.row?.deviceGroupId}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionDisabled={(opt) =>
              itemIdCodeList.some((id) => id === opt?.id) &&
              opt?.id !== items[index]?.device?.id
            }
            required
          />
        )
      },
    },
    {
      field: 'identificationNo',
      headerName: t('deviceAssign.moTable.identificationNo'),
      width: 150,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].device.identificationNo`}
            placeholder={t('deviceAssign.moTable.identificationNo')}
            disabled
          />
        )
      },
    },
    {
      field: 'deviceName',
      headerName: t('deviceAssign.moTable.deviceName'),
      width: 150,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].device.name`}
            placeholder={t('deviceAssign.moTable.deviceName')}
            disabled
          />
        )
      },
    },
    {
      field: 'area',
      headerName: t('deviceAssign.moTable.area'),
      width: 150,
      renderCell: (params, index) => {
        return (
          <Field.Autocomplete
            name={`items[${index}].area`}
            placeholder={t('deviceAssign.moTable.area')}
            asyncRequest={(s) =>
              searchAreaApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  factoryId:
                    requestDeviceDetail?.factory?.id ||
                    deviceAssignDetail?.factory?.id,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            asyncRequestDeps={
              requestDeviceDetail?.factory || deviceAssignDetail?.factory
            }
            getOptionLabel={(opt) => opt?.name}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            required
          />
        )
      },
    },
  ]
  return (
    <DataTable
      uniqKey=""
      title={t('deviceAssign.title2')}
      rows={items}
      columns={columns}
      striped={false}
      hideSetting
      hideFooter
    />
  )
}

TableItems.defaultProps = {
  items: [],
}

TableItems.propTypes = {
  items: PropTypes.array,
}

export default TableItems
