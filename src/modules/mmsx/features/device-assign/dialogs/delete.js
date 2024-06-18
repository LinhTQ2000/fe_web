import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

export default function DialogDelete({ open, onSubmit, onCancel, tempItem }) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      title={t('deviceAssign.deleteDeviceAssign.title')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      noBorderBotttom
      submitProps={{
        color: 'error',
      }}
      noBorderBottom
    >
      {t('deviceAssign.deleteDeviceAssign.description')}
      <LabelValue
        label={t('deviceAssign.assign.code')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}
