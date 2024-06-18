import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

export default function DialogConfirm({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      title={t('general:common.notify')}
      onCancel={onCancel}
      onSubmit={onSubmit}
      cancelLabel={t('general:common.no')}
      submitLabel={t('general:common.yes')}
    >
      {t('general:common.confirmMessage.confirm')}
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
