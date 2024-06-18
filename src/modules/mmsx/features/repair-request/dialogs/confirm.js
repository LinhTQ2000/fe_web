import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

export default function DialogConfirm({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      title={t('repairRequest.confirm.title')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      noBorderBottom
    >
      {t('repairRequest.confirm.description')}
      <LabelValue
        label={t('repairRequest.table.code')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}
