import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

function DialogActive({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['database'])
  return (
    <Dialog
      open={open}
      title={t('operationIndex.activeTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'error',
      }}
      noBorderBottom
    >
      {t('operationIndex.activeConfirm')}
      <LabelValue
        label={t('operationIndex.code')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LabelValue
        label={t('operationIndex.name')}
        value={tempItem?.name}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}
export default DialogActive
