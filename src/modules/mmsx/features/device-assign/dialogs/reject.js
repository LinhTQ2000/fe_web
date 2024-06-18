import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

export default function DialogReject({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      onCancel={onCancel}
      title={t('common.confirmMessage.reject')}
      cancelLabel={t('general:common.no')}
      submitLabel={t('general:common.yes')}
      submitProps={{ color: 'error' }}
      onSubmit={onSubmit}
      renderDeps={tempItem}
    >
      {t('common.confirmMessage.reject')}
      <LabelValue
        label={t('deviceAssign.assign.code')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}
