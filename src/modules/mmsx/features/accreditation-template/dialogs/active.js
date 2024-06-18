import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

function DialogActive({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['database'])
  return (
    <Dialog
      open={open}
      title={t('accreditationTemplate.activeTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'error',
      }}
      noBorderBottom
    >
      {t('accreditationTemplate.activeConfirm')}
      <LabelValue
        label={t('accreditationTemplate.code')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LabelValue
        label={t('accreditationTemplate.name')}
        value={tempItem?.name}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}
export default DialogActive
