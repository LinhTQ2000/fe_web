import { useTranslation } from 'react-i18next'

import Checkbox from '~/components/Checkbox'
import DataTable from '~/components/DataTable'
import { JOB_TYPE } from '~/modules/mmsx/constants'
import useJob from '~/modules/mmsx/redux/hooks/useJob'

function ItemSettingTable() {
  const { t } = useTranslation(['mmsx'])
  const {
    data: { jobDetail },
  } = useJob()
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
      field: 'title',
      headerName: t('job.detail.titleCate'),
      width: 150,
    },
    {
      field: 'description',
      headerName: t('job.detail.descriptionCate'),
      width: 150,
    },
    {
      field: 'value',
      headerName: t('job.detail.note'),
      width: 150,
      hide: !(jobDetail?.type === JOB_TYPE.PERIOD_CHECK),
    },
    {
      field: 'required',
      headerName: t('job.detail.requiredCate'),
      width: 150,
      renderCell: (params) => {
        const { obligatory } = params.row
        return <Checkbox checked={obligatory === 1} disabled />
      },
    },
    {
      field: 'result',
      width: 150,
      headerName: t('jobList.checklistDetail.result'),
      align: 'center',
      renderCell: (params) => {
        return params?.row?.status === 1
          ? t('jobList.checklistDetail.pass')
          : params?.row?.status === 0
          ? t('jobList.checklistDetail.fail')
          : ''
      },
    },
  ]
  return (
    <>
      <DataTable
        title={t('job.detail.titleList')}
        columns={columns}
        rows={
          jobDetail?.result?.details ||
          jobDetail?.jobTypeTemplate?.details ||
          []
        }
        hideFooter
        hideSetting
        striped={false}
        enableResizable={false}
      />
    </>
  )
}

export default ItemSettingTable
