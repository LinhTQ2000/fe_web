import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import { JOB_TYPE_MAP } from '~/modules/mmsx/constants'
import { getMemberMaintenanceTeamApi } from '~/modules/mmsx/redux/sagas/maintenance-team/get-member'

function QuickAssignForm() {
  const { t } = useTranslation(['mmsx'])
  const { values } = useFormikContext()
  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('job.workCode'),
      width: 150,
    },
    {
      field: 'workType',
      headerName: t('job.workType'),
      width: 150,
      renderCell: (params) => {
        const { type } = params.row
        return t(JOB_TYPE_MAP[type])
      },
    },
    {
      field: 'serial',
      headerName: t('job.serial'),
      width: 150,
      renderCell: (params) => params?.row?.device?.serial,
    },
    {
      field: 'deviceName',
      headerName: t('job.deviceName'),
      width: 150,
      renderCell: (params) => params?.row?.device?.name,
    },
    {
      field: 'performer',
      headerName: t('job.performer'),
      width: 150,
      renderCell: (params, index) => {
        return (
          <Field.Autocomplete
            name={`items[${index}].assign`}
            placeholder={t('job.performer')}
            asyncRequest={(s) =>
              getMemberMaintenanceTeamApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                deviceId: params.row?.device?.id,
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.username}
            autoFetch={false}
          />
        )
      },
    },
    {
      field: 'planDay',
      headerName: t('job.planDay'),
      width: 150,
      renderCell: (_, index) => {
        return (
          <Field.DateRangePicker
            name={`items[${index}].plan`}
            placeholder={t('job.planDay')}
          />
        )
      },
    },
    {
      field: 'isNeedAccept',
      headerName: t(
        'job.detail.maintenanceInformation.canAcceptanceFromLeader',
      ),
      align: 'center',
      width: 150,
      renderCell: (_, index) => {
        return <Field.Checkbox name={`items[${index}].isNeedAccept`} />
      },
    },
  ]
  return (
    <DataTable
      rows={values?.items || []}
      title={t('job.title')}
      columns={columns}
      striped={false}
      hideSetting
      hideFooter
      enableResizable={false}
    />
  )
}

export default QuickAssignForm
