import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

export default function DialogInActive({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      title={t('supplies.inActiveTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'success',
      }}
      noBorderBottom
    >
      {t('supplies.inActiveConfirm')}
      <LabelValue
        label={t('supplies.category.code')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LabelValue
        label={t('supplies.category.name')}
        value={tempItem?.name}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}
