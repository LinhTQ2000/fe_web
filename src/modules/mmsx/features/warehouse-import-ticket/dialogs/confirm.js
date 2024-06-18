import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

export default function DialogConfirm({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      onCancel={onCancel}
      title={t('common.modalDelete.title')}
      cancelLabel={t('general:common.no')}
      submitLabel={t('general:common.yes')}
      onSubmit={onSubmit}
      renderDeps={tempItem}
      noBorderBottom
    >
      {t('general:common.confirmMessage.confirm')}
      <LabelValue
        label={t('warehouseImportManagement.table.code')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LabelValue
        label={t('warehouseImportManagement.table.name')}
        value={tempItem?.name}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}
