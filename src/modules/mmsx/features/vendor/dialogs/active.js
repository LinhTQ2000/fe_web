import { useTranslation } from 'react-i18next'

const { default: Dialog } = require('~/components/Dialog')
const { default: LabelValue } = require('~/components/LabelValue')

function DialogActive({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['database'])
  return (
    <Dialog
      open={open}
      title={t('defineVendor.activeTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'error',
      }}
      noBorderBottom
    >
      {t('defineVendor.activeConfirm')}
      <LabelValue
        label={t('defineVendor.code')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LabelValue
        label={t('defineVendor.name')}
        value={tempItem?.name}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}
export default DialogActive
