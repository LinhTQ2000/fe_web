import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'
import { JOB_TYPE_MAP } from '~/modules/mmsx/constants'

export default function DialogConfirm({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      title={t('general:common.notify')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      submitLabel={t('general:common.yes')}
      noBorderBottom
      formikProps={{
        initialValues: { reason: null },
        onSubmit: onSubmit,
        enableReinitialize: true,
      }}
      renderDeps={tempItem}
    >
      {t('general:common.confirmMessage.confirm')}
      <LabelValue
        label={t('job.detail.workCode')}
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
