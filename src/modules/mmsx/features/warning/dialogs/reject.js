import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

export default function DialogReject({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      onCancel={onCancel}
      onSubmit={onSubmit}
      title={t('general:common.reject')}
      cancelLabel={t('general:common.no')}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'error',
      }}
    >
      {t('general:common.confirmMessage.reject')}
      <LabelValue
        label={t('warningList.table.code')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LabelValue
        label={t('warningList.table.name')}
        value={tempItem?.name}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}
