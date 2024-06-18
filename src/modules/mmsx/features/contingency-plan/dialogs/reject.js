import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

export default function DialogReject({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      onCancel={onCancel}
      title={t('general:common.notify')}
      cancelLabel={t('general:common.no')}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'error',
      }}
      onSubmit={onSubmit}
    >
      {t('common.modalDecline.description')}
      <LabelValue
        label={t('contingencyPlan.table.code')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LabelValue
        label={t('contingencyPlan.table.name')}
        value={tempItem?.name}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}
