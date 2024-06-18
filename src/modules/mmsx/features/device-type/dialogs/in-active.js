import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

export default function DialogInActive({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['database'])
  return (
    <Dialog
      open={open}
      title={t('deviceType.inActiveTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'success',
      }}
      noBorderBottom
    >
      {t('deviceType.inActiveConfirm')}
      <LabelValue
        label={t('deviceType.code')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LabelValue
        label={t('deviceType.name')}
        value={tempItem?.name}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}