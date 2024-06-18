import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'
import { JOB_TYPE_MAP } from '~/modules/mmsx/constants'

export default function DialogDelete({ open, onSubmit, onCancel, tempItem }) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      title={t('common.modalDelete.title')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'error',
      }}
      noBorderBottom
    >
      {t('common.modalDelete.description')}
      <LabelValue
        label={t('job.workCode')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LabelValue
        label={t('job.workType')}
        value={t(JOB_TYPE_MAP[tempItem?.type])}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}
