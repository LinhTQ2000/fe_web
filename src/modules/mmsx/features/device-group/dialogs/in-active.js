import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

export default function DialogInActive({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['database'])
  return (
    <Dialog
      open={open}
      title={t('deviceGroup.inActiveTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'success',
      }}
      noBorderBottom
    >
      {t('deviceGroup.inActiveConfirm')}
      <LabelValue
        label={t('deviceGroup.code')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LabelValue
        label={t('deviceGroup.name')}
        value={tempItem?.name}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}
